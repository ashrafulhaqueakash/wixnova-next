'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { NAV, SITE } from '@/lib/content';
import { Logo, TalkButton } from './ui';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href));

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock scroll, move focus, Esc + focus trap while open
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (!open) { lenis?.start(); return; }
    lenis?.stop();
    closeBtnRef.current?.focus();
    if (menuRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(menuRef.current.querySelectorAll('[data-menu-link]'), { yPercent: 110, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05, delay: 0.1 });
      gsap.fromTo(menuRef.current.querySelectorAll('[data-menu-side] > *'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.3 });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); openBtnRef.current?.focus(); }
      if (e.key === 'Tab' && menuRef.current) {
        const f = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'));
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 origin-left scale-x-0 bg-lime-700" data-progress="" aria-hidden="true" />
      <header id="site-header" className={`fixed inset-x-0 top-0 z-50 ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
          <nav className="flex flex-1 items-center gap-2" aria-label="Primary">
            <Link href="/services" className="pill hidden md:inline-flex" aria-current={isCurrent('/services') ? 'page' : undefined}>Services</Link>
            <Link href="/work" className="pill hidden md:inline-flex" aria-current={isCurrent('/work') ? 'page' : undefined}>Results</Link>
            <Link href="/pricing" className="pill hidden lg:inline-flex" aria-current={isCurrent('/pricing') ? 'page' : undefined}>Pricing</Link>
            <button ref={openBtnRef} type="button" className="pill" onClick={() => setOpen(true)} aria-controls="site-menu" aria-expanded={open} data-menu-open="">
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <i className="block h-0.5 w-4 rounded bg-current" /><i className="block h-0.5 w-3 rounded bg-current" />
              </span>
              Menu
            </button>
          </nav>
          <Link href="/" className="shrink-0 text-ink transition hover:text-lime-700" aria-label="Wixnova home"><Logo /></Link>
          <div className="flex flex-1 items-center justify-end gap-5">
            <p className="hidden text-right text-sm font-medium leading-tight xl:block">Onboarding<br /><span className="text-ink-3">in 48 hours</span></p>
            <span className="hidden sm:inline-flex"><TalkButton /></span>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        id="site-menu"
        ref={menuRef}
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="squiggle-bg absolute inset-0 bg-ink" />
        <div className="relative flex h-full flex-col overflow-y-auto px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <button ref={closeBtnRef} type="button" className="pill" onClick={() => { setOpen(false); openBtnRef.current?.focus(); }} data-menu-close="">✕ Close</button>
            <Link href="/" className="text-lime" aria-label="Wixnova home"><Logo /></Link>
              <span className="hidden sm:inline-flex"><TalkButton variant="lime" /></span>
          </div>
          <div className="container mt-12 grid flex-1 gap-12 pb-10 lg:grid-cols-12 lg:items-end">
            <ul className="space-y-1 lg:col-span-7">
              {NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    data-menu-link=""
                    className={`cond flex items-baseline gap-4 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] transition hover:text-lime ${isCurrent(item.href) ? 'text-lime' : 'text-paper-white'}`}
                  >
                    <span className="font-sans text-sm text-lime">0{i + 1}</span>{item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-8 text-paper-white lg:col-span-5" data-menu-side="">
              <p className="font-display text-3xl font-bold leading-tight md:text-4xl">Your growth starts<br /><span className="text-lime">now. Not later.</span></p>
              <div><p className="text-sm text-ink-4">Email us</p><a href={`mailto:${SITE.email}`} className="text-xl font-medium hover:text-lime">{SITE.email}</a></div>
              <div><p className="text-sm text-ink-4">Discovery call</p><Link href="/contact" className="text-xl font-medium hover:text-lime">Book a free, no-obligation call →</Link></div>
              <div className="flex flex-wrap gap-2">
                {SITE.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="pill !bg-paper-white/10 !text-paper-white hover:!bg-lime hover:!text-ink">{s.label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
