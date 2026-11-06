/**
 * All site copy & data in one place. Edit here — pages read from these arrays.
 * Items marked SAMPLE are placeholders: replace with real, approved content before launch.
 */
import type { IconName } from '@/components/Icon';

export const SITE = {
  name: 'Wixnova',
  url: 'https://wixnova.com',
  email: 'hello@wixnova.com', // placeholder — replace
  careersEmail: 'careers@wixnova.com', // placeholder — replace
  phone: '+1 (000) 000-0000', // placeholder — replace
  phoneHref: 'tel:+10000000000',
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/* ---------------- Services ---------------- */
export type Service = {
  id: string; short: [string, string]; name: string; icon: IconName; pill: string;
  head: string; desc: string; features: string[]; color: string; tint: string;
};
export const SERVICES: Service[] = [
  { id: 'web-development', short: ['Web', 'development'], name: 'Web development', icon: 'code', pill: 'Fast, accessible sites and web apps on modern stacks.', head: 'Custom sites & web apps that scale.', desc: 'We engineer marketing sites and web apps on modern stacks — fast by default, accessible by design and easy for your team to update.', features: ['Next.js, Astro & React', 'Headless CMS (Sanity, WP)', 'APIs & dashboards', 'SEO-ready, WCAG 2.2 AA'], color: '#B5E96B', tint: '#E3F3C9' },
  { id: 'wordpress', short: ['WordPress', 'solutions'], name: 'WordPress solutions', icon: 'wp', pill: 'Custom themes, Elementor, WooCommerce and care plans.', head: 'WordPress, done properly.', desc: 'Bespoke block themes, Elementor builds and WooCommerce stores that are fast, secure and a joy to edit — then we keep them that way.', features: ['Gutenberg & Elementor', 'WooCommerce & payments', 'Zero-downtime migrations', 'Care plans & security'], color: '#7CC6FF', tint: '#DCEFFD' },
  { id: 'ui-ux', short: ['UI/UX', 'design'], name: 'UI/UX design', icon: 'pen', pill: 'Research-led interfaces your users actually enjoy.', head: 'Interfaces people enjoy.', desc: 'Research-led product and interface design: journeys, prototypes and Figma systems that make development predictable.', features: ['Research & journey maps', 'Wireframes & prototypes', 'Design systems', 'Usability testing'], color: '#FF8A65', tint: '#FDE3D9' },
  { id: 'performance', short: ['Performance', 'tuning'], name: 'Performance tuning', icon: 'bolt', pill: 'Core Web Vitals fixed. Slow sites made instant.', head: 'Slow sites, made instant.', desc: 'Every 100ms costs conversions. We audit, fix and monitor Core Web Vitals so your site flies on any device.', features: ['Core Web Vitals fixes', 'Image, font & JS diet', 'Caching & CDN tuning', 'Continuous monitoring'], color: '#5EE0B5', tint: '#D8F6EC' },
  { id: 'brand', short: ['Brand', 'identity'], name: 'Brand identity', icon: 'star', pill: 'Positioning, logo systems and guidelines that stick.', head: 'A brand people remember.', desc: 'Positioning, naming and identity systems that make you instantly recognisable across every touchpoint.', features: ['Strategy & positioning', 'Logo & identity', 'Type, colour & motion', 'Guidelines & kits'], color: '#FFD24D', tint: '#FDF1C6' },
  { id: 'growth', short: ['AI marketing', '& ads'], name: 'AI marketing & ads', icon: 'trend', pill: 'SEO, content and paid campaigns — measured to the dollar.', head: 'Growth you can measure.', desc: 'AI-assisted SEO, content and Google & Meta campaigns, wired to analytics so every dollar is accountable.', features: ['Technical & content SEO', 'Google & Meta ads', 'Landing-page CRO', 'GA4 & attribution'], color: '#B79CFF', tint: '#ECE5FF' },
];

/* ---------------- Projects (SAMPLE) ---------------- */
export type Project = {
  client: string; title: string; categories: string[]; categoryLabel: string; tags: string[];
  color: string; tint: string; metric: string; summary: string; results: string[];
};
export const PROJECTS: Project[] = [
  { client: 'Northwind', title: 'SaaS rebrand & marketing site', categories: ['web', 'branding'], categoryLabel: 'Web design · Branding', tags: ['Next.js', 'Sanity', 'Figma'], color: '#B5E96B', tint: '#E3F3C9', metric: '+212% demo signups', summary: 'A full repositioning and a headless marketing site so the growth team ships pages without developers.', results: ['+212% demo signups', '0.8s LCP', '3-week build'] },
  { client: 'Lumen', title: 'WooCommerce flagship store', categories: ['ecommerce', 'wordpress'], categoryLabel: 'E-commerce · WordPress', tags: ['WooCommerce', 'Stripe', 'Redis'], color: '#7CC6FF', tint: '#DCEFFD', metric: '2.4× revenue', summary: 'Replatformed a lighting brand onto custom WooCommerce with a faster checkout and smarter discovery.', results: ['2.4× online revenue', '−41% cart abandonment', 'Sub-1s product pages'] },
  { client: 'Atlas/Co', title: 'Corporate WordPress platform', categories: ['wordpress', 'web'], categoryLabel: 'WordPress · Web design', tags: ['Gutenberg', 'ACF', 'Cloudflare'], color: '#FF8A65', tint: '#FDE3D9', metric: 'PageSpeed 99', summary: "A block-theme platform giving 30 editors a design system they can't break.", results: ['PageSpeed 99', '30 editors onboarded', '−70% hosting cost'] },
  { client: 'Novahaus', title: 'DTC brand launch', categories: ['branding', 'ecommerce'], categoryLabel: 'Branding · E-commerce', tags: ['Shopify', 'Brand', 'Motion'], color: '#FFD24D', tint: '#FDF1C6', metric: '$1.2M year one', summary: 'Naming, identity and a conversion-first storefront for a homeware launch.', results: ['$1.2M first-year sales', '4.1% conversion', 'Full brand system'] },
  { client: 'Parallax', title: 'Fintech product UI', categories: ['web'], categoryLabel: 'UI/UX · Web design', tags: ['Figma', 'React', 'Storybook'], color: '#B79CFF', tint: '#ECE5FF', metric: '+38% task success', summary: 'Research-led dashboard redesign with a shared component library.', results: ['+38% task success', '120 components', 'NPS +22'] },
  { client: 'Vertex', title: 'Performance turnaround', categories: ['wordpress'], categoryLabel: 'WordPress · Performance', tags: ['Elementor', 'WP Rocket', 'CDN'], color: '#5EE0B5', tint: '#D8F6EC', metric: '6.1s → 0.9s', summary: 'A full Core Web Vitals overhaul of a slow Elementor site — no rebuild.', results: ['6.1s → 0.9s LCP', '+64% organic traffic', 'All CWV green'] },
  { client: 'Obsidian', title: 'Luxury e-commerce', categories: ['ecommerce', 'web'], categoryLabel: 'E-commerce · Web design', tags: ['Headless', 'Next.js', 'Shopify'], color: '#10140C', tint: '#CFD5C3', metric: '+57% AOV', summary: 'An editorial headless storefront with immersive product storytelling.', results: ['+57% average order value', 'Instant transitions', 'Multi-currency'] },
  { client: 'Halo Labs', title: 'Biotech identity', categories: ['branding'], categoryLabel: 'Branding', tags: ['Strategy', 'Identity', 'Guidelines'], color: '#9DD84A', tint: '#E8EBDD', metric: 'Series B ready', summary: 'A credible, modern identity for a biotech startup heading into Series B.', results: ['Full identity system', 'Pitch deck & site', '5-week launch'] },
  { client: 'Meridian', title: 'Membership WordPress', categories: ['wordpress', 'ecommerce'], categoryLabel: 'WordPress · E-commerce', tags: ['WooCommerce', 'Memberships', 'LMS'], color: '#FF9FCB', tint: '#FCE3EF', metric: '8k members', summary: 'Subscriptions, gated content and a custom learner dashboard on WordPress.', results: ['8,000+ members', '99.98% uptime', 'Recurring revenue live'] },
];
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' }, { id: 'web', label: 'Web design' }, { id: 'wordpress', label: 'WordPress' },
  { id: 'ecommerce', label: 'E-commerce' }, { id: 'branding', label: 'Branding' },
];

