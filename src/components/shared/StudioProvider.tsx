'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export const studioSections = [
  { id: 'home', en: 'Home', idn: 'Beranda', index: '01' },
  { id: 'about', en: 'About', idn: 'Tentang', index: '02' },
  { id: 'experience', en: 'Experience', idn: 'Pengalaman', index: '03' },
  { id: 'services', en: 'Services', idn: 'Layanan', index: '04' },
  { id: 'certificates', en: 'Certificates', idn: 'Sertifikat', index: '05' },
  { id: 'contact', en: 'Contact', idn: 'Kontak', index: '06' },
  { id: 'projects', en: 'Projects', idn: 'Projek', index: '07' },
] as const;

export type StudioSectionId = (typeof studioSections)[number]['id'];

interface StudioContextValue {
  activeId: StudioSectionId;
  progress: number;
}

const StudioContext = createContext<StudioContextValue | undefined>(undefined);

function pickReading(nodes: HTMLElement[]) {
  const sheet = nodes.find((node) => node.dataset.studio === 'sheet');
  if (sheet) {
    const rect = sheet.getBoundingClientRect();
    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (visible > window.innerHeight * 0.55) return sheet;
  }

  const line = window.innerHeight * 0.38;
  const readable = nodes.filter((node) => node.dataset.studio !== 'sheet');
  const containing = [...readable].reverse().find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.top <= line && rect.bottom >= line;
  });
  if (containing) return containing;

  let current = readable[0] ?? nodes[0];
  for (const node of readable) {
    if (node.getBoundingClientRect().top <= line) current = node;
  }
  return current;
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<StudioSectionId>('home');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const nextProgress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (Math.abs(nextProgress - progressRef.current) > 0.004) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-studio]')).filter(
        (node) => node.id && node.dataset.studio !== 'colophon'
      );
      if (nodes.length === 0) return;

      const atEnd = doc.scrollTop + window.innerHeight >= doc.scrollHeight - 32;
      const next = atEnd
        ? [...nodes].reverse().find((node) => node.dataset.studio !== 'sheet') ?? nodes[nodes.length - 1]
        : pickReading(nodes);
      const id = (next?.id || 'home') as StudioSectionId;
      setActiveId((prev) => (prev === id ? prev : id));
      if (document.body.dataset.reading !== id) {
        document.body.dataset.reading = id;
      }
    };

    const requestMeasure = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', requestMeasure, { passive: true });
    window.addEventListener('resize', requestMeasure);

    const main = document.querySelector('main');
    const observer = new MutationObserver(requestMeasure);
    if (main) observer.observe(main, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', requestMeasure);
      window.removeEventListener('resize', requestMeasure);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      delete document.body.dataset.reading;
    };
  }, []);

  return (
    <StudioContext.Provider value={{ activeId, progress }}>
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}

export function scrollToStudioSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
