"use client";

const LINKS = [
  ["cadence", "The Show"],
  ["guests", "Guests"],
  ["minds", "Top Minds"],
  ["topics", "Topics"],
  ["companies", "Companies"],
  ["quotes", "Quotes"],
  ["learned", "Lessons"],
  ["kindness", "Kindness"],
  ["ledger", "Episodes"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-400 font-display text-sm font-bold text-white">i</span>
          <span className="font-display text-[15px] font-bold text-ink-900">ILTB Decoded</span>
        </a>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-500 transition-colors hover:bg-teal-50 hover:text-teal-600">
              {label}
            </a>
          ))}
        </nav>
        <a href="https://colossus.com/series/invest-like-the-best/" target="_blank" rel="noopener noreferrer"
          className="ml-auto rounded-full bg-ink-900 px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-teal-600 md:ml-0">
          Listen
        </a>
      </div>
    </header>
  );
}
