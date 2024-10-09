import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HiddenCandidates, PinnedCandidates } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useElectionContext } from "@/context/ElectionContext";
import { useCandidateContext } from "@/context/CandidateContext";

// After
interface HideButtonProps {
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

export const HideButton: React.FC<HideButtonProps> = ({candidateId, unpickedCandidates, setUnpickedCandidates}) => {
  const {selectedElection, selectedContest } = useElectionContext();
  const {pinnedCandidates, hiddenCandidates, setPinnedCandidates, setHiddenCandidates} = useCandidateContext();
  
  if (selectedElection === null || selectedContest === null) return

  return(
    <DrawerClose asChild>
    { !hiddenCandidates[selectedElection][selectedContest].has(candidateId) ?
      <Button 
        style={{ backgroundColor: "#FF0000", color: "white", width: "47%" }}
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
        Hide Candidate
      </Button>
    : <Button
      style={{ backgroundColor: "#FDDA0D", color: "white" }}
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
        Unhide Candidate
      </Button>
    } 
    </DrawerClose>
  )
}