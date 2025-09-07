"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'uiux' | 'developer' | 'fullstack' | null;

interface RoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isRoleSelected: boolean;
  resetRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  const isRoleSelected = userRole !== null;

  const resetRole = () => {
    setUserRole(null);
    localStorage.removeItem('selectedRole');
  };

  // Load saved role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole') as UserRole;
    if (savedRole && ['uiux', 'developer', 'fullstack'].includes(savedRole)) {
      setUserRole(savedRole);
    }
  }, []);

  // Save role to localStorage when it changes
  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem('selectedRole', role);
    } else {
      localStorage.removeItem('selectedRole');
    }
  };

  return (
    <RoleContext.Provider 
      value={{ 
        userRole, 
        setUserRole: handleSetUserRole, 
        isRoleSelected, 
        resetRole 
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}