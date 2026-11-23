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
}: {
  children: ReactNode;
  after?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useParallaxStage(ref);

  return (
    <div ref={ref} className={`shadowbox relative isolate ${className}`} style={style}>
      {children}
      {after}
    </div>
  );
}
