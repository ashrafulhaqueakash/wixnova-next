'use client';

import { useId, useState, type FormEvent } from 'react';
import { Arrow } from './Icon';

export default function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setMsg(ok ? "You're in — check your inbox." : 'That email looks off.');
    if (ok) setEmail(''); // TODO: POST to your email provider (Mailchimp, ConvertKit, …)
  };

  return (
    <form className="mt-8" onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="text-sm font-medium text-lime-900/70">Monthly growth notes</label>
      <div className="mt-2 flex rounded-full bg-ink p-1">
        <input
          id={id} type="email" required placeholder="you@company.com" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-paper-white placeholder:text-ink-4 focus:outline-none"
        />
        <button className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink" aria-label="Subscribe"><Arrow /></button>
      </div>
      <p className="mt-2 h-4 text-xs font-medium" role="status">{msg}</p>
    </form>
  );
}
