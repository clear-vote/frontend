import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Election } from '@/types';
import { useCandidateContext } from '@/context/CandidateContext';
import { useElectionContext } from '@/context/ElectionContext';

interface ProgressCardProps {
  onSendResultsClick: () => void;
}


export const ProgressCard: React.FC<ProgressCardProps> = ({ onSendResultsClick }: ProgressCardProps) => {
  const { elections, selectedElection} = useElectionContext();
  const { pinnedCandidates } = useCandidateContext();

  // Calculate the number of contests and the difference
  const calculateContestsRemaining = (election: Election): number => {
    const numContests = Object.keys(election.contests).length;
    if (!pinnedCandidates[election.id]) {
      return numContests;
    }
    return numContests - Object.values(pinnedCandidates[election.id]).filter(value => value !== null).length;
  }

  const contestsRemaining = calculateContestsRemaining(elections[selectedElection!]);
  const votesCastPercentage = Math.floor(100 - (contestsRemaining * 100) / Object.keys(elections[selectedElection!].contests).length);
  const contests = elections[selectedElection!].contests;
  const totalCandidates = Object.values(contests).reduce((acc, contest) => acc + Object.values(contest.candidates).length, 0);
  const candidatesRemaining = () => {
    let count = 0;
    for (const contest of Object.values(contests)) {
      if (pinnedCandidates[selectedElection!][contest.id] === null) {
        count += Object.values(contest.candidates).length;
      }
    }
    return count
  };
  // PinnedCandidates looks like this
  // export type PinnedCandidates = {
  //   [electionId: number]: {
  //     [contestId: number]: number | null;
  //   };
  // };
  // Return the number of totalCandidates in the remining contests, not just the number of pinned candidates


  // If you want eliminated candidates instead, subtract from total
  const candidatesEliminated = totalCandidates - candidatesRemaining();


  return (
    <div className="flex justify-center items-center">
      <div style={{ width: "90%", maxWidth: "1099px" }}>
      <h3 className="font-bold text-lg">Your Ballot Progress!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/></h3>
        <ProgressBar value={(1 - (candidatesEliminated / totalCandidates)) * 100} />
        <p className="font-bold" style={{ fontSize: '12px', color: 'gray' }}>
          {votesCastPercentage}&#x25; of votes cast
        </p>
        <p className="font-bold" style={{ fontSize: '12px', color: 'gray' }}>
          {totalCandidates - candidatesEliminated} / {totalCandidates} candidates remaining
        </p>
        <br />
        {contestsRemaining === 0 && (
          <div className="flex justify-center items-center text-white">
            <Button
              variant="outline"
              onClick={() => onSendResultsClick()}
              style={{ backgroundColor: "#60D052" }}
            >
              All Votes Cast! Get Your Ballot!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};