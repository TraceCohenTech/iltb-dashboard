import { ReactNode } from "react";
import { Reveal } from "@/lib/motion";

export function Section({
  id, index, kicker, title, blurb, tone = "light", children,
}: {
  id: string; index: string; kicker: string; title: ReactNode; blurb?: string;
  tone?: "light" | "cream" | "dark"; children: ReactNode;
}) {
  const bg = tone === "dark" ? "grain relative bg-ink-950 text-white"
    : tone === "cream" ? "bg-cream border-y border-line" : "";
  const kickerC = tone === "dark" ? "text-teal-300" : "text-teal-600";
  const idxC = tone === "dark" ? "text-white/15" : "text-ink-900/10";
  const titleC = tone === "dark" ? "text-white" : "text-ink-900";
  const blurbC = tone === "dark" ? "text-white/80" : "text-ink-700";
  return (
    <section id={id} className={bg}>
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className={`font-display text-5xl font-black leading-none tabular-nums md:text-6xl ${idxC}`}>{index}</span>
            <div>
              <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${kickerC}`}>{kicker}</p>
              <h2 className={`mt-2 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[2.75rem] ${titleC} font-feat`}>{title}</h2>
            </div>
          </div>
          {blurb && <p className={`mt-4 max-w-3xl text-[15px] leading-relaxed md:text-base ${blurbC} md:pl-[4.75rem]`}>{blurb}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Card({ title, hint, dark = false, children, className = "" }: {
  title?: string; hint?: string; dark?: boolean; children: ReactNode; className?: string;
}) {
  const base = dark
    ? "border-darkline bg-ink-800/60"
    : "border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift";
  return (
    <div className={`rounded-2xl border p-5 ${base} ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-ink-900"}`}>{title}</h3>
          {hint && <p className={`mt-0.5 font-mono text-[11px] ${dark ? "text-white/60" : "text-ink-500"}`}>{hint}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export function Takeaway({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal className="mt-6">
      <div className={`flex gap-4 rounded-2xl border p-5 md:p-6 ${dark ? "border-teal-300/25 bg-teal-300/[0.06]" : "border-teal-100 bg-teal-50"}`}>
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400 font-mono text-sm font-bold text-white">↳</div>
        <p className={`text-[15px] leading-relaxed md:text-base ${dark ? "text-white/90" : "text-ink-900"}`}>
          <span className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-teal-300" : "text-teal-600"}`}>What we learned&nbsp;&nbsp;</span>
          {children}
        </p>
      </div>
    </Reveal>
  );
}
