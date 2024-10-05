import { Politigram } from "@/types";
import { createContext, useContext, useState } from "react";

// UIContext.tsx
interface UIContextProps {
  touchLock: boolean;
  selectedPolitigram: Politigram | null;
  setTouchLock: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPolitigram: React.Dispatch<React.SetStateAction<Politigram | null>>;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [touchLock, setTouchLock] = useState<boolean>(false);
  const [selectedPolitigram, setSelectedPolitigram] = useState<Politigram | null>(null);

  return (
    <UIContext.Provider
      value={{
        touchLock,
        selectedPolitigram,
        setTouchLock,
        setSelectedPolitigram,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};