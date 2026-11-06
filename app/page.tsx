import Link from 'next/link';
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

        {/* Hero composition — original illustration (swap for showreel video when ready) */}
        <div className="container relative mt-16 md:mt-20" aria-hidden="true">
          <div className="relative mx-auto h-[360px] max-w-5xl sm:h-[440px] md:h-[520px]">
            <div className="absolute left-1/2 top-6 w-[86%] -translate-x-1/2 md:w-[72%]" data-reveal="">
              <div className="-rotate-2 rounded-[1.75rem] border-2 border-ink bg-paper-white p-3 shadow-card">
                <div className="flex items-center gap-2 px-2 pb-3"><i className="h-3 w-3 rounded-full bg-ink" /><i className="h-3 w-3 rounded-full bg-ink" /><i className="h-3 w-3 rounded-full bg-lime ring-2 ring-ink" /><span className="ml-3 flex h-6 flex-1 items-center rounded-full bg-paper-2 px-3 font-sans text-[11px] text-ink-3">wixnova.com</span></div>
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
            <div className="absolute bottom-0 right-[2%] w-[24%] md:right-[6%] md:w-[18%]" data-parallax="-0.5">
              <div className="rotate-[8deg] rounded-[2rem] border-2 border-ink bg-ink p-2">
                <div className="space-y-2 rounded-[1.5rem] bg-paper-white p-3">
                  <i className="mx-auto block h-1.5 w-10 rounded-full bg-ink/20" /><i className="block aspect-square rounded-xl bg-lime" />
                  <i className="block h-2 rounded-full bg-ink" /><i className="block h-2 w-2/3 rounded-full bg-ink/20" /><b className="block h-6 rounded-full bg-ink" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 w-28 md:left-[4%] md:w-40" data-parallax="0.4">
              <svg className="animate-spin-slow" viewBox="0 0 200 200">
                <defs><path id="badge-c" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" /></defs>
                <circle cx="100" cy="100" r="98" fill="#10140C" />
                <text fill="#B5E96B" fontFamily="var(--font-anton), Impact" fontSize="25" letterSpacing="4"><textPath href="#badge-c">150+ PROJECTS • 98% SATISFACTION • </textPath></text>
              </svg>
              <span className="absolute inset-0 grid place-items-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-ink md:h-16 md:w-16"><Icon name="star" size={26} /></span></span>
            </div>
            <div className="absolute right-[12%] top-0 md:right-[16%]" data-parallax="-0.6">
              <div className="rotate-6 rounded-2xl border-2 border-ink bg-paper-white px-4 py-3 shadow-sticker">
                <p className="cond text-3xl leading-none md:text-4xl">48h</p><p className="text-xs font-semibold">Onboarding time</p>
              </div>
            </div>
          </div>
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
