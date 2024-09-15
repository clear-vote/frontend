import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Election } from "@/types/index";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { CandidateListItem } from "../cards/CandidateListCard";
import { useMasterContext } from "@/context/MasterContext";
import { CandidatePage } from "./CandidatePage";

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
  
  const {selectedContest, setSelectedCandidate} = useDecisionFlowContext();
  const {isDesktop} = useMasterContext();

  const [open, setOpen] = useState(false)
  
  if (selectedContest === null) return;
  
  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    )
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setSelectedCandidate(candidateId);
    } else {
      setSelectedCandidate(null);
    }
  };
 
  return (
    <Drawer open={open} dismissible={false} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <CandidateListItem
          name={election.contests[selectedContest].candidates[candidateId].name}
          website={election.contests[selectedContest].candidates[candidateId].website}
          image={election.contests[selectedContest].candidates[candidateId].image}
        />
      </DrawerTrigger>
      <DrawerContent>
          <DrawerTitle></DrawerTitle>
        <CandidatePage
          open={open}
          election={election}
          unpickedCandidates={unpickedCandidates}
          setUnpickedCandidates={setUnpickedCandidates}
        />
      </DrawerContent>
    </Drawer>
  )
}
