// ContestPage.tsx
import { useState, useEffect } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { Button } from "@/components/ui/button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContestAccordions from './ContestAccordion';
import PositionInfo from '@/app/components/PositionInfo';
import { Candidate } from "@/types/index";

interface ContestPageProps {
  onBackClick: () => void;
}

const ContestPage = ({ onBackClick }: ContestPageProps) => {
  const { 
    selectedContest,
    pinnedCandidates,
    hiddenCandidates,
    isDesktop 
  } = useDecisionFlowContext();

  const [defaultAccordion, setDefaultAccordion] = useState('Unpicked');
  const [unpickedCandidates, setUnpickedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const filteredCandidates = selectedContest?.candidates.filter(candidate => 
      !pinnedCandidates.has(candidate) && !hiddenCandidates.has(candidate));
    if (filteredCandidates !== undefined) {
      setUnpickedCandidates(filteredCandidates);
    }
  }, [selectedContest, pinnedCandidates, hiddenCandidates]);

  if (!selectedContest) return null;

  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    )
  }

  return (
    <div>
      <p>{`${selectedContest.area_name} ${selectedContest.title_string}`}</p>

      <Button onClick={onBackClick} variant="outline" className="flex items-center">
        <ArrowBackRoundedIcon />
        Back
      </Button>

      <PositionInfo position={selectedContest.title_string} />

      <ContestAccordions
        selectedContest={selectedContest}
        pinnedCandidates={pinnedCandidates}
        hiddenCandidates={hiddenCandidates}
        unpickedCandidates={unpickedCandidates}
        defaultAccordion={defaultAccordion}
        setDefaultAccordion={setDefaultAccordion}
        setUnpickedCandidates={setUnpickedCandidates}
      />
    </div>
  );
}

export default ContestPage;
