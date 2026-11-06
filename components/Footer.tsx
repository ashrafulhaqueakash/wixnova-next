import Link from 'next/link';
import { SERVICES, SITE } from '@/lib/content';
import { LOGO_PATH } from '@/lib/logo';
import { TalkButton } from './ui';
import Newsletter from './Newsletter';

const QUICK = [['/services', 'Services'], ['/work', 'Results'], ['/pricing', 'Pricing Plans'], ['/about', 'About Wixnova'], ['/careers', 'Careers'], ['/contact', 'Contact Us']];
const FOOTER_SERVICES = ['ui-ux-design', 'web-development', 'motion-design', 'branding', 'seo-aeo', 'ad-campaign-management'];

export default function Footer() {
  return (
    <footer className="squiggle-bg relative overflow-hidden bg-lime text-ink">
      <div className="container pt-24 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]" data-split="">
              Your growth starts now. Not later.
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-2" data-reveal="">Join ambitious businesses that chose Wixnova to build, create, and grow. No lock-in contracts — just results.</p>
            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="">
              <TalkButton size="lg">Book free discovery call</TalkButton>
              <Link href="/pricing" className="btn-line">View plans</Link>
            </div>
            <div className="mt-12" data-reveal="">
              <p className="text-sm font-medium text-lime-900/70">Email us</p>
              <a href={`mailto:${SITE.email}`} className="font-display text-2xl font-bold underline decoration-2 underline-offset-4 hover:decoration-4">{SITE.email}</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-lime-900/70">Important links</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {QUICK.map(([href, label]) => <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-lime-900/70">Services</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {FOOTER_SERVICES.map((id) => {
                  const s = SERVICES.find((x) => x.id === id)!;
                  return <li key={id}><Link href={`/services#${id}`} className="hover:underline">{s.name}</Link></li>;
                })}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-sm font-medium text-lime-900/70">Follow</p>
              <ul className="mt-4 space-y-2 text-lg font-medium">
                {SITE.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{s.label} ↗</a></li>)}
              </ul>
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 text-sm font-medium md:flex-row">
          <p>© {new Date().getFullYear()} Wixnova. {SITE.footerLine}</p>
          <p><a href="https://wixnova.com/privacy-policy" className="hover:underline">Privacy</a> · <a href="https://wixnova.com/terms-of-service" className="hover:underline">Terms</a></p>
        </div>
      </div>
      <div className="overflow-hidden px-4 pt-8 md:px-6">
        <svg className="block w-full text-ink" viewBox="0 0 600 81" fill="currentColor" aria-hidden="true" data-footer-logo="">
          <path d={LOGO_PATH} />
        </svg>
      </div>
      <div className="h-4 md:h-6" />
    </footer>
  );
}
