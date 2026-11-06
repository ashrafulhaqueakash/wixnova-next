import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHero, SectionHead, Sticker, TalkButton } from '@/components/ui';
import { CountUp, WordFill } from '@/components/effects';
import { Marquee } from '@/components/sections';
import { MILESTONES, TEAM, VALUES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About — A Senior, Full-Stack Growth Crew',
  description: 'Meet the senior designers, engineers and strategists behind Wixnova — and how we work.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="A bit about us" line1="Nice to" line2="meet you"
        stickers={[
          { text: 'Remote-first', variant: 'lime', pos: '-top-3 right-[18%]', rotate: '5deg' },
          { text: 'Senior-only crew', pos: 'bottom-[30%] left-[4%]', rotate: '-6deg' },
        ]}
      />

      <section className="pb-24 pt-10 md:pb-36 md:pt-16" aria-label="Our story">
        <div className="container">
          <WordFill
            className="relative mx-auto max-w-6xl text-center font-display text-statement font-extrabold"
            segments={[
              { text: 'Wixnova started with a simple frustration: founders paying' }, { text: 'agency prices for junior work,', hot: true },
              { text: 'waiting weeks for kick-offs and juggling five vendors for one launch. So we built the opposite — a tight, senior crew covering brand, product and growth, shipping' },
              { text: 'every single week', hot: true }, { text: 'on one flat fee.' },
            ]}
          >
            <Sticker variant="lime" rotate="-5deg" className="absolute -top-8 left-[10%] hidden !text-base md:inline-block" popAt={0.35}>Professional overthinkers</Sticker>
            <Sticker rotate="4deg" className="absolute -bottom-8 right-[12%] hidden !text-base md:inline-block" popAt={0.85}>Allergic to generic</Sticker>
          </WordFill>
          <dl className="mx-auto mt-24 grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4" data-reveal>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={150} />+</dd><dt className="mt-2 font-medium text-ink-3">Projects</dt></div>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={12} />+</dd><dt className="mt-2 font-medium text-ink-3">Industries</dt></div>
            <div><dd className="cond text-7xl md:text-8xl"><CountUp to={98} />%</dd><dt className="mt-2 font-medium text-ink-3">Happy clients</dt></div>
            <div><dd className="cond text-7xl md:text-8xl">0</dd><dt className="mt-2 font-medium text-ink-3">Lock-in</dt></div>
          </dl>
        </div>
      </section>

      <Marquee />

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" label="What we stand for" line1="What we" line2="stand for" />
          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <li key={v.title} className="card card-hover" style={{ transform: `rotate(${v.r})` }} data-reveal>
                <span className="icon-sticker"><Icon name={v.icon} size={26} /></span>
                <h3 className="cond mt-6 text-4xl">{v.title}</h3>
                <p className="mt-3 text-ink-3">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAMPLE CONTENT — replace team in lib/content.ts (and add real photos) */}
      <section className="section bg-paper-2" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" label="The crew" line1="Real people," line2="real names" right={<TalkButton href="/careers">We&apos;re hiring</TalkButton>} />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <article key={m.role} className="group" data-reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border-2 border-ink transition duration-500 group-hover:-rotate-2" style={{ background: m.color }}>
                  <svg className="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 text-ink" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                    <circle cx="50" cy="36" r="18" fill="#FBFCF7" /><path d="M14 100c0-22 16-38 36-38s36 16 36 38" fill="#FBFCF7" />
                    <path d="M43 36h0M57 36h0" strokeWidth={5} strokeLinecap="round" /><path d="M44 44c4 3 8 3 12 0" strokeLinecap="round" />
                  </svg>
                  <Sticker rotate="-6deg" className="absolute left-3 top-3 !text-sm opacity-0 transition group-hover:opacity-100">Say hi ↗</Sticker>
                </div>
                <h3 className="cond mt-5 text-3xl">{m.name}</h3>
                <p className="text-ink-3">{m.role}</p>
                <div className="mt-3 flex gap-2"><a href="#" className="tag hover:bg-lime">LinkedIn</a><a href="#" className="tag hover:bg-lime">Portfolio</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE CONTENT — replace milestones in lib/content.ts */}
      <section className="section" aria-labelledby="ms-title">
        <div className="container">
          <SectionHead id="ms-title" label="Milestones" line1="How we" line2="got here" />
        </div>
        <ol className="no-scrollbar relative mt-16 flex snap-x gap-10 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw-1296px)/2))]">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative w-[78vw] shrink-0 snap-start sm:w-[360px]" data-reveal>
              <span className="cond block text-[6rem] leading-none text-lime" style={{ WebkitTextStroke: '2px #10140C' }}>{m.year}</span>
              <h3 className="cond mt-4 text-3xl">{m.title}</h3>
              <p className="mt-2 text-ink-3">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
