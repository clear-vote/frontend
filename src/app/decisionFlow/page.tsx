// page.tsx
'use client'

import { useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestPage from './ContestPage';
import { getElectionsRecord, getDefaultEid } from '@/utils';
import { AnimatedPage } from '../components/AnimatedPage';
import { ElectionsPage } from './ElectionsPage';
import Skeleton from '@mui/material/Skeleton';
import { useFetchData } from '@/hooks/useFetchData';
import { Contest, Election } from '@/types';

const DecisionFlow = () => {
  const { 
    elections,
    selectedContest,
    selectedElection, setElections, 
    setSelectedElection,
    setSelectedContest,
    isDesktop
  } = useDecisionFlowContext();

  const { data, loading, error } = useFetchData<any>('/data/electionFoo.json');
  const date = new Date();

  useEffect(() => {
    if (!data) {
      return;
    }
    
    const electionsRecord: Record<number, Election> = getElectionsRecord(data);
    if (Object.keys(electionsRecord).length === 0) {
      return;
    }
    setElections(electionsRecord);
    setSelectedElection(getDefaultEid(elections, date));
  }, [data]);

  if (loading) 
    return <div>
      <Skeleton variant="rectangular" width={210} height={118}>
        Loading...
      </Skeleton>
    </div>;

  if (error) 
    return <div>
      Error: {error}
    </div>;

  const handleBackClick = () => {
    setSelectedContest(null);
  };

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  // Invariant: election should be selected if data has loaded
  if (data !== null && selectedElection !== null && selectedElection in elections) {
    const election: Election = elections[selectedElection];
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: selectedContest === null ? 'auto' : 'none',
          }}
        >        
          <AnimatedPage transitionType="elections">
            <ElectionsPage election={election} />
          </AnimatedPage>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: selectedContest === null ? 'none' : 'auto',
          }}
        >        
          {
            selectedContest !== null && (() => {
              const contest: Contest = election.contests[selectedContest];
              return (
                <AnimatedPage transitionType="contest">
                  <ContestPage 
                    contest={contest}
                    onBackClick={handleBackClick}
                  />
                </AnimatedPage>
              );
            })()
          }
        </div>
      </div>
    );
  }
};

export default DecisionFlow;