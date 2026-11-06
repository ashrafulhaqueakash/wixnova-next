import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollEffects } from '@/components/effects';
import './globals.css';

// Self-hosted, Latin-subset fonts (SIL Open Font License — see app/fonts/OFL-*.txt)
const anton = localFont({ src: './fonts/anton.woff', variable: '--font-anton', weight: '400', display: 'swap' });
const funnelDisplay = localFont({ src: './fonts/funnel-display.woff', variable: '--font-funnel-display', weight: '300 800', display: 'swap' });
const funnelSans = localFont({ src: './fonts/funnel-sans.woff', variable: '--font-funnel-sans', weight: '300 800', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://wixnova.com'),
  title: { default: 'Wixnova — Your Full-Stack Digital Growth Partner', template: '%s | Wixnova' },
  description: 'A senior, full-stack studio for websites, WordPress, UI/UX and growth. One flat monthly fee, 48h onboarding, zero lock-in.',
  openGraph: { siteName: 'Wixnova', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#F3F4EC' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${funnelDisplay.variable} ${funnelSans.variable} scroll-pt-24`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-lime">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
