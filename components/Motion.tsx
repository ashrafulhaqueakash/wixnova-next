'use client';

/**
 * Smooth scrolling (Lenis) + GSAP ScrollTrigger/SplitText animations.
 * Mounted once in the root layout; re-initialises animations on every route change.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initAnimations, initSmoothScroll } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Motion() {
  const pathname = usePathname();

  // Lenis smooth scroll (once)
  useEffect(() => {
    const { destroy } = initSmoothScroll(Lenis, gsap, ScrollTrigger);
    return destroy;
  }, []);

  // Page animations (per route)
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo(t: number, o?: object): void } }).__lenis;
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
    const kill = initAnimations(gsap, ScrollTrigger, SplitText, document);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(id); kill(); };
  }, [pathname]);

  return null;
}
