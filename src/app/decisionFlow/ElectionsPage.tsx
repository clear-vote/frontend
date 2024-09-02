/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { ProgressCard } from "@/app/cards/ProgressCard";
import PrecinctMapCard from "@/app/cards/PrecinctMapCard";
import { useState, useMemo } from "react";
import { JurisdictionCard } from "../cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { ElectionDetailsCard } from "../cards/ElectionDetailsCard";
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


interface ElectionsPageProps {
  onContestClick: (contestId: number) => void;
  onSendResultsClick: () => void;
}

export const ElectionsPage: React.FC<ElectionsPageProps> = ({ onContestClick, onSendResultsClick }) => {
  const { 
    elections, 
    selectedElection,
    isDesktop,
  } = useDecisionFlowContext();

  // This prevents the user from clicking elements on the drop down behind itself
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // Prevents the map from being rerendered on every single state change; that wouldn't be good!
  const MemoizedPrecinctMapCard = useMemo(
    () => <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />, 
    []
  );

  /** Desktop Mode */
  if (isDesktop) {
    return (
      <div>Desktop not yet supported</div>
    )
    // return (
    //   <div className="w-full flex flex-col items-center">
    //     <div className="max-w-[calc(100vw-8rem)] w-full p-16 flex flex-col gap-6 items-center rounded-xl">
    //     <div className="max-w-[660px] w-full items-center">
    //       <div className="w-full h-full">{MemoizedPrecinctMapCard}</div>
    //       <div className="align-left"><ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen}/></div>
    //     </div>
    //     </div>
    //     {
    //     (() => {
    //       const selectedElectionData = elections[selectedElection!];
    //       return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
    //         <>
    //           <div className="rounded-lg bg-clip-border border w-full" style={{ maxWidth: "600px", padding: "8px"}}>
    //             <h1 className="font-bold text-lg">{selectedElectionData.type}</h1>
    //             <p>A general election and a special election are both types of elections, but they serve different
    //               purposes and occur under different circumstances.
    //             </p>
    //           </div>
    //           {/** TODO: Replace with "Sign up for reminders" link */}
    //           <br></br>
    //           <Button style={{backgroundColor : '#947FEE', color : 'white'}}><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
    //             <PersonIcon style={{width : '15px'}}/> Sign up for reminders</a>
    //           </Button>
    //           <Button style={{ backgroundColor: 'white', border: '1px solid lightgray', color: 'black' }}><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
    //             <HowToVoteIcon style={{width : '15px'}}/> Get registered</a>
    //           </Button>
    //           <br></br><br></br><br></br>
    //           <h3 className="font-bold text-lg">Explore Your Ballot!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/></h3>
    //           <ProgressCard onSendResultsClick={onSendResultsClick}/>
    //           <br></br>
    //           <JurisdictionCard election={selectedElectionData} contests={Object.values(selectedElectionData.contests)} onContestClick={onContestClick}/>
    //         </>
    //       ) : (
    //         <p>No contests found for the selected election.</p>
    //       );
    //     })()
    //   }
    //   </div>
    // );
  }

  /** Mobile Mode */
  return ( 
    <div>
      {MemoizedPrecinctMapCard}
      <div style={{padding: "8px"}}>
      <ElectionDetailsCard
        setDropdownIsOpen={setDropdownIsOpen}
      />
      {
        (() => {
          const selectedElectionData = elections[selectedElection!];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
              <br></br>
              <h1 className="font-bold text-lg">{selectedElectionData.type}</h1>
              <p>A general election and a special election are both types of elections, but they serve different
                purposes and occur under different circumstances.
              </p>
              {/** TODO: Replace with "Sign up for reminders" link */}
              <Button style={{backgroundColor : '#947FEE', color : 'white'}}><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
                <PersonIcon style={{width : '15px'}}/> Sign up for reminders</a>
              </Button>
              <Button style={{ backgroundColor: 'white', border: '1px solid lightgray', color: 'black' }}><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
                <HowToVoteIcon style={{width : '15px'}}/> Get registered</a>
              </Button>
              <br></br><br></br><br></br>
              <h3 className="font-bold text-lg">Explore Your Ballot!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/></h3>
              <ProgressCard onSendResultsClick={onSendResultsClick}/>
              <br></br>
              <JurisdictionCard election={selectedElectionData} contests={Object.values(selectedElectionData.contests)} onContestClick={onContestClick}/>
            </>
          ) : (
            <p>No contests found for the selected election.</p>
          );
        })()
      }
    </div>
    </div>
  );
};
