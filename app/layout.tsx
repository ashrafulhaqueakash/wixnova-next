import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';
import './globals.css';

// Self-hosted, Latin-subset fonts (SIL Open Font License — see app/fonts/OFL-*.txt)
const anton = localFont({ src: './fonts/anton.woff', variable: '--font-anton', weight: '400', display: 'swap' });
const funnelDisplay = localFont({ src: './fonts/funnel-display.woff', variable: '--font-funnel-display', weight: '300 800', display: 'swap' });
const funnelSans = localFont({ src: './fonts/funnel-sans.woff', variable: '--font-funnel-sans', weight: '300 800', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://wixnova.com'),
  title: { default: 'Wixnova — Design without limits', template: '%s — Wixnova' },
  description: 'Your full-stack digital growth partner. From stunning websites and immersive brand identities to AI-powered marketing and paid advertising — Wixnova delivers scalable digital solutions engineered for compounding growth.',
  openGraph: { siteName: 'Wixnova', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#F3F4EC' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${funnelDisplay.variable} ${funnelSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide animated elements until GSAP takes over; reveal them anyway if scripts never run */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__animReady)document.documentElement.classList.add('anim-fallback')},2500);" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-lime">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
