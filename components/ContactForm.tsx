'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Arrow } from './Icon';
import { Sticker, TalkButton } from './ui';
import { SITE } from '@/lib/content';

const SERVICES = [
  ['web-development', 'Web development'], ['wordpress', 'WordPress'], ['ui-ux', 'UI/UX design'], ['performance', 'Performance'],
  ['brand', 'Brand identity'], ['growth', 'Marketing & ads'], ['careers', 'Job application'],
] as const;
const BUDGETS = ['< $2k', '$2k–5k', '$5k–10k', '$10k+'];

/**
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree URL) or replace `submit()` with your own
 * API route / server action. Without an endpoint the form shows a demo success state.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '';

type Errors = Partial<Record<'name' | 'email' | 'message' | 'services', boolean>>;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);

  // Preselect a service from ?service=… (used by "Start a project" / "Apply" buttons)
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('service');
    if (s && SERVICES.some(([v]) => v === s)) setServices([s]);
  }, []);
  useEffect(() => { if (status === 'done') successRef.current?.focus(); }, [status]);

  const validate = (): Errors => ({
    name: !name.trim(),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
    message: message.trim().length < 10,
    services: services.length === 0,
  });

  const toggleService = (v: string) => setServices((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const firstBad = (['name', 'email', 'message'] as const).find((k) => errs[k]);
    if (firstBad) { document.getElementById(`cf-${firstBad}`)?.focus(); return; }
    if (errs.services) return;

    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, company, services, budget, message }),
        });
        if (!res.ok) throw new Error(res.statusText);
      } else {
        await new Promise((r) => setTimeout(r, 900)); // demo mode
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="relative rounded-blob border-2 border-ink bg-paper-white p-6 md:p-12" onSubmit={onSubmit} noValidate>
      <Sticker rotate="-4deg" className="absolute -top-5 left-8">Takes 2 minutes</Sticker>

      {status === 'done' ? (
        <div ref={successRef} className="py-16 text-center outline-none" role="status" tabIndex={-1}>
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-ink bg-lime font-cond text-5xl">✓</span>
          <h2 className="cond mt-6 text-6xl">Got it!</h2>
          <p className="mx-auto mt-3 max-w-sm text-ink-3">We&apos;ll be in touch within one business day.</p>
          <div className="mt-8"><TalkButton href="/portfolio">Browse our work meanwhile</TalkButton></div>
        </div>
      ) : (
        <>
          <h2 className="cond text-5xl">Tell us everything</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="field-label">Your name *</label>
              <input id="cf-name" className="field" placeholder="Jane Cooper" autoComplete="name" value={name}
                onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
              <p className="field-error">Please tell us your name.</p>
            </div>
            <div>
              <label htmlFor="cf-email" className="field-label">Email *</label>
              <input id="cf-email" type="email" className="field" placeholder="jane@company.com" autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
              <p className="field-error">That email looks off.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="cf-company" className="field-label">Company / website</label>
              <input id="cf-company" className="field" placeholder="company.com" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>

          <fieldset className="mt-7">
            <legend className="field-label">What can we help with? *</legend>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map(([v, label]) => (
                <label key={v} className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" checked={services.includes(v)} onChange={() => toggleService(v)} />
                  <span className="chip peer-checked:border-ink peer-checked:bg-lime peer-focus-visible:ring-2 peer-focus-visible:ring-ink">{label}</span>
                </label>
              ))}
            </div>
            {errors.services && services.length === 0 && <p className="mt-1.5 text-xs font-medium text-red-600">Pick at least one.</p>}
          </fieldset>

          <fieldset className="mt-7">
            <legend className="field-label">Monthly budget</legend>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <label key={b} className="cursor-pointer">
                  <input type="radio" name="budget" className="peer sr-only" checked={budget === b} onChange={() => setBudget(b)} />
                  <span className="chip peer-checked:border-ink peer-checked:bg-ink peer-checked:text-lime">{b}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <label htmlFor="cf-message" className="field-label">Project details *</label>
              <span className="text-xs text-ink-3">{message.length} / 1000</span>
            </div>
            <textarea id="cf-message" rows={5} maxLength={1000} className="field resize-y" placeholder="Goals, timeline, links…"
              value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={!!errors.message} />
            <p className="field-error">A little more detail, please (10+ characters).</p>
          </div>

          <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="text-xs text-ink-3">By sending you agree to our <a href="#" className="underline">privacy policy</a>.</p>
            <button type="submit" className="btn-talk is-lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send it'}<span className="dot"><Arrow /></span>
            </button>
          </div>
          {status === 'error' && <p className="mt-4 text-sm font-medium text-red-600" role="alert">Something broke. Email us at {SITE.email}.</p>}
        </>
      )}
    </form>
  );
}
