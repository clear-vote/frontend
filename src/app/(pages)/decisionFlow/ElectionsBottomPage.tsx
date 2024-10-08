/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { JurisdictionCard } from "@/app/modules/cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Contest } from "@/types";
import { getJurisdictionLevelPositions } from "@/utils/informationals";

interface ElectionsBottomPageProps {
  onContestClick: (contestId: number) => void;
}

export const ElectionsBottomPage: React.FC<ElectionsBottomPageProps> = ({ onContestClick }) => {
  const { elections, selectedElection } = useDecisionFlowContext();
  const selectedElectionData = elections[selectedElection!];
  const jurisdictions: Record<string, Contest[]> = getJurisdictionLevelPositions(selectedElectionData.contests);
  
  return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
    <>
      {Object.entries(jurisdictions).map(([jurisdictionName, contests]) => (
        <JurisdictionCard
          key={jurisdictionName}
          jurisdictionName={jurisdictionName}
          filteredContests={contests}
          onContestClick={onContestClick}
        />
      ))}
    </>
  ) : (
    <p>No contests found for the selected election.</p>
  );
};
