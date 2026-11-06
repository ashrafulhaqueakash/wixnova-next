import type { Metadata } from 'next';
import { Avatar, PageHero, SectionHead, StatNum, Sticker, TalkButton, WordFill } from '@/components/ui';
import { Marquee, Principles } from '@/components/sections';
import { ABOUT, SWATCHES, TEAM, initials } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Wixnova — Full-Service Digital Growth Partner',
  description: ABOUT.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Wixnova" line1="We build" line2="growth."
        stickers={[
          { text: 'Not an agency — an ecosystem', variant: 'lime', pos: '-top-3 right-[8%]', rotate: '5deg' },
          { text: 'Remote-first', pos: 'bottom-[20%] left-[6%]', rotate: '-6deg' },
        ]}
        lead={ABOUT.intro}
      >
        <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal=""><TalkButton size="lg">Book a strategy call</TalkButton></div>
      </PageHero>

      <section className="container pb-20" aria-label="By the numbers">
        <p className="label text-center" data-reveal="">By the numbers</p>
        <dl className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4" data-stagger="">
          {ABOUT.stats.map((s) => (
            <div key={s.label}><dd className="cond text-7xl md:text-8xl"><StatNum value={s.value} suffix={s.suffix} /></dd><dt className="mt-2 font-medium text-ink-3">{s.label}</dt></div>
          ))}
        </dl>
      </section>

      {/* Founder quote */}
      <section className="section bg-paper-2" aria-label="From the founder">
        <div className="container">
          <p className="label text-center" data-reveal="">From the founder — built around one belief</p>
          <WordFill text={ABOUT.founderQuote} className="relative mx-auto mt-10 max-w-6xl text-center font-display text-statement font-extrabold">
            <Sticker variant="lime" rotate="-5deg" className="absolute -top-8 left-[8%] hidden !text-base md:inline-block" popAt={0.4}>Sarwar Kamal · Founder</Sticker>
          </WordFill>
          <div className="mx-auto mt-20 grid max-w-5xl gap-8 text-lg leading-relaxed text-ink-2 md:grid-cols-3" data-stagger="">
            {ABOUT.story.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section" aria-labelledby="eco-title">
        <div className="container">
          <SectionHead id="eco-title" label="Who we are" line1="Not an agency." line2="A growth ecosystem." />
          <div className="mt-16 grid gap-6 md:grid-cols-3" data-stagger="">
            {ABOUT.whoWeAre.map((w, i) => (
              <article key={w.title} className={`card card-hover ${i === 1 ? '!bg-lime' : ''}`}>
                <p className="font-cond text-5xl text-lime-700">0{i + 1}</p>
                <h3 className="cond mt-3 text-4xl">{w.title}</h3>
                <p className="mt-3 text-ink-2">{w.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2" data-stagger="">
            <div className="card bg-ink text-paper-white"><Sticker variant="lime" rotate="-4deg" className="!text-sm">Our mission</Sticker><p className="mt-6 font-display text-2xl font-bold leading-snug md:text-3xl">{ABOUT.mission}</p></div>
            <div className="card"><Sticker rotate="4deg" className="!text-sm">Our vision</Sticker><p className="mt-6 font-display text-2xl font-bold leading-snug md:text-3xl">{ABOUT.vision}</p></div>
          </div>
        </div>
      </section>

      <section className="section bg-paper-2" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" label="Core values" line1="What" line2="drives us." />
          <p className="lead mt-6 max-w-2xl" data-reveal="">Six operating principles every team member uses to make the call when there&apos;s no script — from kickoff to optimisation.</p>
          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger="">
            {ABOUT.values.map((v, i) => (
              <li key={v.title} className="card card-hover">
                <span className="font-cond text-5xl text-lime" style={{ WebkitTextStroke: '2px #10140C' }}>0{i + 1}</span>
                <h3 className="cond mt-4 text-3xl">{v.title}</h3>
                <p className="mt-2 text-ink-3">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Principles />

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" label="Leadership" line1="The people" line2="behind it." right={<TalkButton href="/careers">Join the team</TalkButton>} />
          <div className="mt-14 grid gap-6 md:grid-cols-3" data-stagger="">
            {TEAM.map((m, i) => (
              <article key={m.name} className="card card-hover flex flex-col">
                <Avatar label={initials(m.name)} color={SWATCHES[i].c} size="h-20 w-20 text-3xl" />
                <h3 className="cond mt-6 text-4xl">{m.name}</h3>
                <p className="text-sm font-semibold uppercase text-lime-700">{m.role}</p>
                <p className="mt-4 text-ink-3">{m.bio}</p>
                <div className="mt-auto flex gap-2 pt-6">
                  {m.email && <a href={`mailto:${m.email}`} className="tag hover:bg-lime">{m.email}</a>}
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="tag hover:bg-lime">LinkedIn ↗</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
