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
import { Candidate, Contest } from "@/types/index";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { CandidateCard } from "@/app/cards/CandidateCard/CandidateCard";
import { CandidateListItem } from "@/app/cards/CandidateListCard";

interface CandidateDrawerProps {
  candidate: Candidate;
  // selectedContest can be null, so we want a non-nullible version
  contest: Contest;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
  unpickedCandidates: Candidate[];
  setUnpickedCandidates: Dispatch<SetStateAction<Candidate[]>>;
}

//CandidateDrawer.tsx
export const CandidateDrawer: React.FC<CandidateDrawerProps> = (
  { contest, candidate, setDefaultAccordion, 
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
          name={candidate.name}
          website={candidate.website}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {contest.area_name}
            {contest.title_string}
            {contest.district_char ? "District " + contest.district_char : ""}
            {contest.position_char ? "Position " + contest.position_char : ""}
            {candidate.name}
          </DrawerTitle>
          <CandidateCard candidate={candidate}/>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            { !pinnedCandidates.has(candidate) ?
              <Button 
                variant="outline"
                onClick={() => {
                  const updatedPinnedCandidates = new Set(pinnedCandidates);
                  // remove existing pinned candidate, if there is one
                  for (const cand of contest.candidates) {
                    if (updatedPinnedCandidates.has(cand)) {
                      updatedPinnedCandidates.delete(cand);
                    }
                  }
                  
                  // remove the candidate from the list of hidden candidates, if they are on it
                  if (hiddenCandidates.has(candidate)) {
                    const updatedHiddenCandidates = new Set(hiddenCandidates);
                    updatedHiddenCandidates.delete(candidate);
                    setHiddenCandidates(updatedHiddenCandidates);
                  }

                  // add the new candidate to pinned candidates
                  updatedPinnedCandidates.add(candidate);
                  setPinnedCandidates(updatedPinnedCandidates);

                  // make sure the accordion state is set to pinned, so it will show up by default
                  setDefaultAccordion("Pinned");
                }}
              >
                Pin Candidate
              </Button>
            : <Button 
                variant="outline"
                onClick={() => {
                  // remove the candidate from the set
                  const updatedPinnedCandidates = new Set(pinnedCandidates);
                  updatedPinnedCandidates.delete(candidate);
                  setPinnedCandidates(updatedPinnedCandidates);

                  // add the candidate to the unpicked set
                  const updatedUnpickedCandidates =
                    new Set<Candidate>(unpickedCandidates);
                  updatedUnpickedCandidates.add(candidate);
                  setUnpickedCandidates(Array.from(updatedUnpickedCandidates));
                  
                  // set the state back to unpicked
                  setDefaultAccordion("Unpicked");
                }}
              >
                Unpin Candidate
              </Button>
            } 
          </DrawerClose>
          <DrawerClose asChild>
            { !hiddenCandidates.has(candidate) ?
              <Button 
                variant="outline"
                onClick={() => {
                  // remove the candidate from pinned candidates, if on it
                  if (pinnedCandidates.has(candidate)) {
                    const updatedPinnedCandidates = new Set(pinnedCandidates);
                    updatedPinnedCandidates.delete(candidate);
                    setPinnedCandidates(updatedPinnedCandidates);
                    setDefaultAccordion("Unpicked");
                  }
                  // add the candidate to updated candidates list
                  const updatedHiddenCandidates = new Set(hiddenCandidates);
                  updatedHiddenCandidates.add(candidate);
                  setHiddenCandidates(updatedHiddenCandidates);
                }}
              >
                Hide Candidate
              </Button>
            : <Button
                variant="outline"
                onClick={() => {
                  const updatedHiddenCandidates = new Set(hiddenCandidates);
                  updatedHiddenCandidates.delete(candidate);
                  setHiddenCandidates(updatedHiddenCandidates);

                  const updatedUnpickedCandidates = new Set(unpickedCandidates);
                  updatedUnpickedCandidates.add(candidate);
                  setUnpickedCandidates(Array.from(updatedUnpickedCandidates));
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
