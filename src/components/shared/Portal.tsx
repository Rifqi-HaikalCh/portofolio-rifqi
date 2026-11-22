'use client';
import type { ReactNode } from 'react';
import { useHydrated } from '../../hooks/useHydrated';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const mounted = useHydrated();

  return mounted ? createPortal(children, document.body) : null;
};
