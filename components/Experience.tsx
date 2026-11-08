'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { RESULTS, SERVICES, SWATCHES, type Result } from '@/lib/content';

/** Curated on-site sequence based only on existing client results. Optional custom footage: public/showreel/wixnova-reel.mp4 */
export function HeroShowreel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const reel = useRef<HTMLVideoElement>(null);
  const slides = RESULTS.slice(0, 4);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reel.current?.pause();
  }, [hasVideo]);
  useEffect(() => {
    if (paused || hasVideo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % slides.length), 4100);
    return () => window.clearInterval(id);
  }, [paused, hasVideo, slides.length]);
  const selected = slides[active];
  return (
    <div className="experience-showreel relative mx-auto w-full max-w-6xl" data-scene-reveal="">
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink p-2 shadow-card sm:p-3">
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-[#171f12] text-paper-white sm:min-h-[440px] lg:min-h-[540px]">
          <video ref={reel} className={`absolute inset-0 h-full w-full object-cover ${hasVideo ? 'block' : 'hidden'}`} muted loop playsInline autoPlay preload="none" aria-hidden="true" onCanPlay={() => setHasVideo(true)} onError={() => setHasVideo(false)}>
            <source src="/showreel/wixnova-reel.mp4" type="video/mp4" />
          </video>
          <div className={`absolute inset-0 transition-opacity duration-700 ${hasVideo ? 'opacity-0' : 'opacity-100'}`}>
            {slides.map((slide, index) => (
              <div key={`${slide.client}-${index}`} className={`showreel-slide absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-700 sm:p-10 lg:p-14 ${index === active ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'}`} style={{ background: `radial-gradient(circle at 80% 45%, ${SWATCHES[index].c}55, transparent 45%), #171f12` }} aria-hidden={index !== active}>
                <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[.18em] text-lime"><span>Selected impact / 0{index + 1}</span><span className="hidden sm:inline">Design · Build · Grow</span></div>
                <div className="relative z-10 max-w-4xl">
                  <p className="mb-5 text-base font-semibold text-lime md:text-xl">{slide.service}</p>
                  <p className="cond max-w-4xl text-[clamp(3.5rem,10vw,9.5rem)] leading-[.9] tracking-tight">{slide.client}</p>
                  <p className="mt-5 max-w-2xl font-display text-[clamp(1.15rem,3vw,2.4rem)] font-bold leading-tight">{slide.headline}</p>
                </div>
                <div className="flex items-end justify-between gap-4"><span className="rounded-full border border-lime/40 px-4 py-2 text-sm font-bold text-lime">{slide.metric}</span><span className="font-cond text-[clamp(4rem,13vw,11rem)] leading-none text-lime/20">0{index + 1}</span></div>
                <span className="showreel-orbit pointer-events-none absolute -right-16 top-[12%] h-[min(52vw,350px)] w-[min(52vw,350px)] rounded-full border-[32px] border-lime/15" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 rounded-2xl bg-ink/90 px-4 py-3 text-paper-white backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-5">
            <div className="flex min-w-0 items-center gap-3"><span className="h-2 w-2 shrink-0 rounded-full bg-lime" /><span className="truncate text-xs font-semibold uppercase tracking-wide sm:text-sm">{hasVideo ? 'Wixnova / studio reel' : 'Wixnova / client outcomes'}</span></div>
            <div className="flex items-center gap-2">
              {!hasVideo && <span className="hidden text-xs tabular-nums text-paper-white/60 sm:inline">0{active + 1} / 0{slides.length}</span>}
              <button type="button" onClick={() => { if (hasVideo && reel.current) { if (reel.current.paused) reel.current.play().catch(() => {}); else reel.current.pause(); } else setPaused((v) => !v); }} className="min-h-10 rounded-full border border-paper-white/30 px-4 text-xs font-bold transition hover:bg-lime hover:text-ink" aria-label={hasVideo ? 'Toggle showreel playback' : paused ? 'Play showcase' : 'Pause showcase'}>{hasVideo ? 'Play / Pause' : paused ? 'Play' : 'Pause'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4"><p className="text-sm font-medium text-ink-3">Selected client outcomes. Explore the stories behind the work.</p><Link href="/work" className="font-semibold underline decoration-lime decoration-4 underline-offset-4">Explore results ↗</Link></div>
    </div>
  );
}

/** Interactive, keyboard-usable showcase driven by the real service catalog. */
export function ServicesPreview() {
  const items = SERVICES.filter((s) => ['web-development', 'branding', 'ui-ux-design', 'digital-marketing', 'motion-design'].includes(s.id)).slice(0, 5);
  const [active, setActive] = useState(0);
  const item = items[active];
  if (!item) return null;
  return (
    <section className="section bg-ink text-paper-white" aria-labelledby="preview-title" data-scene="dark">
      <div className="container grid gap-10 lg:grid-cols-[.9fr,1.1fr] lg:items-center lg:gap-16">
        <div><p className="label !text-lime" data-reveal="">Explore our capabilities</p><h2 id="preview-title" className="cond mt-5 text-giant" data-split="">Work that moves businesses.</h2><p className="mt-6 max-w-lg text-lg text-paper-white/70" data-reveal="">Select a capability to see how our team approaches it. One partner, connected execution.</p>
          <div className="mt-9 space-y-1" role="group" aria-label="Choose a service preview">
            {items.map((s, i) => <button type="button" key={s.id} onClick={() => setActive(i)} aria-pressed={active === i} className={`service-choice flex w-full items-center justify-between gap-4 border-b border-paper-white/20 py-3 text-left font-display text-lg font-bold transition sm:text-xl ${active === i ? 'text-lime' : 'text-paper-white/65 hover:text-paper-white'}`}><span><span className="mr-4 text-xs opacity-60">0{i + 1}</span>{s.name}</span><span aria-hidden="true">{active === i ? '↗' : '→'}</span></button>)}
          </div>
        </div>
        <div className="service-preview-stage relative isolate flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2rem] border border-paper-white/20 bg-lime p-7 text-ink sm:min-h-[520px] sm:p-10" key={item.id} aria-live="polite" data-scene-reveal="">
          <div className="relative z-10 flex justify-between gap-3"><span className="rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-widest">{item.cat}</span><span className="font-cond text-2xl">W / 0{active + 1}</span></div>
          <div className="service-preview-ring pointer-events-none absolute -right-[18%] top-[10%] h-80 w-80 rounded-full border-[42px] border-ink/10 sm:h-[480px] sm:w-[480px]" />
          <div className="relative z-10"><p className="cond max-w-xl text-[clamp(3.4rem,7vw,7rem)] leading-[.92]">{item.name}</p><p className="mt-4 max-w-md text-lg font-medium">{item.pill}</p><div className="mt-7 flex flex-wrap gap-2">{item.bullets.slice(0, 3).map((bullet) => <span key={bullet} className="rounded-full border border-ink/25 px-3 py-2 text-xs font-semibold">{bullet}</span>)}</div></div>
          <Link href={`/services#${item.id}`} className="relative z-10 mt-8 self-start rounded-full bg-ink px-5 py-3 text-sm font-bold text-lime transition hover:scale-105">Explore this service ↗</Link>
        </div>
      </div>
    </section>
  );
}

/** Strong typographic, scroll-controlled transition; no artificial client imagery. */
export function BrandInterlude() {
  return <section className="brand-interlude relative isolate overflow-hidden bg-lime py-28 text-ink md:py-44" data-scene="lime" aria-label="Wixnova brand promise"><div className="container relative z-10"><p className="label" data-reveal="">Our belief</p><p className="brand-manifesto cond mt-7 max-w-7xl text-[clamp(4rem,13vw,13rem)] leading-[.86]" data-kinetic="">ONE BRAND.<span className="block">ALL <span className="manifesto-outline">SOLUTIONS.</span></span></p><p className="mt-9 max-w-xl font-display text-xl font-semibold" data-reveal="">One coordinated team across design, technology and growth.</p></div><span className="brand-interlude-disc pointer-events-none absolute -right-28 -top-32 h-[500px] w-[500px] rounded-full border-[90px] border-ink/10" aria-hidden="true" /></section>;
}

/** Adds purposeful art direction to the existing verified client result data. */
export function CaseStudyFeature({ result, index }: { result: Result; index: number }) {
  return <article className={`case-feature relative overflow-hidden rounded-[2rem] p-7 sm:p-12 lg:p-16 ${index % 2 ? 'bg-lime text-ink' : 'bg-ink text-paper-white'}`} data-case-feature="">
    <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr,.8fr] lg:items-end"><div><p className={`text-sm font-bold uppercase tracking-widest ${index % 2 ? 'text-ink/60' : 'text-lime'}`}>0{index + 1} / Client outcome</p><h2 className="cond mt-7 text-[clamp(3.6rem,9vw,9rem)] leading-[.9]" data-split="">{result.client}</h2><p className="mt-6 max-w-xl text-lg font-medium">{result.headline}</p></div><div className="case-feature-panel relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-current/20 bg-paper-white p-7 text-ink sm:min-h-[350px]"><div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-widest">{result.service}</span><span className="font-cond text-3xl">W.</span></div><strong className="relative z-10 font-cond text-[clamp(3.5rem,6vw,7rem)] leading-none">{result.metric}</strong><p className="relative z-10 max-w-xs text-sm font-semibold">Result highlighted in the Wixnova client results collection.</p><div className="case-feature-disc pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full border-[55px] border-lime" /></div></div>
    <div className="relative z-10 mt-10 flex items-center justify-between border-t border-current/20 pt-5 text-sm font-semibold"><span>{result.service}</span><Link href="/work" className="underline underline-offset-4">All client results ↗</Link></div>
  </article>;
}

/** Fast, accessible transition layer for Next.js internal links. */
export function RouteTransitions() {
  const pathname = usePathname();
  const router = useRouter();
  const cover = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!cover.current) return;
    const el = cover.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { autoAlpha: 0 }); busy.current = false; return; }
    gsap.fromTo(el, { autoAlpha: 1, yPercent: 0 }, { yPercent: -105, duration: .72, ease: 'power3.inOut', onComplete: () => { gsap.set(el, { autoAlpha: 0, yPercent: 105 }); busy.current = false; } });
  }, [pathname]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || busy.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = event.target as Element | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('data-no-transition')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || url.protocol !== window.location.protocol || url.hash && url.pathname === window.location.pathname) return;
      event.preventDefault(); busy.current = true;
      const el = cover.current;
      if (!el) { busy.current = false; router.push(url.pathname + url.search + url.hash); return; }
      gsap.killTweensOf(el);
      gsap.fromTo(el, { autoAlpha: 1, yPercent: 105 }, { yPercent: 0, duration: .55, ease: 'power3.inOut', onComplete: () => {
        router.push(url.pathname + url.search + url.hash);
        timer.current = window.setTimeout(() => { if (busy.current) { gsap.set(el, { autoAlpha: 0, yPercent: 105 }); busy.current = false; } }, 2500);
      } });
    };
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('click', onClick); if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [router]);
  return <div ref={cover} className="route-transition pointer-events-none fixed inset-0 z-[90] flex translate-y-full items-center justify-center bg-lime text-ink" aria-hidden="true"><span className="cond text-[clamp(5rem,20vw,18rem)]">W.</span></div>;
}
