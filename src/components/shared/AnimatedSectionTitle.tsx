'use client';

import React from 'react';

interface AnimatedSectionTitleProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
  delay?: number;
}

export const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
  badge,
  title,
  subtitle,
  className = '',
  center = true,
}) => {
  return (
    <header className={`mb-12 md:mb-16 max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {badge && (
        <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-4">
          {badge}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink leading-[1.05]">
        {title}
      </h2>
      <div className={`mt-5 h-px w-16 bg-accent ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
};
