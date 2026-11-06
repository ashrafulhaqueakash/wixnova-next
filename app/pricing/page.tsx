import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { Comparison, FaqSection, PricingSection } from '@/components/sections';
import { FAQ_GENERAL } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing — Flat-Monthly Plans. No Surprises.',
  description: 'Essentials $2,495/mo, Growth $4,995/mo, or a custom Full Growth Package — plus fixed-price one-time projects.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing" line1="Flat-monthly." line2="No surprises."
        stickers={[
          { text: 'Month-to-month', variant: 'lime', pos: '-top-3 left-[12%]', rotate: '-5deg' },
          { text: 'Pause or upgrade anytime', pos: '-bottom-4 right-[8%]', rotate: '4deg' },
        ]}
        lead="Three plans built on our fourteen services. Pick one, queue tickets, and wake up to ready-to-ship work — every business day. Not ready for a subscription? Pick a fixed-price project."
      />
      <PricingSection showProjects line1="Pick a plan." line2="Queue tickets. Ship." />
      <Comparison />
      <FaqSection items={FAQ_GENERAL.filter((_, i) => [0, 3, 5, 6].includes(i))} line1="Pricing" line2="questions" label="Pricing & billing" doodle={false} />
    </>
  );
}
