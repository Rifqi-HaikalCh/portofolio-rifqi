"use client";

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '../../context/LanguageContext';
import { useEffect } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

function ThemeTransition() {
  useEffect(() => {
    const handleThemeChange = () => {
      // Add transition overlay div if it doesn't exist
      if (!document.getElementById('theme-transition-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'theme-transition-overlay';
        overlay.className = 'theme-transition-overlay';
        document.body.appendChild(overlay);
      }

      const overlay = document.getElementById('theme-transition-overlay');
      if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 600);
      }
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('dark') || (!target.classList.contains('dark') && mutation.oldValue?.includes('dark'))) {
            handleThemeChange();
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        <ThemeTransition />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}