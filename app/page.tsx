import Link from 'next/link';
import { Icon, Arrow } from '@/components/Icon';
import { Avatar, SectionHead, Shot, Sticker, TalkButton } from '@/components/ui';
import { CountUp, WordFill } from '@/components/effects';
import { Filterable } from '@/components/interactive';
import { FaqSection, Industries, Marquee, PricingSection, Process, ServicesPath, Testimonials } from '@/components/sections';
import { FAQ_GENERAL, PROJECTS, PROJECT_FILTERS } from '@/lib/content';

const GALLERY = [
  { c: '#B5E96B', t: '#E3F3C9', r: '-3deg' }, { c: '#10140C', t: '#2A3024', r: '2deg' }, { c: '#FF8A65', t: '#FDE3D9', r: '-2deg' },
  { c: '#7CC6FF', t: '#DCEFFD', r: '3deg' }, { c: '#FFD24D', t: '#FDF1C6', r: '-2deg' }, { c: '#B79CFF', t: '#ECE5FF', r: '2deg' },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 md:pt-36" aria-labelledby="hero-title">
        <svg className="pointer-events-none absolute -left-24 top-40 hidden w-72 text-lime md:block" viewBox="0 0 200 300" fill="none" aria-hidden="true"><path d="M-20 40c120-30 170 60 120 110S10 160 60 110s140 30 110 120-110 80-150 40" stroke="currentColor" strokeWidth={22} strokeLinecap="round" /></svg>
        <svg className="pointer-events-none absolute -right-20 top-24 hidden w-72 text-lime md:block" viewBox="0 0 200 300" fill="none" aria-hidden="true"><path d="M220 30c-120 0-180 80-120 130s110-40 60-80-150 10-120 110 120 100 200 60" stroke="currentColor" strokeWidth={22} strokeLinecap="round" /></svg>

        <div className="container relative text-center">
          <h1 id="hero-title" className="cond relative mx-auto max-w-6xl text-mega" data-reveal>
            <span className="block">Growth, built</span>
            <span className="block">without limits</span>
            <Sticker rotate="-7deg" className="absolute left-[10%] top-[38%] hidden md:inline-block" pop>Full-stack studio</Sticker>
            <Sticker variant="lime" rotate="5deg" className="absolute -top-6 right-[22%] hidden md:inline-block" pop>Web · WordPress · Growth</Sticker>
            <Sticker rotate="-4deg" className="absolute -bottom-5 right-[12%] hidden md:inline-block" pop>Zero lock-in</Sticker>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden" aria-hidden="true">
            <Sticker rotate="-4deg" className="!text-sm">Full-stack studio</Sticker>
            <Sticker variant="lime" rotate="3deg" className="!text-sm">Web · WordPress · Growth</Sticker>
            <Sticker rotate="-2deg" className="!text-sm">Zero lock-in</Sticker>
          </div>
          <p className="lead mx-auto mt-10 max-w-2xl md:mt-12" data-reveal>Your full-stack digital growth partner — one senior team for websites, WordPress, UI/UX and marketing, on one flat monthly fee.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3" data-reveal>
            <TalkButton size="lg">Book a strategy call</TalkButton>
            <Link href="/portfolio" className="btn-line">See our work</Link>
          </div>
        </div>

        {/* Hero composition — original illustration of "the work" (swap for video / real shots) */}
        <div className="container relative mt-16 md:mt-20" aria-hidden="true">
          <div className="relative mx-auto h-[360px] max-w-5xl sm:h-[440px] md:h-[520px]">
            <div className="absolute left-1/2 top-6 w-[86%] -translate-x-1/2 -rotate-2 md:w-[72%]" data-reveal>
              <div className="rounded-[1.75rem] border-2 border-ink bg-paper-white p-3 shadow-card">
                <div className="flex items-center gap-2 px-2 pb-3"><i className="h-3 w-3 rounded-full bg-ink" /><i className="h-3 w-3 rounded-full bg-ink" /><i className="h-3 w-3 rounded-full bg-lime ring-2 ring-ink" /><span className="ml-3 h-6 flex-1 rounded-full bg-paper-2" /></div>
                <div className="grid grid-cols-5 gap-4 rounded-2xl bg-lime p-6 md:p-10">
                  <div className="col-span-3 space-y-3">
                    <i className="block h-5 rounded-full bg-ink md:h-7" /><i className="block h-5 w-4/5 rounded-full bg-ink md:h-7" />
                    <i className="block h-2.5 w-11/12 rounded-full bg-ink/20" /><i className="block h-2.5 w-2/3 rounded-full bg-ink/20" />
                    <b className="mt-3 block h-9 w-32 rounded-full bg-ink" />
                  </div>
                  <div className="col-span-2 grid place-items-center rounded-2xl border-2 border-ink bg-paper-white">
                    <svg className="w-3/4" viewBox="0 0 120 80"><path d="M5 70 30 45l20 14 30-38 35 22" fill="none" stroke="#10140C" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /><circle cx="80" cy="21" r="8" fill="#B5E96B" stroke="#10140C" strokeWidth={4} /></svg>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3"><i className="h-16 rounded-xl border-2 border-ink/15 md:h-24" /><i className="h-16 rounded-xl border-2 border-ink/15 md:h-24" /><i className="h-16 rounded-xl border-2 border-ink/15 md:h-24" /></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-[2%] w-[24%] rotate-[8deg] animate-bob md:right-[6%] md:w-[18%]">
              <div className="rounded-[2rem] border-2 border-ink bg-ink p-2">
                <div className="space-y-2 rounded-[1.5rem] bg-paper-white p-3">
                  <i className="mx-auto block h-1.5 w-10 rounded-full bg-ink/20" /><i className="block aspect-square rounded-xl bg-lime" />
                  <i className="block h-2 rounded-full bg-ink" /><i className="block h-2 w-2/3 rounded-full bg-ink/20" /><b className="block h-6 rounded-full bg-ink" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 w-28 md:left-[4%] md:w-40">
              <svg className="animate-spin-slow" viewBox="0 0 200 200">
                <defs><path id="badge-c" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" /></defs>
                <circle cx="100" cy="100" r="98" fill="#10140C" />
                <text fill="#B5E96B" fontFamily="var(--font-anton), Impact" fontSize="25" letterSpacing="4"><textPath href="#badge-c">150+ PROJECTS • 98% HAPPY CLIENTS • </textPath></text>
              </svg>
              <span className="absolute inset-0 grid place-items-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-ink md:h-16 md:w-16"><Icon name="star" size={26} /></span></span>
            </div>
            <div className="absolute right-[12%] top-0 rotate-6 rounded-2xl border-2 border-ink bg-paper-white px-4 py-3 shadow-sticker md:right-[16%]">
              <p className="cond text-3xl leading-none md:text-4xl">99</p><p className="text-xs font-semibold">PageSpeed score</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ============ ABOUT (scroll word-fill) ============ */}
      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <p id="about-title" className="label text-center">A bit about us</p>
          <WordFill
            className="relative mx-auto mt-10 max-w-6xl text-center font-display text-statement font-extrabold"
            segments={[
              { text: "We're a" }, { text: 'senior, full-stack crew', hot: true },
              { text: 'that designs, builds and grows websites for ambitious brands. One flat monthly fee, weekly shipping and' },
              { text: 'zero lock-in', hot: true }, { text: "— so you get an in-house team's output without the in-house overhead." },
            ]}
          >
            <Sticker variant="lime" rotate="6deg" className="absolute -top-6 right-[8%] hidden !text-base md:inline-block" popAt={0.3}>Senior-only team</Sticker>
            <Sticker rotate="-6deg" className="absolute left-[2%] top-[45%] hidden !text-base md:inline-block" popAt={0.6}>Allergic to bloat</Sticker>
            <Sticker variant="lime" rotate="-3deg" className="absolute -bottom-6 right-[20%] hidden !text-base md:inline-block" popAt={0.9}>Ships every week</Sticker>
          </WordFill>
          <dl className="mx-auto mt-24 grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4" data-reveal>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={150} />+</dd><dt className="mt-2 font-medium text-ink-3">Projects shipped</dt></div>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={98} />%</dd><dt className="mt-2 font-medium text-ink-3">Happy clients</dt></div>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={48} />h</dd><dt className="mt-2 font-medium text-ink-3">To onboard</dt></div>
            <div><dd className="cond text-7xl md:text-8xl">0</dd><dt className="mt-2 font-medium text-ink-3">Lock-in contracts</dt></div>
          </dl>
        </div>
      </section>

      {/* ============ GALLERY STRIP ============ */}
      <section className="marquee overflow-hidden py-10" aria-label="Project gallery">
        <ul className="flex w-max animate-marquee gap-8 px-4 py-6 [animation-duration:45s]">
          {[...GALLERY, ...GALLERY].map((g, i) => (
            <li key={i} className="w-[300px] shrink-0 md:w-[420px]" style={{ transform: `rotate(${g.r})` }}>
              <Shot color={g.c} tint={g.t} className="aspect-[4/3] !rounded-[1.75rem] border-2 border-ink" />
            </li>
          ))}
        </ul>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <SectionHead id="work-title" label="Featured projects" line1="Selected" line2="work" />
          {/* SAMPLE CONTENT — replace in lib/content.ts */}
          <Filterable
            filters={PROJECT_FILTERS}
            label="Filter projects"
            toolbarClass="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:justify-center md:px-0"
            className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            {PROJECTS.slice(0, 6).map((p) => (
              <Link key={p.client} href="/portfolio" className="group block" data-filter-item data-category={p.categories.join(' ')}>
                <Shot color={p.color} tint={p.tint} className="aspect-[4/3.3]" />
                <div className="mt-5 flex items-center gap-4">
                  <Avatar letter={p.client[0]} color={p.color} />
                  <div className="min-w-0 flex-1">
                    <h3 className="cond text-3xl leading-none">{p.client}</h3>
                    <p className="mt-1 truncate text-sm font-semibold uppercase text-lime-700">{p.title} · {p.categoryLabel}</p>
                  </div>
                  <span className="arrow-dot"><Arrow /></span>
                </div>
              </Link>
            ))}
          </Filterable>
          <div className="mt-24 text-center" data-reveal>
            <p className="cond text-big text-lime-700">We could keep going,</p>
            <p className="cond text-big">but there&apos;s a page for that.</p>
            <div className="mt-8"><TalkButton href="/portfolio">See all projects</TalkButton></div>
          </div>
        </div>
      </section>

      <ServicesPath />
      <Process />
      <Testimonials />
      <Industries />
      <PricingSection />
      <FaqSection items={FAQ_GENERAL} />
    </>
  );
}
