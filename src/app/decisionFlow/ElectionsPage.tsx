/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest, Election } from "@/types/index";
import { ProgressCard } from "@/app/cards/ProgressCard";
import PrecinctMapCard from "@/app/cards/PrecinctMapCard";
import { useState, useMemo } from "react";
import { JurisdictionCard } from "../cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { ElectionDetailsCard } from "../cards/ElectionDetailsCard";

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

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  return ( 
    <div>
      {MemoizedPrecinctMapCard}
      <ElectionDetailsCard
        setDropdownIsOpen={setDropdownIsOpen}
      />
      {
        (() => {
          const selectedElectionData = elections[selectedElection!];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
              <br></br>
              <h3 className="font-bold text-lg">{selectedElectionData.type}</h3>
              <p>A general election and a special election are both types of elections, but they serve different
                purposes and occur under different circumstances.
              </p>
              {/** TODO: Make these buttons do something! */}
              <Button>Sign up for reminders</Button><Button>Get registered</Button>
              <br></br><br></br><br></br>
              <h3 className="font-bold text-lg">Explore Your Ballot!</h3>
              <ProgressCard onSendResultsClick={onSendResultsClick}/>
              <JurisdictionCard election={selectedElectionData} contests={Object.values(selectedElectionData.contests)} onContestClick={onContestClick}/>
            </>
          ) : (
            <p>No contests found for the selected election.</p>
          );
        })()
      }
    </div>
  );
};
