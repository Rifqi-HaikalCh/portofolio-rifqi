'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useParallaxStage } from '../../hooks/useParallaxStage';

/*
  ShadowBox — the framed, deep paper diorama that holds a station (DesignRules.md
  §2.1, §9.2). The scene inside is server-rendered and passed in as children; this
  client leaf only attaches the pointer look (--px / --py) to the box.
  `after` renders below the frame on mobile and over it on desktop (the laptop
  screen card), so one element serves both layouts.
*/

export function ShadowBox({
  children,
  after,
  className = '',
  style,
  light,
}: {
  children: ReactNode;
  after?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Workday light at this station (§2.3): shadow length by time of day, light theme only. */
  light?: 'morning' | 'midday' | 'afternoon' | 'golden';
}) {
  const ref = useRef<HTMLDivElement>(null);
  useParallaxStage(ref);

  return (
    <div ref={ref} className={`shadowbox relative isolate ${className}`} style={style} data-light={light}>
      {children}
      {after}
    </div>
  );
}
