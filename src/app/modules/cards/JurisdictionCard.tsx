import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";
import PositionInfoCard from "./PositionInfoCard";
import { useElectionContext } from "@/context/ElectionContext";
import { filter } from "d3";


interface JurisdictionCardProps {
    jurisdictionName: string;
    /** The Contests that are a part of the particular juristriction */
    filteredContests: Contest[];
    /** The Contest Click function */
    onContestClick: (id: number) => void;
}

//Colors for the jurisdiction cards
const jurisdictionColors = ["linear-gradient(to right, #ff7e5f, #feb47b)", 
    "linear-gradient(to right, #90C31A, #60D052)", 
    "linear-gradient(to right, #947FEE, #D283FF)"];

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({ jurisdictionName, filteredContests, onContestClick }) => {
    const { elections, selectedElection, selectedContest } = useElectionContext();
    //Default color (orange gradient) for county-level contests and lower
    var color : number = 0;
    if (jurisdictionName === "State Legislature" || jurisdictionName === "State Contests"){
        //Purple gradient for state-level contests
        color = 2;
    } else if (jurisdictionName === "Federal Legislature" || jurisdictionName === "Presidential Contests"){
        //Green gradient for federal-level contests
        color = 1;
    }

    if (selectedContest && selectedElection && !filteredContests.includes(elections[selectedElection].contests[selectedContest])){
        return <div></div>;
    }
    return (
        <div className="flex flex-col items-center py-1" style={{width: "100%"}}>
            <div className="rounded-sm juristication-card" style={{ maxWidth: "430px", width: "92%" }}>
                <div className="rounded-t-sm" style={{ background: jurisdictionColors[color] }}>
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
                {selectedContest && selectedElection && filteredContests.includes(elections[selectedElection].contests[selectedContest]) && 
                <div>
                    <br/>
                    <PositionInfoCard position={elections[selectedElection!].contests[selectedContest!].position} />
                </div>
            }
        </div>
    );
}