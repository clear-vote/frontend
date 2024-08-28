/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest, Election } from "@/types/index";
import { ProgressCard } from "@/app/cards/ProgressCard";
import { PrecinctMapCard } from "@/app/cards/PrecinctMapCard";
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
      <PrecinctMapCard />
      <ElectionDetailsCard
        setDropdownIsOpen={setDropdownIsOpen}
      />
      {
        (() => {
          const selectedElectionData = elections[selectedElection!];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
              <ProgressCard onSendResultsClick={onSendResultsClick}/>
              {
                Object.values(selectedElectionData.contests).map((contest) => (
                  <div 
                    key={`${contest.title} ${contest.jurisdiction}`}
                    style={{ pointerEvents: dropdownIsOpen ? 'none' : 'auto' }}
                  >
                    {/* TODO: 
                    
                    <BallotCard 
                      onClick={() => onContestClick(contest.id)}
                    /> 
                    
                    */}
                    <Button 
                      variant="outline"
                      onClick={() => onContestClick(contest.id)}
                    >
                      {`${contest.jurisdiction} ${contest.title}`}
                    </Button>
                  </div>
                ))
              }
            </>
          ) : (
            <p>No contests found for the selected election.</p>
          );
        })()
      }
    </div>
  );
};
