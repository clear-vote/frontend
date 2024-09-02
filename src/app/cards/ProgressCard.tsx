import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { Election } from '@/types';

interface ProgressCardProps {
  onSendResultsClick: () => void;
}


export const ProgressCard: React.FC<ProgressCardProps> = ({ onSendResultsClick }: ProgressCardProps) => {
  const { elections, selectedElection, pinnedCandidates } = useDecisionFlowContext();

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
    <div>
      <ProgressBar value={(contestsRemaining*100) / Object.keys(elections[selectedElection!].contests).length}/>
      <p className="font-bold" style={{ fontSize: '12px', color: 'gray' }}>
        {Math.floor(100-(contestsRemaining*100) / Object.keys(elections[selectedElection!].contests).length)}&#x25; of votes cast!
      </p>
      {contestsRemaining === 0 && (
        <div>
        <p className="font-bold">Complete! Click "Next" to save your ballot!</p>
        <Button 
          variant="outline"
          onClick={() => onSendResultsClick()}
        >
          Next
        </Button>
        </div>
      )}
    </div>
  );
};