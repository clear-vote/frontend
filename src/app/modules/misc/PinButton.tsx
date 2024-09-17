import { DrawerClose } from "@/components/ui/drawer";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Button } from "@/components/ui/button";
import { HiddenCandidates, PinnedCandidates } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useMasterContext } from "@/context/MasterContext";

interface PinButtonProps {
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

export const PinButton: React.FC<PinButtonProps> = ({ candidateId, unpickedCandidates, setUnpickedCandidates }) => {
  const {selectedElection, selectedContest, pinnedCandidates, hiddenCandidates, setHiddenCandidates, setPinnedCandidates } = useDecisionFlowContext();
  const { isDesktop } = useMasterContext();

  if (isDesktop) {
    return (
      <div>
    { (pinnedCandidates[selectedElection!][selectedContest!] !== candidateId) ?
      <Button
        variant="outline"
        onClick={() => {
          // Move current pinned candidate back to unpinned state
          const currentPinnedCandidate = pinnedCandidates[selectedElection!][selectedContest!];
          if (currentPinnedCandidate) {
            setUnpickedCandidates(new Set(unpickedCandidates).add(currentPinnedCandidate));
          }

          // Remove the new candidate from the list of hidden candidates, if they are on it
          if (hiddenCandidates[selectedElection!][selectedContest!].has(candidateId)) {
            const updatedHiddenCandidates: HiddenCandidates = {
              ...hiddenCandidates,
              [selectedElection!]: {
                ...hiddenCandidates[selectedElection!],
                [selectedContest!]: new Set(hiddenCandidates[selectedElection!][selectedContest!])
              }
            };
            updatedHiddenCandidates[selectedElection!][selectedContest!].delete(candidateId);
            setHiddenCandidates(updatedHiddenCandidates);
          }

          // Pin the new candidate
          const updatedPinnedCandidates: PinnedCandidates = {
            ...pinnedCandidates,
            [selectedElection!]: {
              ...pinnedCandidates[selectedElection!],
              [selectedContest!]: null
            }
          };
          updatedPinnedCandidates[selectedElection!][selectedContest!] = candidateId;
          setPinnedCandidates(updatedPinnedCandidates);
        }}
      >
        Pin Candidate
      </Button>
    : <Button 
        variant="outline"
        onClick={() => {
          // Remove the pinned candidate
          const updatedPinnedCandidates: PinnedCandidates = {
            ...pinnedCandidates,
            [selectedElection!]: {
              ...pinnedCandidates[selectedElection!],
              [selectedContest!!]: null
            }
          };
          setPinnedCandidates(updatedPinnedCandidates);

          // Add the candidate to the unpicked set
          setUnpickedCandidates(new Set(unpickedCandidates).add(candidateId));
        }}
      >
        Unpin Candidate
      </Button>
    } </div>);
  }

  return(
    <DrawerClose asChild>
    { (pinnedCandidates[selectedElection!][selectedContest!] !== candidateId) ?
      <Button
        variant="outline"
        onClick={() => {
          // Move current pinned candidate back to unpinned state
          const currentPinnedCandidate = pinnedCandidates[selectedElection!][selectedContest!];
          if (currentPinnedCandidate) {
            setUnpickedCandidates(new Set(unpickedCandidates).add(currentPinnedCandidate));
          }

          // Remove the new candidate from the list of hidden candidates, if they are on it
          if (hiddenCandidates[selectedElection!][selectedContest!].has(candidateId)) {
            const updatedHiddenCandidates: HiddenCandidates = {
              ...hiddenCandidates,
              [selectedElection!]: {
                ...hiddenCandidates[selectedElection!],
                [selectedContest!]: new Set(hiddenCandidates[selectedElection!][selectedContest!])
              }
            };
            updatedHiddenCandidates[selectedElection!][selectedContest!].delete(candidateId);
            setHiddenCandidates(updatedHiddenCandidates);
          }

          // Pin the new candidate
          const updatedPinnedCandidates: PinnedCandidates = {
            ...pinnedCandidates,
            [selectedElection!]: {
              ...pinnedCandidates[selectedElection!],
              [selectedContest!]: null
            }
          };
          updatedPinnedCandidates[selectedElection!][selectedContest!] = candidateId;
          setPinnedCandidates(updatedPinnedCandidates);
        }}
      >
        Pin Candidate
      </Button>
    : <Button 
        variant="outline"
        onClick={() => {
          // Remove the pinned candidate
          const updatedPinnedCandidates: PinnedCandidates = {
            ...pinnedCandidates,
            [selectedElection!]: {
              ...pinnedCandidates[selectedElection!],
              [selectedContest!!]: null
            }
          };
          setPinnedCandidates(updatedPinnedCandidates);

          // Add the candidate to the unpicked set
          setUnpickedCandidates(new Set(unpickedCandidates).add(candidateId));
        }}
      >
        Unpin Candidate
      </Button>
    } 
  </DrawerClose>
  )
}