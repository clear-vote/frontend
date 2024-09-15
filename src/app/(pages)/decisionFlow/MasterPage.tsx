// MasterPage.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestPage from './ContestPage';
import {
  getElectionsRecord,
  getDefaultEid,
  initHiddenCandidates,
  initPinnedCandidates
} from '@/utils/helpers';
import { AnimatedPage } from '../../modules/misc/AnimatedPage';
import { ElectionsPage } from './ElectionsPage';
import Skeleton from '@mui/material/Skeleton';
import { useFetchData } from '@/api/useFetchData';
import { Contest, Election } from '@/types';
import { SendResultsPage } from './SendResultsPage';
import { useMasterContext } from '@/context/MasterContext';

const DecisionFlow = () => {
  const { 
    setPrecinct,
    setCoordinates,
    elections,
    selectedContest,
    selectedElection, setElections, 
    setSelectedElection,
    setSelectedContest,
    setPinnedCandidates,
    setHiddenCandidates,
  } = useDecisionFlowContext();
  const { isDesktop } = useMasterContext();
  const [ nullElectionState, setNullElectionState ] = useState(false);

  const { data, loading, error } = useFetchData<any>();
  const router = useRouter();
  
  // when back button is pressed on contest, this sets to false IMMEDIATELY
  // when a contest is clicked, this there is a slight delay before this is set
  const [inRightPage, setInRightPage] = useState(false);
  const [inSendResultsPage, setInSendResultsPage] = useState(false);
  
  // This renders page when new data is available
  useEffect(() => {
    if (!data) return;
    
    // This is if we are getting the data by precinct id rather than coordinates
    if (data && typeof data === 'object' && 'precinct_id' in data) {
      setPrecinct(data.precinct_id);
      setCoordinates(data.coordinates);
      router.push(`/decisionFlow?precinct_id=${data.precinct_id}`);
    }

    const electionsRecord: Record<number, Election> = getElectionsRecord(data.elections);
    
    if (Object.keys(electionsRecord).length === 0) setNullElectionState(true);

    setElections(electionsRecord);
    const defaultEid: number = getDefaultEid(electionsRecord, new Date());
    setSelectedElection(defaultEid);
    setPinnedCandidates(initPinnedCandidates(electionsRecord));
    setHiddenCandidates(initHiddenCandidates(electionsRecord));
  }, [data, router]); // Ensure these dependencies won't cause unnecessary re-renders  

  
  if (loading || data && !selectedElection) {
    console.log("Loading...");
    return (
      // TODO: make a Election Page skeleton component
      <div>
        <Skeleton variant="rectangular" width={210} height={118}>
          Loading...
        </Skeleton>
      </div>
    );
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (nullElectionState) {
    return <div>No </div>;
  }
  
  if (nullElectionState) {
    return <div>No valid election selected.</div>;
  }
  
  const handleContestClick = (contestId: number) => {
    // selectedContest is set via the button, here we are just delaying the animation of the contest page
    setSelectedContest(contestId);
    const timer = setTimeout(() => {
      setInRightPage(true);
    }, 200);
    return () => clearTimeout(timer);
  }

  const handleSendResultsClick = () => {
    setInRightPage(true);
    const timer = setTimeout(() => {
      setInSendResultsPage(true);
    }, 350);
    return () => clearTimeout(timer);
  }
  
  // we are delaying the deselection of the selected contest, for animation purposes
  const handleBackContestClick = () => {
    setInRightPage(false);
    const timer = setTimeout(() => {
      setSelectedContest(null);
    }, 200);
    return () => clearTimeout(timer);
  };

  const handleBackSendResultsClick = () => {
    setInRightPage(false);
    const timer = setTimeout(() => {
      setInSendResultsPage(false);
    }, 350);
    return () => clearTimeout(timer);
  };

  if (isDesktop) {
    return (
      <div>Desktop mode not supported.</div>
    )
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
          }}
        > 
          <AnimatedPage page='left' isActive={selectedContest === null && !inRightPage}>
            <ElectionsPage 
              onContestClick={handleContestClick}
              onSendResultsClick={handleSendResultsClick}
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
          }}
        >        
          {
            selectedContest !== null && (() => {
              const contest: Contest = election.contests[selectedContest];
              return (
                <AnimatedPage page='contest' isActive={selectedContest !== null && inRightPage}>
                  <ContestPage 
                    election={election}
                    onBackClick={handleBackContestClick}
                  />
                </AnimatedPage>
              );
            })()
          }
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >     
          {
            inSendResultsPage && (
              <AnimatedPage page='send-results' isActive={inSendResultsPage && inRightPage}>
                <SendResultsPage
                  onBackClick={handleBackSendResultsClick} 
                />
              </AnimatedPage>
            )
          }
        </div>
      </div>
    );
  }
};

export default DecisionFlow;