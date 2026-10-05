"use client";

import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
