"use client";

import { motion } from "motion/react";
import { STATS } from "@/data/gen_stats";
import { HeroViz } from "@/components/HeroViz";
import { CountUp } from "@/lib/motion";

const words = ["Ten", "years", "of", "the", "best", "conversations,"];

export function Hero() {
  const s = STATS;
  return (
    <header className="relative isolate grain overflow-hidden bg-ink-950 text-white">
      <HeroViz />
      {/* vignette + wash for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, rgba(11,14,17,0) 35%, rgba(11,14,17,0.55) 78%, rgba(11,14,17,0.9) 100%), radial-gradient(60% 50% at 15% 20%, rgba(18,166,180,0.12), transparent 60%)",
      }} />

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-5 py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal-300 md:text-xs">
          Invest Like the Best · Est. 2016 · An Unofficial Analysis
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[15vw] font-black leading-[0.92] tracking-[-0.02em] text-white sm:text-7xl md:text-[5.6rem] lg:text-8xl font-feat">
          <span className="sr-only">Ten years of the best conversations, decoded.</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.28em]">
            {words.map((w, i) => (
              <span key={i} className="overflow-hidden py-[0.03em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="overflow-hidden py-[0.03em]">
              <motion.span
                className="inline-block italic text-amber-300"
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.15 + words.length * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                decoded.
              </motion.span>
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
          Every episode Patrick O&apos;Shaughnessy has published — read, measured, and turned into a living
          map of who came on, what they talked about, how it changed, and what there is to learn.
        </motion.p>

        {/* bento stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Stat n={<CountUp to={s.totalEpisodes} />} label="episodes decoded" big />
          <Stat n={<><CountUp to={s.totalHours} />h</>} label="of conversation" />
          <Stat n={<CountUp to={s.uniqueGuests} />} label="unique guests" />
          <Stat n={<CountUp to={s.lessons} />} label="lessons extracted" />
        </motion.div>

        {/* legend + scroll cue */}
        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-white/45">
          <span className="text-white/30">each dot = one episode ·</span>
          {[["#3F9BEA", "founder"], ["#3FC7D4", "vc"], ["#F0A81E", "hedge fund"], ["#43C06B", "public mkts"]].map(([c, l]) => (
            <span key={l} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {l}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        scroll ↓
      </motion.div>
    </header>
  );
}

function Stat({ n, label, big = false }: { n: React.ReactNode; label: string; big?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm ${big ? "ring-1 ring-teal-300/30" : ""}`}>
      <div className="font-display text-4xl font-semibold tabular-nums text-white md:text-5xl">{n}</div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50">{label}</div>
    </div>
  );
}
