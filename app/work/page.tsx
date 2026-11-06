import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { ResultsGrid } from '@/components/interactive';
import { Testimonials } from '@/components/sections';
import { RESULTS, RESULT_FILTERS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Client Results & Reviews',
  description: 'Real outcomes from founders, marketers and operators who trust Wixnova to grow their businesses every month.',
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Client results" line1="Results you" line2="can measure."
        stickers={[
          { text: '4.9 ★ from 150+ reviews', variant: 'lime', pos: '-top-2 left-[8%]', rotate: '-5deg' },
          { text: 'No vanity metrics', pos: 'bottom-2 right-[10%]', rotate: '4deg' },
        ]}
        lead="Hear directly from the founders, marketers, and operators who trust Wixnova to grow their businesses every month."
      />
      <section className="pb-24 md:pb-36" aria-label="Client results">
        <div className="container">
          <ResultsGrid results={RESULTS} filters={RESULT_FILTERS} />
          <p className="mt-16 text-center text-ink-3" data-reveal="">Want detailed case studies? <a href="https://wixnova.com/request-portfolio" className="font-semibold text-ink underline decoration-lime decoration-4 underline-offset-4">Request our portfolio</a></p>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
