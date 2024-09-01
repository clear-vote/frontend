// ContestPage.tsx
import { useState, useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestAccordions from '../components/ContestAccordion';
import { Candidate, Election } from "@/types/index";
import PositionInfoModal from '@/app/modals/PositionInfoModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  //Thanks Stack Overflow! This is to ensure that the Contest Page scrolls to the top when loaded
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className="font-bold" style={{padding: "10px", backgroundColor: "#2426280D", borderBottom : '1px solid #24262814'}}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }}/>
        &nbsp;&nbsp;&nbsp;{`${election.contests[selectedContest].jurisdiction} ${election.contests[selectedContest].title}`}
      </div>
      <div style={{padding: '8px'}}>
      <PositionInfoModal position={election.contests[selectedContest].title} />
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
    </div>
  );
}

export default ContestPage;