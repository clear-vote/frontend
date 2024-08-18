import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Candidate } from "@/types/index";
import './CandidateCard.module.css';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const {
    pinnedCandidates, setPinnedCandidates, 
    hiddenCandidates, setHiddenCandidates, 
    isDesktop
  } = useDecisionFlowContext();
  
  return (
    <div>
      <div style={{ height: '50vh', backgroundColor: 'grey' }}></div>
    </div>
  );
}