import Link from 'next/link';
import { Icon } from './Icon';
import { SectionHead, Sticker, TalkButton, type Vars } from './ui';
import { ChatFaq, PricingTabs, ReviewStack } from './interactive';
import {
  COMPARISON, FEATURED_SERVICES, INDUSTRIES, PRINCIPLES, PROCESS, PROJECTS, RATING, REVIEWS, ROSTER, STACK,
  SUBSCRIPTIONS, VIDEO_QUOTES, type QA,
} from '@/lib/content';

/* ---------------- Crossing marquee bands (speed reacts to scroll velocity) ---------------- */
function Band({ words }: { words: string[] }) {
  const row = (k: string) => words.map((w) => (
    <span key={k + w} className="flex items-center gap-8 px-4">
      {w}<span className="inline-block h-4 w-4 rounded-full bg-current md:h-5 md:w-5" />
    </span>
  ));
  return <>{row('a')}{row('b')}</>;
}

export function Marquee() {
  return (
    <section className="marquee relative -my-6 overflow-hidden py-20 md:py-28" aria-label="What we do">
      <div className="relative z-10 -mx-10 -rotate-[4deg] bg-lime py-4 md:py-6">
        <div className="cond flex w-max text-5xl text-ink md:text-7xl" data-marquee="" data-speed="28">
          <Band words={['Design without limits', 'Build', 'Grow', 'No lock-in', 'Onboard in 48h']} />
        </div>
      </div>
      <div className="relative -mx-10 -mt-6 rotate-[3deg] bg-ink py-3 md:-mt-10 md:py-5">
        <div className="cond flex w-max text-3xl text-lime md:text-5xl" data-marquee="reverse" data-speed="34">
          <Band words={['14 services', 'One seamless engagement', 'Senior team only', 'Compounding growth']} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Client roster ---------------- */
export function Roster() {
  return (
    <section className="marquee overflow-hidden border-y-2 border-ink/10 bg-paper-white py-10" aria-label="Client roster">
      <p className="label text-center">Client roster 2026 · Trusted by category-defining teams</p>
      <div className="mt-8 flex w-max items-center gap-14 pr-14" data-marquee="" data-speed="40">
        {[...ROSTER, ...ROSTER].map((n, i) => (
          <span key={i} className="flex items-center gap-14 font-cond text-4xl uppercase text-ink/70 md:text-5xl">{n}<span className="text-lime-700">✦</span></span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services along a wire drawn with scroll ---------------- */
const WIRE = 'M1040 20 C 820 60 640 10 520 120 S 760 300 640 330 S 120 300 160 470 S 600 520 820 560 S 980 760 700 800 S 120 760 160 940 S 560 1000 800 1040 S 900 1260 560 1280 S 60 1300 -40 1380';
const OFFSETS = ['md:ml-[4%]', 'md:ml-[38%]', 'md:ml-[10%]', 'md:ml-[44%]', 'md:ml-[6%]', 'md:ml-[36%]'];
const PILL_TILT = ['-3deg', '3deg', '-2deg', '2deg', '-4deg', '3deg'];

export function ServicesPath() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="svc-title" data-draw-wrap="">
      <div className="container">
        <SectionHead id="svc-title" label="Capabilities" line1="14 services." line2="One engagement." />
      </div>
      <div className="relative mt-16 md:mt-24">
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 1400" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d={WIRE} stroke="#DCE1CC" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={WIRE} stroke="#B5E96B" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" data-draw="" />
        </svg>
        <ol className="container relative space-y-20 md:space-y-28">
          {FEATURED_SERVICES.map((s, i) => {
            const [a, ...rest] = s.name.split(' ');
            return (
              <li key={s.id} className={`relative z-10 ${OFFSETS[i]}`} data-reveal="">
                <Link href={`/services#${s.id}`} className="group inline-flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="cond text-big text-ink transition group-hover:text-lime-700">{a}</span>
                  <span className="icon-sticker transition duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon name={s.icon} size={26} /></span>
                  {rest.length > 0 && <span className="cond text-big text-ink transition group-hover:text-lime-700">{rest.join(' ')}</span>}
                </Link>
                <p className="sticker is-line mt-4 !whitespace-normal !text-base md:ml-24" style={{ '--r': PILL_TILT[i] } as Vars}>{s.pill}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="container mt-20 text-center" data-reveal=""><TalkButton href="/services">See all 14 services</TalkButton></div>
    </section>
  );
}

/* ---------------- Wixnova vs. the alternatives ---------------- */
function Cell({ v, strong }: { v: string; strong?: boolean }) {
  if (v === 'check') return <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${strong ? 'bg-ink text-lime' : 'bg-lime-200 text-ink'}`} aria-label="Yes"><Icon name="check" size={16} stroke={3} /></span>;
  if (v === 'x') return <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-paper-2 text-ink-4" aria-label="No"><Icon name="x" size={14} stroke={3} /></span>;
  return <span className="text-sm font-medium text-ink-3">{v}</span>;
}

export function Comparison() {
  return (
    <section className="section" aria-labelledby="vs-title">
      <div className="container">
        <SectionHead id="vs-title" label="Why Wixnova" line1="Wixnova vs." line2="the alternatives" />
        <p className="lead mt-6 max-w-2xl" data-reveal="">See exactly why a Wixnova subscription outperforms hiring in-house, managing freelancers, or working with a traditional agency.</p>
        <div className="no-scrollbar -mx-5 mt-12 overflow-x-auto px-5" data-reveal="">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-[2rem] bg-paper-white text-center">
            <thead>
              <tr>
                <th className="p-5 text-left text-sm font-semibold uppercase text-ink-3 md:p-6">What you need</th>
                {COMPARISON.cols.map((c, i) => (
                  <th key={c} className={`p-5 md:p-6 ${i === 0 ? 'bg-ink font-cond text-2xl uppercase text-lime' : 'text-sm font-semibold uppercase text-ink-3'}`}>{i === 0 ? `✦ ${c}` : c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((r) => (
                <tr key={r[0]} className="[&>td]:border-t-2 [&>td]:border-paper-2">
                  <td className="p-4 text-left font-medium md:px-6">{r[0]}</td>
                  {r.slice(1).map((v, i) => <td key={i} className={`p-4 ${i === 0 ? 'bg-ink' : ''}`}><Cell v={v} strong={i === 0} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-ink-3" data-reveal="">✦ Wixnova outperforms every alternative across every dimension that matters for sustainable business growth.</p>
      </div>
    </section>
  );
}

/* ---------------- Process (5 steps) ---------------- */
export function Process() {
  return (
    <section className="section bg-paper-2" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" label="The process" line1="Onboarding to growth" line2="in 5 steps." right={<TalkButton href="/pricing">See pricing</TalkButton>} />
        <p className="lead mt-6 max-w-2xl" data-reveal="">A predictable rhythm built for founders who&apos;d rather ship than manage agencies. Same flat fee, same senior team, every month.</p>
        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5" data-stagger="">
          {PROCESS.map((p, i) => {
            const last = i === PROCESS.length - 1;
            return (
              <li key={p.title} className={`card card-hover flex flex-col ${last ? '!bg-lime' : ''}`}>
                <div className="flex items-baseline justify-between">
                  <span className={`cond text-[5.5rem] leading-none ${last ? 'text-ink' : 'text-lime'}`} style={{ WebkitTextStroke: '2px #10140C' }}>0{i + 1}</span>
                  <span className="tag !bg-paper">{p.when}</span>
                </div>
                <h3 className="cond mt-4 text-3xl">{p.title}</h3>
                <p className="mt-2 font-semibold">{p.lead}</p>
                <p className="mt-2 text-sm text-ink-3">{p.desc}</p>
                <ul className="check-list mt-5 space-y-2 text-sm">{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Principles ---------------- */
export function Principles() {
  return (
    <section className="section" aria-labelledby="pr-title">
      <div className="container">
        <SectionHead id="pr-title" label="How we work" line1="Three principles," line2="zero excuses." />
        <div className="mt-16 grid gap-6 md:grid-cols-3" data-stagger="">
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className={`card card-hover ${i === 1 ? 'bg-ink text-paper-white' : ''}`}>
              <Sticker variant={i === 1 ? 'lime' : undefined} rotate={i % 2 ? '4deg' : '-4deg'} className="!text-sm">Principle 0{i + 1}</Sticker>
              <h3 className="cond mt-6 text-4xl">{p.title}</h3>
              <ul className="check-list mt-6 space-y-3">{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews: written (stack) + video quotes (marquee) ---------------- */
export function Testimonials() {
  return (
    <section className="section" aria-labelledby="rev-title">
      <div className="container">
        <SectionHead
          id="rev-title" label="Client reviews" line1="Don't take" line2="our word for it."
          right={<div className="inline-flex items-center gap-3 rounded-full bg-paper-white py-2 pl-2 pr-5"><span className="grid h-12 w-12 place-items-center rounded-full bg-lime font-cond text-xl">{RATING.score}</span><span className="text-left text-sm"><span className="block text-lime-700">★★★★★</span>{RATING.count}</span></div>}
        />
        <div className="mt-14"><ReviewStack items={REVIEWS} /></div>
      </div>
      <div className="marquee mt-16 overflow-hidden" aria-label="Video testimonials">
        <p className="label text-center">Hear it straight from clients</p>
        <ul className="mt-8 flex w-max gap-5 px-3" data-marquee="reverse" data-speed="50">
          {[...VIDEO_QUOTES, ...VIDEO_QUOTES].map((v, i) => (
            <li key={i} className="flex w-[340px] shrink-0 flex-col rounded-[1.75rem] bg-paper-white p-6 md:w-[400px]">
              <div className="flex items-center justify-between"><span className="tag !bg-lime">● Verified</span><span className="text-sm text-ink-3">▶ {v.len}</span></div>
              <p className="mt-4 font-display text-xl font-bold leading-snug">&ldquo;{v.quote}&rdquo;</p>
              <p className="mt-auto pt-5 text-sm"><b>{v.name}</b> <span className="text-ink-3">· {v.role.split('·')[1]?.trim()}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Stack + industries ---------------- */
const STICKER_STYLES: ('lime' | 'line' | undefined)[] = [undefined, 'lime', 'line', undefined, 'lime', 'line'];
const TILTS = ['-5deg', '3deg', '-2deg', '5deg', '-3deg', '2deg'];

export function StackIndustries() {
  return (
    <section className="section" aria-labelledby="stack-title">
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label" data-reveal="">Stack</p>
          <h2 id="stack-title" className="cond mt-5 text-big" data-split="">Tools we<br /><span className="text-lime-700">live in.</span></h2>
          <p className="mt-4 max-w-md text-ink-3" data-reveal="">The exact toolkit your senior squad ships on — every project, every day.</p>
          <ul className="mt-10 flex flex-wrap gap-3" data-stagger="">
            {STACK.map((t) => <li key={t} className="rounded-full border-2 border-ink/15 bg-paper-white px-4 py-2 font-medium transition hover:-rotate-3 hover:border-ink hover:bg-lime">{t}</li>)}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <p className="label" data-reveal="">Industries</p>
          <h2 className="cond mt-5 text-big" data-split="">Innovating across<br /><span className="text-lime-700">12+ industries</span></h2>
          <p className="mt-4 max-w-md text-ink-3" data-reveal="">Funded startups, SMBs and growing brands across the USA, UK, Canada and Australia.</p>
          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-5" data-stagger="">
            {INDUSTRIES.map((x, i) => (
              <li key={x}><Sticker variant={STICKER_STYLES[i % STICKER_STYLES.length]} rotate={TILTS[i % TILTS.length]} className="!text-base md:!text-xl">{x}</Sticker></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
export function PricingSection({ showProjects = false, line1 = 'Flat-monthly plans.', line2 = 'No surprises.' }: { showProjects?: boolean; line1?: string; line2?: string }) {
  return (
    <section id="pricing" className="section scroll-mt-20" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHead id="pricing-title" label="Pricing" line1={line1} line2={line2}
          right={showProjects ? undefined : <TalkButton href="/pricing">Full pricing</TalkButton>} />
        <p className="lead mt-6 max-w-2xl" data-reveal="">Three plans built on our fourteen services. Pick one, queue tickets, and wake up to ready-to-ship work — every business day.</p>
        <PricingTabs plans={SUBSCRIPTIONS} projects={PROJECTS} showProjects={showProjects} />
      </div>
    </section>
  );
}

/* ---------------- FAQ (chat style) ---------------- */
export function FaqSection({ items, line1 = 'Got any', line2 = 'questions?', label = 'FAQ', doodle = true }: {
  items: QA[]; line1?: string; line2?: string; label?: string; doodle?: boolean;
}) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label" data-reveal="">{label}</p>
            <h2 id="faq-title" className="cond mt-5 text-giant" data-split="">{line1}<br /><span className="text-lime-700">{line2}</span></h2>
            <p className="mt-5 max-w-sm text-ink-3" data-reveal="">Straight answers to the things every smart buyer wants to know. Can&apos;t find yours? We&apos;ll reply within a few hours.</p>
            {doodle && (
              <div className="relative mt-10 hidden h-64 lg:block" aria-hidden="true">
                <span className="absolute left-4 top-6 grid h-40 w-40 animate-bob place-items-center rounded-full border-2 border-ink bg-lime font-cond text-8xl shadow-sticker" data-parallax="0.15">?</span>
                <Sticker rotate="8deg" className="absolute left-40 top-0" pop>Ask us anything</Sticker>
                <Sticker variant="line" rotate="-6deg" className="absolute left-44 top-40" pop delay={0.2}>Real answers ↓</Sticker>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal=""><ChatFaq items={items} /></div>
      </div>
    </section>
  );
}
