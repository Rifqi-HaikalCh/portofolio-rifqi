import type { ReactNode } from 'react';

/* Section header: stamped index + eyebrow, Fraunces title, optional lede (§7 SectionTitle). */
export function SectionTitle({
  index,
  eyebrow,
  title,
  lede,
  titleId,
  aside,
}: {
  index: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  titleId?: string;
  aside?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="stamp">{index}</span> — {eyebrow}
        </p>
        <h2 id={titleId} className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-2xl text-lg text-muted">{lede}</p>}
      </div>
      {aside}
    </header>
  );
}
