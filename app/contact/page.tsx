import type { Metadata } from 'next';
import { Arrow, Icon } from '@/components/Icon';
import { Sticker } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import { FaqSection } from '@/components/sections';
import { CONTACT, FAQ_CONTACT, SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Get in Touch — Book a Free Discovery Call',
  description: "Ready to build something great? Book a free discovery call and let's map out exactly how Wixnova can drive growth for your business — no commitment required.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32 md:pb-36 md:pt-40">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="label">Get in touch</p>
            <h1 className="cond relative mt-6 text-giant">
              <span className="block" data-split="load">Let&apos;s build</span><span className="block text-lime-700" data-split="load" data-delay="0.15">something great.</span>
              <Sticker variant="lime" rotate="6deg" className="absolute -top-6 right-0" pop delay={0.6}>Reply within 24h</Sticker>
            </h1>
            <p className="lead mt-8">Book a free discovery call and let&apos;s map out exactly how Wixnova can drive growth for your business — no commitment required.</p>
            <ul className="mt-10 space-y-3">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6 transition hover:bg-lime">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="mail" size={20} /></span>
                  <span className="font-display text-xl font-bold">{SITE.email}</span><span className="ml-auto"><Arrow /></span>
                </a>
              </li>
              <li>
                <a href={SITE.url} className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6 transition hover:bg-lime">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="globe" size={20} /></span>
                  <span className="font-display text-xl font-bold">wixnova.com</span><span className="ml-auto"><Arrow /></span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 rounded-full bg-paper-white p-2 pr-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime"><Icon name="phone" size={20} /></span>
                  <span className="font-display text-xl font-bold">Free discovery call — no obligation</span>
                </div>
              </li>
            </ul>
            <div className="mt-10 rounded-[1.75rem] bg-ink p-7 text-paper-white">
              <p className="font-cond text-3xl uppercase">What to expect</p>
              <ul className="check-list mt-5 space-y-3">{CONTACT.expect.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal><ContactForm /></div>
        </div>
      </section>
      <FaqSection items={FAQ_CONTACT} line1="Before you" line2="hit send." label="Quick answers" doodle={false} />
    </>
  );
}
