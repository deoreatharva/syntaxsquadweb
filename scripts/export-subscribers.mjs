import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.resolve(__dirname, "../data/subscribers.json");
const csvFile = path.resolve(__dirname, "../data/subscribers.csv");

async function exportSubscribers() {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const subscribers = JSON.parse(raw);

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      console.log("ℹ️ No subscribers found yet in data/subscribers.json");
      return;
    }

    console.log(`\n📋 Syntax Squad — Total Registered Students: ${subscribers.length}\n`);
    console.table(
      subscribers.map((s, idx) => ({
        "#": idx + 1,
        Email: s.email,
        "Registered At": new Date(s.registeredAt).toLocaleString(),
      }))
    );

    // Export CSV
    const csvHeader = "Email,RegisteredAt\n";
    const csvRows = subscribers
      .map((s) => `"${s.email.replace(/"/g, '""')}","${s.registeredAt}"`)
      .join("\n");

    await fs.writeFile(csvFile, csvHeader + csvRows, "utf-8");
    console.log(`\n✅ Successfully exported CSV to: ${csvFile}\n`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("ℹ️ No registrations recorded yet. Once students sign up, they will appear here.");
    } else {
      console.error("❌ Error reading subscribers:", err.message);
    }
  }
}

exportSubscribers();

