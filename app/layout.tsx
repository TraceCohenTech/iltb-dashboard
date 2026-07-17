import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ILTB Decoded — Ten Years of Invest Like the Best",
  description:
    "Every conversation Patrick O'Shaughnessy has published, decoded: 476 episodes, the wisdom ledger, the kindness wall, and a decade of craft.",
  openGraph: {
    title: "ILTB Decoded — Ten Years of Invest Like the Best",
    description:
      "476 episodes of Invest Like the Best, decoded into wisdom, frameworks, and the kindness wall.",
    images: ["/iltb/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink-950 text-ivory-50 font-body antialiased">{children}</body>
    </html>
  );
}
