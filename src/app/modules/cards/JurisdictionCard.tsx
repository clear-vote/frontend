import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";
import JurisdictionModal from "../modals/JurisdictionModal";


interface JurisdictionCardProps {
    /** The Contests that are a part of the particular juristriction */
    contests : Contest[];
    /** The Election which the Contests are a part of */
    election : Election;
    /** The Contest Click function */
    onContestClick : (id: number) => void;
}

export const JurisdictionCard : any = (props : JurisdictionCardProps) => {
    /** TODO: Once the jurisdiction stuff is figured out, we will be able to properly sort these out! */
    return (
        <div className="rounded-sm juristication-card">
            <div className="rounded-t-sm" style={{background: "linear-gradient(to right, #ff7e5f, #feb47b)"}}>
                <h3 className="text-white" style={{ fontFamily: "'IBM Plex Mono', monospace", paddingLeft: "5px" }}>Robville City Council</h3>
                <JurisdictionModal jurisdiction={"Robville City Council"}/>
            </div>
            {props.contests.map((contest) => (
                <div key={contest.id}  onClick={() => props.onContestClick(contest.id)}
                style={{ backgroundColor : '#06090B0A', border: 'none', borderTop : '2px solid #24262814', padding : "10px"}}>
                    <BallotCard contest={contest} election={props.election}/>
                </div>
            ))}
        </div>
    );
}