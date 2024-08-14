/* Use Context for state or logic that needs to be accessible across many components, avoiding prop drilling.
Use Custom Hooks to encapsulate and reuse logic within or across components without global state management.
They can be used together: Context to share global state and hooks to manage logic or state within components.
 */

// UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};