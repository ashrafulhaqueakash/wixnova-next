import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHero, Shot, Sticker, TalkButton } from '@/components/ui';
import { FaqSection, Industries, Marquee, PricingSection, Process } from '@/components/sections';
import { FAQ_SERVICES, SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services — Web, WordPress, UI/UX & Growth',
  description: 'Web development, WordPress, UI/UX, performance, brand identity and AI-powered marketing from one senior, full-stack team.',
};

const JUMP_STYLE: ('lime' | 'line' | undefined)[] = [undefined, 'lime', 'line', undefined, 'lime', 'line'];
const JUMP_TILT = ['-4deg', '3deg', '-2deg', '4deg', '-3deg', '2deg'];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our services" line1="This is" line2="our thing"
        stickers={[
          { text: '12+ core services', variant: 'lime', pos: '-top-4 left-[12%]', rotate: '-6deg' },
          { text: 'One senior team', pos: '-bottom-6 right-[10%]', rotate: '4deg' },
        ]}
        lead="Strategy, design, engineering and growth under one roof — so your brand, website and campaigns finally work as one system."
      >
        <nav className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5" aria-label="Jump to service" data-reveal>
          {SERVICES.map((s, i) => (
            <Link key={s.id} href={`#${s.id}`} className="hover:-translate-y-0.5">
              <Sticker variant={JUMP_STYLE[i]} rotate={JUMP_TILT[i]} className="!text-base">{s.name}</Sticker>
            </Link>
          ))}
        </nav>
      </PageHero>

      <Marquee />

      <section className="pb-12" aria-label="Services in detail">
        <div className="container divide-y-2 divide-ink/10">
          {SERVICES.map((s, i) => (
            <article key={s.id} id={s.id} className={`grid scroll-mt-24 items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-20 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="group relative" data-reveal>
                {/* SAMPLE visual — replace with real project imagery */}
                <Shot color={s.color} tint={s.tint} className="aspect-[5/4] border-2 border-ink" />
                <Sticker rotate={i % 2 ? '5deg' : '-5deg'} className={`absolute -top-4 ${i % 2 ? 'left-6' : 'right-6'}`}>0{i + 1} / 0{SERVICES.length}</Sticker>
              </div>
              <div data-reveal>
                <span className="icon-sticker"><Icon name={s.icon} size={26} /></span>
                <p className="label mt-8">{s.name}</p>
                <h2 className="cond mt-3 text-big">{s.head}</h2>
                <p className="lead mt-5">{s.desc}</p>
                <ul className="check-list mt-8 grid gap-3 sm:grid-cols-2">{s.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <TalkButton href={`/contact?service=${s.id}`}>Start a project</TalkButton>
                  <Link href="/portfolio" className="btn-line">Related work</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Process />
      <Industries />
      <PricingSection />
      <FaqSection items={FAQ_SERVICES} line1="Service" line2="questions" label="Services FAQ" doodle={false} />
    </>
  );
}
