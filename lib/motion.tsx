"use client";

import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, ReactNode } from "react";

/* Scroll-reveal: fade + rise when the element enters the viewport */
export function Reveal({
  children, delay = 0, y = 24, className = "", as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* Stagger container + item */
export function Stagger({ children, className = "", gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className = "", y = 20 }: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Count-up number that animates when scrolled into view */
export function CountUp({
  to, decimals = 0, prefix = "", suffix = "", className = "",
}: { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.6, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(reduce ? to : to);
  }, [inView, to, mv, reduce]);

  useEffect(() => {
    if (reduce) { if (ref.current) ref.current.textContent = prefix + fmt(to, decimals) + suffix; return; }
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + fmt(v, decimals) + suffix;
    });
  }, [spring, decimals, prefix, suffix, reduce, to]);

  return <span ref={ref} className={className}>{prefix + fmt(0, decimals) + suffix}</span>;
}

function fmt(v: number, d: number) {
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

/* Render children only once scrolled into view — lets Recharts play its draw
   animation exactly when the reader reaches it. Reserves height to avoid jump. */
export function InView({ children, minHeight = 300 }: { children: ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return <div ref={ref} style={{ minHeight }}>{inView ? children : null}</div>;
}
