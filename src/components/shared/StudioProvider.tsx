'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { pageSections, type PageSectionId } from '../../data/sections';

/*
  Which section the reader is in, for the navbar, StudioRail and EQbot.
  One IntersectionObserver on a thin reading line at 38 % of the viewport:
  no scroll listeners, no per-frame state (DesignRules.md §4 StudioRail).
  The archive drawer is a modal dialog, so it never competes here.
*/

const StudioContext = createContext<{ activeId: PageSectionId } | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<PageSectionId>('home');

  useEffect(() => {
    const nodes = pageSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((entry) => entry.isIntersecting).at(-1);
        if (!hit) return;
        const id = hit.target.id as PageSectionId;
        setActiveId(id);
        document.body.dataset.reading = id;
      },
      { rootMargin: '-38% 0px -62% 0px', threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      delete document.body.dataset.reading;
    };
  }, []);

  return <StudioContext.Provider value={{ activeId }}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within a StudioProvider');
  return context;
}

export function scrollToStudioSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
