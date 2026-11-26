import type { ReactNode } from 'react';

/*
  Bilingual copy for Server Components (DesignRules §13).
  Both languages are in the HTML; globals.css hides the one that does not match
  <html lang>. Screen readers skip the hidden one (display: none), and each span
  carries its own lang so pronunciation is right.
*/
export function T({ en, id }: { en: ReactNode; id?: ReactNode }) {
  if (id === undefined || id === en) return <>{en}</>;
  return (
    <>
      <span lang="en" className="t-lang">{en}</span>
      <span lang="id" className="t-lang">{id}</span>
    </>
  );
}

/** Picks the Indonesian field when it exists, for data with optional `…Id` fields. */
export function pick(en: string, id?: string) {
  return { en, id: id || en };
}
