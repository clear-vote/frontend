import { Election } from '@/types/index';
import { getSortedElections } from '@/utils/index';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';

interface ElectionDetailsCardProps {
  setSelectedElectionId: (selectedElectionId: number) => void;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({setSelectedElectionId}: ElectionDetailsCardProps) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { elections } = useDecisionFlowContext();

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an election" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getSortedElections(elections).map((election: Election) => (
            <SelectItem
              key={election.id}
              value={`${election.id}`}
              onSelect={() => setSelectedElectionId(election.id)}
            >
              {election.voting_end.getFullYear()} {months[election.voting_end.getMonth()]} {election.type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}