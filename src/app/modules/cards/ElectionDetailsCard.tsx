/* ElectionDetailsCard.tsx */

import { Election } from '@/types/index';
import { getSortedElections } from '@/utils/helpers';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface ElectionDetailsCardProps {
  setDropdownIsOpen: (isOpen: boolean) => void;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({ setDropdownIsOpen }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { elections, 
          setSelectedElection, selectedElection,
          setSelectedContest, 
          setSelectedCandidate
        } = useDecisionFlowContext();

  const handleValueChange = (value: string) => {
    setSelectedCandidate(null);
    setSelectedContest(null);
    setSelectedElection(Number(value));
  };

  const formatElectionLabel = (election: Election) => {
    return `${election.voting_end.getFullYear()} ${months[election.voting_end.getMonth()]} ${election.type}`;
  };

  // prevents a user from tapping on the election right away after changing the election
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setDropdownIsOpen(true);
    } else {
      setTimeout(() => {
        setDropdownIsOpen(false);
      }, 200);
    }
  };

  return (
    <Select 
      value={selectedElection?.toString()}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="w-[275px]" >
        <CalendarMonthIcon color="error" />
        <SelectValue placeholder="Select an election" className="">
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