/* ---------------- Testimonials (SAMPLE) ---------------- */
export const TESTIMONIALS = [
  { quote: 'They rebuilt our site in three weeks and demo requests tripled. Like hiring a senior in-house team overnight.', name: 'Client Name', role: 'Founder, SaaS company' },
  { quote: 'Our WooCommerce store went from 6-second loads to under one. Conversion jumped, tickets dropped.', name: 'Client Name', role: 'Head of E-commerce, Retail brand' },
  { quote: 'The flat-fee model is a game changer. Design and dev ship every single week — no scope fights.', name: 'Client Name', role: 'COO, Fintech startup' },
  { quote: 'Brand, website and ads from one team. Finally everything looks like the same company.', name: 'Client Name', role: 'CMO, Consumer brand' },
  { quote: 'Clear communication, zero surprises and a design system our devs actually enjoy.', name: 'Client Name', role: 'VP Product, B2B platform' },
];

/* ---------------- Process ---------------- */
export const PROCESS = [
  { title: 'Discover', desc: 'Strategy call, audit and goals. A sprint roadmap within 48 hours.' },
  { title: 'Design', desc: 'Wireframes and UI you review every few days. No big-reveal surprises.' },
  { title: 'Develop', desc: 'Clean, tested code on a staging link you can click through as we build.' },
  { title: 'Launch & grow', desc: 'Go live, measure, then keep optimising every single week.' },
];

