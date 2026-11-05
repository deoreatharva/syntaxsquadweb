import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Rate limiting in-memory store
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up expired rate limits periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Robust email regex conforming to standard RFC-compliant format
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

interface SubscriberRecord {
  email: string;
  registeredAt: string;
  ipHash: string;
}

// Simple non-reversible hash for IP auditing without storing raw PII
function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return "h_" + Math.abs(hash).toString(16);
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Determination & Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);

    if (limitRecord) {
      if (now < limitRecord.resetAt) {
        if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
          const retryAfterSeconds = Math.ceil((limitRecord.resetAt - now) / 1000);
          return NextResponse.json(
            { error: "Too many registration attempts. Please try again later." },
            {
              status: 429,
              headers: {
                "Retry-After": String(retryAfterSeconds),
              },
            }
          );
        }
        limitRecord.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse & Validate Payload
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }

    const { email, hp_website } = body;

    // 3. Honeypot check: Bots filling in invisible trap fields are silently dismissed with 200 OK
    if (hp_website && typeof hp_website === "string" && hp_website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Registered successfully." });
    }

    // 4. Strict Email Sanitization
    if (typeof email !== "string") {
      return NextResponse.json({ error: "A valid email string is required." }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // Prevent CRLF / header injection / log injection
    if (/[\r\n\0]/.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Invalid characters in email." }, { status: 400 });
    }

    // Length boundaries
    if (sanitizedEmail.length < 5 || sanitizedEmail.length > 100) {
      return NextResponse.json(
        { error: "Email must be between 5 and 100 characters long." },
        { status: 400 }
      );
    }

    // Format validation
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // 5. Atomic Storage in data/subscribers.json
    await fs.mkdir(DATA_DIR, { recursive: true });

    let subscribers: SubscriberRecord[] = [];
    try {
      const existingData = await fs.readFile(DATA_FILE, "utf-8");
      subscribers = JSON.parse(existingData);
      if (!Array.isArray(subscribers)) {
        subscribers = [];
      }
    } catch {
      subscribers = [];
    }

    // Check duplicate
    const isDuplicate = subscribers.some((s) => s.email === sanitizedEmail);

    if (!isDuplicate) {
      const newEntry: SubscriberRecord = {
        email: sanitizedEmail,
        registeredAt: new Date().toISOString(),
        ipHash: hashIp(ip),
      };
      subscribers.push(newEntry);

      // Write safely
      await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
    }

    // 6. Forward to Google Sheets Web App (if configured)
    const GOOGLE_SCRIPT_URL =
      process.env.GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycby8k0d3RWTNeLm1pFIhxQl8Gn45VIUw0SBM-PzKpHlXdTthSRgQKxXWCpoaK9y0K_AV/exec";

    if (GOOGLE_SCRIPT_URL) {
      try {
        const formData = new URLSearchParams();
        formData.append("email", sanitizedEmail);
        formData.append("registeredAt", new Date().toISOString());

        // Fire-and-forget relay to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        }).catch((e) => {
          console.warn("Google Sheet sync warning:", e.message);
        });
      } catch (err) {
        console.warn("Failed to initiate Google Sheet sync:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're registered! Welcome to Syntax Squad.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
