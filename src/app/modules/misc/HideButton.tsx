import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HiddenCandidates, PinnedCandidates } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useElectionContext } from "@/context/ElectionContext";
import { useCandidateContext } from "@/context/CandidateContext";
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';

interface HideButtonProps {
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

export const HideButton: React.FC<HideButtonProps> = ({candidateId, unpickedCandidates, setUnpickedCandidates}) => {
  const {selectedElection, selectedContest } = useElectionContext();
  const {pinnedCandidates, hiddenCandidates, setPinnedCandidates, setHiddenCandidates} = useCandidateContext();
  
  if (selectedElection === null || selectedContest === null) return null;

  return(
    <DrawerClose asChild>
    { !hiddenCandidates[selectedElection][selectedContest].has(candidateId) ?
      <Button 
        className="bg-red-500 text-white w-1/2 hover:bg-red-700"
        style={{ width: "47%" }}
        onClick={() => {
          // Remove the candidate from pinned candidates
          if (pinnedCandidates[selectedElection][selectedContest] === candidateId) {
            const updatedPinnedCandidates: PinnedCandidates = {
              ...pinnedCandidates,
              [selectedElection]: {
                ...pinnedCandidates[selectedElection],
                [selectedContest]: null
              }
            };
            setPinnedCandidates(updatedPinnedCandidates);
          // Remove the candidate from unpicked candidates
          } else if (unpickedCandidates.has(candidateId)) {
            const newSet = new Set(unpickedCandidates);
            newSet.delete(candidateId);
            setUnpickedCandidates(newSet);
          }
            
          // Add the candidate to hidden candidates
          const updatedHiddenCandidates: HiddenCandidates = {
            ...hiddenCandidates,
            [selectedElection]: {
              ...hiddenCandidates[selectedElection],
              [selectedContest]: new Set(hiddenCandidates[selectedElection][selectedContest])
            }
          };
          updatedHiddenCandidates[selectedElection][selectedContest].add(candidateId);
          setHiddenCandidates(updatedHiddenCandidates);
        }}
      >
        <CloseIcon/>&nbsp;&nbsp;Hide Candidate
      </Button>
    : <Button
      className="bg-yellow-500 text-white hover:bg-yellow-700"
      style={{ width: "47%" }}
        onClick={() => {
          // Remove from hidden candidates
          const updatedHiddenCandidates: HiddenCandidates = {
            ...hiddenCandidates,
            [selectedElection]: {
              ...hiddenCandidates[selectedElection],
              [selectedContest]: new Set(hiddenCandidates[selectedElection][selectedContest])
            }
          };
          updatedHiddenCandidates[selectedElection][selectedContest].delete(candidateId);
          setHiddenCandidates(updatedHiddenCandidates);

          // Add to unpicked candidates
          setUnpickedCandidates(new Set(unpickedCandidates).add(candidateId));
        }}
      >
        <UndoIcon/>&nbsp;&nbsp;Unhide Candidate
      </Button>
    } 
    </DrawerClose>
  )
}