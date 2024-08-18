// page.tsx
'use client'

import { useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestPage from './ContestPage';
import { getElections } from '@/utils';
import { AnimatedPage } from '../components/AnimatedPage';
import { ElectionsPage } from './ElectionsPage';
import Skeleton from '@mui/material/Skeleton';
import { useFetchData } from '@/hooks/useFetchData'; // Adjust the import path accordingly

const DecisionFlow = () => {
  const { 
    selectedContest,
    setElections, 
    setSelectedContest,
    setSelectedElectionId,
    isDesktop
  } = useDecisionFlowContext();

  const { data, loading, error } = useFetchData<any>('/data/electionFoo.json');

  useEffect(() => {
    if (data) {
      const elections = getElections(data);
      setElections(elections);
      if (elections.length === 1) {
        setSelectedElectionId(elections[0].election_id);
      } else if (elections.length > 1) {
        setSelectedElectionId(elections[elections.length - 2].election_id);
      }
    }
  }, [data, setElections, setSelectedElectionId]);

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
          <ElectionsPage />
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
        <AnimatedPage transitionType="contest">
          <ContestPage onBackClick={handleBackClick} />
        </AnimatedPage>
      </div>
    </div>
  );
};

export default DecisionFlow;