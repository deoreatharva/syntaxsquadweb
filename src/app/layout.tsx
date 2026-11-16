import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050f08",
};

export const metadata: Metadata = {
  title: "Syntax Squad — Builders, Hackathons & Competitive Coding",
  description:
    "Syntax Squad is a close-knit developer crew focused on hackathons, competitive programming, tech fests, DSA, and shipping real full-stack software.",
  keywords: ["hackathon", "coding community", "syntax squad", "competitive programming", "DSA", "full stack", "tech fest", "software developers"],
  openGraph: {
    title: "Syntax Squad — Builders, Hackathons & Competitive Coding",
    description: "Build fast, solve hard problems, and ship together. Join the squad.",
    url: "https://syntaxsquad.in",
    siteName: "Syntax Squad",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Syntax Squad — National Hackathon Winners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntax Squad — Builders, Hackathons & Competitive Coding",
    description: "Build fast, solve hard problems, and ship together. Join the squad.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://syntaxsquad.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-[#050f08] text-[#f0fdf4]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
