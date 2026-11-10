import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050f08",
};

export const metadata: Metadata = {
  title: "Syntax Squad — Builders, Hackathons & Competitive Coding",
  description:
    "Syntax Squad is a student-led developer crew focused on hackathons, competitive programming, tech fests, DSA, and shipping real full-stack software.",
  keywords: ["hackathon", "coding community", "syntax squad", "competitive programming", "DSA", "full stack", "tech fest", "student developers"],
  openGraph: {
    title: "Syntax Squad",
    description: "Build fast, solve hard problems, and ship together. Join the squad.",
    url: "https://syntaxsquad.in",
    siteName: "Syntax Squad",
    type: "website",
  },
  metadataBase: new URL("https://syntaxsquad.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#050f08] text-[#f0fdf4]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
