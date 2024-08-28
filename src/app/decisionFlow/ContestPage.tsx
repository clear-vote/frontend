// ContestPage.tsx
import { useState, useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { Button } from "@/components/ui/button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContestAccordions from '../components/ContestAccordion';
import PositionInfo from '@/app/modals/PositionInfoModal';
import { Candidate, Election } from "@/types/index";

interface ContestPageProps {
  election: Election;
  onBackClick: () => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ election, onBackClick }) => {
  const { 
    selectedElection,
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates,
    isDesktop 
  } = useDecisionFlowContext();
  
  const [defaultAccordion, setDefaultAccordion] = useState('Unpicked');
  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  
  if (selectedElection === null || selectedContest === null) return;

  useEffect(() => {
    // update the unpickedCandidates state with the list of candidates
    // who are not pinned and not hidden for the selected election and contest.
    setUnpickedCandidates(
      new Set(
        Object.values(election.contests[selectedContest].candidates).filter(
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
      <p>{`${election.contests[selectedContest].jurisdiction} ${election.contests[selectedContest].title}`}</p>

      <Button onClick={onBackClick} variant="outline" className="flex items-center">
        <ArrowBackRoundedIcon />
        Back
      </Button>

      <PositionInfo position={election.contests[selectedContest].title} />

      <ContestAccordions
        election={election}
        pinnedCandidate={pinnedCandidates[selectedElection][selectedContest]}
        hiddenCandidateSet={hiddenCandidates[selectedElection][selectedContest]}
        unpickedCandidates={unpickedCandidates}
        defaultAccordion={defaultAccordion}
        setDefaultAccordion={setDefaultAccordion}
        setUnpickedCandidates={setUnpickedCandidates}
      />
    </div>
  );
}

export default ContestPage;