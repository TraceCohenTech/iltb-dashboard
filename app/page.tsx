import { STATS } from "@/data/gen_stats";
import { KINDNESS } from "@/data/gen_kindness";
import { WISDOM } from "@/data/gen_wisdom";
import { QUOTES } from "@/data/gen_quotes";
import { YearChart, DurationChart, RepeatGuestsChart } from "@/components/Charts";
import { EpisodeLedger } from "@/components/EpisodeLedger";
import { WisdomLedger, QuoteMarquee, KindnessWall } from "@/components/WisdomWall";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900 px-6 py-5">
      <div className="font-display text-4xl text-brass-300">{value}</div>
      <div className="mt-1 text-sm text-ivory-400">{label}</div>
    </div>
  );
}

function Section({
  id, kicker, title, blurb, children,
}: {
  id: string; kicker: string; title: string; blurb: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto mt-20 w-full max-w-6xl px-5">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass-400">{kicker}</p>
      <h2 className="mt-2 font-display text-3xl text-ivory-50 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-ivory-200">{blurb}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Page() {
  const s = STATS;
  return (
    <main>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-ink-700">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 70% -10%, rgba(217,180,92,0.14), transparent 60%), radial-gradient(700px 380px at 10% 110%, rgba(57,135,229,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-brass-400">
            An unofficial analysis · 2016–2026
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-ivory-50 md:text-7xl">
            Invest Like the Best, <span className="text-brass-300">decoded.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-200">
            Ten years of Patrick O&apos;Shaughnessy&apos;s conversations with the world&apos;s best
            investors and builders — every official transcript read, measured, and distilled into
            the numbers, the wisdom, and the kindness.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat value={String(s.totalEpisodes)} label="episodes decoded" />
            <Stat value={`${s.totalHours.toLocaleString()}h`} label="of conversation" />
            <Stat value={`${(s.totalWords / 1e6).toFixed(1)}M`} label="words transcribed" />
            <Stat value={String(s.uniqueGuests)} label="unique guests" />
          </div>
        </div>
      </header>

      <Section
        id="archive"
        kicker="The Archive"
        title="A decade of weekly conversations"
        blurb="Episodes published per year across the full run of the show. Patrick has kept a near-metronomic weekly cadence since September 2016."
      >
        <div className="rounded-xl border border-ink-700 bg-ink-900 p-5">
          <YearChart />
        </div>
      </Section>

      <Section
        id="length"
        kicker="Longer, deeper"
        title="Conversations keep getting longer"
        blurb="Median episode length by year, in minutes. The show has drifted from tight hour-long interviews toward longer, more open-ended conversations."
      >
        <div className="rounded-xl border border-ink-700 bg-ink-900 p-5">
          <DurationChart />
        </div>
      </Section>

      <Section
        id="regulars"
        kicker="The Regulars"
        title="Guests who keep coming back"
        blurb="Appearance counts for repeat guests, from RSS title credits. Each bar is one guest, colored for identity — co-billed appearances count toward the first-billed name."
      >
        <div className="rounded-xl border border-ink-700 bg-ink-900 p-5">
          <RepeatGuestsChart />
        </div>
      </Section>

      {QUOTES.length > 0 && (
        <Section
          id="quotes"
          kicker="Banger Quotes"
          title="Lines worth stealing"
          blurb="Short verbatim lines pulled from the transcripts — the kind you write down mid-episode. This wall grows as more episodes are decoded."
        >
          <QuoteMarquee />
        </Section>
      )}

      {WISDOM.length > 0 && (
        <Section
          id="wisdom"
          kicker="The Wisdom Ledger"
          title={`${WISDOM.length} distilled insights`}
          blurb="Every episode is distilled into a handful of standalone insights on investing, building, leadership, and life. Filter by category."
        >
          <WisdomLedger />
        </Section>
      )}

      {KINDNESS.length > 0 && (
        <Section
          id="kindness"
          kicker="The Kindness Wall"
          title="“What's the kindest thing anyone has ever done for you?”"
          blurb="Patrick ends nearly every episode with the same question. Collected here, the answers are the show's hidden masterpiece — stories of mentors, parents, second chances, and strangers."
        >
          <KindnessWall />
        </Section>
      )}

      <Section
        id="ledger"
        kicker="The Full Ledger"
        title="Every episode, searchable"
        blurb="All 476 decoded episodes with guest, date, and length. Titles link to the official Colossus transcript."
      >
        <EpisodeLedger />
      </Section>

      <footer className="mx-auto mt-24 w-full max-w-6xl border-t border-ink-700 px-5 py-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-ivory-400">
            ILTB Decoded is an unofficial fan analysis. Transcripts and episodes belong to{" "}
            <a href="https://colossus.com" className="text-ivory-200 hover:text-brass-300" target="_blank" rel="noopener noreferrer">
              Colossus
            </a>{" "}
            and Patrick O&apos;Shaughnessy.
          </p>
          <p className="text-sm text-ivory-400">
            Built by{" "}
            <a href="https://x.com/Trace_Cohen" className="text-brass-300 hover:text-brass-400" target="_blank" rel="noopener noreferrer">
              @Trace_Cohen
            </a>{" "}
            ·{" "}
            <a href="mailto:t@nyvp.com" className="text-brass-300 hover:text-brass-400">
              t@nyvp.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
