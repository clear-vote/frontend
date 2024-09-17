import { ElectionDetailsCard } from "@/app/modules/cards/ElectionDetailsCard";
import { JurisdictionCard } from "@/app/modules/cards/JurisdictionCard";
import PrecinctMapCard from "@/app/modules/cards/PrecinctMapCard";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest } from "@/types";
import { getJurisdictionLevelPositions } from "@/utils/informationals";
import { useMemo, useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ProgressCard } from "@/app/modules/cards/ProgressCard";
import ContestDesktopCard from "@/app/modules/cards/desktop/ContestDesktopCard";
import CandidateCard from "@/app/modules/candidate/CandidateCard";

export interface DesktopModePageProps {
    onContestClick: (contestId: number) => void;
    onSendResultsClick: () => void;
}

/** 
 * Our beautiful desktop mode page for decision flow! 
 * TODO: Make pretty & make work!!
*/
export const DesktopModePage: React.FC<DesktopModePageProps> = ({ onContestClick, onSendResultsClick }) => {

    // This prevents the user from clicking elements on the drop down behind itself
    // TODO: Not currently used, because dropdown doesn't populate over any interactable elements
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const { elections, selectedElection } = useDecisionFlowContext();
    const { selectedContest, setSelectedContest } = useDecisionFlowContext();
    const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
    const { pinnedCandidates, setPinnedCandidates, hiddenCandidates } = useDecisionFlowContext();

    // Prevents the map from being rerendered on every single state change; that wouldn't be good!
    const MemoizedPrecinctMapCard = useMemo(
        () => <div style={{ width: "500px" }}><PrecinctMapCard
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        /></div>,
        []
    );

    return (
        <div>
            <br></br>
            <div className="flex justify-center items-center">
                {MemoizedPrecinctMapCard}
            </div>
            <br></br>
            <div style={{ padding: "8px" }}>
                <ElectionDetailsCard
                    setDropdownIsOpen={setDropdownIsOpen}
                />
                {
                    (() => {
                        const selectedElectionData = elections[selectedElection!];
                        const jurisdictions: Record<string, Contest[]> = getJurisdictionLevelPositions(selectedElectionData.contests);
                        return selectedElectionData && selectedElectionData.contests && Object.keys(selectedElectionData.contests).length > 0 ? (
                            <>
                                <br></br>
                                <div style={{ width: "90%", maxWidth: "1099px" }}>
                                    <ProgressCard onSendResultsClick={onSendResultsClick} />
                                    <h3 className="font-bold text-lg">Explore Your Ballot!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }} /></h3>
                                </div>
                                <div className="flex">
                                    <div>
                                        {Object.entries(jurisdictions).map(([jurisdictionName, contests]) => (
                                            <JurisdictionCard
                                                key={jurisdictionName}
                                                jurisdictionName={jurisdictionName}
                                                filteredContests={contests}
                                                onContestClick={setSelectedContest}
                                            />
                                        ))}
                                    </div>
                                    <ContestDesktopCard election={selectedElectionData} />
                                </div>
                            </>
                        ) : (
                            <p>No contests for this election!</p>
                        );
                    })()
                }
            </div>
        </div>
    );
}

export default DesktopModePage;