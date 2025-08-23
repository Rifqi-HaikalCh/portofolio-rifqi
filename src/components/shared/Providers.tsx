"use client";

import { ThemeProvider, useTheme } from 'next-themes';
import { LanguageProvider } from '../../context/LanguageContext';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface ThemeAnimationContextType {
  toggleTheme: (event: React.MouseEvent) => void;
}

const ThemeAnimationContext = createContext<ThemeAnimationContextType | undefined>(undefined);

export const useThemeAnimation = () => {
  const context = useContext(ThemeAnimationContext);
  if (!context) {
    throw new Error('useThemeAnimation must be used within a ThemeAnimationProvider');
  }
  return context;
};

const ThemeAnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Add overlay div if it doesn't exist
    if (!document.getElementById('theme-transition-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'theme-transition-overlay';
      document.body.appendChild(overlay);
    }
  }, []);

  const toggleTheme = useCallback((event: React.MouseEvent) => {
    const overlay = document.getElementById('theme-transition-overlay');
    if (!overlay) return;

    const { clientX, clientY } = event;
    const targetTheme = theme === 'dark' ? 'light' : 'dark';

    overlay.classList.remove('light', 'dark');
    overlay.classList.add(targetTheme);

    const maxRadius = Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    );

    overlay.style.clipPath = `circle(0% at ${clientX}px ${clientY}px)`;
    
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${maxRadius}px at ${clientX}px ${clientY}px)`;
    });

    setTimeout(() => {
      setTheme(targetTheme);
    }, 400); // Change theme in the middle of animation

    setTimeout(() => {
        overlay.style.clipPath = `circle(0% at ${clientX}px ${clientY}px)`;
    }, 1000); // Hide overlay after completion

  }, [setTheme, theme]);

  return (
    <ThemeAnimationContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeAnimationContext.Provider>
  );
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ThemeAnimationProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeAnimationProvider>
    </ThemeProvider>
  );
}

interface ProvidersProps {
  children: React.ReactNode;
}