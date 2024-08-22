'use client'

import React, { createContext, useContext, useState } from 'react';
import { Candidate, Contest, Election, Politigram } from '@/types/index';
import useMediaQuery from '@mui/material/useMediaQuery';

interface DecisionFlowContextType {
  elections: Election[];
  setElections: (elections: Election[]) => void;
  
  selectedElectionId: number;
  setSelectedElectionId: (selectedElectionId: number) => void;
  
  // TODO: selectedContestId: number|null;
  selectedContest: Contest|null;
  setSelectedContest: (selectedContest: Contest|null) => void;

  // TODO: pinnedCandidates: Map<number, number>();
  // contestID -> candidateID 
  // remove the k/v if undoing
  pinnedCandidates: Set<Candidate>;
  setPinnedCandidates: (pinnedCandidates: Set<Candidate>) => void;
  
  // TODO: hiddenCandidates: Map<number, Set<number>>
  // remove k/v if last set
  hiddenCandidates: Set<Candidate>;
  setHiddenCandidates: (hiddenCandidates: Set<Candidate>) => void;

  // This remains constant accross all instances
  selectedPolitigram: Politigram|null;
  setSelectedPolitigram: (selectedpolitigram: Politigram|null) => void;

  isDesktop: boolean;
}

const DecisionFlowContext = createContext<DecisionFlowContextType | undefined>(undefined);

export const DecisionFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElectionId, setSelectedElectionId] = useState<number>(0);
  const [selectedContest, setSelectedContest] = useState<Contest|null>(null);
  // TODO:
  const [pinnedCandidates, setPinnedCandidates] = useState<Set<Candidate>>(new Set());
  // TODO:
  const [hiddenCandidates, setHiddenCandidates] = useState<Set<Candidate>>(new Set());
  const [selectedPolitigram, setSelectedPolitigram] = useState<Politigram|null>(null);
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <DecisionFlowContext.Provider
      value={{
        elections, setElections,
        selectedElectionId, setSelectedElectionId,
        selectedContest, setSelectedContest,
        pinnedCandidates, setPinnedCandidates,
        hiddenCandidates, setHiddenCandidates,
        selectedPolitigram, setSelectedPolitigram,
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