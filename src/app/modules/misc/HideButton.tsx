import { DrawerClose } from "@/components/ui/drawer";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Button } from "@/components/ui/button";
import { HiddenCandidates, PinnedCandidates } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useMasterContext } from "@/context/MasterContext";

// After
interface HideButtonProps {
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

export const HideButton: React.FC<HideButtonProps> = ({candidateId, unpickedCandidates, setUnpickedCandidates}) => {
  const {selectedElection, selectedContest, pinnedCandidates, hiddenCandidates, setHiddenCandidates, setPinnedCandidates } = useDecisionFlowContext();
  
  if (selectedElection === null || selectedContest === null) return
  const { isDesktop } = useMasterContext();

  if (isDesktop) {
    return (
    <div>
      { !hiddenCandidates[selectedElection][selectedContest].has(candidateId) ?
      <Button 
        variant="outline"
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
        variant="outline"
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
    </div>
    );
  }

  return(
    <DrawerClose asChild>
    { !hiddenCandidates[selectedElection][selectedContest].has(candidateId) ?
      <Button 
        variant="outline"
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
        variant="outline"
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