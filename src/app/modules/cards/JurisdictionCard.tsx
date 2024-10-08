import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";


interface JurisdictionCardProps {
    jurisdictionName: string;
    /** The Contests that are a part of the particular juristriction */
    filteredContests : Contest[];
    /** The Contest Click function */
    onContestClick : (id: number) => void;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({jurisdictionName, filteredContests, onContestClick}) => {
    return (
        <div className="rounded bg-background-primary dp-2">
            <div className="rounded-t-sm flex px-2 py-1.5" style={{background: "linear-gradient(to right, #ff7e5f, #feb47b)"}}>
                <h3 className="font-mono text-white text-symbol-link flex-1">{jurisdictionName}</h3>
                {jurisdictionName !== "Other Contests" && (<JurisdictionModal jurisdiction={jurisdictionName} />)}
            </div>

            {filteredContests.map((contest) => (
                <div key={contest.id}  onClick={() => onContestClick(contest.id)} className="p-4">
                    <BallotCard contest={contest}/>
                </div>
            ))}
        </div>
    );
}