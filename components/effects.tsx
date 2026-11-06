'use client';

/**
 * Scroll-driven effects.
 *  - <ScrollEffects/> (mounted once in the layout) handles [data-reveal] fade-ups and [data-pop] stickers.
 *  - <WordFill/>, <DrawPath/> and <CountUp/> are self-contained components.
 * Everything is visible without JS and respects prefers-reduced-motion.
 */
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 0 when the element's top reaches `start` × viewport, 1 when its bottom reaches `end` × viewport. */
function progressOf(el: Element, start = 0.85, end = 0.45) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = r.height + vh * (start - end);
  return Math.min(1, Math.max(0, (vh * start - r.top) / total));
}

/** rAF-throttled scroll/resize subscription. */
function useScrollProgress(cb: () => void, deps: unknown[] = []) {
  useEffect(() => {
    let ticking = false;
    const run = () => { cb(); ticking = false; };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    run();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add('js');
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    const pops = Array.from(document.querySelectorAll<HTMLElement>('[data-pop]:not([data-pop-at])'));
    if (prefersReduced() || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
      pops.forEach((p) => p.classList.add('on'));
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal')) : [];
        el.style.transitionDelay = `${Math.min(Math.max(siblings.indexOf(el), 0), 5) * 80}ms`;
        el.classList.add('is-visible');
        el.querySelectorAll<HTMLElement>('[data-pop]:not([data-pop-at])').forEach((p, i) => {
          timers.push(window.setTimeout(() => p.classList.add('on'), 450 + i * 180));
        });
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
    // pops that are not inside a reveal block
    pops.filter((p) => !p.closest('[data-reveal]')).forEach((p) => p.classList.add('on'));
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [pathname]);
  return null;
}

/* ---------------- Word-by-word fill ---------------- */
export type WordSegment = { text: string; hot?: boolean };

export function WordFill({ segments, className = '', children }: { segments: WordSegment[]; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1); // SSR / no-JS: fully filled
  const words = segments.flatMap((s) => s.text.split(/\s+/).filter(Boolean).map((w) => ({ w, hot: !!s.hot })));

  useEffect(() => { if (!prefersReduced()) setProgress(0); }, []);
  useScrollProgress(() => {
    if (!ref.current || prefersReduced()) return;
    const p = progressOf(ref.current, 0.8, 0.35);
    setProgress(p);
    ref.current.querySelectorAll<HTMLElement>('[data-pop-at]').forEach((s) => s.classList.toggle('on', p >= Number(s.dataset.popAt)));
  });

  const lit = Math.round(progress * words.length);
  return (
    <p ref={ref} className={className}>
      {words.map((x, i) => (
        <Fragment key={i}>
          <span style={{ color: i < lit ? (x.hot ? '#4F7A1C' : '#10140C') : 'rgba(16,20,12,.16)', transition: 'color .25s ease' }}>{x.w}</span>{' '}
        </Fragment>
      ))}
      {children}
    </p>
  );
}

/* ---------------- SVG path that draws with scroll ---------------- */
export function DrawPath({ d, className = '' }: { d: string; className?: string }) {
  const ref = useRef<SVGPathElement>(null);
  const wrapRef = useRef<SVGSVGElement>(null);
  const len = useRef(0);
  useEffect(() => {
    if (!ref.current) return;
    len.current = ref.current.getTotalLength();
    ref.current.style.strokeDasharray = String(len.current);
    ref.current.style.strokeDashoffset = prefersReduced() ? '0' : String(len.current);
  }, []);
  useScrollProgress(() => {
    if (!ref.current || !wrapRef.current || prefersReduced() || !len.current) return;
    const p = progressOf(wrapRef.current, 0.9, 0.2);
    ref.current.style.strokeDashoffset = String(len.current * (1 - p));
  });
  return (
    <svg ref={wrapRef} className={className} viewBox="0 0 1000 1400" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path d={d} stroke="#DCE1CC" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path ref={ref} d={d} stroke="#B5E96B" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ---------------- Count-up number ---------------- */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || !('IntersectionObserver' in window)) return;
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / 1400, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - k, 4))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{val}</span>;
}
