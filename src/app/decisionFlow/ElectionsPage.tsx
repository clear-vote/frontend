// TODO:
// move this all to ballot cart
// implement precinctMapCard
// implement progressCard
// implement election details card
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest } from "@/types/index";
import { getElectionIndex } from "@/utils";
import Skeleton from '@mui/material/Skeleton';
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

export const ElectionsPage = () => {
  const { 
    elections, 
    setSelectedContest,
    selectedElectionId, setSelectedElectionId,
    isDesktop,
    pinnedCandidates // Assuming pinnedCandidates is part of the context
  } = useDecisionFlowContext();

  const handleContestClick = (contest: Contest) => {
    setSelectedContest(contest);
  };

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  // Calculate the number of contests and the difference
  const numberOfContests = elections.length > 0
    ? getElectionIndex(elections, selectedElectionId) !== -1
      ? elections[getElectionIndex(elections, selectedElectionId)].contests?.length || 0
      : 0
    : 0;
  const difference = numberOfContests - (pinnedCandidates.size || 0);

  return ( 
    <div>
      {elections.length <= 0 ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        (() => {
          const electionIndex = getElectionIndex(elections, selectedElectionId);
          if (electionIndex !== -1 && elections[electionIndex].contests) {
            return (
              <>
                <PrecinctMapCard />
                <ElectionDetailsCard 
                  elections={elections} 
                  setSelectedElectionId={setSelectedElectionId}
                />
                <ProgressCard difference={difference}/>
                {elections[electionIndex].contests.map((contest) => (
                  <div key={`${contest.title_string} ${contest.area_name}`}>
                    <Button variant="outline" onClick={() => handleContestClick(contest)}>
                      {`${contest.area_name} ${contest.title_string}`}
                    </Button>
                  </div>
                ))}
              </>
            );
          } else {
            return <p>No contests found for the selected election.</p>;
          }
        })()
      )}
    </div>
  );
};
