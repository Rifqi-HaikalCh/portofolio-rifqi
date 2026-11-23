import type { Metadata } from 'next';
import Link from 'next/link';
import { CabinetStation } from '../components/scenes/cabinet/CabinetStation';
import { PaperDefs } from '../lib/paper-kit';

export const metadata: Metadata = {
  title: 'Empty drawer — Rifqi Haikal',
  robots: { index: false, follow: false },
};

/*
  404 — The Empty Drawer (DesignRules.md §2.7, §4.3): the Filing Cabinet with
  its top drawer open and nothing inside, the figure peering in, one line of
  copy and the way back to the desk.
*/
export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-5 py-16 lg:px-8">
      <PaperDefs />
      <CabinetStation sets={[]} pose="peer" name="drawer404" />
      <div className="station-sheet paper-sheet border border-line bg-raised p-6 sm:mx-6 sm:p-10 lg:mx-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="stamp">404</span> — Empty drawer
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Nothing is filed here.</h1>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">
          The page you asked for isn&apos;t in this drawer. Halaman ini tidak ada di laci arsip.
        </p>
        <Link href="/" className="btn-primary-custom mt-8">
          Back to the desk
        </Link>
      </div>
    </main>
  );
}
