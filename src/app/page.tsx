"use client";

import { useState, useRef } from "react";
import { Mail, ExternalLink, Trophy, Code2, Cpu, Users, Zap, BookOpen, ChevronDown, Terminal, ArrowRight, Check } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";

/* ─── CUSTOM SOCIAL ICONS ───────────────────────────────── */

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─── DATA ─────────────────────────────────────────────── */

const activities = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Hackathons",
    description: "24-hour dev sprints. We team up, brainstorm wild ideas, drink way too much coffee, and ship working prototypes before the timer runs out.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Competitive Programming",
    description: "CodeForces, CodeChef & LeetCode rounds. We practice weekly contests, break down problem editorials together, and climb ratings as a crew.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Tech Fests & Hack Days",
    description: "Hands-on bug hunts, speed-coding face-offs, and interactive workshops where you actually write code instead of staring at slides.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "DSA for Interviews",
    description: "Consistent problem-solving across trees, graphs, and dynamic programming so technical placement rounds feel like second nature.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full Stack Engineering",
    description: "Real software, not to-do apps. Modern web frameworks, APIs, databases, and deploying live to production so you have actual work to show.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Peer Mentorship",
    description: "Honest guidance from seniors who've already cracked hackathons and interviews. Resume reviews, project feedback, and zero ego.",
  },
];

const achievements = [
  { event: "Smart India Hackathon", result: "Finalists", year: "2024", tag: "National" },
  { event: "Speed Coding Challenge", result: "1st Place", year: "2024", tag: "Campus" },
  { event: "Tech Fest — Dev Sprint", result: "Winners", year: "2024", tag: "Hackathon" },
  { event: "LeetCode Weekly Contest", result: "Top 5%", year: "2024", tag: "Global" },
  { event: "Open Source Hackathon", result: "2nd Place", year: "2023", tag: "Regional" },
  { event: "CP Olympiad", result: "Top 10", year: "2023", tag: "State" },
];

/* ─── HERO FRONT OVERLAY ────────────────────────────────── */