/* ---------------- Pricing (SAMPLE) ---------------- */
export const PLANS = [
  { name: 'Launch', desc: 'For startups that need a standout site, fast.', monthly: '1,995', yearly: '1,695', featured: false, features: ['1 active request', 'Websites & landing pages', 'WordPress or Webflow', 'SEO & analytics setup', 'Pause or cancel anytime'] },
  { name: 'Growth', desc: 'Our most popular plan for scaling brands.', monthly: '3,995', yearly: '3,395', featured: true, features: ['2 active requests', 'Everything in Launch', 'UI/UX & design system', 'WooCommerce / e-commerce', 'CRO & performance sprints', 'Dedicated Slack channel'] },
  { name: 'Scale', desc: 'A full senior team embedded in yours.', monthly: null, yearly: null, featured: false, features: ['Unlimited requests', 'Everything in Growth', 'Brand identity & strategy', 'AI marketing & paid ads', 'Senior lead + monthly strategy'] },
];

/* ---------------- FAQ ---------------- */
export type QA = { q: string; a: string };
export const FAQ_GENERAL: QA[] = [
  { q: 'How does the flat monthly fee work?', a: 'Pick a plan, drop requests on your board — a landing page, a WooCommerce feature, a design system — and we ship them in weekly sprints. One invoice, no hourly billing, no scope fights.' },
  { q: 'How fast can you start?', a: 'Onboarding takes 48 hours. Strategy call, Slack channel, project board — and first deliverables usually land in week one.' },
  { q: 'Do you do WordPress and Elementor?', a: 'All day. Custom block themes, Elementor & Gutenberg builds, WooCommerce, migrations and care plans are a big part of what we do.' },
  { q: 'Who owns the code and designs?', a: 'You do. Every file, Figma source and line of code is yours from day one.' },
  { q: 'Can I pause or cancel?', a: 'Anytime. No lock-in contracts — pause when the board is empty, resume when you’re ready.' },
  { q: 'What if we don’t like the first concepts?', a: 'We talk, we revise, we get it right. Unlimited revisions on every plan.' },
  { q: 'Can you start yesterday?', a: 'Almost. Give us 48 hours.' },
];
export const FAQ_SERVICES: QA[] = [
  { q: 'Which service should I start with?', a: 'Usually a website or WordPress rebuild, then performance, CRO and marketing sprints once the foundation is solid. We’ll map it on the call.' },
  { q: 'Custom or templates?', a: 'Custom, always. Proven components under the hood, but every layout is designed around your brand and goals.' },
  { q: 'Can you improve my existing site?', a: 'Yes — audits, Core Web Vitals fixes, UX upgrades and section redesigns are common requests.' },
  { q: 'Do you handle hosting and maintenance?', a: 'We can manage hosting, updates, backups, uptime and security — or hand over cleanly to your team.' },
  { q: 'How do you measure success?', a: 'Every project is tied to a metric: conversion rate, leads, revenue or LCP. We report on it monthly.' },
];
export const FAQ_CONTACT: QA[] = [
  { q: 'How quickly will you reply?', a: 'Within one business day — usually much faster.' },
  { q: 'Is the strategy call really free?', a: 'Yes. 30 minutes, no strings. You’ll leave with clear next steps either way.' },
  { q: 'Do you sign NDAs?', a: 'Of course. Send it over before the call.' },
  { q: 'Which time zones do you work in?', a: 'We’re remote-first and overlap with Europe, North America and Asia.' },
];

