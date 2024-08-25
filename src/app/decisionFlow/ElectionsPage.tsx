// ElectionsPage.tsx
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

interface ElectionsPageProps {
  election: Election;
}

export const ElectionsPage: React.FC<ElectionsPageProps> = ({ election }) => {
  const { 
    elections, 
    setSelectedContest,
    setSelectedElection,
    isDesktop,
    pinnedCandidates // Assuming pinnedCandidates is part of the context
  } = useDecisionFlowContext();

  const handleContestClick = (contest: Contest) => {
    setSelectedContest(contest.id);
  };

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    );
  }

  // Calculate the number of contests and the difference
  const contestsRemaining = (): number => {
    if (election === undefined) {
      throw new Error("No election found.");
    }
    const numContests = Object.keys(election.contests).length;;
    if (!pinnedCandidates[election.id]) {
      return numContests;
    }
    return numContests - Object.keys(pinnedCandidates[election.id]).length;
  }

  return ( 
    <div>
      <PrecinctMapCard />
      <ElectionDetailsCard setSelectedElectionId={setSelectedElection}/>
      {
        (() => {
          const selectedElectionData = elections[election.id];
          return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
            <>
              <ProgressCard difference={contestsRemaining()}/>
              {
                Object.values(selectedElectionData.contests).map((contest) => (
                  <div key={`${contest.title} ${contest.jurisdiction}`}>
                    <Button variant="outline" onClick={() => handleContestClick(contest)}>
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