function HeroFront() {
  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          inset: "clamp(20px,4svh,40px) clamp(20px,5vw,56px) auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Terminal className="w-5 h-5 text-[#22c55e]" style={{ color: "#22c55e" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#f0fdf4", letterSpacing: "-0.04em" }}>
            syntax<span style={{ color: "#22c55e" }}>squad</span>
          </span>
        </div>
        <span style={{ fontSize: 11, color: "rgba(240,253,244,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          syntaxsquad.in
        </span>
      </div>

      {/* Tagline above word */}
      <p
        style={{
          position: "absolute",
          inset: "auto 24px calc(100% - var(--gp-word-top,35%) + 28px)",
          margin: 0,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(240,253,244,0.65)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        Developer Crew & Competitive Coding
      </p>

      {/* Tagline below word */}
      <p
        style={{
          position: "absolute",
          inset: "calc(var(--gp-word-bottom,50%) + 28px) 24px auto",
          margin: 0,
          textAlign: "center",
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.6,
          color: "rgba(240,253,244,0.75)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Late-night hackathons, competitive programming & shipping real software.
      </p>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          inset: "auto 24px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: "rgba(240,253,244,0.4)",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: "rgba(240,253,244,0.4)" }} />
        <span>Scroll to explore</span>
      </div>
    </>
  );
}

/* ─── ABOUT SECTION ─────────────────────────────────────── */

function AboutSection() {
  return (
    <section className="bg-[#050f08] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Who We Are
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#f0fdf4] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Just folks who genuinely love to code.
          </h2>
          <p className="text-[rgba(240,253,244,0.7)] leading-relaxed text-lg mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            We started Syntax Squad because watching tutorials alone gets boring fast. Coding is ten times more fun when you&apos;re in a room full of people debugging strange compiler errors at 3 AM, chasing edge cases, and building wild ideas under pressure.
          </p>
          <p className="text-[rgba(240,253,244,0.7)] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Whether it&apos;s forming teams for 36-hour national hackathons, grinding LeetCode patterns for upcoming placement rounds, or shipping production-ready web apps — we do it together as a team.
          </p>
        </div>

        {/* Terminal card */}
        <div className="rounded-xl border border-[rgba(34,197,94,0.15)] bg-[#0a1a0e] p-6 font-mono text-sm shadow-2xl">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="space-y-2 text-[rgba(240,253,244,0.8)]">
            <p><span className="text-[#22c55e]">$</span> whoami</p>
            <p className="text-[rgba(240,253,244,0.5)]">syntax-squad</p>
            <p><span className="text-[#22c55e]">$</span> cat manifesto.txt</p>
            <p className="text-[rgba(240,253,244,0.5)]">Write code. Break things. Ship fast.</p>
            <p><span className="text-[#22c55e]">$</span> ls focus/</p>
            <p className="text-[rgba(240,253,244,0.5)]">hackathons/ dsa/ cp/ fullstack/</p>
            <p><span className="text-[#22c55e]">$</span> git log --oneline -3</p>
            <p className="text-[rgba(240,253,244,0.5)]">a1b2c3 Won Dev Sprint 2024</p>
            <p className="text-[rgba(240,253,244,0.5)]">d4e5f6 SIH Finalists 2024</p>
            <p className="text-[rgba(240,253,244,0.5)]">g7h8i9 Squad founded 🚀</p>
            <p className="flex items-center gap-1"><span className="text-[#22c55e]">$</span> <span className="animate-pulse">█</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHAT WE DO SECTION ────────────────────────────────── */

function WhatWeDoSection() {
  return (
    <section className="bg-[#0a1a0e] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#f0fdf4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            No empty lectures. Just practical skills and real contests.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, i) => (
            <div
              key={i}
              className="group rounded-xl border border-[rgba(34,197,94,0.12)] bg-[#050f08] p-6 hover:border-[rgba(34,197,94,0.35)] hover:bg-[#0b1f10] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.1)] flex items-center justify-center text-[#22c55e] mb-4 group-hover:bg-[rgba(34,197,94,0.18)] transition-colors">
                {item.icon}
              </div>
              <h3 className="text-[#f0fdf4] font-semibold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-[rgba(240,253,244,0.6)] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS SECTION ──────────────────────────────── */

function AchievementsSection() {
  return (
    <section className="bg-[#050f08] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Track Record
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#f0fdf4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Podiums, finalist spots, and late-night victories.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border border-[rgba(34,197,94,0.12)] bg-[#0a1a0e] p-5 hover:border-[rgba(34,197,94,0.3)] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <Trophy className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="text-xs bg-[rgba(34,197,94,0.12)] text-[#22c55e] px-2 py-0.5 rounded-full font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {a.tag}
                </span>
              </div>
              <h3 className="text-[#f0fdf4] font-semibold text-base mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.event}
              </h3>
              <p className="text-[#22c55e] font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.result}
              </p>
              <p className="text-[rgba(240,253,244,0.4)] text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {a.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── JOIN SECTION ──────────────────────────────────────── */

function JoinSection() {
  const [email, setEmail] = useState("");
  const [hpWebsite, setHpWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || trimmed.length > 100) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      // If honeypot is filled, silent success (drops bot)
      if (hpWebsite && hpWebsite.trim().length > 0) {
        setStatus("done");
        setEmail("");
        return;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7dc9784e-5c7e-4f8a-9ab1-32a1c3a246f9",
          email: trimmed,
          subject: `New Syntax Squad Signup: ${trimmed}`,
          from_name: "Syntax Squad Web",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("done");
        setEmail("");
        setHpWebsite("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Unable to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network glitch. Please try again or ping us directly at syntaxsquad@zohoemail.in");
    }
  };

  return (
    <section className="bg-[#0b3b2a] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[rgba(34,197,94,0.07)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative">
        <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Get in the loop
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#f0fdf4] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Want to build and compete with us?
        </h2>
        <p className="text-[rgba(240,253,244,0.7)] text-lg leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
          No spam, ever. Drop your email and we&apos;ll ping you with upcoming hackathon team formations, contest prep sessions, and tech meetups.
        </p>

        {status === "done" ? (
          <div className="flex items-center justify-center gap-3 bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] rounded-xl px-6 py-4 text-[#22c55e]">
            <Check className="w-5 h-5" />
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              You&apos;re in! We&apos;ll be in touch soon.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Honeypot field: invisible to real users, catches automated spam bots */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="hp_website_field">Leave this field blank</label>
              <input
                id="hp_website_field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hpWebsite}
                onChange={(e) => setHpWebsite(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                type="email"
                value={email}
                maxLength={100}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-[rgba(240,253,244,0.07)] border border-[rgba(240,253,244,0.12)] text-[#f0fdf4] placeholder:text-[rgba(240,253,244,0.35)] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22c55e] text-[#050f08] font-bold text-sm hover:bg-[#16a34a] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#050f08] border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    <span>Join the Squad</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-400 text-xs text-left px-1 mt-1 font-[family-name:var(--font-inter)]">
                {errorMessage}
              </p>
            )}
          </form>
        )}

        <p className="text-[rgba(240,253,244,0.4)] text-xs mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
          Or drop a line directly to{" "}
          <a href="mailto:syntaxsquad@zohoemail.in" className="text-[rgba(240,253,244,0.7)] hover:text-[#22c55e] transition-colors underline underline-offset-2">
            syntaxsquad@zohoemail.in
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#050f08] border-t border-[rgba(34,197,94,0.1)] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#22c55e]" />
            <span className="font-bold text-xl tracking-tight text-[#f0fdf4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              syntax<span className="text-[#22c55e]">squad</span>
            </span>
          </div>
          <a
            href="https://syntaxsquad.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[rgba(240,253,244,0.4)] hover:text-[#22c55e] transition-colors text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            syntaxsquad.in <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="mailto:syntaxsquad@zohoemail.in"
            className="flex items-center gap-2 text-[rgba(240,253,244,0.6)] hover:text-[#22c55e] transition-colors text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Mail className="w-4 h-4" />
            syntaxsquad@zohoemail.in
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/syntax_._squad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(34,197,94,0.15)] text-[rgba(240,253,244,0.6)] hover:border-[rgba(34,197,94,0.4)] hover:text-[#22c55e] hover:bg-[rgba(34,197,94,0.05)] transition-all text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.linkedin.com/company/syntax-squad-connect/posts/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(34,197,94,0.15)] text-[rgba(240,253,244,0.6)] hover:border-[rgba(34,197,94,0.4)] hover:text-[#22c55e] hover:bg-[rgba(34,197,94,0.05)] transition-all text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[rgba(34,197,94,0.06)] text-center">
        <p className="text-[rgba(240,253,244,0.25)] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
          © 2026 Syntax Squad. Built by builders who refuse to write boring code.
        </p>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      <GlyphPortal
        word="SYNTAX"
        scrollLength={1.8}
        interactive={true}
        fontWeight={900}
        enterLabel="Step inside"
        style={{
          "--gp-paper": "#050f08",
          "--gp-ink": "#22c55e",
          "--gp-field": "#0b3b2a",
          "--gp-foreground": "#f0fdf4",
        }}
        background={
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 35%, rgba(74,222,128,0.95), transparent 70%), radial-gradient(circle at 20% 75%, rgba(34,197,94,0.9), transparent 50%), linear-gradient(135deg, #15803d 0%, #22c55e 40%, #86efac 75%, #16a34a 100%)",
              boxShadow: "0 0 100px rgba(34,197,94,0.4) inset",
            }}
          />
        }
        front={<HeroFront />}
      >
        {/* This content shows after scrolling through the portal */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
            Terminal Online
          </p>
          <h2 style={{ color: "#f0fdf4", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: "14ch", margin: "0 0 20px" }}>
            We build, break, and win together.
          </h2>
          <p style={{ color: "rgba(240,253,244,0.7)", fontSize: 17, lineHeight: 1.7, maxWidth: "42ch", margin: 0, fontFamily: "'Inter', sans-serif" }}>
            Syntax Squad is a close-knit crew of programmers pushing each other through 24-hour hackathons, daily DSA sprints, and building real-world software.
          </p>
        </div>
      </GlyphPortal>

      <AboutSection />
      <WhatWeDoSection />
      <AchievementsSection />
      <JoinSection />
      <Footer />
    </main>
  );
}
