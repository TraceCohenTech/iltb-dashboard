import { ReactNode } from "react";

export function Section({
  id, kicker, title, blurb, band, children,
}: {
  id: string; kicker: string; title: string; blurb?: string; band?: boolean; children: ReactNode;
}) {
  return (
    <section id={id} className={band ? "bg-cream border-y border-line" : ""}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">{kicker}</p>
        <h2 className="mt-2 font-display text-[28px] leading-tight text-ink-900 md:text-4xl">{title}</h2>
        {blurb && <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-700 md:text-base">{blurb}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function Card({ title, hint, children, className = "" }: { title?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 shadow-card ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          {hint && <p className="mt-0.5 text-xs text-ink-500">{hint}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

/** Editorial "what we learned" callout */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-2xl border border-teal-100 bg-teal-50 p-5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400 text-sm font-bold text-white">↳</div>
      <p className="text-[15px] leading-relaxed text-ink-900">
        <span className="font-semibold text-teal-600">What we learned — </span>
        {children}
      </p>
    </div>
  );
}

export function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-transparent bg-ink-900 text-white" : "border-line bg-surface shadow-card"}`}>
      <div className={`font-display text-3xl md:text-4xl ${accent ? "text-white" : "text-teal-600"}`}>{value}</div>
      <div className={`mt-1 text-sm ${accent ? "text-white/70" : "text-ink-500"}`}>{label}</div>
    </div>
  );
}
