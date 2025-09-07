"use client";

import React, { useEffect } from 'react';
import { useRole } from '../../context/RoleContext';

interface RoleThemeProviderProps {
  children: React.ReactNode;
}

export function RoleThemeProvider({ children }: RoleThemeProviderProps) {
  const { userRole } = useRole();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Remove all existing role attributes
      document.body.removeAttribute('data-role');
      document.documentElement.removeAttribute('data-role');
      
      // Add current role attribute
      if (userRole) {
        document.body.setAttribute('data-role', userRole);
        document.documentElement.setAttribute('data-role', userRole);
      }
    }
  }, [userRole]);

  return <>{children}</>;
}