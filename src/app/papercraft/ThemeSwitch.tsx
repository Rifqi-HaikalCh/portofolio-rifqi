'use client';

import { useTheme } from 'next-themes';
import { useHydrated } from '../../hooks/useHydrated';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const dark = hydrated && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-pressed={dark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:bg-ink hover:text-paper"
    >
      {dark ? 'Lamp on · dark' : 'Daylight · light'}
    </button>
  );
}
