import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";
import PositionInfoCard from "./PositionInfoCard";
import { useElectionContext } from "@/context/ElectionContext";
import { useCandidateContext } from "@/context/CandidateContext";
import { getJurisdictionColor } from "@/utils/informationals";
import ProgressBar from '@/components/ui/progress-bar';

interface JurisdictionCardProps {
    jurisdictionName: string;
    /** The Contests that are a part of the particular juristriction */
    filteredContests: Contest[];
    /** The Contest Click function */
    onContestClick: (id: number) => void;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({ jurisdictionName, filteredContests, onContestClick }) => {
    const { elections, selectedElection, selectedContest } = useElectionContext();
    const {
        pinnedCandidates,
    } = useCandidateContext();
    //Default color (orange gradient) for county-level contests and lower

    if (selectedContest && selectedElection && !filteredContests.includes(elections[selectedElection].contests[selectedContest])) {
        return <div></div>;
    }

    return (
        <div className="flex flex-col items-center py-1 w-full px-4 my-4">
            <div className="rounded-sm juristication-card max-w-[430px] w-full">
                <div className="rounded-t-sm flex flex-row justify-between items-center px-2 py-1" style={{ background: getJurisdictionColor(jurisdictionName)! }}>
                    <h3 className="text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{jurisdictionName}</h3>
                    {jurisdictionName !== "Other Contests" && (
                        <JurisdictionModal jurisdiction={jurisdictionName} />
                    )}
                </div>
                {selectedContest ?
                    <div key={selectedContest}
                        style={{ backgroundColor: '#06090B0A', border: 'none', borderTop: '2px solid #24262814', padding: "10px" }}>
                        <BallotCard contest={elections[selectedElection!].contests[selectedContest!]} />
                    </div>
                    : <div>
                        {filteredContests.map((contest) => (
                            (!pinnedCandidates[selectedElection!][contest.id] && <div key={contest.id} onClick={() => onContestClick(contest.id)}
                                style={{ backgroundColor: '#06090B0A', border: 'none', borderTop: '2px solid #24262814', padding: "10px" }}>
                                <BallotCard contest={contest} />
                            </div>)
                        ))}
                        {filteredContests.map((contest) => (
                            (pinnedCandidates[selectedElection!][contest.id] && <div key={contest.id} onClick={() => onContestClick(contest.id)}
                                style={{ backgroundColor: '#06090B0A', border: 'none', borderTop: '2px solid #24262814', padding: "10px" }}>
                                <BallotCard contest={contest} />
                            </div>)
                        ))}
                    </div>
                }
            </div>
            {selectedContest && selectedElection && filteredContests.includes(elections[selectedElection].contests[selectedContest]) &&
                <div>
                    <br/>
                    <PositionInfoCard position={elections[selectedElection!].contests[selectedContest!].title} />
                </div>
            }
        </div>
    );
}