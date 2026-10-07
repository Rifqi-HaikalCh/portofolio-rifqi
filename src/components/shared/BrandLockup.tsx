'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const files = {
  mark: {
    light: '/brand/logo-mark.svg',
    dark: '/brand/logo-mark-dark.svg',
    width: 288,
    height: 147,
  },
  horizontal: {
    light: '/brand/logo-horizontal.svg',
    dark: '/brand/logo-horizontal-dark.svg',
    width: 645,
    height: 144,
  },
  badge: {
    light: '/brand/logo-badge.svg',
    dark: '/brand/logo-badge-dark.svg',
    width: 512,
    height: 512,
  },
} as const;

type BrandLockupProps = {
  variant: keyof typeof files;
  /** `paper` follows the page. `ink` follows the footer, which flips with the theme. */
  surface?: 'paper' | 'ink';
  className?: string;
  label?: string;
};

export function BrandLockup({
  variant,
  surface = 'paper',
  className = '',
  label = 'Rifqi Haikal',
}: BrandLockupProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : 'dark';
  const darkBackground = surface === 'ink' ? theme !== 'dark' : theme === 'dark';
  const asset = files[variant];

  return (
    <img
      src={darkBackground ? asset.dark : asset.light}
      alt={label}
      width={asset.width}
      height={asset.height}
      draggable={false}
      className={`block ${className}`}
    />
  );
}
