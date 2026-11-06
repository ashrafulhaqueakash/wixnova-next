import Link from 'next/link';
import { SERVICES, SITE } from '@/lib/content';
import { LOGO_PATH } from '@/lib/logo';
import { TalkButton } from './ui';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="squiggle-bg relative overflow-hidden bg-lime text-ink">
      <div className="container pt-24 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]" data-reveal>
              Okay, enough<br />scrolling.<br />Let&apos;s build.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
              <TalkButton size="lg">Book a strategy call</TalkButton>
              <Link href="/portfolio" className="btn-line">See the work</Link>
            </div>
            <div className="mt-12" data-reveal>
              <p className="text-sm font-medium text-lime-900/70">Email us</p>
              <a href={`mailto:${SITE.email}`} className="font-display text-2xl font-bold underline decoration-2 underline-offset-4 hover:decoration-4">{SITE.email}</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-lime-900/70">Main menu</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {[['/portfolio', 'Work'], ['/services', 'Services'], ['/about', 'About us'], ['/#pricing', 'Pricing'], ['/blog', 'Insights'], ['/careers', 'Careers']].map(([href, label]) => (
                  <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-lime-900/70">Services</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {SERVICES.slice(0, 4).map((s) => (
                  <li key={s.id}><Link href={`/services#${s.id}`} className="hover:underline">{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm font-medium text-lime-900/70">Follow</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {SITE.socials.map((s) => <li key={s.label}><a href={s.href} className="hover:underline">{s.label} ↗</a></li>)}
              </ul>
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 text-sm font-medium md:flex-row">
          <p>© {new Date().getFullYear()} Wixnova · Full-stack digital growth partner</p>
          <p>Designed &amp; built by humans. Shipped weekly.</p>
          <p><a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a></p>
        </div>
      </div>
      <svg className="mt-8 block w-full px-4 text-ink md:px-6" viewBox="0 0 600 81" fill="currentColor" aria-hidden="true">
        <path d={LOGO_PATH} />
      </svg>
      <div className="h-4 md:h-6" />
    </footer>
  );
}
