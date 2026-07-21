"use client";

import { useMemo, useState } from "react";
import { FEATURED_QUOTES } from "@/data/gen_featured_quotes";
import { LESSONS } from "@/data/gen_lessons";
import { WISDOM } from "@/data/gen_wisdom";
import { KINDNESS } from "@/data/gen_kindness";
import { CAT } from "@/lib/palette";
import { Stagger, StaggerItem } from "@/lib/motion";

function pick<T>(arr: T[], n: number, stride: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < arr.length && out.length < n; i += stride) out.push(arr[i]);
  return out;
}
const moreBtn = "mt-8 rounded-full border px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors";

const SITE = "https://iltb-dashboard.vercel.app/iltb";
function tweetHref(text: string) {
  const params = new URLSearchParams({ text, url: SITE, via: "patrick_oshag" });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
/** X / Twitter share button. `tone` matches the surface it sits on. */
function ShareX({ text, tone }: { text: string; tone: "dark" | "light" }) {
  const cls = tone === "dark"
    ? "text-white/35 hover:text-teal-300"
    : "text-ink-300 hover:text-teal-600";
  return (
    <a href={tweetHref(text)} target="_blank" rel="noopener noreferrer" aria-label="Share on X"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100 focus:opacity-100 ${cls}`}>
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>
  );
}

export function FeaturedQuotes() {
  const [n, setN] = useState(9);
  const rows = FEATURED_QUOTES;
  const stride = Math.max(1, Math.floor(rows.length / 60));
  const featured = useMemo(() => pick(rows, 60, stride), [rows, stride]);
  return (
    <div>
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.05}>
        {featured.slice(0, n).map((q: any, i: number) => (
          <StaggerItem key={i}>
            <figure className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-teal-300/40 hover:bg-white/[0.07]">
              <div className="font-display text-5xl italic leading-none text-teal-300/80">&ldquo;</div>
              <blockquote className="-mt-4 font-display text-lg font-medium leading-snug text-white md:text-xl">{q.q}</blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
                <span>{q.who} · {q.year}</span>
                <ShareX tone="dark" text={`"${q.q}" — ${q.who}, Invest Like the Best`} />
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
      {n < featured.length && (
        <button onClick={() => setN((v) => v + 9)} className={`${moreBtn} border-white/20 text-white/80 hover:border-teal-300 hover:text-teal-300`}>More quotes</button>
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
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.04}>
        {cards.slice(0, n).map((l: any, i: number) => (
          <StaggerItem key={i}>
            <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-lift">
              <div className="mb-3 h-1 w-10 rounded-full" style={{ background: CAT[i % CAT.length] }} />
              <p className="text-[15px] leading-relaxed text-ink-900">{l.t}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-500">{l.guest} · {(l.date || "").slice(0, 4)}</p>
                <ShareX tone="light" text={`${l.t} — ${l.guest} on Invest Like the Best`} />
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      {n < cards.length && (
        <button onClick={() => setN((v) => v + 15)} className={`${moreBtn} border-line bg-surface text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600`}>More lessons</button>
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
            className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${c === cat
              ? "bg-teal-400 text-white" : "border border-line bg-surface text-ink-700 hover:border-teal-400 hover:text-teal-600"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 columns-1 gap-4 md:columns-2 lg:columns-3">
        {rows.slice(0, n).map((w: any, i: number) => (
          <figure key={i} className="mb-4 break-inside-avoid rounded-2xl border border-line bg-surface p-5 shadow-card">
            <blockquote className="text-[15px] leading-relaxed text-ink-900">{w.t}</blockquote>
            <figcaption className="mt-3 flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
              <span className="font-semibold text-ink-700">{w.guest}</span>
              <span>{(w.date || "").slice(0, 4)} · {w.cat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > n && (
        <button onClick={() => setN((v) => v + 18)} className={`${moreBtn} border-line bg-surface text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600`}>More wisdom</button>
      )}
    </div>
  );
}

export function KindnessWall() {
  const [n, setN] = useState(10);
  const rows = [...KINDNESS].reverse();
  return (
    <div>
      <div className="columns-1 gap-4 md:columns-2">
        {rows.slice(0, n).map((k: any, i: number) => (
          <figure key={i} className="mb-4 break-inside-avoid rounded-2xl border border-amber-300/20 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-300/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300">♡ {k.type && ""}kindness</div>
            <blockquote className="text-[15px] leading-relaxed text-white/90">{k.k}</blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-wider">
              <span className="font-semibold text-teal-300">{k.guest}</span>
              <span className="text-white/40"> · {k.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > n && (
        <button onClick={() => setN((v) => v + 10)} className={`${moreBtn} border-white/20 text-white/80 hover:border-amber-300 hover:text-amber-300`}>More kindness</button>
      )}
    </div>
  );
}
