/**
 * Wixnova animation engine — GSAP 3 (ScrollTrigger + SplitText), driven by data-attributes.
 * Shared by the Next.js app (components/Animations.tsx) and the static preview build.
 *
 *  data-split            headline: chars rise out of masked lines (data-split="load" plays on page load)
 *  data-reveal           fade + rise when scrolled into view (batched)
 *  data-stagger          children cascade in with a little tilt
 *  data-pop              sticker springs in (elastic)
 *  data-wordfill         words fill with ink as you scroll (<b> words fill lime-green); child [data-pop-at="0.6"] stickers pop at that progress
 *  data-draw-wrap / data-draw   SVG path draws itself with scroll
 *  data-marquee(="reverse")     infinite band that speeds up / flips direction with scroll velocity
 *  data-parallax="0.2"   vertical parallax (positive = slower than scroll)
 *  data-hscroll / data-hscroll-track   pinned horizontal scroll (desktop)
 *  data-count="150"      count-up number
 *  data-footer-logo      wordmark rises as the footer arrives
 *  data-progress         page scroll progress bar (scaleX)
 *  .btn-talk / [data-magnetic]  magnetic hover (fine pointers only)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type GSAP = any;

export function initAnimations(gsap: GSAP, ScrollTrigger: GSAP, SplitText: GSAP, root: ParentNode = document): () => void {
  const w = window as any;
  w.__animReady = true;
  const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<T>(sel));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = (els: Element[]) => els.length && gsap.set(els, { autoAlpha: 1, clearProps: 'transform' });

  if (reduced) {
    show($$('[data-reveal], [data-split], [data-pop], [data-stagger] > *'));
    $$('[data-count]').forEach((el) => { el.textContent = el.getAttribute('data-count') || el.textContent; });
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  const cleanups: (() => void)[] = [];
  const splits: any[] = [];

  const ctx = gsap.context(() => {
    // Pins first, so every trigger below is measured with the pin spacing in place.
    /* ---------------- Desktop-only: pinned horizontal scroll + magnetic buttons ---------------- */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      $$('[data-hscroll]').forEach((section) => {
        const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
        if (!track) return;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 },
        });
      });
    });
    mm.add('(hover: hover) and (pointer: fine)', () => {
      const offs: (() => void)[] = [];
      $$('.btn-talk, [data-magnetic]').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        const move = (e: Event) => {
          const m = e as MouseEvent; const r = btn.getBoundingClientRect();
          xTo((m.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((m.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => { xTo(0); yTo(0); };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', leave);
        offs.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave); });
      });
      return () => offs.forEach((f) => f());
    });
    cleanups.push(() => mm.revert());

    /* ---------------- Headlines: chars out of masked lines ---------------- */
    $$('[data-split]').forEach((el) => {
      const onLoad = el.getAttribute('data-split') === 'load';
      const split = SplitText.create(el, {
        type: 'words,lines,chars',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self: any) {
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(self.chars, {
            yPercent: 115,
            rotate: 6,
            duration: onLoad ? 1.1 : 0.95,
            ease: 'power4.out',
            stagger: { each: onLoad ? 0.022 : 0.016 },
            delay: onLoad ? 0.15 + Number(el.getAttribute('data-delay') || 0) : 0,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
          });
        },
      });
      splits.push(split);
    });

    /* ---------------- Generic reveal (batched) ---------------- */
    const reveals = $$('[data-reveal]');
    if (reveals.length) {
      gsap.set(reveals, { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch(reveals, {
        start: 'top 90%',
        once: true,
        onEnter: (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, overwrite: true }),
      });
    }

    /* ---------------- Staggered children ---------------- */
    $$('[data-stagger]').forEach((parent) => {
      const kids = Array.from(parent.children) as HTMLElement[];
      gsap.set(kids, { autoAlpha: 0, y: 80, rotation: (i: number) => (i % 2 ? 4 : -4) });
      ScrollTrigger.create({
        trigger: parent,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(kids, { autoAlpha: 1, y: 0, rotation: 0, duration: 1, ease: 'back.out(1.4)', stagger: 0.08, clearProps: 'transform' }),
      });
    });

    /* ---------------- Sticker pop ---------------- */
    $$('[data-pop]:not([data-pop-at])').forEach((el) => {
      const r = parseFloat(getComputedStyle(el).getPropertyValue('--r')) || -4;
      gsap.set(el, { autoAlpha: 0, scale: 0.2, rotation: r + 25 });
      const delay = Number(el.getAttribute('data-delay') || 0);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => gsap.to(el, { autoAlpha: 1, scale: 1, rotation: r, duration: 1.1, ease: 'elastic.out(1, 0.5)', delay: 0.35 + delay }),
      });
    });

    /* ---------------- Word fill ---------------- */
    $$('[data-wordfill]').forEach((el) => {
      const pops = $$('[data-pop-at]', el);
      pops.forEach((p) => p.remove()); // keep stickers out of the split, re-attach after
      const split = SplitText.create(el, { type: 'words', wordsClass: 'wf-w' });
      splits.push(split);
      pops.forEach((p) => el.appendChild(p));
      const words = split.words as HTMLElement[];
      gsap.set(el, { autoAlpha: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 40%', scrub: 0.8 } });
      tl.fromTo(words, { color: 'rgba(16,20,12,0.14)' }, {
        color: (_i: number, wEl: HTMLElement) => (wEl.closest('b') ? '#4F7A1C' : '#10140C'),
        stagger: 0.1, ease: 'none', duration: 0.4,
      }, 0);
      const total = tl.duration();
      pops.forEach((p) => {
        const r = parseFloat(getComputedStyle(p).getPropertyValue('--r')) || -4;
        gsap.set(p, { autoAlpha: 0, scale: 0.2, rotation: r + 30 });
        tl.to(p, { autoAlpha: 1, scale: 1, rotation: r, duration: total * 0.12, ease: 'back.out(3)' }, total * Number(p.getAttribute('data-pop-at')));
      });
    });

    /* ---------------- Path drawing ---------------- */
    $$<SVGPathElement>('[data-draw]').forEach((path) => {
      const len = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: path.closest('[data-draw-wrap]') || path, start: 'top 75%', end: 'bottom 70%', scrub: 1 },
      });
    });

    /* ---------------- Velocity marquee ---------------- */
    $$('[data-marquee]').forEach((track) => {
      const reverse = track.getAttribute('data-marquee') === 'reverse';
      const speed = Number(track.getAttribute('data-speed') || 30);
      const tween = reverse
        ? gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: speed, ease: 'none', repeat: -1 })
        : gsap.to(track, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 });
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });
      let dir = 1;
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self: any) {
          const v = self.getVelocity();
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(v) / 250, 5);
          gsap.to(tween, { timeScale: dir * boost, duration: 0.15, overwrite: true });
          gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.15, ease: 'power2.out' });
          skewTo(gsap.utils.clamp(-8, 8, v / -300));
        },
      });
      const hover = track.closest('.marquee');
      if (hover) {
        const enter = () => gsap.to(tween, { timeScale: 0.2 * dir, duration: 0.6 });
        const leave = () => gsap.to(tween, { timeScale: dir, duration: 0.6 });
        hover.addEventListener('mouseenter', enter);
        hover.addEventListener('mouseleave', leave);
        cleanups.push(() => { hover.removeEventListener('mouseenter', enter); hover.removeEventListener('mouseleave', leave); });
      }
    });

    /* ---------------- Parallax ---------------- */
    $$('[data-parallax]').forEach((el) => {
      const s = Number(el.getAttribute('data-parallax') || 0.2);
      gsap.fromTo(el, { y: () => -s * 120 }, {
        y: () => s * 120, ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    });

    /* ---------------- Counters ---------------- */
    $$('[data-count]').forEach((el) => {
      const to = Number(el.getAttribute('data-count'));
      const obj = { v: 0 };
      el.textContent = '0';
      gsap.to(obj, {
        v: to, duration: 1.6, ease: 'power3.out', snap: { v: 1 },
        onUpdate: () => { el.textContent = String(obj.v); },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    /* ---------------- Footer wordmark ---------------- */
    $$('[data-footer-logo]').forEach((el) => {
      gsap.from(el, { yPercent: 70, scaleY: 0.6, transformOrigin: '50% 100%', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
    });

    /* ---------------- Scroll progress bar ---------------- */
    $$('[data-progress]').forEach((bar) => {
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: '0 50%',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });
    });


  }, root);

  // Safety net: after fast jumps (anchor links, page restore) reveal anything already scrolled past.
  const sweep = () => {
    const limit = window.innerHeight;
    $$('[data-reveal], [data-pop]:not([data-pop-at])').forEach((el) => {
      if (el.getBoundingClientRect().top < limit && getComputedStyle(el).visibility === 'hidden') {
        gsap.to(el, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      }
    });
  };
  ScrollTrigger.addEventListener('scrollEnd', sweep);
  cleanups.push(() => ScrollTrigger.removeEventListener('scrollEnd', sweep));

  // Recalculate once fonts and images settle
  const refresh = () => ScrollTrigger.refresh();
  if ((document as any).fonts?.ready) (document as any).fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
  cleanups.push(() => window.removeEventListener('load', refresh));

  return () => {
    cleanups.forEach((f) => f());
    splits.forEach((s) => s.revert && s.revert());
    ctx.revert();
  };
}

/** Lenis ⇄ GSAP wiring. Returns the Lenis instance and a destroy fn. */
export function initSmoothScroll(Lenis: any, gsap: GSAP, ScrollTrigger: GSAP) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { lenis: null, destroy: () => {} };
  const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  (window as any).__lenis = lenis;
  return { lenis, destroy: () => { gsap.ticker.remove(raf); lenis.destroy(); (window as any).__lenis = null; } };
}
