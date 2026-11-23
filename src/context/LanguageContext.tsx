"use client";

import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'id';

/*
  Language state for client leaves. Server-rendered copy uses <T en id />,
  which prints both languages; CSS shows the one matching <html lang>
  (DesignRules §13). This provider keeps <html lang> in sync.
*/

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (enText: string | ReactNode, idText: string | ReactNode) => string | ReactNode;
  /** String-only variant for attributes (aria-label, placeholder, title). */
  say: (enText: string, idText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Write only on a real change (§9.6, v3.5): any write to <html lang>, even the same value,
    // makes Blink restyle every element for :lang(); on hydration that was ~0.95 s at 4× CPU.
    const root = document.documentElement;
    if (root.lang !== language) root.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => setLanguage((prev) => (prev === 'en' ? 'id' : 'en')), []);
  const t = (enText: string | ReactNode, idText: string | ReactNode) => (language === 'en' ? enText : idText);
  const say = (enText: string, idText: string) => (language === 'en' ? enText : idText);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, say }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
