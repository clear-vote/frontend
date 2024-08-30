/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest, Election } from "@/types/index";
import { ProgressCard } from "@/app/cards/ProgressCard";
import PrecinctMapCard from "@/app/cards/PrecinctMapCard";
import { ElectionDetailsCard } from "@/app/cards/ElectionDetailsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BallotCard } from "../cards/BallotCard";
import { JurisdictionCard } from "../cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';

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

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  return ( 
    <div>
      {/** TODO: Add Token support! */}
      {/**<PrecinctMapCard token={???}/>*/}
      <ElectionDetailsCard
        setDropdownIsOpen={setDropdownIsOpen}
      />
      <h3 className="font-bold text-lg">Explore Your Ballot!</h3>
      {
        (() => {
          const selectedElectionData = elections[selectedElection!];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
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
