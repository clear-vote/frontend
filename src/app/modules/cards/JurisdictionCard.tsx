import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { useMasterContext } from "@/context/MasterContext";


interface JurisdictionCardProps {
    jurisdictionName: string;
    /** The Contests that are a part of the particular juristriction */
    filteredContests : Contest[];
    /** The Contest Click function */
    onContestClick : (id: number) => void;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({jurisdictionName, filteredContests, onContestClick}) => {

    const { isDesktop } = useMasterContext();
    
    if (isDesktop) {
        return (
            <div className="rounded-sm juristication-card" style={{ maxWidth: "315px"}}>
                <div className="rounded-t-sm" style={{background: "linear-gradient(to right, #ff7e5f, #feb47b)"}}>
                    <h3 className="text-white" style={{ fontFamily: "'IBM Plex Mono', monospace", paddingLeft: "5px" }}>{jurisdictionName}</h3>
                    {jurisdictionName !== "Other Contests" && (
                        <JurisdictionModal jurisdiction={jurisdictionName} />
                    )}
                </div>
                {filteredContests.map((contest) => (
                    <div key={contest.id}  onClick={() => onContestClick(contest.id)}
                    style={{ backgroundColor : '#06090B0A', border: 'none', borderTop : '2px solid #24262814', padding : "10px"}}>
                        <BallotCard contest={contest}/>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="rounded-sm juristication-card">
            <div className="rounded-t-sm" style={{background: "linear-gradient(to right, #ff7e5f, #feb47b)"}}>
                <h3 className="text-white" style={{ fontFamily: "'IBM Plex Mono', monospace", paddingLeft: "5px" }}>{jurisdictionName}</h3>
                {jurisdictionName !== "Other Contests" && (
                    <JurisdictionModal jurisdiction={jurisdictionName} />
                )}
            </div>
            {filteredContests.map((contest) => (
                <div key={contest.id}  onClick={() => onContestClick(contest.id)}
                style={{ backgroundColor : '#06090B0A', border: 'none', borderTop : '2px solid #24262814', padding : "10px"}}>
                    <BallotCard contest={contest}/>
                </div>
            ))}
        </div>
    );
}