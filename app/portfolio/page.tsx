import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { CaseStudies } from '@/components/interactive';
import { Testimonials } from '@/components/sections';
import { PROJECTS, PROJECT_FILTERS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work & Case Studies',
  description: 'Websites, WordPress builds, e-commerce stores and brand identities by Wixnova — and the results behind them.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        label="Featured projects" line1="Selected" line2="work"
        stickers={[
          { text: '150+ projects', variant: 'lime', pos: '-top-2 left-[14%]', rotate: '-5deg' },
          { text: 'Real results', pos: 'bottom-2 right-[12%]', rotate: '4deg' },
        ]}
        lead="A few projects we are proud of — and the numbers that came with them."
      />
      <section className="pb-24 md:pb-36" aria-label="Projects">
        <div className="container">
          {/* SAMPLE CONTENT — replace projects in lib/content.ts */}
          <CaseStudies projects={PROJECTS} filters={PROJECT_FILTERS} />
        </div>
      </section>
      <Testimonials />
    </>
  );
}
