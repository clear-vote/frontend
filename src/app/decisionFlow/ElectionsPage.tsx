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
  election: Election;
  onForwardClick: (contestId: number) => void;
}

export const ElectionsPage: React.FC<ElectionsPageProps> = ({ election, onForwardClick }) => {
  const { 
    elections, 
    setSelectedContest,
    isDesktop,
    pinnedCandidates // Assuming pinnedCandidates is part of the context
  } = useDecisionFlowContext();

  // This prevents the user from clicking elements on the drop down behind itself
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  // Calculate the number of contests and the difference
  const contestsRemaining = (): number => {
    const numContests = Object.keys(election.contests).length;;
    if (!pinnedCandidates[election.id]) {
      return numContests;
    }
    return numContests - Object.values(pinnedCandidates[election.id]).filter(value => value !== null).length;
  }

  return ( 
    <div>
      <PrecinctMapCard />
      <ElectionDetailsCard
        setDropdownIsOpen={setDropdownIsOpen}
      />
      {
        (() => {
          const selectedElectionData = elections[election.id];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
              <ProgressCard difference={contestsRemaining()}/>
              {
                Object.values(selectedElectionData.contests).map((contest) => (
                  <div 
                    key={`${contest.title} ${contest.jurisdiction}`}
                    style={{ pointerEvents: dropdownIsOpen ? 'none' : 'auto' }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => onForwardClick(contest.id)}
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
