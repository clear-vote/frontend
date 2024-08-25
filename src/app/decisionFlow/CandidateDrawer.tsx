import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { trimLink } from "@/utils/index"
import { Election, HiddenCandidates, PinnedCandidates } from "@/types/index";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { CandidateCard } from "@/app/cards/CandidateCard/CandidateCard";
import { CandidateListItem } from "@/app/cards/CandidateListCard";

interface CandidateDrawerProps {
  election: Election;
  contestId: number;
  candidateId: number;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

//CandidateDrawer.tsx
export const CandidateDrawer: React.FC<CandidateDrawerProps> = (
  { election, contestId, candidateId, 
    setDefaultAccordion, 
    unpickedCandidates, setUnpickedCandidates }) => {
  
  const {
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates, setHiddenCandidates,
    isDesktop
  } = useDecisionFlowContext();

  const [open, setOpen] = React.useState(false)

  if (isDesktop) {
    console.log("desktop not yet supported")
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CandidateListItem
          name={election.contests[contestId].candidates[candidateId].name}
          website={election.contests[contestId].candidates[candidateId].website}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {election.contests[contestId].jurisdiction}
            {election.contests[contestId].title}
            {election.contests[contestId].district ? "District " + election.contests[contestId].district : ""}
            {election.contests[contestId].position ? "Position " + election.contests[contestId].position : ""}
            {election.contests[contestId].candidates[candidateId].name}
          </DrawerTitle>
          <CandidateCard candidate={election.contests[contestId].candidates[candidateId]}/>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            { !pinnedCandidates[election.id][contestId] ?
              <Button 
                variant="outline"
                onClick={() => {
                  // Move current pinned candidate back to unpinned state
                  const currentPinnedCandidate = pinnedCandidates[election.id][contestId];
                  if (currentPinnedCandidate) {
                    setUnpickedCandidates(new Set(unpickedCandidates).add(currentPinnedCandidate));
                  }

                  // Remove the new candidate from the list of hidden candidates, if they are on it
                  if (hiddenCandidates[election.id][contestId].has(candidateId)) {
                    const updatedHiddenCandidates: HiddenCandidates = {
                      ...hiddenCandidates,
                      [election.id]: {
                        ...hiddenCandidates[election.id],
                        [contestId]: new Set(hiddenCandidates[election.id][contestId])
                      }
                    };
                    updatedHiddenCandidates[election.id][contestId].delete(candidateId);
                    setHiddenCandidates(updatedHiddenCandidates);
                  }

                  // Pin the new candidate
                  const updatedPinnedCandidates: PinnedCandidates = {
                    ...pinnedCandidates,
                    [election.id]: {
                      ...pinnedCandidates[election.id],
                      [contestId]: null
                    }
                  };
                  updatedPinnedCandidates[election.id][contestId] = candidateId;
                  setPinnedCandidates(updatedPinnedCandidates);

                  // Set accordion state to pinned, so it will show up by default
                  setDefaultAccordion("Pinned");
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
                    [election.id]: {
                      ...pinnedCandidates[election.id],
                      [contestId]: null
                    }
                  };
                  setPinnedCandidates(updatedPinnedCandidates);

                  // Add the candidate to the unpicked set
                  setUnpickedCandidates(new Set(unpickedCandidates).add(candidateId));
                  
                  // set the state back to unpicked
                  setDefaultAccordion("Unpicked");
                }}
              >
                Unpin Candidate
              </Button>
            } 
          </DrawerClose>
          <DrawerClose asChild>
            { !hiddenCandidates[election.id][contestId].has(candidateId) ?
              <Button 
                variant="outline"
                onClick={() => {
                  // Remove the candidate from pinned candidates
                  if (pinnedCandidates[election.id][contestId] === candidateId) {
                    const updatedPinnedCandidates: PinnedCandidates = {
                      ...pinnedCandidates,
                      [election.id]: {
                        ...pinnedCandidates[election.id],
                        [contestId]: null
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
                    [election.id]: {
                      ...hiddenCandidates[election.id],
                      [contestId]: new Set(hiddenCandidates[election.id][contestId])
                    }
                  };
                  updatedHiddenCandidates[election.id][contestId].add(candidateId);
                  setHiddenCandidates(updatedHiddenCandidates);

                  // Unpick the candidate from the accordion
                  setDefaultAccordion("Unpicked");
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
                    [election.id]: {
                      ...hiddenCandidates[election.id],
                      [contestId]: new Set(hiddenCandidates[election.id][contestId])
                    }
                  };
                  updatedHiddenCandidates[election.id][contestId].delete(candidateId);
                  setHiddenCandidates(updatedHiddenCandidates);

                  // Add to unpicked candidates
                  setUnpickedCandidates(new Set(unpickedCandidates).add(candidateId));
                }}
              >
                Unhide Candidate
              </Button>
            } 
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
