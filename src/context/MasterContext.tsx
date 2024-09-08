"use client";

import { Toolbar } from '@/app/modules/misc/Toolbar';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface MasterContextProps {
  isDesktop: boolean;
}

const MasterContext = createContext<MasterContextProps | undefined>(undefined);

export const MasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {isDesktop && <Toolbar/>}
      <MasterContext.Provider value={{isDesktop}}>
        {children}
      </MasterContext.Provider>
    </div>
  );
};

export const useMasterContext = () => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error('MasterContext must be used within a MasterProvider');
  }
  return context;
};