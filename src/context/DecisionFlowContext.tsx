'use client'

import React, { createContext, useContext, useState } from 'react';
import { Candidate, Contest, Election } from '@/types/index';
import useMediaQuery from '@mui/material/useMediaQuery';

interface DecisionFlowContextType {
  elections: Election[];
  setElections: (elections: Election[]) => void;
  selectedContest: Contest | null;
  setSelectedContest: (selectedContest: Contest | null) => void;
  selectedElectionId: number;
  setSelectedElectionId: (selectedElectionId: number) => void;
  pinnedCandidates: Set<Candidate>;
  setPinnedCandidates: (pinnedCandidates: Set<Candidate>) => void;
  hiddenCandidates: Set<Candidate>;
  setHiddenCandidates: (hiddenCandidates: Set<Candidate>) => void;
  isDesktop: boolean;
}

const DecisionFlowContext = createContext<DecisionFlowContextType | undefined>(undefined);

export const DecisionFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [selectedElectionId, setSelectedElectionId] = useState<number>(0);
  const [pinnedCandidates, setPinnedCandidates] = useState<Set<Candidate>>(new Set());
  const [hiddenCandidates, setHiddenCandidates] = useState<Set<Candidate>>(new Set());
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <DecisionFlowContext.Provider
      value={{
        elections,
        setElections,
        selectedContest,
        setSelectedContest,
        selectedElectionId,
        setSelectedElectionId,
        pinnedCandidates,
        setPinnedCandidates,
        hiddenCandidates,
        setHiddenCandidates,
        isDesktop,
      }}
    >
      {children}
    </DecisionFlowContext.Provider>
  );
};

export const useDecisionFlowContext = () => {
  const context = useContext(DecisionFlowContext);
  if (context === undefined) {
    throw new Error('useDecisionFlowContext must be used within a DecisionFlowProvider');
  }
  return context;
};