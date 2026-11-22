import type { ReactNode } from 'react';

/* Stack tag: mono 12 px, square, line border (§7 Tag). Render inside a <ul>. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center border border-line px-2 py-1 font-mono text-xs leading-none text-ink">
      {children}
    </li>
  );
}
