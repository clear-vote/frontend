/* (pages)/decisionFlow/MasterPage.tsx */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ContestPage from './ContestPage';
import {
  getElectionsRecord,
  getDefaultEid,
  initHiddenCandidates,
  initPinnedCandidates
} from '@/utils/helpers';
import { AnimatedPage } from '../../modules/misc/AnimatedPage';
import { ElectionsTopPage } from './ElectionsTopPage';
import { useFetchData } from '@/utils/useFetchData';
import { Election } from '@/types';
import { SendResultsPage } from './SendResultsPage';
import { useMasterContext } from '@/context/MasterContext';
import { ElectionsBottomPage } from './ElectionsBottomPage';
import { ContestSkeleton } from '@/app/modules/skeletons/ContestSkeleton';
import WestIcon from '@mui/icons-material/West';
import { useLocationContext } from '@/context/LocationContext';
import { useElectionContext } from '@/context/ElectionContext';
import { useCandidateContext } from '@/context/CandidateContext';
const MasterPage = () => {
  const { 
    setPrecinct,
    setCoordinates,
  } = useLocationContext();
  const {
    elections,
    selectedContest,
    selectedElection, setElections, 
    setSelectedElection,
    setSelectedContest,
  } = useElectionContext();
  const {  
    setPinnedCandidates,
    setHiddenCandidates,
  } = useCandidateContext();
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
 
    setPrecinct(data.precinct_id);
    setCoordinates(data.boundary_data);

    const electionsRecord: Record<number, Election> = getElectionsRecord(data.elections);
    if (Object.keys(electionsRecord).length === 0) {
      setNullElectionState(true);
      return;
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
      <div style={{ position: 'relative', width: '100%', height: '100%', fontFamily: "'IBM Plex Sans', sans-serif"}}>
        <AnimatedPage page='election' isActive={!inSendResultsPage}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              paddingTop: isDesktop ? '64px' : '0', // Add top padding if isDesktop is true
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
                  {selectedContest === null && (
                    <div className="py-20 font-bold text-3xl" style={{ marginTop: '38px' }}>
                      <WestIcon style={{ transform: 'translateY(-3px)', fontSize: '3rem' }} />
                      &nbsp;Explore Your Ballot! Just Click On A Contest To Get Started!
                    </div>
                  )}
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

export default MasterPage;