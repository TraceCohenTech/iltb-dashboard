import { STATS } from "@/data/gen_stats";
import { RISING } from "@/data/gen_rising";
import { LEADERBOARD } from "@/data/gen_leaderboard";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Section, Card, Takeaway } from "@/components/UI";
import { InView } from "@/lib/motion";
import {
  YearChart, DurationChart, PublishHeatmap, GuestTypeChart, GuestTypeEvolution,
  MindsLeaderboard, RepeatGuestsChart, ThemeChart, ThemeEvolution, CompaniesChart, RisingChart,
} from "@/components/Charts";
import { FeaturedQuotes, Lessons, WisdomLedger, KindnessWall } from "@/components/Content";
import { EpisodeLedger } from "@/components/EpisodeLedger";

const topRiser = RISING.up[0];
const topMind = LEADERBOARD[0];

export default function Page() {
  const s = STATS;
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />

        {/* orientation strip */}
        <div className="border-b border-line bg-surface">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-line px-5 md:grid-cols-4">
            <QuickFact k={`${s.medianMins} min`} v="typical length" />
            <QuickFact k={`${(s.totalWords / 1e6).toFixed(1)}M`} v="words transcribed" />
            <QuickFact k={s.companies.toLocaleString()} v="companies discussed" />
            <QuickFact k={String(s.repeatGuests)} v="repeat guests" />
          </div>
        </div>

        <Section id="cadence" index="01" kicker="The Show Over Time"
          title="A near-perfect weekly metronome"
          blurb="Patrick has published on a remarkably steady cadence since September 2016 — and the conversations have grown noticeably longer as the show matured.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Episodes per year" hint="Publishing volume across the run"><InView minHeight={280}><YearChart /></InView></Card>
            <Card title="Median episode length" hint="Minutes per episode, by year"><InView minHeight={280}><DurationChart /></InView></Card>
          </div>
          <div className="mt-5"><Card title="When episodes ship" hint="Month-by-month publishing intensity"><PublishHeatmap /></Card></div>
          <Takeaway>episodes stretched from a ~{s.firstYearMed}-minute median in {s.firstYear} to ~{s.lastYearMed} minutes in {s.lastYear} — the format shifted from quick hits toward long, open-ended conversations as the show matured.</Takeaway>
        </Section>

        <Section id="guests" index="02" kicker="Who Comes On" tone="cream"
          title="From value investors to founders and AI builders"
          blurb="The guest mix is the clearest signal of how the show evolved — early years leaned on public-markets and hedge-fund investors; later years tilt hard toward founders, operators, and venture.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Guest mix, all-time" hint="Episodes by guest type"><InView minHeight={280}><GuestTypeChart /></InView></Card>
            <Card title="Guest mix over time" hint="Share of each year by guest type"><InView minHeight={320}><GuestTypeEvolution /></InView></Card>
          </div>
          <Takeaway>{s.topGuestType} guests are now the single biggest group — a decisive shift from the markets-heavy early years toward the people actually building companies.</Takeaway>
        </Section>

        <Section id="minds" index="03" kicker="The Most Quotable Minds"
          title="Who gave the show its best material"
          blurb="Ranked by how much genuinely quotable wisdom each guest produced across their appearances — a blend of distilled insights and verbatim lines. The people who keep getting invited back tend to top it.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Quotability leaderboard" hint="Insights + quotes captured per guest"><InView minHeight={340}><MindsLeaderboard /></InView></Card>
            <Card title="Most frequent guests" hint="Number of appearances"><InView minHeight={300}><RepeatGuestsChart /></InView></Card>
          </div>
          <Takeaway>{topMind?.guest} tops the board — the show&apos;s most valuable material clusters around a small set of returning thinkers who&apos;ve become its intellectual backbone.</Takeaway>
        </Section>

        <Section id="topics" index="04" kicker="What They Talk About" tone="cream"
          title="The conversation followed the money into AI"
          blurb="Mapping every episode's topics into industry themes shows the show's center of gravity moving in real time — from value investing and hedge funds toward company-building, software, and, unmistakably, artificial intelligence.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Themes, all-time" hint="Episodes touching each industry theme"><InView minHeight={300}><ThemeChart /></InView></Card>
            <Card title="Themes over time" hint="Share of each year's topics"><InView minHeight={340}><ThemeEvolution /></InView></Card>
          </div>
          <Takeaway>AI &amp; machine learning went from a rounding error to one of the biggest themes on the show — roughly {s.aiFirst}% of topics in {s.firstYear} to {s.aiLast}% in {s.lastYear} — tracking the technology&apos;s takeover of the investing conversation.</Takeaway>
        </Section>

        <Section id="companies" index="05" kicker="Companies in the Conversation"
          title="The names that come up again and again"
          blurb="Across ten years a familiar cast of companies anchors the discussion — and the risers and fallers tell you exactly where attention moved.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Most-discussed companies" hint="Episodes mentioning each company"><InView minHeight={360}><CompaniesChart /></InView></Card>
            <Card title="Rising & fading" hint="Change in mention rate, 2016–20 vs 2021–26"><InView minHeight={360}><RisingChart /></InView></Card>
          </div>
          <Takeaway>{topRiser?.name} is the fastest riser — from near-absent to one of the most-referenced companies on the show — alongside Anthropic and NVIDIA, as the AI platform shift reshaped what investors talk about.</Takeaway>
        </Section>

        {/* DARK BAND — quotes */}
        <Section id="quotes" index="06" kicker="Lines Worth Keeping" tone="dark"
          title={<>The quotes you rewind to catch again</>}
          blurb="Short, verbatim, genuinely remarkable — pulled straight from the transcripts.">
          <FeaturedQuotes />
        </Section>

        <Section id="learned" index="07" kicker="What We Learned"
          title={`${s.lessons.toLocaleString()} concrete takeaways`}
          blurb="Every interview distilled into its practical investing and building lessons — the transferable ideas, stripped of the anecdote.">
          <Lessons />
        </Section>

        <Section id="wisdom" index="08" kicker="The Wisdom Ledger" tone="cream"
          title="Insight, filtered by theme"
          blurb="A deeper library of standalone insights on investing, building, leadership, markets, craft, and life. Filter to what you care about.">
          <WisdomLedger />
        </Section>

        {/* WARM BAND — kindness */}
        <Section id="kindness" index="09" kicker="The Kindness Wall" tone="warm"
          title={<>&ldquo;What&apos;s the kindest thing anyone has ever done for you?&rdquo;</>}
          blurb="Patrick closes nearly every episode with the same question. Gathered together, the answers — mentors, parents, second chances, strangers — are the show's quiet masterpiece.">
          <KindnessWall />
        </Section>

        <Section id="ledger" index="10" kicker="Every Episode"
          title="The complete, searchable archive"
          blurb="All 476 decoded episodes with guest, date, length, and a one-line summary. Filter by guest type or search any topic; titles link to the official Colossus transcript.">
          <EpisodeLedger />
        </Section>

        <footer className="grain relative border-t border-darkline bg-ink-950 text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-end">
            <div>
              <div className="font-display text-2xl font-bold">ILTB Decoded</div>
              <p className="mt-2 max-w-md text-sm text-white/55">
                An unofficial analysis of Invest Like the Best. Episodes &amp; transcripts belong to{" "}
                <a href="https://colossus.com" target="_blank" rel="noopener noreferrer" className="text-white/80 underline-offset-2 hover:text-teal-300">Colossus</a>{" "}
                and Patrick O&apos;Shaughnessy.
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              Built by <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-400">@Trace_Cohen</a>
              {" · "}<a href="mailto:t@nyvp.com" className="text-teal-300 hover:text-teal-400">t@nyvp.com</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function QuickFact({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-3 py-8 text-center">
      <div className="font-display text-2xl font-semibold text-ink-900 md:text-3xl">{k}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">{v}</div>
    </div>
  );
}
