"use client";

import { useMemo, useState } from "react";
import { EPISODES } from "@/data/gen_episodes";

const PAGE = 40;
const TYPES = ["all", "Founder / Operator", "VC", "Hedge Fund", "Public Markets", "PE / Buyout", "Academic / Author"];

export function EpisodeLedger() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let all = [...EPISODES].reverse();
    if (type !== "all") all = all.filter((e: any) => e.type === type);
    if (!needle) return all;
    return all.filter((e: any) =>
      e.title.toLowerCase().includes(needle) ||
      (e.guest ?? "").toLowerCase().includes(needle) ||
      (e.one_liner ?? "").toLowerCase().includes(needle) ||
      (e.topics ?? []).join(" ").toLowerCase().includes(needle)
    );
  }, [q, type]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
          placeholder="Search 476 episodes by guest, title, or topic…" aria-label="Search episodes"
          className="w-full rounded-full border border-line bg-surface px-5 py-3 text-ink-900 shadow-card placeholder:text-ink-300 focus:border-teal-400 focus:outline-none" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button key={t} onClick={() => { setType(t); setShown(PAGE); }}
            className={t === type
              ? "rounded-full bg-ink-900 px-3.5 py-1.5 text-[13px] font-semibold text-white"
              : "rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-700 hover:border-teal-400 hover:text-teal-600"}>
            {t === "all" ? "All types" : t}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-500">{rows.length} episode{rows.length === 1 ? "" : "s"}</p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-cream text-ink-500">
                <th className="px-4 py-3 font-semibold">EP</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Guest</th>
                <th className="px-4 py-3 font-semibold">Episode</th>
                <th className="px-4 py-3 text-right font-semibold">Len</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, shown).map((e: any) => (
                <tr key={e.slug} className="border-b border-line/70 last:border-0 hover:bg-teal-50/50">
                  <td className="px-4 py-3 font-mono text-ink-300">{e.ep ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-500">{e.date}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{e.guest || "—"}</td>
                  <td className="px-4 py-3">
                    <a href={`https://colossus.com/episode/${e.slug}/`} target="_blank" rel="noopener noreferrer"
                      className="text-ink-700 underline-offset-2 hover:text-teal-600 hover:underline">{e.title}</a>
                    {e.one_liner && <p className="mt-0.5 max-w-md text-xs text-ink-300">{e.one_liner}</p>}
                  </td>
                  <td className="px-4 py-3 text-right text-ink-500">{e.mins ? `${e.mins}m` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {rows.length > shown && (
        <button onClick={() => setShown((s) => s + PAGE)} className="mt-4 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-700 shadow-card hover:border-teal-400 hover:text-teal-600">
          Show {Math.min(PAGE, rows.length - shown)} more
        </button>
      )}
    </div>
  );
}
