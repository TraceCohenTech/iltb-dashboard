"use client";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Cell,
} from "recharts";
import { PER_YEAR } from "@/data/gen_years";
import { REPEAT_GUESTS } from "@/data/gen_repeat_guests";
import { CAT, BRASS, INK, IVORY } from "@/lib/palette";

const axis = { fill: IVORY.low, fontSize: 12 } as const;
const tooltipStyle = {
  background: INK.raised,
  border: `1px solid ${INK.line}`,
  borderRadius: 8,
  color: IVORY.hi,
} as const;

export function YearChart() {
  const data = PER_YEAR.map((d) => ({ ...d }));
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={INK.line} strokeDasharray="0" vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: INK.line }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "#16233F", opacity: 0.5 }}
            formatter={(v) => [`${v} episodes`, ""]}
            labelStyle={{ color: IVORY.mid }}
            separator=""
          />
          <Bar dataKey="episodes" fill={BRASS} radius={[4, 4, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DurationChart() {
  const data = PER_YEAR.filter((d) => d.medianMins != null).map((d) => ({ ...d }));
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={INK.line} vertical={false} />
          <XAxis dataKey="year" tick={axis} axisLine={{ stroke: INK.line }} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => [`${v} min median`, ""]}
            labelStyle={{ color: IVORY.mid }}
            separator=""
          />
          <Line
            type="monotone" dataKey="medianMins" stroke={CAT[0]} strokeWidth={2}
            dot={{ r: 4, fill: CAT[0], strokeWidth: 0 }}
            activeDot={{ r: 6, stroke: INK.card, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RepeatGuestsChart() {
  const data = REPEAT_GUESTS.slice(0, 12).map((d) => ({ ...d }));
  const h = Math.max(300, data.length * 36);
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 36, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category" dataKey="guest" width={190}
            tick={{ fill: IVORY.mid, fontSize: 13 }} axisLine={false} tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "#16233F", opacity: 0.5 }}
            formatter={(v) => [`${v} appearances`, ""]}
            labelStyle={{ color: IVORY.mid }}
            separator=""
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}
            label={{ position: "right", fill: IVORY.low, fontSize: 12 }}>
            {data.map((d, i) => (
              <Cell key={d.guest} fill={CAT[i % CAT.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
