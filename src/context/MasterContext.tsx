"use client";

import { Toolbar } from '@/app/modules/misc/Toolbar';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface MasterContextProps {
  isDesktop: boolean;
  email: string; // TODO: move email to Server Context probably. maybe make isDesktop a 
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const MasterContext = createContext<MasterContextProps | undefined>(undefined);

export const MasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Retrieve the email from local storage if it exists
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    // Save the email to local storage whenever it changes
    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }, [email]);

  return (
    <>
      {/* {isDesktop && <Toolbar />} */}
      <Toolbar />
      <MasterContext.Provider value={{ isDesktop, email, setEmail }}>
        {children}
      </MasterContext.Provider>
    </>
  );
};

export const useMasterContext = () => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error('MasterContext must be used within a MasterProvider');
  }
  return context;
};