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
import Skeleton from '@mui/material/Skeleton';
import { useFetchData } from '@/api/useFetchData';
import { Election } from '@/types';
import { SendResultsPage } from './SendResultsPage';
import { useMasterContext } from '@/context/MasterContext';
import { ElectionsBottomPage } from './ElectionsBottomPage';
import Image from 'next/image';

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
    return (
      // TODO: make a Election Page skeleton component
      <div>
        <Skeleton variant="rectangular" width={210} height={118}>
          Loading...
        </Skeleton>
      </div>
    );
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
      <div className="bg-background-tertiary pt-24">
        <AnimatedPage page='election' isActive={!inSendResultsPage}>
          <> 
          {!isDesktop ? (
            // Mobile Transitions
            <>
              <div className=""> 
                <AnimatedPage page='election' isActive={selectedContest === null && !inRightPage && !inSendResultsPage}>
                  
                  {/* <div className="flex flex-col items-center max-w-[1200px]"> */}
                    <ElectionsTopPage onSendResultsClick={handleSendResultsClick}/>
                  {/* </div> */}
                  <ElectionsBottomPage onContestClick={handleContestClick} />
                </AnimatedPage>
              </div>
              <div className=""> 
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
              <div className="flex flex-col items-center w-full px-16 mb-32">
                  <div className="flex flex-col items-center max-w-[1200px]">
                    <ElectionsTopPage onSendResultsClick={handleSendResultsClick}/>
                  </div>

                <div className="grid grid-cols-12 md:p-8 p-4 bg-background-secondary  max-w-[1200px] flex-grow">
                  <div className="col-span-3">
                    <ElectionsBottomPage onContestClick={handleContestClick} />
                  </div>
                  <div className="col-span-9">
                    {selectedContest === null && (
                      
                      <Image src="/images/illustration.png" alt="line" width={500} height={500} />
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
              </div>

              {/* <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}> */}
                <div style={{ width: '30%', minWidth: '350px' }}>
                  {/* <ElectionsBottomPage onContestClick={handleContestClick} /> */}
                </div>
                <div style={{ width: '70%' }}>
                  {/* <AnimatedPage page='contest' isActive={!inSendResultsPage && selectedContest !== null && inRightPage}>
                    <div style={{ height: '100%', backgroundColor: '#f0f0f0' }}>
                      {selectedContest !== null && (
                        <ContestPage election={election} onBackClick={handleBackContestClick} />
                      )}
                    </div>
                  </AnimatedPage> */}
                </div>
              {/* </div> */}
            </>
          )}
          </>
        </AnimatedPage>
        <div className="top-0 left-0 w-full h-full">     
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