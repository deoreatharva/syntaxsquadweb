import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syntax Squad — Where Code Meets Community",
  description:
    "Syntax Squad is a college coding club promoting hackathon culture, competitive programming, tech fests, DSA, and full-stack development. Join us and level up your tech career.",
  keywords: ["hackathon", "coding club", "syntax squad", "competitive programming", "DSA", "full stack", "tech fest"],
  openGraph: {
    title: "Syntax Squad",
    description: "Where code meets community. Join the squad.",
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
        {children}
      </body>
    </html>
  );
}
