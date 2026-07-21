"use client";

import { motion } from "motion/react";
import { STATS } from "@/data/gen_stats";
import { HERO_NAMES } from "@/data/gen_hero_names";
import { CountUp } from "@/lib/motion";

// split names into 3 rows for the marquee
const rows: any[][] = [[], [], []];
HERO_NAMES.forEach((n: any, i: number) => rows[i % 3].push(n));

function MarqueeRow({ names, dir, dur }: { names: any[]; dir: "l" | "r"; dur: number }) {
  const track = [...names, ...names];
  return (
    <div className="flex overflow-hidden" aria-hidden>
      <div className="flex shrink-0 items-center gap-x-7 whitespace-nowrap pr-7 will-change-transform"
        style={{ animation: `marquee-${dir} ${dur}s linear infinite` }}>
        {track.map((n, i) => (
          <span key={i} className="flex items-center gap-x-7">
            <span className={`font-display text-xl font-semibold tracking-tight md:text-3xl ${n.repeat ? "text-teal-600" : "text-ink-500"}`}>
              {n.name}
            </span>
            <span className="text-teal-400/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const s = STATS;
  return (
    <header className="relative isolate flex min-h-screen flex-col overflow-hidden bg-paper text-ink-900">
      {/* bright layered background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #FCFBF7 0%, #E7F5F3 48%, #F4F1E8 100%)" }} />
        <div className="absolute -left-[10%] -top-[16%] h-[60vh] w-[60vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(18,166,180,0.30), transparent 68%)", animation: "drift-a 30s ease-in-out infinite" }} />
        <div className="absolute -right-[6%] top-[4%] h-[52vh] w-[52vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(240,168,30,0.26), transparent 68%)", animation: "drift-b 36s ease-in-out infinite" }} />
        <div className="absolute -bottom-[14%] left-[24%] h-[58vh] w-[58vh] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(63,199,212,0.24), transparent 70%)", animation: "drift-c 44s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(#14171C 1px, transparent 1px), linear-gradient(90deg, #14171C 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 84px) clamp(48px, 6vw, 84px)",
        }} />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-teal-600 md:text-xs">
          Invest Like the Best · Est. 2016 · An Unofficial Analysis
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-balance font-display text-[2.6rem] font-black leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-6xl md:text-[4.25rem] font-feat">
          Ten years of the best conversations,{" "}
          <span className="italic text-amber-500">decoded.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
          Every episode Patrick O&apos;Shaughnessy has published — read, measured, and turned into a living
          map of who came on, what they discussed, how it changed, and what there is to learn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Stat n={<CountUp to={s.totalEpisodes} />} label="episodes decoded" big />
          <Stat n={<><CountUp to={s.totalHours} />h</>} label="of conversation" />
          <Stat n={<CountUp to={s.uniqueGuests} />} label="unique guests" />
          <Stat n={<CountUp to={s.lessons} />} label="lessons extracted" />
        </motion.div>
      </div>

      {/* THE MARQUEE — streaming ribbon of real guests */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.85 }}
        className="relative flex shrink-0 flex-col gap-2.5 border-t border-line bg-white/40 py-5 backdrop-blur-sm">
        <div className="mx-auto mb-0.5 w-full max-w-6xl px-5">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ink-500">
            <span className="text-teal-600">476 conversations</span> · the guests
          </span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
        <MarqueeRow names={rows[0]} dir="l" dur={95} />
        <MarqueeRow names={rows[1]} dir="r" dur={110} />
        <MarqueeRow names={rows[2]} dir="l" dur={80} />
      </motion.div>
    </header>
  );
}

function Stat({ n, label, big = false }: { n: React.ReactNode; label: string; big?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-surface px-5 py-5 shadow-card ${big ? "border-teal-400/40 ring-1 ring-teal-400/15" : "border-line"}`}>
      <div className="font-display text-4xl font-semibold tabular-nums text-ink-900 md:text-5xl">{n}</div>
      <div className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-500">{label}</div>
    </div>
  );
}
