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

  return (
    <div className="flex justify-center items-center">
      <div style={{ width: "90%", maxWidth: "1099px" }}>
      <h3 className="font-bold text-lg">Your Ballot Progress!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/></h3>
        <ProgressBar value={(contestsRemaining * 100) / Object.keys(elections[selectedElection!].contests).length} />
        <p className="font-bold" style={{ fontSize: '12px', color: 'gray' }}>
          {Math.floor(100 - (contestsRemaining * 100) / Object.keys(elections[selectedElection!].contests).length)}&#x25; of votes cast!
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