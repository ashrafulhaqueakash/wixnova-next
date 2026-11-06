import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHero, Sticker, TalkButton } from '@/components/ui';
import { Comparison, FaqSection, Marquee, PricingSection, Process, StackIndustries } from '@/components/sections';
import { FAQ_SERVICES, SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Capabilities — 14 Services. One Seamless Engagement.',
  description: 'UI/UX, web development, motion, graphic & social design, branding, digital marketing, SEO & AEO, Meta lead gen, ad campaigns and dedicated teams — from one senior team.',
};

const GROUPS = [
  { label: 'Design & brand', ids: ['ui-ux-design', 'graphic-design', 'social-media-design', 'branding'] },
  { label: 'Build & motion', ids: ['web-development', 'motion-design'] },
  { label: 'Growth & marketing', ids: ['digital-marketing', 'social-media-campaign', 'seo-aeo', 'meta-lead-generation', 'ad-campaign-management'] },
  { label: 'Teams & packages', ids: ['full-growth-package', 'dedicated-team', 'project-team'] },
];
const JUMP_STYLE: ('lime' | 'line' | undefined)[] = [undefined, 'lime', 'line', undefined];
const JUMP_TILT = ['-4deg', '3deg', '-2deg', '4deg'];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Capabilities" line1="14 services." line2="One engagement."
        stickers={[
          { text: 'Senior team only', variant: 'lime', pos: '-top-4 left-[10%]', rotate: '-6deg' },
          { text: 'Onboard in 48h', pos: '-bottom-6 right-[10%]', rotate: '4deg' },
        ]}
        lead="Everything your business needs to build, compete, and grow — delivered by a dedicated senior team that operates as your own."
      >
        <nav className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5" aria-label="Jump to group" data-stagger="">
          {GROUPS.map((g, i) => (
            <Link key={g.label} href={`#${g.ids[0]}`} className="transition hover:-translate-y-0.5">
              <Sticker variant={JUMP_STYLE[i]} rotate={JUMP_TILT[i]} className="!text-base">{g.label}</Sticker>
            </Link>
          ))}
        </nav>
      </PageHero>

      <Marquee />

      {GROUPS.map((g) => (
        <section key={g.label} className="pb-16 md:pb-24" aria-label={g.label}>
          <div className="container">
            <h2 className="cond border-b-2 border-ink/10 pb-6 text-big" data-split="">{g.label}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2" data-stagger="">
              {g.ids.map((id) => {
                const s = SERVICES.find((x) => x.id === id)!;
                const n = SERVICES.indexOf(s) + 1;
                const best = s.id === 'full-growth-package';
                return (
                  <article key={s.id} id={s.id} className={`card card-hover flex scroll-mt-28 flex-col ${best ? '!bg-ink text-paper-white' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-sticker"><Icon name={s.icon} size={26} /></span>
                      <span className={`font-cond text-6xl leading-none ${best ? 'text-lime' : 'text-ink/10'}`}>{String(n).padStart(2, '0')}</span>
                    </div>
                    <p className={`mt-6 text-sm font-semibold uppercase ${best ? 'text-lime' : 'text-lime-700'}`}>{s.cat}</p>
                    <h3 className="cond mt-1 text-4xl md:text-5xl">{s.name}</h3>
                    <p className={`mt-3 ${best ? 'text-ink-4' : 'text-ink-3'}`}>{s.pill}</p>
                    <ul className="check-list mt-6 space-y-2">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                    <div className="mt-auto pt-8">
                      <TalkButton href={`/contact?service=${s.id}`} variant={best ? 'lime' : undefined}>Start with {s.name.split(' ')[0]}</TalkButton>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <Process />
      <Comparison />
      <StackIndustries />
      <PricingSection />
      <FaqSection items={FAQ_SERVICES} line1="Service" line2="questions" label="Services FAQ" doodle={false} />
    </>
  );
}
