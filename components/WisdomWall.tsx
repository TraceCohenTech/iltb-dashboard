"use client";

import { useMemo, useState } from "react";
import { WISDOM } from "@/data/gen_wisdom";
import { KINDNESS } from "@/data/gen_kindness";
import { QUOTES } from "@/data/gen_quotes";

const CATS = ["all", "investing", "building", "leadership", "markets", "craft", "life"] as const;

export function WisdomLedger() {
  const [cat, setCat] = useState<string>("all");
  const [shown, setShown] = useState(24);

  const rows = useMemo(() => {
    const list = [...WISDOM].reverse();
    return cat === "all" ? list : list.filter((w) => w.cat === cat);
  }, [cat]);

  if (WISDOM.length === 0) return null;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setShown(24); }}
            className={
              c === cat
                ? "rounded-full bg-brass-400 px-4 py-1.5 text-sm font-medium text-ink-950"
                : "rounded-full border border-ink-700 px-4 py-1.5 text-sm text-ivory-200 hover:border-brass-400"
            }
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
        {rows.slice(0, shown).map((w, i) => (
          <figure key={i} className="break-inside-avoid rounded-xl border border-ink-700 bg-ink-900 p-5">
            <blockquote className="text-[15px] leading-relaxed text-ivory-50">{w.t}</blockquote>
            <figcaption className="mt-3 flex items-baseline justify-between gap-2 text-xs text-ivory-400">
              <span className="font-medium text-ivory-200">{w.guest}</span>
              <span>{(w.date ?? "").slice(0, 4)} · {w.cat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > shown && (
        <button
          onClick={() => setShown((s) => s + 24)}
          className="mt-2 rounded-lg border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm text-ivory-200 hover:border-brass-400 hover:text-brass-300"
        >
          Show more wisdom
        </button>
      )}
    </div>
  );
}

export function QuoteMarquee() {
  if (QUOTES.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...QUOTES].reverse().slice(0, 9).map((q, i) => (
        <figure key={i} className="rounded-xl border border-ink-700 bg-ink-900 p-6">
          <blockquote className="font-display text-xl leading-snug text-brass-300">
            &ldquo;{q.q}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-ivory-400">
            — <span className="text-ivory-200">{q.who}</span>, {(q.date ?? "").slice(0, 4)}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function KindnessWall() {
  const [shown, setShown] = useState(12);
  if (KINDNESS.length === 0) return null;
  const rows = [...KINDNESS].reverse();
  return (
    <div>
      <div className="columns-1 gap-4 md:columns-2 [&>*]:mb-4">
        {rows.slice(0, shown).map((k, i) => (
          <figure key={i} className="break-inside-avoid rounded-xl border border-brass-500/30 bg-ink-900 p-6">
            <blockquote className="text-[15px] leading-relaxed text-ivory-50">{k.k}</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-medium text-brass-300">{k.guest}</span>
              <span className="text-ivory-400"> · {k.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > shown && (
        <button
          onClick={() => setShown((s) => s + 12)}
          className="mt-2 rounded-lg border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm text-ivory-200 hover:border-brass-400 hover:text-brass-300"
        >
          More kindness
        </button>
      )}
    </div>
  );
}
