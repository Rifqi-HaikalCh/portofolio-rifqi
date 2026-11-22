"use client";

import { ThemeProvider, useTheme } from 'next-themes';
import { LanguageProvider } from '../../context/LanguageContext';
import React, { useCallback } from 'react';

/*
  One theme flip for the whole site: the navbar toggle and the desk lamp both
  call this (DesignRules.md §4 `01`). The scene's light pool fades through the
  token transitions in CSS, so there is no wipe overlay.
*/
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const toggleTheme = useCallback(() => setTheme(isDark ? 'light' : 'dark'), [isDark, setTheme]);
  return { isDark, toggleTheme };
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
