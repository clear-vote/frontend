import React, { createContext, useContext, useState } from 'react';

interface ServerContextProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ServerContext = createContext<ServerContextProps | undefined>(undefined);

export const ServerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <ServerContext.Provider
      value={{
        email, setEmail,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('ServerContext must be used within a ServerContextProvider');
  }
  return context;
};