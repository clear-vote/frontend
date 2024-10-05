import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";
import PositionInfoCard from "./PositionInfoCard";
import { useElectionContext } from "@/context/ElectionContext";


interface JurisdictionCardProps {
    jurisdictionName: string;
    /** The Contests that are a part of the particular juristriction */
    filteredContests: Contest[];
    /** The Contest Click function */
    onContestClick: (id: number) => void;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({ jurisdictionName, filteredContests, onContestClick }) => {
    const { elections, selectedElection, selectedContest } = useElectionContext();
    /** 
     * Colors used for jurisdiction cards 
     * TODO: Find a way to implement so different jursidictions have different colors!
    */
    const jurisdictionColors = ["linear-gradient(to right, #ff7e5f, #feb47b)", "linear-gradient(to right, #90C31A, #60D052)", "linear-gradient(to right, #947FEE, #D283FF)"];
    return (
        <div>
        <div className="rounded-sm juristication-card" style={{ maxWidth: "375px" }}>
            <div className="rounded-t-sm" style={{ background: jurisdictionColors[0] }}>
                <h3 className="text-white" style={{ fontFamily: "'IBM Plex Mono', monospace", paddingLeft: "5px" }}>{jurisdictionName}</h3>
                {jurisdictionName !== "Other Contests" && (
                    <JurisdictionModal jurisdiction={jurisdictionName} />
                )}
            </div>
            {selectedContest ?
                <div key={selectedContest}
                    style={{ backgroundColor: '#06090B0A', border: 'none', borderTop: '2px solid #24262814', padding: "10px" }}>
                    <BallotCard contest={elections[selectedElection!].contests[selectedContest!]} />
                </div>
                : filteredContests.map((contest) => (
                    <div key={contest.id} onClick={() => onContestClick(contest.id)}
                        style={{ backgroundColor: '#06090B0A', border: 'none', borderTop: '2px solid #24262814', padding: "10px" }}>
                        <BallotCard contest={contest} />
                    </div>
                ))}
        </div>
        {selectedContest && 
        <div><br/>
            <PositionInfoCard position={elections[selectedElection!].contests[selectedContest!].position} />
            </div>}
        </div>
    );
}