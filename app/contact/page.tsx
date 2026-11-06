import type { Metadata } from 'next';
import { Arrow, Icon } from '@/components/Icon';
import { Sticker } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import { FaqSection } from '@/components/sections';
import { FAQ_CONTACT, SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: "Contact — Let's Talk",
  description: 'Tell us about your project. We reply within one business day and onboard in 48 hours.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32 md:pb-36 md:pt-40">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="label">Contact</p>
            <h1 className="cond relative mt-6 text-mega">
              Let&apos;s<br /><span className="text-lime-700">talk.</span>
              <Sticker variant="lime" rotate="6deg" className="absolute right-0 top-[20%]" pop>We reply in 24h</Sticker>
            </h1>
            <p className="lead mt-8">Tell us where you want to go. We&apos;ll come back within one business day with next steps — and a few honest ideas.</p>
            {/* Replace placeholder contact details in lib/content.ts */}
            <ul className="mt-10 space-y-3">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6 transition hover:bg-lime">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="mail" size={20} /></span>
                  <span className="font-display text-xl font-bold">{SITE.email}</span><span className="ml-auto"><Arrow /></span>
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6 transition hover:bg-lime">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="phone" size={20} /></span>
                  <span className="font-display text-xl font-bold">{SITE.phone}</span><span className="ml-auto"><Arrow /></span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="globe" size={20} /></span>
                  <span className="font-display text-xl font-bold">Remote-first · Worldwide</span>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {SITE.socials.slice(0, 3).map((s) => <a key={s.label} href={s.href} className="pill">{s.label} ↗</a>)}
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal><ContactForm /></div>
        </div>
      </section>
      <FaqSection items={FAQ_CONTACT} line1="Before you" line2="hit send" label="Quick answers" doodle={false} />
    </>
  );
}
