"use client";

import { useMemo, useState } from "react";
import { FEATURED_QUOTES } from "@/data/gen_featured_quotes";
import { LESSONS } from "@/data/gen_lessons";
import { WISDOM } from "@/data/gen_wisdom";
import { KINDNESS } from "@/data/gen_kindness";
import { CAT } from "@/lib/palette";

const colProps = "break-inside-avoid mb-4";

/* deterministic shuffle by index so SSR/CSR match (no Math.random) */
function pick<T>(arr: T[], n: number, stride: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < arr.length && out.length < n; i += stride) out.push(arr[i]);
  return out;
}

export function FeaturedQuotes() {
  const [n, setN] = useState(12);
  const rows = FEATURED_QUOTES;
  const stride = Math.max(1, Math.floor(rows.length / 60));
  const featured = useMemo(() => pick(rows, 60, stride), [rows, stride]);
  return (
    <div>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {featured.slice(0, n).map((q: any, i: number) => (
          <figure key={i} className={`${colProps} rounded-2xl border border-line bg-surface p-6 shadow-card`}>
            <div className="font-display text-4xl leading-none text-teal-400">“</div>
            <blockquote className="-mt-3 font-display text-lg leading-snug text-ink-900">{q.q}</blockquote>
            <figcaption className="mt-3 text-sm text-ink-500">
              <span className="font-semibold text-ink-700">{q.who}</span> · {q.year}
            </figcaption>
          </figure>
        ))}
      </div>
      {n < featured.length && (
        <button onClick={() => setN((v) => v + 12)} className="mt-6 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600">
          More quotes
        </button>
      )}
    </div>
  );
}

export function Lessons() {
  const [n, setN] = useState(15);
  const rows = LESSONS;
  const stride = Math.max(1, Math.floor(rows.length / 90));
  const cards = useMemo(() => pick(rows, 90, stride), [rows, stride]);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.slice(0, n).map((l: any, i: number) => (
          <div key={i} className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="mb-2 h-1 w-10 rounded-full" style={{ background: CAT[i % CAT.length] }} />
            <p className="text-[15px] leading-relaxed text-ink-900">{l.t}</p>
            <p className="mt-3 text-xs text-ink-500">{l.guest} · {(l.date || "").slice(0, 4)}</p>
          </div>
        ))}
      </div>
      {n < cards.length && (
        <button onClick={() => setN((v) => v + 15)} className="mt-6 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600">
          More lessons
        </button>
      )}
    </div>
  );
}

const CATS = ["all", "investing", "building", "leadership", "markets", "craft", "life"] as const;
export function WisdomLedger() {
  const [cat, setCat] = useState<string>("all");
  const [n, setN] = useState(18);
  const rows = useMemo(() => {
    const list = [...WISDOM].reverse();
    return cat === "all" ? list : list.filter((w: any) => w.cat === cat);
  }, [cat]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => { setCat(c); setN(18); }}
            className={c === cat
              ? "rounded-full bg-teal-400 px-4 py-1.5 text-sm font-semibold text-white"
              : "rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-700 hover:border-teal-400 hover:text-teal-600"}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 columns-1 gap-4 md:columns-2 lg:columns-3">
        {rows.slice(0, n).map((w: any, i: number) => (
          <figure key={i} className={`${colProps} rounded-2xl border border-line bg-surface p-5 shadow-card`}>
            <blockquote className="text-[15px] leading-relaxed text-ink-900">{w.t}</blockquote>
            <figcaption className="mt-3 flex items-baseline justify-between gap-2 text-xs text-ink-500">
              <span className="font-semibold text-ink-700">{w.guest}</span>
              <span>{(w.date || "").slice(0, 4)} · {w.cat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > n && (
        <button onClick={() => setN((v) => v + 18)} className="mt-6 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600">
          More wisdom
        </button>
      )}
    </div>
  );
}

export function KindnessWall() {
  const [n, setN] = useState(12);
  const rows = [...KINDNESS].reverse();
  return (
    <div>
      <div className="columns-1 gap-4 md:columns-2">
        {rows.slice(0, n).map((k: any, i: number) => (
          <figure key={i} className={`${colProps} rounded-2xl border border-amber-100 bg-surface p-6 shadow-card`}>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-500">♡ kindness</div>
            <blockquote className="text-[15px] leading-relaxed text-ink-900">{k.k}</blockquote>
            <figcaption className="mt-3 text-sm">
              <span className="font-semibold text-teal-600">{k.guest}</span>
              <span className="text-ink-500"> · {k.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > n && (
        <button onClick={() => setN((v) => v + 12)} className="mt-6 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600">
          More kindness
        </button>
      )}
    </div>
  );
}
