import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHero, SectionHead, StatNum, Sticker, TalkButton } from '@/components/ui';
import { Marquee } from '@/components/sections';
import { CAREERS, SITE } from '@/lib/content';
import type { IconName } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Careers — Join the Wixnova Studio',
  description: CAREERS.intro,
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers at Wixnova" line1="Brag-worthy" line2="work only."
        stickers={[
          { text: 'Remote first', variant: 'lime', pos: '-top-3 left-[16%]', rotate: '-6deg' },
          { text: 'No layers, no theater', pos: 'bottom-2 right-[10%]', rotate: '5deg' },
        ]}
        lead={CAREERS.intro}
      >
        <div className="mt-9 flex justify-center gap-3" data-reveal=""><TalkButton href="#join" size="lg">Introduce yourself</TalkButton></div>
      </PageHero>

      <section className="container pb-20" aria-label="The studio in numbers">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4" data-stagger="">
          {CAREERS.stats.map((s) => (
            <div key={s.label}><dd className="cond text-7xl md:text-8xl"><StatNum value={s.value} suffix={s.suffix} text={s.text} /></dd><dt className="mt-2 font-medium text-ink-3">{s.label}</dt></div>
          ))}
        </dl>
      </section>

      <Marquee />

      <section className="section" aria-labelledby="beliefs-title">
        <div className="container">
          <SectionHead id="beliefs-title" label="What we stand for" line1="Four beliefs" line2="behind every project." />
          <p className="lead mt-6 max-w-2xl" data-reveal="">They&apos;re not posters on a wall. They&apos;re how we hire, how we critique work, and how we treat each other on a hard Tuesday.</p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-stagger="">
            {CAREERS.beliefs.map((b, i) => (
              <article key={b.title} className={`card card-hover ${i === 2 ? '!bg-lime' : ''}`}>
                <span className="font-cond text-5xl text-lime-700">0{i + 1}</span>
                <h3 className="cond mt-3 text-3xl">{b.title}</h3>
                <p className="mt-2 text-ink-3">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper-2" aria-labelledby="perks-title">
        <div className="container">
          <SectionHead id="perks-title" label="Life at Wixnova" line1="Perks that actually" line2="move the needle." />
          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger="">
            {CAREERS.perks.map((p) => (
              <li key={p.title} className="card card-hover">
                <span className="icon-sticker"><Icon name={p.icon as IconName} size={26} /></span>
                <h3 className="cond mt-6 text-3xl">{p.title}</h3>
                <p className="mt-2 text-ink-3">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="hire-title">
        <div className="container">
          <SectionHead id="hire-title" label="How we hire" line1="Four steps." line2="Two weeks. No theatre." />
          <p className="lead mt-6 max-w-2xl" data-reveal="">Most candidates go from &ldquo;hello&rdquo; to &ldquo;offer&rdquo; in under fourteen days, and we pay for any take-home work.</p>
          <ol className="mt-16 grid gap-5 md:grid-cols-4" data-stagger="">
            {CAREERS.hiring.map((s, i) => (
              <li key={s.title} className={`card ${i === 3 ? '!bg-lime' : ''}`}>
                <span className={`cond text-7xl ${i === 3 ? 'text-ink' : 'text-lime'}`} style={{ WebkitTextStroke: '2px #10140C' }}>0{i + 1}</span>
                <h3 className="cond mt-3 text-3xl">{s.title}</h3>
                <p className="mt-2 text-ink-3">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="join" className="section scroll-mt-20" aria-labelledby="join-title">
        <div className="container">
          <div className="relative overflow-hidden rounded-blob bg-ink p-8 text-paper-white md:p-16" data-reveal="">
            <div className="squiggle-bg pointer-events-none absolute inset-0 opacity-40" />
            <Sticker variant="lime" rotate="-5deg" className="relative">Open roles: hiring year-round</Sticker>
            <h2 id="join-title" className="cond relative mt-8 text-giant text-paper-white" data-split="">Don&apos;t see your role?<br /><span className="text-lime">We hire rare talent.</span></h2>
            <p className="relative mt-6 max-w-xl text-lg text-ink-4">We hire for trajectory, not titles. Send a short note, a few links, and what you&apos;d want to build with us. We read every message and reply within five business days.</p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              <TalkButton href="/contact?service=careers" variant="lime" size="lg">Introduce yourself</TalkButton>
              <a href={`mailto:${SITE.email}?subject=Careers`} className="btn-line !border-paper-white !text-paper-white hover:!bg-paper-white hover:!text-ink">{SITE.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
