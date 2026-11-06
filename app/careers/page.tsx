import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHero, SectionHead, TalkButton } from '@/components/ui';
import { Filterable } from '@/components/interactive';
import Link from 'next/link';
import { Marquee } from '@/components/sections';
import { JOBS, JOB_FILTERS, PERKS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Careers — Join the Crew',
  description: 'Open roles for WordPress developers, frontend engineers, product designers and marketers. Remote-first.',
};

const STEPS = [
  { t: 'Apply', d: 'Portfolio or GitHub. No cover letter.' },
  { t: 'Intro call', d: '30 minutes to get to know each other.' },
  { t: 'Paid trial', d: 'A small real task — and we pay you.' },
  { t: 'Offer', d: 'A decision within days. Welcome aboard!' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers" line1="Join the" line2="crew"
        stickers={[
          { text: 'We are hiring', variant: 'lime', pos: '-top-3 left-[20%]', rotate: '-6deg' },
          { text: 'Remote-first', pos: 'bottom-2 right-[18%]', rotate: '5deg' },
        ]}
        lead="Small, senior, remote-first. We ship websites, products and growth for ambitious brands — and we need a few more great people."
      >
        <div className="mt-9 flex justify-center gap-3" data-reveal><TalkButton href="#roles" size="lg">See open roles</TalkButton></div>
      </PageHero>

      <Marquee />

      <section className="section" aria-labelledby="perks-title">
        <div className="container">
          <SectionHead id="perks-title" label="Perks" line1="Built for" line2="deep work" />
          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => (
              <li key={p.title} className="card card-hover" style={{ transform: `rotate(${p.r})` }} data-reveal>
                <span className="icon-sticker"><Icon name={p.icon} size={26} /></span>
                <h3 className="cond mt-6 text-3xl">{p.title}</h3>
                <p className="mt-2 text-ink-3">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAMPLE CONTENT — replace roles in lib/content.ts */}
      <section id="roles" className="section scroll-mt-20 bg-paper-2" aria-labelledby="roles-title">
        <div className="container">
          <SectionHead id="roles-title" label="Open roles" line1="Find your" line2="seat" />
          <Filterable
            filters={JOB_FILTERS}
            label="Filter roles"
            toolbarClass="mt-8 flex flex-wrap gap-2 md:justify-end"
            className="mt-10 space-y-3"
          >
            {JOBS.map((j) => (
              <details key={j.title} className="group rounded-[1.75rem] bg-paper-white transition open:bg-lime" data-filter-item data-category={j.dept}>
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-4 px-6 py-6 md:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="cond flex-1 text-3xl md:text-4xl">{j.title}</span>
                  <span className="tag !bg-paper">{j.deptLabel}</span><span className="tag !bg-paper">Remote</span><span className="tag !bg-paper">{j.type}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime transition duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-8 md:px-8">
                  <p className="max-w-2xl text-lg">{j.desc}</p>
                  <ul className="check-list mt-5 space-y-2">{j.reqs.map((r) => <li key={r}>{r}</li>)}</ul>
                  <div className="mt-7"><TalkButton href="/contact?service=careers">Apply for this role</TalkButton></div>
                </div>
              </details>
            ))}
          </Filterable>
          <p className="mt-10 text-center text-lg">
            Don&apos;t see your role? <Link href="/contact?service=careers" className="font-semibold underline decoration-lime decoration-4 underline-offset-4">Send an open application</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="hire-title">
        <div className="container">
          <SectionHead id="hire-title" label="Hiring process" line1="Fast, fair" line2="& human" />
          <ol className="mt-16 grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className={`card ${i === STEPS.length - 1 ? '!bg-lime' : ''}`} data-reveal>
                <span className="cond text-7xl text-lime" style={{ WebkitTextStroke: '2px #10140C' }}>0{i + 1}</span>
                <h3 className="cond mt-3 text-3xl">{s.t}</h3>
                <p className="mt-2 text-ink-3">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
