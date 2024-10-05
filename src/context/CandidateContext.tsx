import { HiddenCandidates, PinnedCandidates } from "@/types";
import { createContext, useContext, useState } from "react";

// CandidateContext.tsx
interface CandidateContextProps {
  pinnedCandidates: PinnedCandidates;
  hiddenCandidates: HiddenCandidates;
  setPinnedCandidates: React.Dispatch<React.SetStateAction<PinnedCandidates>>;
  setHiddenCandidates: React.Dispatch<React.SetStateAction<HiddenCandidates>>;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pinnedCandidates, setPinnedCandidates] = useState<PinnedCandidates>({});
  const [hiddenCandidates, setHiddenCandidates] = useState<HiddenCandidates>({});

  return (
    <CandidateContext.Provider
      value={{
        pinnedCandidates,
        hiddenCandidates,
        setPinnedCandidates,
        setHiddenCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};

