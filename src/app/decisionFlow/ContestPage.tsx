// ContestPage.tsx
import { useState, useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { Button } from "@/components/ui/button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContestAccordions from './ContestAccordion';
import PositionInfo from '@/app/modals/PositionInfoModal';
import { Candidate, Contest, PinnedCandidates, HiddenCandidates } from "@/types/index";

interface ContestPageProps {
  contest: Contest;
  onBackClick: () => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ contest, onBackClick }) => {
  const { 
    selectedElection,
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates, setHiddenCandidates,
    isDesktop 
  } = useDecisionFlowContext();
  
  const [defaultAccordion, setDefaultAccordion] = useState('Unpicked');
  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  
  if (selectedElection === null || selectedContest === null) return;

  useEffect(() => {
    setPinnedCandidates((prevState: PinnedCandidates) => {
      if (!prevState[selectedElection]) {
        // If selectedElection doesn't exist, add it with selectedContest as null
        return {
          ...prevState,
          [selectedElection]: { [selectedContest]: null }
        };
      } else if (!prevState[selectedElection][selectedContest]) {
        // If selectedElection exists but selectedContest doesn't, add selectedContest as null
        return {
          ...prevState,
          [selectedElection]: {
            ...prevState[selectedElection],
            [selectedContest]: null
          }
        };
      }
      return prevState;
    });

    setHiddenCandidates((prevState: HiddenCandidates) => {
      if (!prevState[selectedElection]) {
        // If selectedElection doesn't exist, add it with selectedContest as null
        return {
          ...prevState,
          [selectedElection]: { [selectedContest]: new Set() }
        };
      } else if (!prevState[selectedElection][selectedContest]) {
        // If selectedElection exists but selectedContest doesn't, add selectedContest as null
        return {
          ...prevState,
          [selectedElection]: {
            ...prevState[selectedElection],
            [selectedContest]: new Set()
          }
        };
      }
      return prevState;
    });
    
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
  }, [selectedElection, selectedContest, pinnedCandidates, setPinnedCandidates]);

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    )
  }

  return (
    <div>
      <p>{`${contest.jurisdiction} ${contest.title}`}</p>

      <Button onClick={onBackClick} variant="outline" className="flex items-center">
        <ArrowBackRoundedIcon />
        Back
      </Button>

      <PositionInfo position={contest.title} />

      <ContestAccordions
        electionId={selectedElection}
        selectedContest={contest}
        pinnedCandidate={pinnedCandidates[selectedElection][selectedContest]}
        hiddenCandidates={hiddenCandidates[selectedElection][selectedContest]}
        unpickedCandidates={unpickedCandidates}
        defaultAccordion={defaultAccordion}
        setDefaultAccordion={setDefaultAccordion}
        setUnpickedCandidates={setUnpickedCandidates}
      />
    </div>
  );
}

export default ContestPage;