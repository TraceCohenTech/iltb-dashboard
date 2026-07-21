"use client";

import { motion } from "motion/react";
import { STATS } from "@/data/gen_stats";
import { HERO_NAMES } from "@/data/gen_hero_names";
import { CountUp } from "@/lib/motion";

const words = ["Ten", "years", "of", "the", "best", "conversations,"];

// split names into 3 rows for the marquee
const rows: any[][] = [[], [], []];
HERO_NAMES.forEach((n: any, i: number) => rows[i % 3].push(n));

function MarqueeRow({ names, dir, dur }: { names: any[]; dir: "l" | "r"; dur: number }) {
  const track = [...names, ...names]; // duplicate for seamless loop
  return (
    <div className="flex overflow-hidden" aria-hidden>
      <div
        className="flex shrink-0 items-center gap-x-8 whitespace-nowrap pr-8 will-change-transform"
        style={{ animation: `marquee-${dir} ${dur}s linear infinite` }}>
        {track.map((n, i) => (
          <span key={i} className="flex items-center gap-x-8">
            <span className={`font-display text-2xl font-medium tracking-tight md:text-4xl ${n.repeat ? "text-teal-300" : "text-white/35"}`}>
              {n.name}
            </span>
            <span className="text-white/15">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const s = STATS;
  return (
    <header className="relative isolate grain flex min-h-screen flex-col overflow-hidden bg-ink-950 text-white">
      {/* layered atmospheric background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* deep teal-ink base */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #05161A 0%, #0A1114 45%, #080C0F 100%)" }} />
        {/* drifting aurora glows */}
        <div className="absolute -left-[12%] -top-[18%] h-[62vh] w-[62vh] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(18,166,180,0.38), transparent 68%)", animation: "drift-a 30s ease-in-out infinite" }} />
        <div className="absolute -right-[8%] top-[6%] h-[52vh] w-[52vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(240,168,30,0.16), transparent 68%)", animation: "drift-b 36s ease-in-out infinite" }} />
        <div className="absolute -bottom-[16%] left-[26%] h-[60vh] w-[60vh] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(24,84,120,0.5), transparent 70%)", animation: "drift-c 44s ease-in-out infinite" }} />
        {/* fine data grid */}
        <div className="absolute inset-0 opacity-[0.045]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 84px) clamp(48px, 6vw, 84px)",
        }} />
        {/* vignette to seat the text */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 45% 35%, transparent 42%, rgba(5,9,11,0.55) 100%)" }} />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10 pt-28">
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
                <motion.span className="inline-block"
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
              </span>
            ))}
            <span className="overflow-hidden py-[0.03em]">
              <motion.span className="inline-block italic text-amber-300"
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.12 + words.length * 0.07, ease: [0.22, 1, 0.36, 1] }}>decoded.</motion.span>
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
          Every episode Patrick O&apos;Shaughnessy has published — read, measured, and turned into a living
          map of who came on, what they talked about, how it changed, and what there is to learn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-11 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Stat n={<CountUp to={s.totalEpisodes} />} label="episodes decoded" big />
          <Stat n={<><CountUp to={s.totalHours} />h</>} label="of conversation" />
          <Stat n={<CountUp to={s.uniqueGuests} />} label="unique guests" />
          <Stat n={<CountUp to={s.lessons} />} label="lessons extracted" />
        </motion.div>
      </div>

      {/* THE MARQUEE — streaming ribbon of real guests, in-flow at the bottom */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
        className="relative flex shrink-0 flex-col gap-3 border-t border-white/10 py-6">
        <div className="mx-auto mb-1 w-full max-w-6xl px-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span className="text-teal-300">476 conversations</span> · the guests
          </span>
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        <MarqueeRow names={rows[0]} dir="l" dur={95} />
        <MarqueeRow names={rows[1]} dir="r" dur={110} />
        <MarqueeRow names={rows[2]} dir="l" dur={80} />
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
