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
import { Candidate, Election, HiddenCandidates, PinnedCandidates } from "@/types/index";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { CandidateCard } from "@/app/cards/CandidateCard/CandidateCard";
import { CandidateListItem } from "@/app/cards/CandidateListCard";
import { PinButton } from "@/app/components/PinButton";

interface CandidateDrawerProps {
  election: Election;
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

//CandidateDrawer.tsx
export const CandidateDrawer: React.FC<CandidateDrawerProps> = (
  { election, candidateId, 
    unpickedCandidates, setUnpickedCandidates }) => {
  
  const {
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates, setHiddenCandidates,
    isDesktop
  } = useDecisionFlowContext();
  if (selectedContest === null) return;

  const [open, setOpen] = React.useState(false)

  if (isDesktop) {
    console.log("desktop not yet supported")
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CandidateListItem
          name={election.contests[selectedContest].candidates[candidateId].name}
          website={election.contests[selectedContest].candidates[candidateId].website}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {election.contests[selectedContest].jurisdiction}
            {election.contests[selectedContest].title}
            {election.contests[selectedContest].district ? "District " + election.contests[selectedContest].district : ""}
            {election.contests[selectedContest].position ? "Position " + election.contests[selectedContest].position : ""}
            {election.contests[selectedContest].candidates[candidateId].name}
          </DrawerTitle>
          <CandidateCard candidate={election.contests[selectedContest].candidates[candidateId]}/>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <PinButton candidateId={candidateId} unpickedCandidates={unpickedCandidates} setUnpickedCandidates={setUnpickedCandidates}/>
          {/* TODO: change this DrawerClose to HideButton, then put both in the candidate card and wrap the entire thing in a Scroll-Area */}
          <DrawerClose asChild>
            { !hiddenCandidates[election.id][selectedContest].has(candidateId) ?
              <Button 
                variant="outline"
                onClick={() => {
                  // Remove the candidate from pinned candidates
                  if (pinnedCandidates[election.id][selectedContest] === candidateId) {
                    const updatedPinnedCandidates: PinnedCandidates = {
                      ...pinnedCandidates,
                      [election.id]: {
                        ...pinnedCandidates[election.id],
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
                    [election.id]: {
                      ...hiddenCandidates[election.id],
                      [selectedContest]: new Set(hiddenCandidates[election.id][selectedContest])
                    }
                  };
                  updatedHiddenCandidates[election.id][selectedContest].add(candidateId);
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
                    [election.id]: {
                      ...hiddenCandidates[election.id],
                      [selectedContest]: new Set(hiddenCandidates[election.id][selectedContest])
                    }
                  };
                  updatedHiddenCandidates[election.id][selectedContest].delete(candidateId);
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
