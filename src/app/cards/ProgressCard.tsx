import { Button } from '@/components/ui/button'; // Replace 'your-button-library' with the actual library you are using for buttons
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { Election } from '@/types';

interface ProgressCardProps {
  onSendResultsClick: () => void;
}


export const ProgressCard: React.FC<ProgressCardProps> = ({ onSendResultsClick }: ProgressCardProps) => {
  const { elections, selectedElection, pinnedCandidates } = useDecisionFlowContext();

  // Calculate the number of contests and the difference
  const calculateContestsRemaining = (election: Election): number => {
    const numContests = Object.keys(election.contests).length;;
    if (!pinnedCandidates[election.id]) {
      return numContests;
    }
    return numContests - Object.values(pinnedCandidates[election.id]).filter(value => value !== null).length;
  }
  const contestsRemaining = calculateContestsRemaining(elections[selectedElection!]);

  return (
    <div>
      <p>You have {contestsRemaining} contests to vote in remaining!</p>
      {contestsRemaining === 0 && (
        <Button 
          variant="outline"
          onClick={() => onSendResultsClick()}
        >
          Next
        </Button>
      )}
    </div>
  );
};