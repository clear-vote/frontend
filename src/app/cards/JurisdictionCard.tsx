import { Contest, Election } from "@/types";
import { BallotCard } from "./BallotCard";


interface JurisdictionCardProps {
    /** The Contests that are a part of the particular juristriction */
    contests : Contest[];
    /** The Election which the Contests are a part of */
    election : Election;
    /** The Contest Click function */
    onContestClick : (id: number) => void;
}

export const JurisdictionCard : any = (props : JurisdictionCardProps) => {
    return (
        <div>
            {/** Enter Juristriction here! */}
            {props.contests.map((contest) => (
                <div key={contest.id} className="juristication-card" onClick={() => props.onContestClick(contest.id)}>
                    <p>{contest.jurisdiction} {contest.title} &#x2022; {Object.values(contest.candidates).length} Candidates!</p>
                    <BallotCard contest={contest} election={props.election}/>
                </div>
            ))}
        </div>
    );
}