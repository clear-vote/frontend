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
import { useMasterContext } from '@/context/MasterContext';
import { Button } from '@/components/ui/button';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useElectionContext } from '@/context/ElectionContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface ElectionDetailsCardProps {
  setDropdownIsOpen: (isOpen: boolean) => void;
  // isLargeScreen: boolean;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({ setDropdownIsOpen }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { elections, setSelectedElection, selectedElection, selectedContest } = useElectionContext();

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

  const datesAndDeadlines = (
    <div className="flex-1 box-border p-2 border border-gray-300 rounded-sm" style={{ backgroundColor: "#F3F4F6" }}>
      <h1 className="font-bold text-xl">Dates & Deadlines</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="font-bold text-sm py-3">
          {months[elections[selectedElection!].voting_start.getMonth()]} {elections[selectedElection!].voting_start.getDate()}
        </p>
        <p style={{ marginLeft: '50px' }}>Start of voting period.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="font-bold text-sm py-2">
          {months[elections[selectedElection!].register_by.getMonth()]} {elections[selectedElection!].register_by.getDate()}
        </p>
        <p style={{ marginLeft: '50px' }}>Deadline for online and in-person registration.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="font-bold text-sm py-2">
          {months[elections[selectedElection!].voting_end.getMonth()]} {elections[selectedElection!].voting_end.getDate()}
        </p>
        <p style={{ marginLeft: '50px' }}>Deposit your ballot in an official drop box by 8 p.m. on Election Day!</p>
      </div>
    </div>
  );

  if (!isDesktop || Object.keys(elections).length <= 1) {
    return (
      <div>
        {datesAndDeadlines}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between box-border p-2 border border-gray-300 rounded-md" style={{ width: "90%", maxWidth: "1099px" }}>
        <div className="flex-1 mr-4">
          <Select
            value={selectedElection?.toString()}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
          >
            <SelectTrigger className="w-[180px]">
              <CalendarMonthIcon color="error" />
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
                    disabled={Object.keys(election.contests).length === 0 || selectedContest !== null}
                  >
                    {formatElectionLabel(election)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <h1 className="font-bold text-2xl py-2">{elections[selectedElection!].type} Election</h1>
          <p>A general election and a special election are both types of elections, but they serve different
            purposes and occur under different circumstances.
          </p>
          <br />
          {/** TODO: Replace with "Sign up for reminders" link */}
          <div>
            <Button className="text-white bg-[#947FEE] hover:bg-purple-800"><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
              <PersonIcon style={{ width: '15px' }} /> Sign up for reminders</a>
            </Button>
            <Button className="text-black bg-white hover:bg-gray-200 border border-gray-300"><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
              <HowToVoteIcon style={{ width: '15px' }} /> Get registered</a>
            </Button>
          </div>
        </div>
        {datesAndDeadlines}
      </div>
    </div>
  );
}