/* ---------------- Industries & stack ---------------- */
export const INDUSTRIES = ['SaaS & Tech', 'E-commerce', 'Healthcare', 'Finance & Insurance', 'Real Estate', 'Education', 'Travel', 'Professional Services', 'Restaurants & Food', 'Non-profit', 'Logistics', 'Local Business'];
export const TECH = ['WordPress', 'WooCommerce', 'Elementor', 'Next.js', 'React', 'Tailwind CSS', 'Laravel', 'Node.js', 'Figma', 'Webflow', 'Shopify', 'GA4', 'HubSpot', 'Cloudflare', 'Vercel', 'Stripe', 'OpenAI'];

/* ---------------- About (SAMPLE team / milestones) ---------------- */
export const VALUES: { icon: IconName; title: string; desc: string; r: string }[] = [
  { icon: 'bulb', title: 'Innovation', desc: 'We adopt new tools — AI included — the moment they make you faster.', r: '-3deg' },
  { icon: 'shield', title: 'Quality', desc: 'Pixel-perfect, accessible, fast. Senior review on everything.', r: '2deg' },
  { icon: 'heart', title: 'Client-first', desc: 'Honest advice, transparent pricing, no lock-in. Ever.', r: '-2deg' },
  { icon: 'clock', title: 'Momentum', desc: '48-hour onboarding and weekly releases. Speed is a feature.', r: '3deg' },
];
export const TEAM = [
  { name: 'Team member', role: 'Founder & Creative Director', color: '#B5E96B' },
  { name: 'Team member', role: 'Lead Full-Stack Engineer', color: '#7CC6FF' },
  { name: 'Team member', role: 'Senior Product Designer', color: '#FF8A65' },
  { name: 'Team member', role: 'Growth & Performance Lead', color: '#FFD24D' },
];
export const MILESTONES = [
  { year: '2021', title: 'Two people, one laptop', desc: 'Started building fast, clean WordPress sites for local businesses.' },
  { year: '2022', title: 'Going international', desc: 'UI/UX and custom dev for startups in the UK, Canada and the US.' },
  { year: '2024', title: 'The flat-fee model', desc: 'Swapped quotes and retainers for one predictable monthly subscription.' },
  { year: '2025', title: '100+ projects', desc: 'Added brand identity and paid growth — everything from one team.' },
  { year: '2026', title: 'AI-powered sprints', desc: '150+ projects, 12+ industries, AI built into how we work.' },
];

