// ElectionContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Election } from '@/types';

interface ElectionContextProps {
  elections: Record<number, Election>;
  selectedElection: number | null;
  selectedContest: number | null;
  selectedCandidate: number | null;
  setElections: React.Dispatch<React.SetStateAction<Record<number, Election>>>;
  setSelectedElection: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedContest: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedCandidate: React.Dispatch<React.SetStateAction<number | null>>;
}

const ElectionContext = createContext<ElectionContextProps | undefined>(undefined);

export const ElectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elections, setElections] = useState<Record<number, Election>>({});
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [selectedContest, setSelectedContest] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  return (
    <ElectionContext.Provider
      value={{
        elections,
        selectedElection,
        selectedContest,
        selectedCandidate,
        setElections,
        setSelectedElection,
        setSelectedContest,
        setSelectedCandidate,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElectionContext = () => {
  const context = useContext(ElectionContext);
  if (!context) {
    throw new Error('useElectionContext must be used within an ElectionProvider');
  }
  return context;
};