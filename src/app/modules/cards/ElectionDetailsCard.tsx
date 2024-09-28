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
import { useMasterContext } from '@/context/MasterContext';
import { Button } from '@/components/ui/button';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

interface ElectionDetailsCardProps {
  setDropdownIsOpen: (isOpen: boolean) => void;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({ setDropdownIsOpen }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { elections, setSelectedElection, selectedElection, selectedContest } = useDecisionFlowContext();

  const handleValueChange = (value: string) => {
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

  const { isDesktop } = useMasterContext();

  if (isDesktop) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex justify-between box-border p-1 border border-black rounded-md" style={{ width: "90%", maxWidth: "1099px" }}>
          <div className="flex-1 mr-4">
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
                      disabled={Object.keys(election.contests).length === 0 || selectedContest !== undefined}
                    >
                      {formatElectionLabel(election)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h1 className="font-bold text-lg">{elections[selectedElection!].type} Election</h1>
            <p>A general election and a special election are both types of elections, but they serve different
              purposes and occur under different circumstances.
            </p>
            {/** TODO: Replace with "Sign up for reminders" link */}
            <Button style={{ backgroundColor: '#947FEE', color: 'white' }}><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
              <PersonIcon style={{ width: '15px' }} /> Sign up for reminders</a>
            </Button>
            <Button style={{ backgroundColor: 'white', border: '1px solid lightgray', color: 'black' }}><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
              <HowToVoteIcon style={{ width: '15px' }} /> Get registered</a>
            </Button>
          </div>
          <div className="flex-1 ml-4 box-border p-1 border border-black rounded-md" style={{ backgroundColor: "#F9FAFB"}}>
            <h1 className="font-bold text-lg">Dates & Deadlines</h1>
            {/** TODO: Get dates and deadline details! */}
            <p>Insert dates and deadline details here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
      <br></br>
      <h1 className="font-bold text-lg">{elections[selectedElection!].type} Election</h1>
      <p>A general election and a special election are both types of elections, but they serve different
        purposes and occur under different circumstances.
      </p>
      <br></br>
      {/** TODO: Replace with "Sign up for reminders" link */}
      <Button style={{ backgroundColor: '#947FEE', color: 'white' }}><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
        <PersonIcon style={{ width: '15px' }} /> Sign up for reminders</a>
      </Button>
      <Button style={{ backgroundColor: 'white', border: '1px solid lightgray', color: 'black' }}><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
        <HowToVoteIcon style={{ width: '15px' }} /> Get registered</a>
      </Button>
    </div>
  );

}