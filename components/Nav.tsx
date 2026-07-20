"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["cadence", "Show"],
  ["guests", "Guests"],
  ["minds", "Minds"],
  ["topics", "Topics"],
  ["companies", "Companies"],
  ["quotes", "Quotes"],
  ["learned", "Lessons"],
  ["kindness", "Kindness"],
  ["ledger", "Archive"],
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className={`flex h-6 w-6 items-center justify-center rounded-md font-display text-sm font-bold ${solid ? "bg-teal-400 text-white" : "bg-white/15 text-white ring-1 ring-white/25"}`}>i</span>
          <span className={`font-display text-[15px] font-bold tracking-tight ${solid ? "text-ink-900" : "text-white"}`}>ILTB Decoded</span>
        </a>
        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${solid ? "text-ink-500 hover:bg-teal-50 hover:text-teal-600" : "text-white/60 hover:text-white"}`}>
              {label}
            </a>
          ))}
        </nav>
        <a href="https://colossus.com/series/invest-like-the-best/" target="_blank" rel="noopener noreferrer"
          className={`ml-auto rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors lg:ml-0 ${solid ? "bg-ink-900 text-white hover:bg-teal-600" : "bg-white text-ink-900 hover:bg-teal-300"}`}>
          Listen ↗
        </a>
      </div>
    </header>
  );
}
