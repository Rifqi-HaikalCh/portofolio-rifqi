'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/* Copies the address and says so to screen readers; falls back to mailto. */
export function CopyEmail({ email }: { email: string }) {
  const { say } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink hover:bg-ink hover:text-paper"
        aria-label={say('Copy email address', 'Salin alamat email')}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? say('Copied', 'Tersalin') : ''}
      </span>
    </>
  );
}
