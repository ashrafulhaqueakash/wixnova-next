import type { Metadata } from 'next';
import { PageHero, Shot, Sticker, TalkButton } from '@/components/ui';
import { Filterable } from '@/components/interactive';
import { POSTS, POST_FILTERS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Insights — Design, WordPress & Growth',
  description: 'Practical notes on web design, WordPress, performance and growth from the Wixnova crew.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Insights" line1="Fresh" line2="thoughts"
        stickers={[
          { text: 'Field-tested', variant: 'lime', pos: '-top-3 left-[18%]', rotate: '-5deg' },
          { text: 'No fluff', pos: 'bottom-1 right-[16%]', rotate: '5deg' },
        ]}
      />

      {/* SAMPLE CONTENT — replace posts in lib/content.ts or load them from your CMS / WordPress REST API */}
      <section className="pb-16" aria-label="Featured article">
        <div className="container">
          <article className="group relative grid items-center gap-10 rounded-blob bg-lime p-4 md:p-6 lg:grid-cols-2" data-reveal>
            <Shot color="#10140C" tint="#CFD5C3" className="aspect-[16/11] border-2 border-ink" />
            <div className="p-4 md:p-8">
              <Sticker variant="line" rotate="-3deg" className="!text-sm">★ Featured · 10 min read</Sticker>
              <h2 className="cond mt-6 text-big"><a href="#" className="after:absolute after:inset-0">How we tripled a SaaS demo rate with one landing page</a></h2>
              <p className="mt-5 text-lg text-ink-2">The research, copy, design and testing behind a 212% lift — and how to steal it for your own site.</p>
              <div className="relative z-10 mt-8"><TalkButton href="#">Read the story</TalkButton></div>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-24 md:pb-36" aria-label="All articles">
        <div className="container">
          <h2 className="cond text-big" data-reveal>Latest notes</h2>
          <Filterable
            filters={POST_FILTERS}
            label="Filter articles"
            toolbarClass="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
            className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {POSTS.map((p) => (
              <article key={p.title} className="group relative" data-filter-item data-category={p.key}>
                <div className="relative">
                  <Shot color={p.color} tint={p.tint} className="aspect-[16/11]" />
                  <Sticker rotate="-4deg" className="absolute left-4 top-4 !text-sm">{p.category}</Sticker>
                </div>
                <p className="mt-5 text-sm font-semibold uppercase text-lime-700">{p.date} · {p.read} read</p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight">
                  <a href="#" className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-lime group-hover:decoration-4 group-hover:underline-offset-4">{p.title}</a>
                </h3>
                <p className="mt-2 text-ink-3">{p.excerpt}</p>
              </article>
            ))}
          </Filterable>
          <nav className="mt-20 flex items-center justify-center gap-2" aria-label="Pagination">
            <a href="#" className="grid h-12 w-12 place-items-center rounded-full bg-ink font-cond text-lg text-lime" aria-current="page">1</a>
            <a href="#" className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink font-cond text-lg hover:bg-lime">2</a>
            <a href="#" className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink font-cond text-lg hover:bg-lime">3</a>
          </nav>
        </div>
      </section>
    </>
  );
}
