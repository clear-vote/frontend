import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Election } from "@/types/index";
import { CandidateListItem } from "../cards/CandidateListCard";
import { useMasterContext } from "@/context/MasterContext";
import { CandidatePage } from "./CandidatePage";
import { PinnedCandidateListItem } from "../cards/PinnedCandidateListCard";
import { useElectionContext } from "@/context/ElectionContext";

interface CandidateDrawerProps {
  election: Election;
  candidateId: number;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
  pinned?: boolean;
}

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({
  election,
  candidateId,
  unpickedCandidates,
  setUnpickedCandidates,
  pinned
}) => {
  const { selectedContest, setSelectedCandidate } = useElectionContext();
  const { isDesktop } = useMasterContext();
  const [open, setOpen] = useState(false);

  if (selectedContest === null) return null;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setSelectedCandidate(candidateId);
    } else {
      setSelectedCandidate(null);
    }
  };

  const candidateContent = (
    <CandidatePage
      open={open}
      election={election}
      unpickedCandidates={unpickedCandidates}
      setUnpickedCandidates={setUnpickedCandidates}
    />
  );

  const triggerContent: JSX.Element = (
    pinned ? (
      <PinnedCandidateListItem
        name={election.contests[selectedContest].candidates[candidateId].name}
        website={election.contests[selectedContest].candidates[candidateId].website}
        image={election.contests[selectedContest].candidates[candidateId].image}
      />
    ) : (
      <CandidateListItem
        name={election.contests[selectedContest].candidates[candidateId].name}
        website={election.contests[selectedContest].candidates[candidateId].website}
        image={election.contests[selectedContest].candidates[candidateId].image}
      />
    )
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="max-w-[90vw] mt-10 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {candidateContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} dismissible={false} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        {candidateContent}
      </DrawerContent>
    </Drawer>
  );
};