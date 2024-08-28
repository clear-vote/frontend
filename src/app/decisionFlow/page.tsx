// page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestPage from './ContestPage';
import {
  getElectionsRecord,
  getDefaultEid,
  initHiddenCandidates,
  initPinnedCandidates
} from '@/utils';
import { AnimatedPage } from '../components/AnimatedPage';
import { ElectionsPage } from './ElectionsPage';
import Skeleton from '@mui/material/Skeleton';
import { useFetchData } from '@/hooks/useFetchData';
import { Contest, Election } from '@/types';
import Toolbar from '../components/Toolbar';

const DecisionFlow = () => {
  const {
    elections,
    selectedContest,
    selectedElection, setElections,
    setSelectedElection,
    setSelectedContest,
    setPinnedCandidates,
    setHiddenCandidates,
    isDesktop
  } = useDecisionFlowContext();
  const {
    data,
    loading,
    error
  } = useFetchData<any>('/data/electionFoo.json');

  // when back button is pressed on contest, this sets to false IMMEDIATELY
  // when a contest is clicked, this there is a slight delay before this is set
  const [inContestPage, setInContestPage] = useState(false);

  // This renders page when new data is available
  useEffect(() => {
    if (!data)
      return;
    const electionsRecord: Record<number, Election> = getElectionsRecord(data);
    if (Object.keys(electionsRecord).length === 0)
      return;
    setElections(electionsRecord);
    const defaultEid = getDefaultEid(electionsRecord, new Date());
    setSelectedElection(defaultEid);
    setPinnedCandidates(initPinnedCandidates(electionsRecord));
    setHiddenCandidates(initHiddenCandidates(electionsRecord));
  }, [data]); // Ensure these dependencies won't cause unnecessary re-renders  


  if (loading) {
    console.log("Loading...");
    return (
      <div style={{ paddingTop: '60px' }}>
        <Toolbar />
        <Skeleton variant="rectangular" width={210} height={118}>
          Loading...
        </Skeleton>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div style={{ paddingTop: '60px' }}>
        <Toolbar />
        <p>Error: {error}</p>
      </div>;
  }

  if (!selectedElection || !(selectedElection in elections)) {
    return <div style={{ paddingTop: '60px' }}>
        <Toolbar />
        <p>No valid election selected.</p>
        </div>;
  }

  if (isDesktop) {
    return <div style={{ paddingTop: '60px' }}>
        <Toolbar />
        <p>Desktop not supported</p>
        </div>;
  }

  // selectedContest is set via the button, here we are just delaying the animation of the contest page
  const handleForwardClick = (contestId: number) => {
    setSelectedContest(contestId);
    const timer = setTimeout(() => {
      setInContestPage(true);
    }, 200);
    return () => clearTimeout(timer);
  };

  // we are delaying the deselection of the selected contest, for animation purposes
  const handleBackClick = () => {
    setInContestPage(false);
    const timer = setTimeout(() => {
      setSelectedContest(null);
    }, 200);
    return () => clearTimeout(timer);
  };

  // Invariant: election should be selected if data has loaded
  if (data !== null && selectedElection !== null && selectedElection in elections) {
    const election: Election = elections[selectedElection];
    return (
      <div style={{ paddingTop: '60px' }}>
        <Toolbar />
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
            <AnimatedPage page='left' isActive={selectedContest === null && !inContestPage}>
              <ElectionsPage
                election={election}
                onForwardClick={handleForwardClick}
              />
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
                  <div>
                    <AnimatedPage page='right' isActive={selectedContest !== null && inContestPage}>
                      <ContestPage
                        election={election}
                        onBackClick={handleBackClick}
                      />
                    </AnimatedPage>
                  </div>

                );
              })()
            }
          </div>
        </div>
      </div>

    );
  }
};

export default DecisionFlow;