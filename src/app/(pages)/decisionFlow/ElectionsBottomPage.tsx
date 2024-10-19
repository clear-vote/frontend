/* ElectionsPage.tsx */

import { useElectionContext } from "@/context/ElectionContext";
import { JurisdictionCard } from "@/app/modules/cards/JurisdictionCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Contest } from "@/types";
import { getJurisdictionLevelPositions } from "@/utils/informationals";
import { useMasterContext } from "@/context/MasterContext";

interface ElectionsBottomPageProps {
  onContestClick: (contestId: number) => void;
}

export const ElectionsBottomPage: React.FC<ElectionsBottomPageProps> = ({ onContestClick }) => {
  const { elections, selectedElection } = useElectionContext();
  const selectedElectionData = elections[selectedElection!];
  const jurisdictions: Record<string, Contest[]> = getJurisdictionLevelPositions(selectedElectionData.contests);
  // const { isDesktop } = useMasterContext();

  // if (isDesktop) {
  //   return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
  //     <div className="px-5" style={{padding: "20px", paddingLeft: "50px"}}>
  //       {Object.entries(jurisdictions).map(([jurisdictionName, contests]) => (
  //         <>
  //           <JurisdictionCard
  //           key={jurisdictionName}
  //           jurisdictionName={jurisdictionName}
  //           filteredContests={contests}
  //           onContestClick={onContestClick}
  //         />
  //         </>
  //       ))}
  //     </div>
  //   ) : (
  //     <p style={{ background: "#F3F4F6"}}>No contests found for the selected election.</p>
  //   );
  // }
return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
  <div>
    {Object.entries(jurisdictions).map(([jurisdictionName, contests]) => (
      <JurisdictionCard
        key={jurisdictionName}
        jurisdictionName={jurisdictionName}
        filteredContests={contests}
        onContestClick={onContestClick}
      />
    ))}
  </div>
  ) : (
    <div>
      <p>No contests found for the selected election.</p>
    </div>
  );
};
