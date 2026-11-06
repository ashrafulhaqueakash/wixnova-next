'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Arrow } from './Icon';
import { Avatar, Shot, TalkButton, type Vars } from './ui';
import { initials, REVIEWS, SWATCHES, VIDEO_QUOTES, type Plan, type Project, type QA, type Result, type Review } from '@/lib/content';

/* =========================================================
   Filterable grid — children carry data-filter-item + data-category="a b"
   ========================================================= */
export function Filterable({
  filters, children, className = '', toolbarClass = '', showCount, label = 'Filter',
}: { filters: { id: string; label: string }[]; children: ReactNode; className?: string; toolbarClass?: string; showCount?: boolean; label?: string }) {
  const [active, setActive] = useState('all');
  const [count, setCount] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = Array.from(gridRef.current?.querySelectorAll<HTMLElement>('[data-filter-item]') ?? []);
    let shown = 0;
    items.forEach((it) => {
      const ok = active === 'all' || (it.dataset.category ?? '').split(' ').includes(active);
      it.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    setCount(shown);
    // let ScrollTrigger re-measure after layout change
    window.dispatchEvent(new Event('resize'));
  }, [active]);

  return (
    <div data-filter-group="">
      <div className={toolbarClass} role="toolbar" aria-label={label} data-reveal="">
        {filters.map((f) => (
          <button key={f.id} type="button" className="chip shrink-0" aria-pressed={active === f.id} onClick={() => setActive(f.id)} data-filter={f.id}>{f.label}</button>
        ))}
        {showCount && count !== null && <span className="hidden shrink-0 px-3 text-sm text-ink-3 md:block" aria-live="polite">{count} results</span>}
      </div>
      <div ref={gridRef} className={className}>{children}</div>
    </div>
  );
}

/* =========================================================
   Review card stack (written client reviews)
   ========================================================= */
