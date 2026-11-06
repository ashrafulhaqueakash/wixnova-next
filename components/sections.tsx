import Link from 'next/link';
import { Icon } from './Icon';
import { SectionHead, Sticker, TalkButton, type Vars } from './ui';
import { DrawPath } from './effects';
import { ChatFaq, Pricing, TestimonialStack } from './interactive';
import { INDUSTRIES, PLANS, PROCESS, SERVICES, TECH, TESTIMONIALS, type QA } from '@/lib/content';

/* ---------------- Crossing marquee bands ---------------- */
function Band({ words }: { words: string[] }) {
  const row = words.map((w) => (
    <span key={w} className="flex items-center gap-8 px-4">
      {w}<span className="inline-block h-4 w-4 rounded-full bg-current md:h-5 md:w-5" />
    </span>
  ));
  return <>{row}{row}</>;
}

export function Marquee() {
  return (
    <section className="marquee relative -my-6 overflow-hidden py-20 md:py-28" aria-label="What we do">
      <div className="relative z-10 -mx-10 -rotate-[4deg] bg-lime py-4 md:py-6">
        <div className="cond flex w-max animate-marquee text-5xl text-ink md:text-7xl">
          <Band words={['Design it', 'Build it', 'Grow it', 'No lock-in', 'Ship weekly']} />
        </div>
      </div>
      <div className="relative -mx-10 -mt-6 rotate-[3deg] bg-ink py-3 md:-mt-10 md:py-5">
        <div className="cond flex w-max animate-marquee-r text-3xl text-lime md:text-5xl">
          <Band words={['Websites that actually sell', 'WordPress done right', 'Fast by default', 'Good looks included']} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services along a drawn wire ---------------- */
const WIRE = 'M1040 20 C 820 60 640 10 520 120 S 760 300 640 330 S 120 300 160 470 S 600 520 820 560 S 980 760 700 800 S 120 760 160 940 S 560 1000 800 1040 S 900 1260 560 1280 S 60 1300 -40 1380';
const OFFSETS = ['md:ml-[4%]', 'md:ml-[38%]', 'md:ml-[10%]', 'md:ml-[44%]', 'md:ml-[6%]', 'md:ml-[36%]'];
const PILL_TILT = ['-3deg', '3deg', '-2deg', '2deg', '-4deg', '3deg'];

export function ServicesPath() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="svc-title">
      <div className="container">
        <SectionHead id="svc-title" label="Our services" line1="This is" line2="our thing" />
      </div>
      <div className="relative mt-16 md:mt-24">
        <DrawPath d={WIRE} className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" />
        <ol className="container relative space-y-20 md:space-y-28">
          {SERVICES.map((s, i) => (
            <li key={s.id} className={`relative z-10 ${OFFSETS[i]}`} data-reveal>
              <Link href={`/services#${s.id}`} className="group inline-flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="cond text-big text-ink transition group-hover:text-lime-700">{s.short[0]}</span>
                <span className="icon-sticker transition duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon name={s.icon} size={26} /></span>
                <span className="cond text-big text-ink transition group-hover:text-lime-700">{s.short[1]}</span>
              </Link>
              <p className="sticker is-line mt-4 !whitespace-normal !text-base md:ml-24" style={{ '--r': PILL_TILT[i] } as Vars}>{s.pill}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="container mt-20 text-center" data-reveal><TalkButton href="/services">Explore all services</TalkButton></div>
    </section>
  );
}

/* ---------------- Process ---------------- */
export function Process() {
  return (
    <section className="section bg-paper-2" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" label="How we work" line1="Four steps." line2="Zero drama." />
        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => {
            const last = i === PROCESS.length - 1;
            return (
              <li key={p.title} className={`card card-hover ${last ? '!bg-lime' : ''}`} data-reveal>
                <span className={`cond block text-[7rem] leading-none ${last ? 'text-ink' : 'text-lime'}`} style={{ WebkitTextStroke: '2px #10140C' }}>0{i + 1}</span>
                <h3 className="cond mt-4 text-3xl">{p.title}</h3>
                <p className={`mt-3 ${last ? 'text-ink-2' : 'text-ink-3'}`}>{p.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  return (
    <section className="section" aria-labelledby="rev-title">
      <div className="container">
        <SectionHead id="rev-title" label="Testimonials" line1="Apparently," line2="they like us" />
        {/* SAMPLE CONTENT — replace in lib/content.ts */}
        <TestimonialStack items={TESTIMONIALS} />
      </div>
    </section>
  );
}

/* ---------------- Industries + tech stack ---------------- */
const STICKER_STYLES: ('lime' | 'line' | undefined)[] = [undefined, 'lime', undefined, 'line', 'lime', undefined, 'lime', 'line', undefined, 'lime', undefined, 'line'];
const TILTS = ['-5deg', '3deg', '-2deg', '5deg', '-3deg', '2deg'];

export function Industries() {
  return (
    <section className="section" aria-labelledby="ind-title">
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="label">Industries</p>
          <h2 id="ind-title" className="cond mt-5 text-big">Fluent in<br /><span className="text-lime-700">12+ industries</span></h2>
          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-5">
            {INDUSTRIES.map((x, i) => (
              <li key={x}><Sticker variant={STICKER_STYLES[i % STICKER_STYLES.length]} rotate={TILTS[i % TILTS.length]} className="!text-base md:!text-xl">{x}</Sticker></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6" data-reveal>
          <p className="label">Tech stack</p>
          <h2 className="cond mt-5 text-big">Right tool,<br /><span className="text-lime-700">every time</span></h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {TECH.map((t) => (
              <li key={t} className="rounded-full border-2 border-ink/15 bg-paper-white px-4 py-2 font-medium transition hover:-rotate-3 hover:border-ink hover:bg-lime">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
export function PricingSection() {
  return (
    <section id="pricing" className="section scroll-mt-20" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHead id="pricing-title" label="Pricing" line1="One flat fee." line2="Zero surprises." />
        {/* SAMPLE PRICES — replace in lib/content.ts */}
        <Pricing plans={PLANS} />
        <p className="mt-10 text-center text-ink-3">Unlimited revisions · full code ownership · 14-day satisfaction guarantee</p>
      </div>
    </section>
  );
}

/* ---------------- FAQ (chat style) ---------------- */
export function FaqSection({ items, line1 = 'Things you', line2 = 'might ask', label = 'Frequently asked questions', doodle = true }: {
  items: QA[]; line1?: string; line2?: string; label?: string; doodle?: boolean;
}) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <div className="lg:sticky lg:top-28">
            <p className="label">{label}</p>
            <h2 id="faq-title" className="cond mt-5 text-giant">{line1}<br /><span className="text-lime-700">{line2}</span></h2>
            {doodle && (
              <div className="relative mt-12 hidden h-64 lg:block" aria-hidden="true">
                <span className="absolute left-4 top-6 grid h-40 w-40 animate-bob place-items-center rounded-full border-2 border-ink bg-lime font-cond text-8xl shadow-sticker">?</span>
                <Sticker rotate="8deg" className="absolute left-40 top-0">No dumb questions</Sticker>
                <Sticker variant="line" rotate="-6deg" className="absolute left-44 top-40">Real answers ↓</Sticker>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal><ChatFaq items={items} /></div>
      </div>
    </section>
  );
}
