/* ElectionDetailsCard.tsx */

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
  setDropdownIsOpen: (isOpen: boolean) => void;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({ setDropdownIsOpen }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { elections, setSelectedElection, selectedElection } = useDecisionFlowContext();

  const handleValueChange = (value: string) => {
    setSelectedElection(Number(value));
  };

  const formatElectionLabel = (election: Election) => {
    return `${election.voting_end.getFullYear()} ${months[election.voting_end.getMonth()]} ${election.type}`;
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setDropdownIsOpen(true);
    } else {
      setTimeout(() => {
        setDropdownIsOpen(false);
      }, 50);
    }
  };

  return (
    <Select 
      value={selectedElection?.toString()}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an election">
          {selectedElection !== undefined && formatElectionLabel(elections[selectedElection!])}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getSortedElections(elections).map((election: Election) => (
            <SelectItem
              key={election.id}
              value={election.id.toString()}
              disabled={Object.keys(election.contests).length === 0}
            >
              {formatElectionLabel(election)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}