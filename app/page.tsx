import Link from 'next/link';
import { HeroShowreel, ServicesPreview, BrandInterlude, CaseStudyFeature } from '@/components/Experience';
import { Icon } from '@/components/Icon';
import { Avatar, SectionHead, Shot, StatNum, Sticker, TalkButton, WordFill, type Vars } from '@/components/ui';
import { Filterable } from '@/components/interactive';
import {
  Comparison, FaqSection, Marquee, PricingSection, Principles, Process, Roster, ServicesPath, StackIndustries, Testimonials,
} from '@/components/sections';
import { FAQ_GENERAL, RESULTS, RESULT_FILTERS, SITE, STATS, SWATCHES, TEAM, WHO_WE_ARE, initials } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 md:pt-36" aria-labelledby="hero-title">
        <svg className="pointer-events-none absolute -left-24 top-40 hidden w-72 text-lime md:block" viewBox="0 0 200 300" fill="none" aria-hidden="true" data-parallax="0.35"><path d="M-20 40c120-30 170 60 120 110S10 160 60 110s140 30 110 120-110 80-150 40" stroke="currentColor" strokeWidth={22} strokeLinecap="round" /></svg>
        <svg className="pointer-events-none absolute -right-20 top-24 hidden w-72 text-lime md:block" viewBox="0 0 200 300" fill="none" aria-hidden="true" data-parallax="-0.3"><path d="M220 30c-120 0-180 80-120 130s110-40 60-80-150 10-120 110 120 100 200 60" stroke="currentColor" strokeWidth={22} strokeLinecap="round" /></svg>

        <div className="container relative text-center">
          <p className="label" data-reveal="">Full-stack growth partner</p>
          <h1 id="hero-title" className="cond relative mx-auto mt-6 max-w-6xl text-mega">
            <span className="block" data-split="load">Design without</span>
            <span className="block text-lime-700" data-split="load" data-delay="0.15">limits.</span>
            <Sticker rotate="-7deg" className="absolute left-[8%] top-[30%] hidden md:inline-block" pop delay={0.6}>Full-stack growth partner</Sticker>
            <Sticker variant="lime" rotate="5deg" className="absolute -top-8 right-[16%] hidden md:inline-block" pop delay={0.75}>14 services · 1 team</Sticker>
            <Sticker rotate="-4deg" className="absolute -bottom-4 right-[10%] hidden md:inline-block" pop delay={0.9}>0 lock-in contracts</Sticker>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden" aria-hidden="true">
            <Sticker rotate="-4deg" className="!text-sm">Full-stack growth partner</Sticker>
            <Sticker variant="lime" rotate="3deg" className="!text-sm">14 services · 1 team</Sticker>
          </div>
          <p className="lead mx-auto mt-10 max-w-2xl md:mt-12" data-reveal="">{SITE.intro}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3" data-reveal="">
            <TalkButton size="lg">Book a strategy call</TalkButton>
            <Link href="/services" className="btn-line">See capabilities</Link>
          </div>
        </div>

        {/* A live visual story built from existing results; optional owned MP4 if supplied. */}
        <div className="container relative mt-16 pb-10 md:mt-20">
          <HeroShowreel />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="container pb-8 pt-20" aria-label="Wixnova in numbers">
        <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-5" data-stagger="">
          {STATS.map((s) => (
            <div key={s.label}><dd className="cond text-7xl md:text-8xl"><StatNum value={s.value} suffix={s.suffix} /></dd><dt className="mt-2 font-medium text-ink-3">{s.label}</dt></div>
          ))}
        </dl>
      </section>

      <Marquee />
      <Roster />

      {/* ============ WHO WE ARE ============ */}
      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <p id="about-title" className="label text-center" data-reveal="">Who we are — a modern agency built for how businesses actually grow</p>
          <WordFill text={WHO_WE_ARE.statement} className="relative mx-auto mt-10 max-w-6xl text-center font-display text-statement font-extrabold">
            <Sticker variant="lime" rotate="6deg" className="absolute -top-8 right-[6%] hidden !text-base md:inline-block" popAt={0.3}>Performance-first</Sticker>
            <Sticker rotate="-6deg" className="absolute left-[0%] top-[42%] hidden !text-base md:inline-block" popAt={0.6}>Full-stack team</Sticker>
            <Sticker variant="lime" rotate="-3deg" className="absolute -bottom-8 right-[18%] hidden !text-base md:inline-block" popAt={0.9}>Transparent results</Sticker>
          </WordFill>
          <div className="mx-auto mt-24 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4" data-stagger="">
            {WHO_WE_ARE.pillars.map((p, i) => (
              <div key={p.title} className={`card ${i === 3 ? '!bg-lime' : ''}`}>
                <p className="font-cond text-5xl text-lime-700">0{i + 1}</p>
                <h3 className="cond mt-3 text-3xl">{p.title}</h3>
                <p className="mt-2 text-ink-3">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesPath />
      <ServicesPreview />
      <Comparison />
      <Process />

      {/* ============ CLIENT RESULTS (horizontal scroll on desktop) ============ */}
      <section className="overflow-hidden py-24 md:py-0" aria-labelledby="work-title" data-hscroll="">
        <div className="flex flex-col gap-10 md:h-screen md:justify-center">
          <div className="container"><SectionHead id="work-title" label="Client results" line1="Results you" line2="can measure." right={<TalkButton href="/work">All results</TalkButton>} /></div>
          <div className="no-scrollbar overflow-x-auto md:overflow-visible">
            <ul className="flex w-max gap-6 px-5 md:px-[max(2rem,calc((100vw-1296px)/2))]" data-hscroll-track="">
              {RESULTS.map((r, i) => {
                const sw = SWATCHES[i % SWATCHES.length];
                return (
                  <li key={r.client} className="w-[78vw] shrink-0 sm:w-[420px]">
                    <Link href="/work" className="group block">
                      <div className="relative">
                        <Shot color={sw.c} tint={sw.t} className="aspect-[4/3.2]" />
                        <span className="sticker is-line absolute left-4 top-4 !text-sm" style={{ '--r': i % 2 ? '4deg' : '-4deg' } as Vars}>{r.metric}</span>
                      </div>
                      <div className="mt-5 flex items-center gap-4">
                        <Avatar label={initials(r.client)} color={sw.c} />
                        <div className="min-w-0 flex-1"><h3 className="cond text-3xl leading-none">{r.client}</h3><p className="mt-1 truncate text-sm font-semibold uppercase text-lime-700">{r.service}</p></div>
                      </div>
                      <p className="mt-3 text-ink-3">{r.headline}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <BrandInterlude />
      <section className="container space-y-6 py-20 md:py-32" aria-label="Featured client stories">
        <p className="label" data-reveal="">Selected client stories</p>
        {RESULTS.slice(0, 2).map((result, index) => <CaseStudyFeature key={result.client} result={result} index={index} />)}
      </section>
      <Principles />
      <Testimonials />

      {/* ============ LEADERSHIP ============ */}
      <section className="section bg-paper-2" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" label="The people behind it" line1="Meet the" line2="leadership." right={<TalkButton href="/about">About Wixnova</TalkButton>} />
          <p className="lead mt-6 max-w-2xl" data-reveal="">Wixnova is led by builders, strategists, and operators who&apos;ve been in the trenches of digital growth. No suits — just people who care deeply about your results.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3" data-stagger="">
            {TEAM.map((m, i) => (
              <article key={m.name} className="card card-hover flex flex-col">
                <div className="flex items-center justify-between"><Avatar label={initials(m.name)} color={SWATCHES[i].c} size="h-20 w-20 text-3xl" /><span className="font-cond text-5xl text-ink/10">0{i + 1}</span></div>
                <h3 className="cond mt-6 text-4xl">{m.name}</h3>
                <p className="text-sm font-semibold uppercase text-lime-700">{m.role}</p>
                <p className="mt-4 text-ink-3">{m.bio}</p>
                <div className="mt-auto flex gap-2 pt-6">
                  {m.email && <a href={`mailto:${m.email}`} className="tag hover:bg-lime">Email</a>}
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="tag hover:bg-lime">LinkedIn ↗</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StackIndustries />
      <PricingSection />
      <FaqSection items={FAQ_GENERAL} />
    </>
  );
}
