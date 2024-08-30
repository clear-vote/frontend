import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest, Election } from "@/types";
import { forwardRef } from "react"
import { CandidateListItem } from "./CandidateListCard";

interface BallotCardProps {
    /** The contest that the Ballot Card is a part of */
    contest: Contest;
    /** The election of which the Ballot Card is a part of */
    election: Election;
    /** Function that happens when the user click on the ballot card */
    onClick? : () => void;
}

/**
 * Shows the pinned candidate of the user, or indicates that they need to pin a candidate for the contest
 * @param props Ballot Card Props for the Ballot Card
 * @returns A blank card with a plus symbol if no candidate is pinned for the contest, or a Candidate List Item
 * featuring the pinned candidate for the contest if otherwise!
 */
export const BallotCard: any = (props : BallotCardProps) =>{
    const { 
        pinnedCandidates,
        selectedElection,
      } = useDecisionFlowContext();
    //Just to get rid of type errors!
    if (selectedElection === null){
        return <div></div>;
    }
    if (pinnedCandidates[props.election.id][props.contest.id] !== null){
        return (
            <div onClick={props.onClick}>
                {/** I probably need to find a better way to do this to be honest */}
                {Object.values(props.contest.candidates)
                    .filter((candidate) => candidate.id === pinnedCandidates[props.election.id][props.contest.id])
                    .map((candidate) => (
                        <CandidateListItem name={candidate.name} 
                        website={candidate.website} 
                        image={candidate.image} 
                        key={candidate.id}/>
                    ))}
            </div>
        )
    }
    return (
        <div className="list-item" onClick={props.onClick}>
            <p>Insert plus symbol here</p>
        </div>
    );
}