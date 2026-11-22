import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Empty drawer — Rifqi Haikal',
  robots: { index: false, follow: false },
};

/* 404: an empty archive drawer, and the way back to the desk. */
export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center px-5 py-24 lg:px-8">
      <svg viewBox="0 0 240 150" className="w-56" aria-hidden="true" focusable="false">
        <rect x="10" y="20" width="220" height="110" fill="var(--color-raised)" stroke="var(--paper-cut)" strokeWidth="1.2" />
        <rect x="24" y="36" width="192" height="80" fill="var(--color-recess)" stroke="var(--paper-cut)" strokeWidth="1.2" />
        <rect x="92" y="62" width="56" height="12" fill="var(--color-raised)" stroke="var(--paper-cut)" strokeWidth="1.2" />
        <path d="M24 116 L10 130 M216 116 L230 130" stroke="var(--paper-cut)" strokeWidth="1.2" />
        <path d="M40 100 h40" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        <span className="stamp">404</span> — Empty drawer
      </p>
      <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-ink">Nothing is filed here.</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-muted">
        The page you asked for isn&apos;t in this drawer. Halaman ini tidak ada di laci arsip.
      </p>
      <Link href="/" className="btn-primary-custom mt-8">
        Back to the desk
      </Link>
    </main>
  );
}
