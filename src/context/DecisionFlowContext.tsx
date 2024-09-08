'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Election, Politigram } from '@/types/index';
import { PinnedCandidates, HiddenCandidates } from '@/types/index';

interface DecisionFlowContextProps {
  precinct: number|undefined;
  setPrecinct: React.Dispatch<number>;

  coordinates: [number, number][][];
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number][][]>>;
  
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
}

const DecisionFlowContext = createContext<DecisionFlowContextProps | undefined>(undefined);

export const DecisionFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [precinct, setPrecinct] = useState<number>();
  const [coordinates, setCoordinates] = useState<[number, number][][]>([]);
  const [elections, setElections] = useState<Record<number, Election>>({});
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [selectedContest, setSelectedContest] = useState<number | null>(null);
  const [pinnedCandidates, setPinnedCandidates] = useState<PinnedCandidates>({});
  const [hiddenCandidates, setHiddenCandidates] = useState<HiddenCandidates>({});
  const [selectedPolitigram, setSelectedPolitigram] = useState<Politigram | null>(null);

  return (
    <div style={{ paddingTop: '44px' }}>
      <DecisionFlowContext.Provider
        value={{
          precinct, setPrecinct,
          coordinates, setCoordinates,
          elections, setElections,
          selectedElection, setSelectedElection,
          selectedContest, setSelectedContest,
          pinnedCandidates, setPinnedCandidates,
          hiddenCandidates, setHiddenCandidates,
          selectedPolitigram, setSelectedPolitigram,
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