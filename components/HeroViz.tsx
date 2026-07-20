"use client";

import { useEffect, useRef } from "react";
import { EPISODES } from "@/data/gen_episodes";

// guest-type -> accent (matches CAT ordering, tuned for a dark field)
const TYPE_COLOR: Record<string, string> = {
  "Founder / Operator": "#3F9BEA",
  "VC": "#3FC7D4",
  "Hedge Fund": "#F0A81E",
  "Public Markets": "#43C06B",
  "PE / Buyout": "#E85C5A",
  "Academic / Author": "#F08A3C",
  "Public-Co CEO": "#8FD3F4",
  "Other": "#8A93A0",
};

type P = { x: number; y: number; tx: number; ty: number; sx: number; sy: number; r: number; c: string; ph: number };

export function HeroViz() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let W = 0, H = 0, dpr = 1;
    let pts: P[] = [];
    const start = performance.now();

    // episodes sorted by date, x = time position, y = organic band
    const eps = [...EPISODES].filter((e: any) => e.date).sort((a: any, b: any) => a.date.localeCompare(b.date));
    const t0 = new Date(eps[0]?.date || "2016-09-01").getTime();
    const t1 = new Date(eps[eps.length - 1]?.date || "2026-07-01").getTime();

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const padX = W * 0.06, padTop = H * 0.16, padBot = H * 0.18;
      pts = eps.map((e: any, i: number) => {
        const tf = (new Date(e.date).getTime() - t0) / (t1 - t0 || 1);
        const tx = padX + tf * (W - padX * 2);
        // organic vertical distribution: sine wave + deterministic jitter by index
        const wave = Math.sin(tf * Math.PI * 3) * 0.5 + 0.5;
        const jit = ((i * 2654435761) % 1000) / 1000;
        const ty = padTop + (0.15 + 0.7 * ((wave * 0.5 + jit * 0.5))) * (H - padTop - padBot);
        return {
          tx, ty,
          x: W / 2 + (Math.cos(i) * W * 0.5), y: H / 2 + (Math.sin(i * 1.7) * H * 0.6),
          sx: 0, sy: 0,
          r: 1.4 + (jit * 1.8),
          c: TYPE_COLOR[e.type] || TYPE_COLOR.Other,
          ph: jit * Math.PI * 2,
        };
      });
    }

    function frame(now: number) {
      const t = Math.min((now - start) / 1900, 1);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic entrance
      ctx!.clearRect(0, 0, W, H);

      // faint connecting baseline glow
      ctx!.strokeStyle = "rgba(63,199,212,0.10)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(W * 0.06, H * 0.82); ctx!.lineTo(W * 0.94, H * 0.82);
      ctx!.stroke();

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const stagger = Math.min(1, Math.max(0, (e * pts.length - i) / (pts.length * 0.35)));
        const drift = reduce ? 0 : Math.sin(now / 1800 + p.ph) * 3;
        const px = p.x + (p.tx - p.x) * stagger;
        const py = p.y + (p.ty - p.y) * stagger + drift * stagger;
        const alpha = 0.25 + 0.6 * stagger;
        ctx!.beginPath();
        ctx!.arc(px, py, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.c;
        ctx!.globalAlpha = alpha;
        ctx!.fill();
        // glow for a few brighter ones
        if (p.r > 2.6) {
          ctx!.globalAlpha = alpha * 0.35;
          ctx!.beginPath(); ctx!.arc(px, py, p.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = p.c; ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    build();
    raf = requestAnimationFrame(frame);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
