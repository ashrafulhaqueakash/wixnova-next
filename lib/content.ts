/**
 * Site content — real data from wixnova.com lives in ./data.json.
 * Edit the JSON; pages and components read the typed exports below.
 */
import data from './data.json';
import type { IconName } from '@/components/Icon';

export type Stat = { value?: number; suffix?: string; text?: string; label: string };
export type Service = { id: string; name: string; cat: string; icon: IconName; pill: string; bullets: string[] };
export type Review = { quote: string; name: string; role: string; service: string };
export type VideoQuote = { quote: string; name: string; role: string; len: string };
export type Result = { client: string; service: string; cats: string[]; metric: string; headline: string; person: string; reviewIndex?: number; videoIndex?: number };
export type QA = { q: string; a: string };
export type Plan = { name: string; label: string; price: string; per: string; featured?: boolean; desc: string; features: string[]; bestFor: string; cta: string };
export type Project = { name: string; price: string; time: string; desc: string; features: string[]; bestFor: string };

export const SITE = data.site;
export const STATS = data.stats as Stat[];
export const ROSTER = data.roster;
export const WHO_WE_ARE = data.whoWeAre;
export const SERVICES = data.services as Service[];
export const FEATURED_SERVICES = data.featuredServices.map((id) => SERVICES.find((s) => s.id === id)!) as Service[];
export const COMPARISON = data.comparison;
export const PROCESS = data.process;
export const PRINCIPLES = data.principles;
export const STACK = data.stack;
export const INDUSTRIES = data.industries;
export const RATING = data.rating;
export const REVIEWS = data.reviews as Review[];
export const VIDEO_QUOTES = data.videoQuotes as VideoQuote[];
export const RESULTS = data.results as Result[];
export const RESULT_FILTERS = data.resultFilters;
export const TEAM = data.team as { name: string; role: string; bio: string; email?: string; linkedin?: string }[];
export const SUBSCRIPTIONS = data.pricing.subscriptions as Plan[];
export const PROJECTS = data.pricing.projects as Project[];
export const FAQ_GENERAL = data.faq.general as QA[];
export const FAQ_SERVICES = data.faq.services as QA[];
export const FAQ_CONTACT = data.faq.contact as QA[];
export const CONTACT = data.contact;
export const ABOUT = data.about;
export const CAREERS = data.careers;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Results' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/** Accent colours used for illustrated thumbnails, cycled by index. */
export const SWATCHES = [
  { c: '#B5E96B', t: '#E3F3C9' }, { c: '#7CC6FF', t: '#DCEFFD' }, { c: '#FF8A65', t: '#FDE3D9' },
  { c: '#FFD24D', t: '#FDF1C6' }, { c: '#B79CFF', t: '#ECE5FF' }, { c: '#5EE0B5', t: '#D8F6EC' },
  { c: '#FF9FCB', t: '#FCE3EF' }, { c: '#10140C', t: '#CFD5C3' }, { c: '#9DD84A', t: '#E8EBDD' },
];

/** Splits "plain **bold** plain" into segments ( **…** = highlighted words ). */
export function rich(text: string): { text: string; hot: boolean }[] {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((p) => (p.startsWith('**') ? { text: p.slice(2, -2), hot: true } : { text: p, hot: false }));
}

export const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
