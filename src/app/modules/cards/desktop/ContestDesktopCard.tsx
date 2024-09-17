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
import { HideButton } from "../../misc/HideButton";

export interface ContestDesktopCardProps {
  election: Election;
}

export const ContestDesktopCard: React.FC<ContestDesktopCardProps> = ({ election }) => {
  const {
    selectedElection,
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates, selectedCandidate,
  } = useDecisionFlowContext();

  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  const [showCardOf, setShowCardOf] = useState<Candidate|undefined>(undefined);

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
        {pinnedCandidates[selectedElection][selectedContest] && 
        <div>
          <h1 className="font-bold">Pinned Candidate</h1>
          <button onClick={() => {
            if (pinnedCandidates[selectedElection] && pinnedCandidates[selectedElection][selectedContest]) {
              setShowCardOf(contest.candidates[pinnedCandidates[selectedElection][selectedContest]]);
            }
          }}>
          <CandidateListItem name={contest.candidates[pinnedCandidates[selectedElection][selectedContest]].name}
                  website={contest.candidates[pinnedCandidates[selectedElection][selectedContest]].website}
                  image={contest.candidates[pinnedCandidates[selectedElection][selectedContest]].image} />
          </button>
        </div>
        }
        <h1 className="font-bold">Candidates</h1>
        <div className="flex">
        <div>
        {Array.from(unpickedCandidates).map(unpickedCandidate => {
          const candidate = contest.candidates[unpickedCandidate];
          /** Error checking! */
          if (!candidate) return null;
          return (
              <div className="columns-1">
                <button onClick={() => setShowCardOf(candidate)}>
                <CandidateListItem name={candidate.name}
                  website={candidate.website}
                  image={candidate.image} />
                  </button>
              </div>
          );
        })}
        </div>
        <div style={{ width: "60%" }}>
                {showCardOf && <div><CandidateCard candidate={showCardOf}
                  unpickedCandidates={unpickedCandidates}
                  setUnpickedCandidates={setUnpickedCandidates} />
                  <PinButton candidateId={showCardOf.id} unpickedCandidates={unpickedCandidates} 
                    setUnpickedCandidates={setUnpickedCandidates}/>
                  <HideButton candidateId={showCardOf.id} unpickedCandidates={unpickedCandidates} 
                    setUnpickedCandidates={setUnpickedCandidates}/></div>}
              </div>
        </div>
      </div>
    </div>
  );
}

export default ContestDesktopCard;