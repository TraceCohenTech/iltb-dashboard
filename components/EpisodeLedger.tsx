"use client";

import { useMemo, useState } from "react";
import { EPISODES } from "@/data/gen_episodes";

const PAGE = 40;

export function EpisodeLedger() {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const all = [...EPISODES].reverse(); // newest first
    if (!needle) return all;
    return all.filter(
      (e) =>
        e.title.toLowerCase().includes(needle) ||
        (e.guest ?? "").toLowerCase().includes(needle) ||
        (e.desc ?? "").toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
        placeholder="Search 476 episodes by guest, title, or topic…"
        aria-label="Search episodes"
        className="w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-ivory-50 placeholder:text-ivory-400 focus:border-brass-400 focus:outline-none"
      />
      <p className="mt-2 text-sm text-ivory-400">
        {rows.length} episode{rows.length === 1 ? "" : "s"}
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-700 bg-ink-900 text-ivory-400">
              <th className="px-4 py-3 font-medium">EP</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Episode</th>
              <th className="px-4 py-3 font-medium text-right">Length</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, shown).map((e) => (
              <tr key={e.slug} className="border-b border-ink-700/60 last:border-0 hover:bg-ink-800/60">
                <td className="px-4 py-3 font-mono text-ivory-400">{e.ep ?? "—"}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ivory-200">{e.date}</td>
                <td className="px-4 py-3 text-ivory-50">{e.guest || "—"}</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://colossus.com/episode/${e.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory-200 underline-offset-2 hover:text-brass-300 hover:underline"
                  >
                    {e.title}
                  </a>
                </td>
                <td className="px-4 py-3 text-right text-ivory-200">{e.mins ? `${e.mins}m` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > shown && (
        <button
          onClick={() => setShown((s) => s + PAGE)}
          className="mt-4 rounded-lg border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm text-ivory-200 hover:border-brass-400 hover:text-brass-300"
        >
          Show {Math.min(PAGE, rows.length - shown)} more
        </button>
      )}
    </div>
  );
}
