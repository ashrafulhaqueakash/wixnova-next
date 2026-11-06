// Wixnova design tokens — v3 "playful editorial" concept, built on the Wixnova logo lime.
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.ts'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' }, screens: { '2xl': '1360px' } },
    extend: {
      colors: {
        paper: { DEFAULT: '#F3F4EC', 2: '#E8EBDD', 3: '#DCE1CC', white: '#FBFCF7' }, // warm, slightly green cream
        ink: { DEFAULT: '#10140C', 2: '#2A3024', 3: '#5D6553', 4: '#8C9481' },          // green-black text
        lime: { DEFAULT: '#B5E96B', 200: '#DDF5BC', 300: '#CBF097', 500: '#9DD84A', 700: '#4F7A1C', 900: '#2C4410' }, // logo lime
      },
      fontFamily: {
        cond: ['var(--font-anton)', 'Impact', 'sans-serif'],                 // condensed uppercase headlines
        display: ['var(--font-funnel-display)', 'system-ui', 'sans-serif'],  // big rounded statements (matches current wixnova.com)
        sans: ['var(--font-funnel-sans)', 'system-ui', 'sans-serif'],        // body
      },
      fontSize: {
        mega: ['clamp(3.5rem, 12vw, 11.5rem)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        giant: ['clamp(3rem, 8.5vw, 8rem)', { lineHeight: '0.88', letterSpacing: '-0.005em' }],
        big: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '0.92' }],
        statement: ['clamp(1.9rem, 4.2vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      borderRadius: { blob: '2.5rem' },
      boxShadow: {
        sticker: '0 2px 0 rgba(16,20,12,.9)',
        card: '0 1px 0 rgba(16,20,12,.06), 0 18px 40px -22px rgba(16,20,12,.35)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-r': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        wobble: { '0%,100%': { transform: 'rotate(var(--r,-4deg))' }, '50%': { transform: 'rotate(calc(var(--r,-4deg) * -0.4))' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-r': 'marquee-r 34s linear infinite',
        wobble: 'wobble 5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        bob: 'bob 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
