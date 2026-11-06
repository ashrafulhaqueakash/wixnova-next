import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Arrow } from './Icon';
import { LOGO_PATH } from '@/lib/logo';

type Vars = CSSProperties & Record<`--${string}`, string>;

/** Wixnova wordmark (inherits text colour). */
export function Logo({ className = 'h-[22px] w-auto md:h-[26px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 81" fill="currentColor" role="img" aria-label="Wixnova">
      <path d={LOGO_PATH} />
    </svg>
  );
}

/** Pill button with the lime arrow dot. */
export function TalkButton({
  href = '/contact', children = "Let's Talk", variant, size,
}: { href?: string; children?: ReactNode; variant?: 'lime'; size?: 'lg' }) {
  const cls = ['btn-talk', variant === 'lime' && 'is-lime', size === 'lg' && 'is-lg'].filter(Boolean).join(' ');
  return (
    <Link href={href} className={cls}>
      {children}
      <span className="dot"><Arrow /></span>
    </Link>
  );
}

/** Tilted sticker label. `pop` makes it spring in when its section reveals. */
export function Sticker({
  children, variant, rotate = '-4deg', className = '', pop, popAt,
}: { children: ReactNode; variant?: 'lime' | 'line'; rotate?: string; className?: string; pop?: boolean; popAt?: number }) {
  const cls = ['sticker', variant === 'lime' && 'is-lime', variant === 'line' && 'is-line', className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ '--r': rotate } as Vars} data-pop={pop || popAt !== undefined ? '' : undefined} data-pop-at={popAt}>
      {children}
    </span>
  );
}

/** Illustrated website mockup — replace with <Image> of real work when available. */
export function Shot({ color, tint, className = '' }: { color: string; tint: string; className?: string }) {
  return (
    <div className={`shot ${className}`} style={{ '--c': color, '--t': tint } as Vars} aria-hidden="true">
      <div className="shot-win">
        <div className="s-text"><i /><i /><i /><i /><b /></div>
        <div className="s-img" />
        <div className="s-cards"><s /><s /><s /></div>
      </div>
    </div>
  );
}

/** Section heading: small label + two-line condensed title (second line in lime-green). */
export function SectionHead({
  label, line1, line2, id, center, right,
}: { label: string; line1: ReactNode; line2: ReactNode; id?: string; center?: boolean; right?: ReactNode }) {
  if (center) {
    return (
      <div className="text-center" data-reveal>
        <p className="label">{label}</p>
        <h2 id={id} className="cond mt-5 text-giant">{line1}<br /><span className="text-lime-700">{line2}</span></h2>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
      <p className="label md:col-span-3 md:pb-4">{label}</p>
      <h2 id={id} className="cond text-giant md:col-span-6">{line1}<br /><span className="text-lime-700">{line2}</span></h2>
      <div className="md:col-span-3 md:pb-4 md:text-right">{right}</div>
    </div>
  );
}

type HeroSticker = { text: string; variant?: 'lime' | 'line'; pos: string; rotate: string };

/** Page hero: huge two-line headline with stickers (desktop: floating, mobile: a row below). */
export function PageHero({
  label, line1, line2, stickers, lead, children,
}: { label: string; line1: string; line2: string; stickers: HeroSticker[]; lead?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="container relative text-center">
        <p className="label" data-reveal>{label}</p>
        <h1 className="cond relative mx-auto mt-6 max-w-6xl text-mega" data-reveal>
          <span className="block">{line1}</span>
          <span className="block text-lime-700">{line2}</span>
          {stickers.map((s) => (
            <Sticker key={s.text} variant={s.variant} rotate={s.rotate} className={`absolute hidden md:inline-block ${s.pos}`} pop>
              {s.text}
            </Sticker>
          ))}
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden" aria-hidden="true">
          {stickers.map((s) => <Sticker key={s.text} variant={s.variant} rotate={s.rotate} className="!text-sm">{s.text}</Sticker>)}
        </div>
        {lead && <p className="lead mx-auto mt-10 max-w-2xl" data-reveal>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Small circular project avatar. */
export function Avatar({ letter, color }: { letter: string; color: string }) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink font-cond text-xl ${color === '#10140C' ? 'text-lime' : ''}`}
      style={{ background: color }}
    >
      {letter}
    </span>
  );
}

export type { Vars };