/* ---------------- Blog (SAMPLE) ---------------- */
export const POSTS = [
  { category: 'WordPress', key: 'wordpress', title: 'Elementor vs. Gutenberg in 2026: which should you build on?', excerpt: 'Speed, editing and long-term maintenance compared.', read: '7 min', date: 'Oct 28, 2026', color: '#7CC6FF', tint: '#DCEFFD' },
  { category: 'Performance', key: 'performance', title: 'The 15-minute Core Web Vitals audit anyone can run', excerpt: 'Three fixes that deliver 80% of the speed gains.', read: '5 min', date: 'Oct 21, 2026', color: '#5EE0B5', tint: '#D8F6EC' },
  { category: 'Design', key: 'design', title: 'Design systems for small teams: start with 12 components', excerpt: 'The lean starter kit we hand every client.', read: '6 min', date: 'Oct 14, 2026', color: '#FF8A65', tint: '#FDE3D9' },
  { category: 'Growth', key: 'growth', title: 'Landing pages that convert: our 9-point teardown', excerpt: 'The checklist we run before any page goes live.', read: '8 min', date: 'Oct 7, 2026', color: '#B79CFF', tint: '#ECE5FF' },
  { category: 'WordPress', key: 'wordpress', title: 'WooCommerce checkout fixes that pay for themselves', excerpt: 'Small changes that consistently cut cart abandonment.', read: '6 min', date: 'Sep 30, 2026', color: '#FFD24D', tint: '#FDF1C6' },
  { category: 'Design', key: 'design', title: 'Why playful brands convert better (when done right)', excerpt: 'Personality, trust and where the line is.', read: '4 min', date: 'Sep 23, 2026', color: '#FF9FCB', tint: '#FCE3EF' },
];
export const POST_FILTERS = [
  { id: 'all', label: 'All' }, { id: 'wordpress', label: 'WordPress' }, { id: 'design', label: 'Design' },
  { id: 'performance', label: 'Performance' }, { id: 'growth', label: 'Growth' },
];

/* ---------------- Careers (SAMPLE) ---------------- */
export const PERKS: { icon: IconName; title: string; desc: string; r: string }[] = [
  { icon: 'globe', title: 'Remote-first', desc: 'Work from anywhere, with healthy overlap hours.', r: '-3deg' },
  { icon: 'coin', title: 'Fair pay', desc: 'Senior-level pay in USD, always on time.', r: '2deg' },
  { icon: 'book', title: 'Learning budget', desc: 'Courses, books and conferences on us.', r: '-2deg' },
  { icon: 'laptop', title: 'Top gear', desc: 'A proper machine and every tool you need.', r: '3deg' },
  { icon: 'clock', title: 'Async by default', desc: 'Deep work over endless meetings.', r: '-3deg' },
  { icon: 'heart', title: 'Real ownership', desc: 'Lead projects end-to-end from day one.', r: '2deg' },
];
export const JOBS = [
  { title: 'Senior WordPress Developer', dept: 'engineering', deptLabel: 'Engineering', type: 'Full-time', desc: 'Custom block themes, WooCommerce and performance-critical WordPress builds.', reqs: ['5+ years WordPress / PHP', 'Gutenberg, ACF & Elementor', 'Core Web Vitals know-how'] },
  { title: 'Junior WordPress Developer', dept: 'engineering', deptLabel: 'Engineering', type: 'Full-time', desc: 'Ship real client sites weekly, side by side with seniors.', reqs: ['1+ year WordPress', 'Solid HTML, CSS & JS', 'Hungry to learn'] },
  { title: 'Frontend Engineer (React / Next.js)', dept: 'engineering', deptLabel: 'Engineering', type: 'Full-time', desc: 'Fast, accessible marketing sites and web apps on modern stacks.', reqs: ['3+ years React / Next.js', 'Tailwind & design systems', 'An eye for motion'] },
  { title: 'Senior Product Designer', dept: 'design', deptLabel: 'Design', type: 'Full-time', desc: 'Lead UI/UX from research to polished Figma systems.', reqs: ['5+ years product design', 'A portfolio of shipped work', 'Figma components pro'] },
  { title: 'Performance Marketing Manager', dept: 'marketing', deptLabel: 'Marketing', type: 'Contract', desc: 'Run Google & Meta campaigns with AI-assisted creative.', reqs: ['3+ years paid acquisition', 'GA4 & attribution', 'Test-everything mindset'] },
];
export const JOB_FILTERS = [
  { id: 'all', label: 'All' }, { id: 'engineering', label: 'Engineering' }, { id: 'design', label: 'Design' }, { id: 'marketing', label: 'Marketing' },
];
