/* MasterPage.tsx */

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
import { ElectionsTopPage } from './ElectionsTopPage';
import { useFetchData } from '@/api/useFetchData';
import { Election } from '@/types';
import { SendResultsPage } from './SendResultsPage';
import { useMasterContext } from '@/context/MasterContext';
import { ElectionsBottomPage } from './ElectionsBottomPage';
import { ContestSkeleton } from '@/app/modules/skeletons/ContestSkeleton';
import Toolbar from '@/app/modules/misc/Toolbar';

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
    if (!data)
      return;
 
    const electionsRecord: Record<number, Election> = getElectionsRecord(data.elections);
    if (Object.keys(electionsRecord).length === 0) {
      setNullElectionState(true);
      return;
    }
    
    // This is if we are getting the data by precinct id rather than coordinates
    if (data && typeof data === 'object' && 'precinct_id' in data) {
      setPrecinct(data.precinct_id);
      setCoordinates(data.coordinates);
      router.push(`/decisionFlow?precinct_id=${data.precinct_id}`);
    }    

    setElections(electionsRecord);
    const defaultEid: number = getDefaultEid(electionsRecord, new Date());
    setSelectedElection(defaultEid);
    setPinnedCandidates(initPinnedCandidates(electionsRecord));
    setHiddenCandidates(initHiddenCandidates(electionsRecord));
  }, [data, router]); // Ensure these dependencies won't cause unnecessary re-renders  

  if (nullElectionState) {
    return <div>No valid election selected.</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || data && !selectedElection) {
    console.log("Loading...");
    return <div className="flex items-center justify-center h-full w-full">
        <ContestSkeleton/>
      </div>
  }
  
  const handleContestClick = async (contestId: number) => {
    if (selectedContest) {
      await handleBackContestClick();
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setSelectedContest(contestId);
    await new Promise<void>(resolve => {
      const timer = setTimeout(() => {
        setInRightPage(true);
        resolve();
      }, 200);
    });
  };

  // we are delaying the deselection of the selected contest, for animation purposes
  const handleBackContestClick = () => {
    setInRightPage(false);
    const timer = setTimeout(() => {
      setSelectedContest(null);
    }, 200);
    return () => clearTimeout(timer);
  };

  const handleSendResultsClick = () => {
    setInRightPage(true);
    setSelectedContest(null);
    const timer = setTimeout(() => {
      setInSendResultsPage(true);
    }, 350);
    return () => clearTimeout(timer);
  }
  
  const handleBackSendResultsClick = () => {
    setInRightPage(false);
    const timer = setTimeout(() => {
      setInSendResultsPage(false);
    }, 350);
    return () => clearTimeout(timer);
  };

  // Invariant: election should be selected if data has loaded
  if (data !== null && selectedElection !== null && selectedElection in elections) {
    const election: Election = elections[selectedElection];

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <AnimatedPage page='election' isActive={!inSendResultsPage}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          > 
          {!isDesktop ? (
            // Mobile Transitions
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              > 
                <AnimatedPage page='election' isActive={selectedContest === null && !inRightPage && !inSendResultsPage}>
                  <ElectionsTopPage onSendResultsClick={handleSendResultsClick} />
                  <ElectionsBottomPage onContestClick={handleContestClick} />
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
                {selectedContest !== null && (
                  <AnimatedPage page='contest' isActive={inRightPage && !inSendResultsPage}>
                    <ContestPage election={election} onBackClick={handleBackContestClick} />
                  </AnimatedPage>
                )}
              </div>
            </>
          ) : (
            // Desktop Transitions
            <>
              <ElectionsTopPage onSendResultsClick={handleSendResultsClick}/>
              <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
                <div style={{ width: '30%', minWidth: '350px', backgroundColor: '#F3F4F6'  }}>
                  <ElectionsBottomPage onContestClick={handleContestClick} />
                </div>
                <div style={{ width: '70%' }}>
                  <AnimatedPage page='contest' isActive={!inSendResultsPage && selectedContest !== null && inRightPage}>
                    <div style={{ height: '100%', backgroundColor: '#f0f0f0' }}>
                      {selectedContest !== null && (
                        <ContestPage election={election} onBackClick={handleBackContestClick} />
                      )}
                    </div>
                  </AnimatedPage>
                </div>
              </div>
            </>
          )}
          </div>
        </AnimatedPage>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >     
          {inSendResultsPage && (
            <AnimatedPage page='send-results' isActive={inSendResultsPage && inRightPage}>
              <SendResultsPage
                onBackClick={handleBackSendResultsClick} 
              />
            </AnimatedPage>
          )}
        </div>
      </div>
    );
  }
};

export default DecisionFlow;