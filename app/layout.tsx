import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ILTB Decoded — Ten Years of Invest Like the Best",
  description:
    "Every episode of Patrick O'Shaughnessy's podcast, decoded into an interactive map: 476 conversations, the wisdom, the guests, the industries, and a decade of change.",
  openGraph: {
    title: "ILTB Decoded — Ten Years of Invest Like the Best",
    description:
      "476 episodes of Invest Like the Best, decoded into analytics, wisdom, and the kindness wall.",
    images: ["/iltb/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body className="bg-paper font-body text-ink-900 antialiased">{children}</body>
    </html>
  );
}
