import { Election } from '@/types/index';
import { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ElectionDetailsCardProps {
  elections: Election[];
  setSelectedElectionId: (selectedElectionId: number) => void;
}

export const ElectionDetailsCard: React.FC<ElectionDetailsCardProps> = ({elections, setSelectedElectionId}: ElectionDetailsCardProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an election" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {elections.map((election) => (
            <SelectItem
              key={election.election_id}
              value={`${election.election_id}`}
              onSelect={() => setSelectedElectionId(election.election_id)}
            >
              {election.election_id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}