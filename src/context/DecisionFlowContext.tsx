'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Election, Politigram } from '@/types/index';
import { PinnedCandidates, HiddenCandidates } from '@/types/index';
import { useMediaQuery } from '@mui/material';
import Toolbar from '@/app/components/Toolbar';

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
  const [isDesktop, setIsDesktop] = useState<boolean>(useMediaQuery('(min-width: 600px)'));

  const checkDesktop = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    setIsDesktop(checkDesktop);
  }, [checkDesktop]);

  //No toolbar on desktop at the moment
  if (isDesktop) {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '45px' }}>
      <Toolbar />
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
    </div>
  );
};

export const useDecisionFlowContext = () => {
  const context = useContext(DecisionFlowContext);
  if (!context) {
    throw new Error('useDecisionFlowContext must be used within a DecisionFlowProvider');
  }
  return context;
};