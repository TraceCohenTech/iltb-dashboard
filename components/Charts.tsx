"use client";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  LineChart, Line, CartesianGrid, AreaChart, Area, Legend,
} from "recharts";
import { PER_YEAR } from "@/data/gen_years";
import { HEATMAP } from "@/data/gen_heatmap";
import { TYPE_DIST } from "@/data/gen_types";
import { TYPE_BY_YEAR } from "@/data/gen_types_year";
import { THEME_DIST } from "@/data/gen_themes";
import { THEME_BY_YEAR } from "@/data/gen_themes_year";
import { TOP_COMPANIES } from "@/data/gen_companies";
import { RISING } from "@/data/gen_rising";
import { LEADERBOARD } from "@/data/gen_leaderboard";
import { REPEAT_GUESTS } from "@/data/gen_repeat_guests";
import { CAT, TEAL, AMBER, INK, LINE } from "@/lib/palette";

const axis = { fill: INK.muted, fontSize: 12 } as const;
const tip = {
  background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10,
  color: INK.hi, boxShadow: "0 8px 24px rgba(20,24,29,0.10)", fontSize: 13,
} as const;
const grid = { stroke: "#EFEBE1" } as const;

/* ---------- The Show: cadence + duration ---------- */
export function YearChart() {
  const data = PER_YEAR.map((d: any) => ({ ...d }));
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid {...grid} vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: LINE }} tickLine={false} interval={0} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator=""
            formatter={(v: any) => [`${v} episodes`, ""]} labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Bar dataKey="episodes" fill={TEAL} radius={[5, 5, 0, 0]} maxBarSize={46} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DurationChart() {
  const data = PER_YEAR.filter((d: any) => d.medianMins != null).map((d: any) => ({ ...d }));
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid {...grid} vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: LINE }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} domain={["dataMin - 5", "dataMax + 5"]} unit="m" />
          <Tooltip contentStyle={tip} separator="" formatter={(v: any) => [`${v} min median`, ""]}
            labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Line type="monotone" dataKey="medianMins" stroke={AMBER} strokeWidth={2.5}
            dot={{ r: 3.5, fill: AMBER, strokeWidth: 0 }} activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Publishing heatmap (year × month) ---------- */
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
export function PublishHeatmap() {
  const max = Math.max(...HEATMAP.flatMap((r: any) => r.months));
  const shade = (n: number) => {
    if (!n) return "#F4F1E9";
    const t = 0.18 + 0.82 * (n / max);
    return `rgba(18,166,180,${t.toFixed(2)})`;
  };
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-[44px_repeat(12,1fr)_52px] gap-1 text-center">
          <div />
          {MONTHS.map((m, i) => <div key={i} className="text-[11px] font-medium text-ink-500">{m}</div>)}
          <div className="text-[11px] font-medium text-ink-500">Total</div>
          {HEATMAP.map((row: any) => (
            <FragmentRow key={row.year} row={row} shade={shade} />
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-500">Each cell is one month; darker teal = more episodes published.</p>
      </div>
    </div>
  );
}
function FragmentRow({ row, shade }: { row: any; shade: (n: number) => string }) {
  return (
    <>
      <div className="flex items-center justify-end pr-1 text-[11px] font-semibold text-ink-700">{row.year}</div>
      {row.months.map((n: number, i: number) => (
        <div key={i} title={`${n} in month ${i + 1}`} className="aspect-square rounded-[4px]"
          style={{ background: shade(n) }} />
      ))}
      <div className="flex items-center justify-center text-[11px] font-bold text-ink-900">{row.total}</div>
    </>
  );
}

/* ---------- Guests: type distribution + evolution ---------- */
export function GuestTypeChart() {
  const data = TYPE_DIST.map((d: any) => ({ ...d }));
  const h = Math.max(240, data.length * 40);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="type" width={128} tick={{ fill: INK.body, fontSize: 12.5 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator="" formatter={(v: any) => [`${v} episodes`, ""]} labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Bar dataKey="count" radius={[0, 5, 5, 0]} maxBarSize={22} label={{ position: "right", fill: INK.muted, fontSize: 12 }}>
            {data.map((d: any, i: number) => <Cell key={d.type} fill={CAT[i % CAT.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GuestTypeEvolution() {
  const order: string[] = TYPE_BY_YEAR.order;
  const rows = TYPE_BY_YEAR.rows.map((r: any) => ({ ...r }));
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} stackOffset="expand">
          <CartesianGrid {...grid} vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: LINE }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
          <Tooltip contentStyle={tip} formatter={(v: any, n: any) => [`${v} eps`, n]} labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} iconType="circle" iconSize={8}
            formatter={(val: any) => <span style={{ color: INK.body }}>{val}</span>} />
          {order.map((t, i) => (
            <Area key={t} type="monotone" dataKey={t} stackId="1" stroke={CAT[i % CAT.length]}
              fill={CAT[i % CAT.length]} fillOpacity={0.82} strokeWidth={0.5} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Top minds leaderboard ---------- */
export function MindsLeaderboard() {
  const data = LEADERBOARD.slice(0, 12).map((d: any) => ({ ...d }));
  const h = Math.max(320, data.length * 38);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 44, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="guest" width={150} tick={{ fill: INK.hi, fontSize: 12.5 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }}
            formatter={(v: any, _n: any, p: any) => [`${p.payload.wisdom} insights · ${p.payload.quotes} quotes · ${p.payload.eps} eps`, ""]}
            labelStyle={{ color: INK.hi, fontWeight: 700 }} separator="" />
          <Bar dataKey="score" radius={[0, 5, 5, 0]} maxBarSize={20}
            label={{ position: "right", fill: INK.muted, fontSize: 12 }}>
            {data.map((d: any, i: number) => <Cell key={d.guest} fill={CAT[i % CAT.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RepeatGuestsChart() {
  const data = REPEAT_GUESTS.slice(0, 10).map((d: any) => ({ ...d }));
  const h = Math.max(280, data.length * 34);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 36, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="guest" width={150} tick={{ fill: INK.hi, fontSize: 12.5 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator="" formatter={(v: any) => [`${v} appearances`, ""]} labelStyle={{ color: INK.hi, fontWeight: 700 }} />
          <Bar dataKey="count" radius={[0, 5, 5, 0]} maxBarSize={18} label={{ position: "right", fill: INK.muted, fontSize: 12 }}>
            {data.map((d: any, i: number) => <Cell key={d.guest} fill={CAT[i % CAT.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Topics: distribution + evolution ---------- */
export function ThemeChart() {
  const data = THEME_DIST.slice(0, 10).map((d: any) => ({ ...d }));
  const h = Math.max(300, data.length * 36);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="theme" width={170} tick={{ fill: INK.body, fontSize: 12.5 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator="" formatter={(v: any) => [`${v} episodes`, ""]} labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Bar dataKey="count" radius={[0, 5, 5, 0]} maxBarSize={20} label={{ position: "right", fill: INK.muted, fontSize: 12 }}>
            {data.map((d: any, i: number) => <Cell key={d.theme} fill={CAT[i % CAT.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ThemeEvolution() {
  const order: string[] = THEME_BY_YEAR.order;
  const rows = THEME_BY_YEAR.rows.map((r: any) => ({ ...r }));
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid {...grid} vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: LINE }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
          <Tooltip contentStyle={tip} formatter={(v: any, n: any) => [`${v}% of topics`, n]} labelStyle={{ color: INK.muted, fontWeight: 600 }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} iconType="circle" iconSize={8}
            formatter={(val: any) => <span style={{ color: INK.body }}>{val}</span>} />
          {order.map((t, i) => (
            <Area key={t} type="monotone" dataKey={t} stackId="1" stroke={CAT[i % CAT.length]}
              fill={CAT[i % CAT.length]} fillOpacity={0.8} strokeWidth={0.5} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Companies: top + rising/falling ---------- */
export function CompaniesChart() {
  const data = TOP_COMPANIES.slice(0, 14).map((d: any) => ({ ...d }));
  const h = Math.max(360, data.length * 30);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={120} tick={{ fill: INK.hi, fontSize: 12.5 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator="" formatter={(v: any) => [`${v} episodes`, ""]} labelStyle={{ color: INK.hi, fontWeight: 700 }} />
          <Bar dataKey="count" radius={[0, 5, 5, 0]} maxBarSize={18}
            label={{ position: "right", fill: INK.muted, fontSize: 12 }}>
            {data.map((d: any, i: number) => <Cell key={d.name} fill={CAT[i % CAT.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RisingChart() {
  // combined diverging: up (green) then down (red), sorted by delta
  const up = RISING.up.slice(0, 7).map((d: any) => ({ ...d }));
  const down = RISING.down.slice(0, 7).map((d: any) => ({ ...d }));
  const data = [...up, ...down.reverse()];
  const h = Math.max(360, data.length * 26);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 8, bottom: 0 }}>
          <CartesianGrid {...grid} horizontal={false} />
          <XAxis type="number" tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`} />
          <YAxis type="category" dataKey="name" width={110} tick={{ fill: INK.hi, fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tip} cursor={{ fill: "#F1EEE6" }} separator=""
            formatter={(_v: any, _n: any, p: any) => [`${p.payload.early}% → ${p.payload.late}% of episodes`, ""]}
            labelStyle={{ color: INK.hi, fontWeight: 700 }} />
          <Bar dataKey="delta" radius={[3, 3, 3, 3]} maxBarSize={16}>
            {data.map((d: any) => <Cell key={d.name} fill={d.delta >= 0 ? "#1F9D55" : "#E0403E"} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
