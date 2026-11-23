'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { setSound, soundServerSnapshot, soundSnapshot, subscribeSound } from '../../lib/sound/control';

/*
  Sound switch (DesignRules.md §10.4): paper sounds and the backsound, off by
  default. `variant="menu"` is the labelled button in the mobile menu.
*/
export function SoundToggle({ variant = 'icon', className = '' }: { variant?: 'icon' | 'menu'; className?: string }) {
  const on = useSyncExternalStore(subscribeSound, soundSnapshot, soundServerSnapshot);
  const { say } = useLanguage();
  const Icon = on ? Volume2 : VolumeX;

  if (variant === 'menu') {
    return (
      <button
        type="button"
        data-sound="none"
        aria-pressed={on}
        onClick={() => setSound(!on)}
        className={`inline-flex h-11 items-center justify-center gap-2 border border-line px-4 text-sm text-ink ${className}`}
      >
        <Icon size={16} aria-hidden="true" />
        {say('Sound', 'Suara')}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-sound="none"
      aria-pressed={on}
      aria-label={say('Sound and music', 'Suara dan musik')}
      title={say('Sound and music', 'Suara dan musik')}
      onClick={() => setSound(!on)}
      className={`inline-flex h-11 w-11 items-center justify-center text-ink hover:bg-ink hover:text-paper ${className}`}
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}
