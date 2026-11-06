'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Arrow } from './Icon';
import { TalkButton, Shot, Avatar, type Vars } from './ui';
import type { Project, QA } from '@/lib/content';

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
    const items = gridRef.current?.querySelectorAll<HTMLElement>('[data-filter-item]') ?? [];
    let shown = 0;
    items.forEach((it) => {
      const ok = active === 'all' || (it.dataset.category ?? '').split(' ').includes(active);
      it.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    setCount(shown);
  }, [active]);

  return (
    <>
      <div className={toolbarClass} role="toolbar" aria-label={label} data-reveal>
        {filters.map((f) => (
          <button key={f.id} type="button" className="chip shrink-0" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>{f.label}</button>
        ))}
        {showCount && count !== null && <span className="hidden shrink-0 px-3 text-sm text-ink-3 md:block" aria-live="polite">{count} items</span>}
      </div>
      <div ref={gridRef} className={className}>{children}</div>
    </>
  );
}

/* =========================================================
   Testimonial card stack
   ========================================================= */
export function TestimonialStack({ items }: { items: { quote: string; name: string; role: string }[] }) {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const tilt = [0, -4, 3.5, -2.5, 5];
  const go = (i: number) => setCur(((i % n) + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="relative mt-14 overflow-hidden rounded-blob bg-lime px-5 py-16 md:px-16 md:py-24" data-reveal
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    >
      <div className="squiggle-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto h-[440px] max-w-4xl sm:h-[400px] md:h-[440px]">
        {items.map((t, i) => {
          const pos = (i - cur + n) % n;
          return (
            <figure
              key={i}
              data-stack-card
              aria-hidden={pos !== 0}
              className="absolute inset-0 flex flex-col rounded-[2rem] border-2 border-ink bg-paper-white p-7 md:p-12"
              style={{
                zIndex: n - pos,
                opacity: pos > 3 ? 0 : 1,
                transform: pos === 0 ? 'rotate(0deg)' : `translateY(${Math.min(pos, 3) * -10}px) rotate(${tilt[pos % tilt.length]}deg) scale(${1 - Math.min(pos, 3) * 0.03})`,
              }}
            >
              <blockquote className="font-display text-[clamp(1.5rem,3.2vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto flex items-center gap-4 pt-8">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-lime font-cond text-xl">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="block font-semibold">{t.name}</span><span className="block text-sm text-ink-3">{t.role}</span></span>
                <span className="ml-auto hidden text-lg text-lime-700 sm:block" aria-label="5 stars">★★★★★</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="relative mt-10 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(cur - 1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-paper-white transition hover:bg-ink hover:text-lime" aria-label="Previous review">←</button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => go(i)} aria-label={`Review ${i + 1}`} aria-current={i === cur}
              className={`h-1 rounded-full transition-all ${i === cur ? 'w-12 bg-ink' : 'w-8 bg-ink/25'}`} />
          ))}
        </div>
        <button type="button" onClick={() => go(cur + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime transition hover:scale-105" aria-label="Next review">→</button>
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
    <div className="space-y-4">
      {items.map((it, i) => (
        <details
          key={it.q}
          className="chat"
          open={open === i}
          onToggle={(e) => {
            const isOpen = (e.currentTarget as HTMLDetailsElement).open;
            if (isOpen) setOpen(i); else if (open === i) setOpen(-1);
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
   Pricing — monthly / yearly toggle
   ========================================================= */
type Plan = { name: string; desc: string; monthly: string | null; yearly: string | null; featured: boolean; features: string[] };

export function Pricing({ plans }: { plans: Plan[] }) {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <div className="mt-8 flex justify-center md:-mt-6 md:justify-end" data-reveal>
        <div className="inline-flex rounded-full bg-paper-white p-1" role="group" aria-label="Billing period">
          <button type="button" className="chip !border-0" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
          <button type="button" className="chip !border-0" aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly −15%</button>
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-3">
        {plans.map((p) => (
          <article key={p.name} className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 ${p.featured ? 'bg-ink text-paper-white md:-translate-y-6' : 'bg-paper-white'}`} data-reveal>
            {p.featured && <span className="sticker is-lime absolute -top-4 right-6" style={{ '--r': '6deg' } as Vars}>Most popular</span>}
            <h3 className="cond text-4xl">{p.name}</h3>
            <p className={`mt-2 ${p.featured ? 'text-ink-4' : 'text-ink-3'}`}>{p.desc}</p>
            <p className="mt-8 flex items-baseline">
              {p.monthly ? (<><span className="cond text-7xl">${yearly ? p.yearly : p.monthly}</span><span className="ml-2 text-sm">/ month</span></>) : <span className="cond text-7xl">Let&apos;s talk</span>}
            </p>
            <p className={`h-5 text-sm font-medium ${p.featured ? 'text-lime' : 'text-lime-700'}`}>{yearly && p.monthly ? 'Billed yearly · save 15%' : ''}</p>
            <div className="mt-6">
              {p.featured ? <TalkButton variant="lime">Choose {p.name}</TalkButton> : <TalkButton>{p.monthly ? `Start with ${p.name}` : 'Talk to us'}</TalkButton>}
            </div>
            <ul className={`check-list mt-8 space-y-3 border-t-2 pt-8 ${p.featured ? 'border-paper-white/10' : 'border-ink/10'}`}>
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   Portfolio grid + case-study dialog
   ========================================================= */
export function CaseStudies({ projects, filters }: { projects: Project[]; filters: { id: string; label: string }[] }) {
  const [sel, setSel] = useState<Project | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (sel && dlg.current && !dlg.current.open) dlg.current.showModal(); }, [sel]);

  return (
    <>
      <Filterable
        filters={filters}
        showCount
        label="Filter projects"
        toolbarClass="no-scrollbar sticky top-20 z-30 mx-auto mb-14 flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full bg-paper-white p-1.5 shadow-card [&_.chip]:!border-0"
        className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <article key={p.client} className="group relative" data-filter-item data-category={p.categories.join(' ')}>
            <div className="relative">
              <Shot color={p.color} tint={p.tint} className="aspect-[4/3.3]" />
              <span className="sticker is-line absolute left-4 top-4 !text-sm" style={{ '--r': '-4deg' } as Vars}>{p.metric}</span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Avatar letter={p.client[0]} color={p.color} />
              <div className="min-w-0 flex-1">
                <h3 className="cond text-3xl leading-none">{p.client}</h3>
                <p className="mt-1 truncate text-sm font-semibold uppercase text-lime-700">{p.categoryLabel}</p>
              </div>
              <button type="button" onClick={() => setSel(p)} className="arrow-dot after:absolute after:inset-0 after:content-['']" aria-label={`View case study: ${p.client}`}>
                <Arrow />
              </button>
            </div>
          </article>
        ))}
      </Filterable>

      <dialog
        ref={dlg}
        onClose={() => setSel(null)}
        onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}
        className="w-[min(92vw,820px)] overflow-hidden rounded-[2rem] border-2 border-ink bg-paper p-0 text-ink"
        aria-labelledby="case-title"
      >
        {sel && (
          <>
            <div className="relative h-56 md:h-72">
              <Shot color={sel.color} tint={sel.tint} className="absolute inset-0 !rounded-none" />
              <button onClick={() => dlg.current?.close()} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-lime" aria-label="Close case study">✕</button>
            </div>
            <div className="p-6 md:p-10">
              <p className="label text-lime-700">{sel.categoryLabel}</p>
              <h2 id="case-title" className="cond mt-2 text-5xl">{sel.client} — {sel.title}</h2>
              <p className="lead mt-4">{sel.summary}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {sel.results.map((r) => <li key={r} className="rounded-2xl bg-lime px-4 py-3 font-semibold text-ink">{r}</li>)}
              </ul>
              <p className="mt-6 text-sm text-ink-3">Stack: <span className="font-semibold text-ink">{sel.tags.join(', ')}</span></p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TalkButton>Start a similar project</TalkButton>
                <button onClick={() => dlg.current?.close()} className="btn-line">Close</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
