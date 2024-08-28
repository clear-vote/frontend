'use client'

import React, { createContext, useContext, useState } from 'react';
import { Election, Politigram } from '@/types/index';
import { PinnedCandidates, HiddenCandidates } from '@/types/index';

interface DecisionFlowContextProps {
  elections: Record<number, Election>;
  setElections: React.Dispatch<React.SetStateAction<Record<number, Election>>>;
  
  selectedElection: number | null;
  setSelectedElection: React.Dispatch<React.SetStateAction<number | null>>;
  
  selectedContest: number | null;
  setSelectedContest: React.Dispatch<React.SetStateAction<number | null>>;

  pinnedCandidates: PinnedCandidates;
  setPinnedCandidates: React.Dispatch<React.SetStateAction<PinnedCandidates>>;
  
  hiddenCandidates: Record<number, Record<number, Set<number>>>;
  setHiddenCandidates: React.Dispatch<React.SetStateAction<Record<number, Record<number, Set<number>>>>>;

  selectedPolitigram: Politigram | null;
  setSelectedPolitigram: React.Dispatch<React.SetStateAction<Politigram | null>>;

  isDesktop: boolean;
  setIsDesktop: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecisionFlowContext = createContext<DecisionFlowContextProps | undefined>(undefined);

export const DecisionFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elections, setElections] = useState<Record<number, Election>>({});
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [selectedContest, setSelectedContest] = useState<number | null>(null);
  const [pinnedCandidates, setPinnedCandidates] = useState<PinnedCandidates>({});
  const [hiddenCandidates, setHiddenCandidates] = useState<HiddenCandidates>({});
  const [selectedPolitigram, setSelectedPolitigram] = useState<Politigram | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  return (
    <DecisionFlowContext.Provider
      value={{
        elections, setElections,
        selectedElection, setSelectedElection,
        selectedContest, setSelectedContest,
        pinnedCandidates, setPinnedCandidates,
        hiddenCandidates, setHiddenCandidates,
        selectedPolitigram, setSelectedPolitigram,
        isDesktop, setIsDesktop
      }}
    >
      {children}
    </DecisionFlowContext.Provider>
  );
};

export const useDecisionFlowContext = () => {
  const context = useContext(DecisionFlowContext);
  if (!context) {
    throw new Error('useDecisionFlowContext must be used within a DecisionFlowProvider');
  }
  return context;
};