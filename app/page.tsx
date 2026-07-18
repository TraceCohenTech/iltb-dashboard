import { STATS } from "@/data/gen_stats";
import { RISING } from "@/data/gen_rising";
import { LEADERBOARD } from "@/data/gen_leaderboard";
import { Nav } from "@/components/Nav";
import { Section, Card, Takeaway } from "@/components/UI";
import {
  YearChart, DurationChart, PublishHeatmap, GuestTypeChart, GuestTypeEvolution,
  MindsLeaderboard, RepeatGuestsChart, ThemeChart, ThemeEvolution, CompaniesChart, RisingChart,
} from "@/components/Charts";
import { FeaturedQuotes, Lessons, WisdomLedger, KindnessWall } from "@/components/Content";
import { EpisodeLedger } from "@/components/EpisodeLedger";

// headline numbers for takeaways — all sourced from generated STATS
const topRiser = RISING.up[0];
const topMind = LEADERBOARD[0];

export default function Page() {
  const s = STATS;
  return (
    <>
      <Nav />
      <main id="top">
        {/* Hero — podcast cover-art energy */}
        <header className="relative overflow-hidden bg-teal-600">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(1100px 500px at 78% -8%, rgba(233,161,0,0.30), transparent 55%), radial-gradient(700px 400px at 8% 108%, rgba(255,255,255,0.14), transparent 60%)",
          }} />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-14 md:pb-20 md:pt-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px] font-medium text-white ring-1 ring-white/25">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Invest Like the Best · 2016–2026 · unofficial analysis
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-[42px] font-bold leading-[1.04] text-white md:text-7xl">
              Ten years of the best<br className="hidden md:block" /> conversations, <span style={{ color: "#FFCE4D" }}>decoded.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85">
              Every episode of Patrick O&apos;Shaughnessy&apos;s podcast — read, measured, and turned into
              an interactive map of who came on, what they talked about, how it changed, and what there is to learn.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [String(s.totalEpisodes), "episodes decoded"],
                [`${s.totalHours.toLocaleString()}h`, "of conversation"],
                [String(s.uniqueGuests), "unique guests"],
                [s.lessons.toLocaleString(), "lessons extracted"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/15 backdrop-blur">
                  <div className="font-display text-3xl text-white md:text-4xl">{v}</div>
                  <div className="mt-1 text-[13px] text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Quick orientation strip */}
        <div className="border-b border-line bg-surface">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 py-8 text-center md:grid-cols-4">
            <QuickFact k={`${s.medianMins} min`} v="typical episode length" />
            <QuickFact k={`${(s.totalWords / 1e6).toFixed(1)}M`} v="words transcribed" />
            <QuickFact k={s.companies.toLocaleString()} v="companies discussed" />
            <QuickFact k={String(s.repeatGuests)} v="repeat guests" />
          </div>
        </div>

        {/* THE SHOW */}
        <Section id="cadence" kicker="The Show Over Time"
          title="A near-perfect weekly metronome"
          blurb="Patrick has published on a remarkably steady cadence since September 2016 — and the conversations have gotten noticeably longer as the show matured.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Episodes per year" hint="Publishing volume across the run"><YearChart /></Card>
            <Card title="Median episode length" hint="Minutes per episode, by year"><DurationChart /></Card>
          </div>
          <div className="mt-5"><Card title="When episodes ship" hint="Month-by-month publishing intensity"><PublishHeatmap /></Card></div>
          <Takeaway>
            episodes stretched from a ~{s.firstYearMed}-minute median in {s.firstYear} to ~{s.lastYearMed} minutes in {s.lastYear} —
            the format shifted from quick hits toward long, open-ended conversations as the show matured.
          </Takeaway>
        </Section>

        {/* GUESTS */}
        <Section id="guests" kicker="Who Comes On" band
          title="From value investors to founders and AI builders"
          blurb="The guest mix is the clearest signal of how the show evolved. Early years leaned on public-markets and hedge-fund investors; later years tilt hard toward founders, operators, and venture.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Guest mix, all-time" hint="Episodes by guest type"><GuestTypeChart /></Card>
            <Card title="Guest mix over time" hint="Share of each year by guest type"><GuestTypeEvolution /></Card>
          </div>
          <Takeaway>
            {s.topGuestType} guests are now the single biggest group — a decisive shift from the
            markets-heavy early years toward the people actually building companies.
          </Takeaway>
        </Section>

        {/* TOP MINDS */}
        <Section id="minds" kicker="The Most Quotable Minds"
          title="Who gave the show its best material"
          blurb="Ranked by how much genuinely quotable wisdom each guest produced — a blend of distilled insights and verbatim banger quotes across all their appearances. The people who keep getting invited back tend to top it.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Quotability leaderboard" hint="Insights + quotes captured per guest"><MindsLeaderboard /></Card>
            <Card title="Most frequent guests" hint="Number of appearances"><RepeatGuestsChart /></Card>
          </div>
          <Takeaway>
            {topMind?.guest} tops the board — proof that the show&apos;s most valuable material clusters around a
            small set of returning thinkers who&apos;ve become the intellectual backbone of the podcast.
          </Takeaway>
        </Section>

        {/* TOPICS */}
        <Section id="topics" kicker="What They Talk About" band
          title="The conversation followed the money into AI"
          blurb="Mapping every episode's topics into industry themes reveals the show's center of gravity moving in real time — from value investing and hedge funds toward company-building, software, and, unmistakably, artificial intelligence.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Themes, all-time" hint="Episodes touching each industry theme"><ThemeChart /></Card>
            <Card title="Themes over time" hint="Share of each year's topics"><ThemeEvolution /></Card>
          </div>
          <Takeaway>
            AI &amp; machine learning went from a rounding error to one of the biggest themes on the show —
            roughly {s.aiFirst}% of topics in {s.firstYear} to {s.aiLast}% in {s.lastYear} — tracking the technology&apos;s
            takeover of the investing conversation.
          </Takeaway>
        </Section>

        {/* COMPANIES */}
        <Section id="companies" kicker="Companies in the Conversation"
          title="The names that come up again and again"
          blurb="Across ten years, a familiar cast of companies anchors the discussion — and the risers and fallers tell you exactly where attention moved."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Most-discussed companies" hint="Episodes mentioning each company"><CompaniesChart /></Card>
            <Card title="Rising & fading" hint="Change in mention rate, 2016–20 vs 2021–26"><RisingChart /></Card>
          </div>
          <Takeaway>
            {topRiser?.name} is the fastest riser — going from near-absent to one of the most-referenced companies on
            the show — alongside Anthropic and NVIDIA, as the AI platform shift reshaped what investors talk about.
          </Takeaway>
        </Section>

        {/* QUOTES */}
        <Section id="quotes" kicker="Top Quotes" band
          title="Lines worth writing down"
          blurb="Short, verbatim, genuinely quotable — pulled straight from the transcripts. The kind of thing you rewind to catch again.">
          <FeaturedQuotes />
        </Section>

        {/* LESSONS */}
        <Section id="learned" kicker="What We Learned"
          title={`${s.lessons.toLocaleString()} concrete takeaways`}
          blurb="Every interview distilled into its practical investing and building lessons — the transferable ideas, stripped of the anecdote. Browse a cross-section of the best.">
          <Lessons />
        </Section>

        {/* WISDOM */}
        <Section id="wisdom" kicker="The Wisdom Ledger" band
          title="Insight, filtered by theme"
          blurb="A deeper library of standalone insights on investing, building, leadership, markets, craft, and life. Filter to what you care about.">
          <WisdomLedger />
        </Section>

        {/* KINDNESS */}
        <Section id="kindness" kicker="The Kindness Wall"
          title="“What's the kindest thing anyone has ever done for you?”"
          blurb="Patrick closes nearly every episode with the same question. Gathered together, the answers — mentors, parents, second chances, strangers — are the show's quiet masterpiece.">
          <KindnessWall />
        </Section>

        {/* LEDGER */}
        <Section id="ledger" kicker="Every Episode" band
          title="The complete, searchable archive"
          blurb="All 476 decoded episodes with guest, date, length, and a one-line summary. Filter by guest type or search any topic; titles link to the official Colossus transcript.">
          <EpisodeLedger />
        </Section>

        <footer className="border-t border-line bg-surface">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 md:flex-row md:items-center">
            <p className="text-sm text-ink-500">
              ILTB Decoded is an unofficial fan analysis. Episodes &amp; transcripts belong to{" "}
              <a href="https://colossus.com" target="_blank" rel="noopener noreferrer" className="text-ink-700 hover:text-teal-600">Colossus</a>{" "}
              and Patrick O&apos;Shaughnessy.
            </p>
            <p className="text-sm text-ink-500">
              Built by{" "}
              <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-500">@Trace_Cohen</a>{" "}
              · <a href="mailto:t@nyvp.com" className="font-semibold text-teal-600 hover:text-teal-500">t@nyvp.com</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function QuickFact({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-2">
      <div className="font-display text-2xl text-ink-900 md:text-3xl">{k}</div>
      <div className="mt-1 text-[13px] text-ink-500">{v}</div>
    </div>
  );
}
