/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { ProgressCard } from "@/app/modules/cards/ProgressCard";
import PrecinctMapCard from "@/app/modules/cards/PrecinctMapCard";
import { useState, useMemo } from "react";
import { JurisdictionCard } from "@/app/modules/cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { ElectionDetailsCard } from "@/app/modules/cards/ElectionDetailsCard";
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Contest } from "@/types";
import { getJurisdictionLevelPositions } from "@/utils/informationals";
import { useMasterContext } from "@/context/MasterContext";


interface ElectionsPageProps {
  onContestClick: (contestId: number) => void;
  onSendResultsClick: () => void;
}

export const ElectionsPage: React.FC<ElectionsPageProps> = ({ onContestClick, onSendResultsClick }) => {
  const { elections, selectedElection } = useDecisionFlowContext();
  const { isDesktop } = useMasterContext();

  // This prevents the user from clicking elements on the drop down behind itself
  // TODO: Not currently used, because dropdown doesn't populate over any interactable elements
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // Prevents the map from being rerendered on every single state change; that wouldn't be good!
  const MemoizedPrecinctMapCard = useMemo(
    () => <PrecinctMapCard 
      token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />, 
    []
  );

  /** Desktop Mode */
  if (isDesktop) {
    return (
      <div>Desktop not yet supported</div>
    )
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
          const jurisdictions: Record<string, Contest[]> = getJurisdictionLevelPositions(selectedElectionData.contests);
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
              <div>
                {Object.entries(jurisdictions).map(([jurisdictionName, contests]) => (
                  <JurisdictionCard
                    key={jurisdictionName}
                    jurisdictionName={jurisdictionName}
                    filteredContests={contests}
                    onContestClick={onContestClick}
                  />
                ))}
              </div>
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
