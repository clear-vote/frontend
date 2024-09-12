import React, { useEffect, useState } from "react";
import PositionInfoModal from "../../modals/PositionInfoModal";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Candidate, Election } from "@/types";
import { CandidateListItem } from "../CandidateListCard";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import CandidateCard from "../../candidate/CandidateCard";
import { PinButton } from "../../misc/PinButton";

export interface ContestDesktopCardProps {
    election: Election;
}

export const ContestDesktopCard: React.FC<ContestDesktopCardProps> = ({ election }) => {
  const {
    selectedElection,
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates,selectedCandidate,
  } = useDecisionFlowContext();

  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(selectedCandidate)

  useEffect(() => {
    if (selectedElection === null || selectedContest === null) return;

    const contest = election.contests[selectedContest];
    if (!contest) return;

    // update the unpickedCandidates state with the list of candidates
    // who are not pinned and not hidden for the selected election and contest.
    setUnpickedCandidates(
      new Set(
        Object.values(contest.candidates).filter(
          (candidate: Candidate) =>
            pinnedCandidates[selectedElection]?.[selectedContest] !== candidate.id &&
            !hiddenCandidates[selectedElection]?.[selectedContest]?.has(candidate.id)
        ).map(candidate => candidate.id)
      )
    );
  }, [selectedElection, selectedContest, pinnedCandidates, setPinnedCandidates, election.contests, hiddenCandidates]);

  if (selectedElection === null || selectedContest === null) return null;

  const contest = election.contests[selectedContest];
  if (!contest) return null;

  return (
    <div>
      <div style={{ padding: '8px' }}>
        <PositionInfoModal position={contest.title} />
        {Array.from(unpickedCandidates).map(unpickedCandidate => {
          const candidate = contest.candidates[unpickedCandidate];
          /** Error checking! */
          if (!candidate) return null;
          return (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <CandidateListItem name={candidate.name} 
                website={candidate.website} 
                image={candidate.image}/>
            </DialogTrigger>
            <DialogContent>
              <p>Insert Candidate Card here!</p>
              {/* <div style={{ height:"500px"}}>
              <CandidateCard candidate={candidate} 
                unpickedCandidates={unpickedCandidates}
                setUnpickedCandidates={setUnpickedCandidates}/>
                </div> */}
            </DialogContent>
          </Dialog>

          );
        })}
      </div>
    </div>
  );
}

export default ContestDesktopCard;