export function ReviewStack({ items }: { items: Review[] }) {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const tilt = [0, -4, 3.5, -2.5, 5, -3];
  const go = (i: number) => setCur(((i % n) + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="relative overflow-hidden rounded-blob bg-lime px-5 py-16 md:px-16 md:py-24"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} data-stack="" data-reveal=""
    >
      <div className="squiggle-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto h-[520px] max-w-4xl sm:h-[440px] md:h-[460px]">
        {items.map((t, i) => {
          const pos = (i - cur + n) % n;
          return (
            <figure
              key={t.name}
              data-stack-card=""
              aria-hidden={pos !== 0}
              className="absolute inset-0 flex flex-col rounded-[2rem] border-2 border-ink bg-paper-white p-7 md:p-12"
              style={{
                zIndex: n - pos,
                opacity: pos > 3 ? 0 : 1,
                transform: pos === 0 ? 'rotate(0deg)' : `translateY(${Math.min(pos, 3) * -10}px) rotate(${tilt[pos % tilt.length]}deg) scale(${1 - Math.min(pos, 3) * 0.03})`,
              }}
            >
              <span className="tag self-start !bg-lime-200">{t.service}</span>
              <blockquote className="mt-5 font-display text-[clamp(1.25rem,2.4vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto flex items-center gap-4 pt-6">
                <Avatar label={initials(t.name)} />
                <span><span className="block font-semibold">{t.name}</span><span className="block text-sm text-ink-3">{t.role}</span></span>
                <span className="ml-auto hidden text-lg text-lime-700 sm:block" aria-label="5 stars">★★★★★</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="relative mt-10 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(cur - 1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-paper-white transition hover:bg-ink hover:text-lime" aria-label="Previous review" data-stack-prev="">←</button>
        <div className="flex items-center gap-2">
          {items.map((r, i) => (
            <button key={r.name} type="button" onClick={() => go(i)} aria-label={`Review ${i + 1}`} aria-current={i === cur} data-stack-dot={i}
              className={`h-1 rounded-full transition-all ${i === cur ? 'w-12 bg-ink' : 'w-8 bg-ink/25'}`} />
          ))}
        </div>
        <button type="button" onClick={() => go(cur + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime transition hover:scale-105" aria-label="Next review" data-stack-next="">→</button>
      </div>
    </div>
  );
}

/* =========================================================
   FAQ — chat bubbles, one open at a time
   ========================================================= */
export function ChatFaq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-4" data-faq="">
      {items.map((it, i) => (
        <details
          key={it.q}
          className="chat"
          open={open === i}
          onToggle={(e) => {
            const isOpen = (e.currentTarget as HTMLDetailsElement).open;
            if (isOpen) setOpen(i); else if (open === i) setOpen(-1);
            window.dispatchEvent(new Event('resize'));
          }}
        >
          <summary>{it.q}</summary>
          <div className="answer"><p className="bubble">{it.a}</p><span className="avatar" aria-hidden="true">W</span></div>
        </details>
      ))}
    </div>
  );
}

/* =========================================================
   Pricing — subscriptions / one-time projects tabs
   ========================================================= */
export function PricingTabs({ plans, projects, showProjects = true }: { plans: Plan[]; projects: Project[]; showProjects?: boolean }) {
  const [tab, setTab] = useState<'subs' | 'projects'>('subs');
  useEffect(() => { window.dispatchEvent(new Event('resize')); }, [tab]);
  return (
    <div data-pricing-tabs="">
      {showProjects && (
        <div className="mt-10 flex justify-center md:justify-end" data-reveal="">
          <div className="inline-flex rounded-full bg-paper-white p-1" role="tablist" aria-label="Pricing type">
            <button type="button" role="tab" className="chip !border-0" aria-pressed={tab === 'subs'} aria-selected={tab === 'subs'} onClick={() => setTab('subs')} data-tab="subs">Monthly plans</button>
            <button type="button" role="tab" className="chip !border-0" aria-pressed={tab === 'projects'} aria-selected={tab === 'projects'} onClick={() => setTab('projects')} data-tab="projects">One-time projects</button>
          </div>
        </div>
      )}

      <div className={`mt-16 grid gap-6 md:mt-20 lg:grid-cols-3 ${tab === 'subs' ? '' : 'hidden'}`} data-tab-panel="subs" data-stagger="">
        {plans.map((p) => (
          <article key={p.name} className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 ${p.featured ? 'bg-ink text-paper-white lg:-translate-y-6' : 'bg-paper-white'}`}>
            {p.featured && <span className="sticker is-lime absolute -top-4 right-6" style={{ '--r': '6deg' } as Vars}>Most popular</span>}
            <p className={`text-sm font-semibold uppercase ${p.featured ? 'text-lime' : 'text-lime-700'}`}>{p.label}</p>
            <h3 className="cond mt-2 text-4xl">{p.name}</h3>
            <p className="mt-6 flex items-baseline gap-2"><span className="cond text-7xl">{p.price}</span><span className="text-sm">{p.per}</span></p>
            <p className={`mt-4 ${p.featured ? 'text-ink-4' : 'text-ink-3'}`}>{p.desc}</p>
            <div className="mt-7">{p.featured ? <TalkButton variant="lime">{p.cta}</TalkButton> : <TalkButton>{p.cta}</TalkButton>}</div>
            <ul className={`check-list mt-8 space-y-3 border-t-2 pt-8 ${p.featured ? 'border-paper-white/10' : 'border-ink/10'}`}>
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <p className={`mt-auto pt-8 text-sm ${p.featured ? 'text-ink-4' : 'text-ink-3'}`}><b className={p.featured ? 'text-paper-white' : 'text-ink'}>Best for:</b> {p.bestFor}</p>
          </article>
        ))}
      </div>

      {showProjects && (
        <div className={`mt-16 grid gap-6 md:mt-20 md:grid-cols-2 ${tab === 'projects' ? '' : 'hidden'}`} data-tab-panel="projects">
          {projects.map((p, i) => (
            <article key={p.name} className="flex flex-col rounded-[2rem] bg-paper-white p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-sm font-semibold uppercase text-lime-700">One-time project · {p.time}</p><h3 className="cond mt-2 text-4xl">{p.name}</h3></div>
                <span className="sticker !text-lg" style={{ '--r': i % 2 ? '4deg' : '-4deg' } as Vars}>{p.price}</span>
              </div>
              <p className="mt-4 text-ink-3">{p.desc}</p>
              <ul className="check-list mt-6 grid gap-2 sm:grid-cols-2">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <p className="text-sm text-ink-3"><b className="text-ink">Best for:</b> {p.bestFor}</p>
                <TalkButton>Scope this project</TalkButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Client results grid + review dialog
   ========================================================= */
export function ResultsGrid({ results, filters }: { results: Result[]; filters: { id: string; label: string }[] }) {
  const [sel, setSel] = useState<Result | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (sel && dlg.current && !dlg.current.open) dlg.current.showModal(); }, [sel]);
  const quoteFor = (r: Result) => (r.reviewIndex !== undefined ? REVIEWS[r.reviewIndex].quote : r.videoIndex !== undefined ? VIDEO_QUOTES[r.videoIndex].quote : '');

  return (
    <>
      <Filterable
        filters={filters}
        showCount
        label="Filter results"
        toolbarClass="no-scrollbar sticky top-20 z-30 mx-auto mb-14 flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full bg-paper-white p-1.5 shadow-card [&_.chip]:!border-0"
        className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
      >
        {results.map((r, i) => {
          const sw = SWATCHES[i % SWATCHES.length];
          return (
            <article key={r.client} className="group relative" data-filter-item="" data-category={r.cats.join(' ')} data-reveal="">
              <div className="relative">
                <Shot color={sw.c} tint={sw.t} className="aspect-[4/3.3]" />
                <span className="sticker is-line absolute left-4 top-4 !text-sm" style={{ '--r': '-4deg' } as Vars}>{r.metric}</span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <Avatar label={initials(r.client)} color={sw.c} />
                <div className="min-w-0 flex-1">
                  <h3 className="cond text-3xl leading-none">{r.client}</h3>
                  <p className="mt-1 truncate text-sm font-semibold uppercase text-lime-700">{r.service}</p>
                </div>
                <button type="button" onClick={() => setSel(r)} className="arrow-dot after:absolute after:inset-0 after:content-['']" aria-label={`Read ${r.client} story`}>
                  <Arrow />
                </button>
              </div>
              <p className="mt-3 text-ink-3">{r.headline}</p>
            </article>
          );
        })}
      </Filterable>

      <dialog
        ref={dlg}
        onClose={() => setSel(null)}
        onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}
        className="w-[min(92vw,760px)] overflow-hidden rounded-[2rem] border-2 border-ink bg-paper p-0 text-ink"
        aria-labelledby="result-title"
      >
        {sel && (
          <div className="p-6 md:p-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label text-lime-700">{sel.service}</p>
                <h2 id="result-title" className="cond mt-2 text-5xl">{sel.client}</h2>
              </div>
              <button onClick={() => dlg.current?.close()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-lime" aria-label="Close">✕</button>
            </div>
            <p className="mt-6 inline-block rounded-2xl bg-lime px-4 py-3 font-cond text-3xl">{sel.metric}</p>
            <blockquote className="mt-8 font-display text-2xl font-bold leading-snug tracking-tight">&ldquo;{quoteFor(sel)}&rdquo;</blockquote>
            <p className="mt-4 text-ink-3">— {sel.person}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <TalkButton>Get results like this</TalkButton>
              <button onClick={() => dlg.current?.close()} className="btn-line">Close</button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
