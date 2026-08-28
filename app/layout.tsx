import type { Metadata, Viewport } from "next";
import { Anybody, DM_Sans, Space_Mono } from "next/font/google";

import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neatlogs.com"),
  title: {
    default: "Neatlogs — feedback to fix, fast",
    template: "%s · Neatlogs",
  },
  description:
    "One workspace for teams to find issues, align on failures, and ship fixes together. Get agents to production faster and keep them reliable after launch.",
  keywords: [
    "AI agent debugging",
    "LLM observability",
    "agent traces",
    "prompt versioning",
    "evals",
  ],
  openGraph: {
    title: "Neatlogs — feedback to fix, fast",
    description:
      "One workspace for teams to find issues, align on failures, and ship fixes together.",
    url: "https://neatlogs.com",
    siteName: "Neatlogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neatlogs — feedback to fix, fast",
    description:
      "One workspace for teams to find issues, align on failures, and ship fixes together.",
  },
};

export const viewport: Viewport = {
  themeColor: "#e9e8e3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
