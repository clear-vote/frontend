import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HiddenCandidates, PinnedCandidates } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useCandidateContext } from "@/context/CandidateContext";
import { useElectionContext } from "@/context/ElectionContext";
import PushPinIcon from '@mui/icons-material/PushPin';
import UndoIcon from '@mui/icons-material/Undo';

interface PinButtonProps {
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

export const PinButton: React.FC<PinButtonProps> = ({ candidateId, unpickedCandidates, setUnpickedCandidates }) => {
  const { selectedElection, selectedContest } = useElectionContext();
  const { pinnedCandidates, hiddenCandidates, setHiddenCandidates, setPinnedCandidates } = useCandidateContext();
  
  return (
    <DrawerClose asChild>
      { (pinnedCandidates[selectedElection!][selectedContest!] !== candidateId) ? (
        <Button
          className="bg-green-600 text-white hover:bg-green-800"
          style={{ width: "47%" }}
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
          <PushPinIcon className="text-sm"/>&nbsp;&nbsp;Pin Candidate
        </Button>
      ) : (
        <Button 
          className="bg-yellow-500 text-white hover:bg-yellow-700"
          style={{ width: "47%" }}
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
          <UndoIcon/>&nbsp;&nbsp;Unpin Candidate
        </Button>
      )}
    </DrawerClose>
  );
}