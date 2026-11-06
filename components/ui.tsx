import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Arrow } from './Icon';
import { LOGO_PATH } from '@/lib/logo';
import { rich } from '@/lib/content';

export type Vars = CSSProperties & Record<`--${string}`, string>;

/** Wixnova wordmark (inherits text colour). */
export function Logo({ className = 'h-[22px] w-auto md:h-[26px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 81" fill="currentColor" role="img" aria-label="Wixnova">
      <path d={LOGO_PATH} />
    </svg>
  );
}

/** Pill button with the lime arrow dot (magnetic on desktop via the animation engine). */
export function TalkButton({
  href = '/contact', children = 'Book a Call', variant, size,
}: { href?: string; children?: ReactNode; variant?: 'lime'; size?: 'lg' }) {
  const cls = ['btn-talk', variant === 'lime' && 'is-lime', size === 'lg' && 'is-lg'].filter(Boolean).join(' ');
  return (
    <Link href={href} className={cls}>
      {children}
      <span className="dot"><Arrow /></span>
    </Link>
  );
}

/** Tilted sticker label. `pop` = springs in on scroll; `popAt` = pops at that word-fill progress (0–1). */
export function Sticker({
  children, variant, rotate = '-4deg', className = '', pop, popAt, delay,
}: { children: ReactNode; variant?: 'lime' | 'line'; rotate?: string; className?: string; pop?: boolean; popAt?: number; delay?: number }) {
  const cls = ['sticker', variant === 'lime' && 'is-lime', variant === 'line' && 'is-line', className].filter(Boolean).join(' ');
  return (
    <span
      className={cls}
      style={{ '--r': rotate } as Vars}
      data-pop={pop || popAt !== undefined ? '' : undefined}
      data-pop-at={popAt}
      data-delay={delay}
    >
      {children}
    </span>
  );
}

/** Illustrated website mockup — swap for next/image screenshots of real work. */
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

/** Section heading: small label + two-line condensed title (second line lime-green). Chars animate in. */
export function SectionHead({
  label, line1, line2, id, center, right,
}: { label: string; line1: ReactNode; line2: ReactNode; id?: string; center?: boolean; right?: ReactNode }) {
  const title = (
    <h2 id={id} className={`cond text-giant ${center ? 'mt-5' : 'md:col-span-7'}`} data-split="">
      {line1}<br /><span className="text-lime-700">{line2}</span>
    </h2>
  );
  if (center) {
    return (
      <div className="text-center">
        <p className="label" data-reveal="">{label}</p>
        {title}
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <p className="label md:col-span-3 md:pb-4" data-reveal="">{label}</p>
      {title}
      <div className="md:col-span-2 md:pb-4 md:text-right" data-reveal="">{right}</div>
    </div>
  );
}

type HeroSticker = { text: string; variant?: 'lime' | 'line'; pos: string; rotate: string };

/** Page hero: huge two-line headline (chars rise on load) with floating stickers. */
export function PageHero({
  label, line1, line2, stickers, lead, children,
}: { label: string; line1: string; line2: string; stickers: HeroSticker[]; lead?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="container relative text-center">
        <p className="label" data-reveal="">{label}</p>
        <h1 className="cond relative mx-auto mt-6 max-w-6xl text-mega">
          <span className="block" data-split="load">{line1}</span>
          <span className="block text-lime-700" data-split="load" data-delay="0.15">{line2}</span>
          {stickers.map((s, i) => (
            <Sticker key={s.text} variant={s.variant} rotate={s.rotate} className={`absolute hidden md:inline-block ${s.pos}`} pop delay={0.5 + i * 0.15}>
              {s.text}
            </Sticker>
          ))}
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden" aria-hidden="true">
          {stickers.map((s) => <Sticker key={s.text} variant={s.variant} rotate={s.rotate} className="!text-sm">{s.text}</Sticker>)}
        </div>
        {lead && <p className="lead mx-auto mt-10 max-w-2xl" data-reveal="">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Statement paragraph whose words fill in with scroll; **bold** words fill lime-green. */
export function WordFill({ text, className = '', children }: { text: string; className?: string; children?: ReactNode }) {
  return (
    <p className={className} data-wordfill="">
      {rich(text).map((seg, i) => (seg.hot ? <b key={i} className="font-[inherit]">{seg.text}</b> : <span key={i}>{seg.text}</span>))}
      {children}
    </p>
  );
}

/** Animated stat (count-up). */
export function StatNum({ value, suffix = '', text }: { value?: number; suffix?: string; text?: string }) {
  if (text) return <>{text}</>;
  return <><span data-count={value}>{value}</span>{suffix}</>;
}

/** Small circular avatar with initials. */
export function Avatar({ label, color = '#B5E96B', size = 'h-12 w-12 text-xl' }: { label: string; color?: string; size?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-2 border-ink font-cond ${size} ${color === '#10140C' ? 'text-lime' : 'text-ink'}`} style={{ background: color }}>
      {label}
    </span>
  );
}
