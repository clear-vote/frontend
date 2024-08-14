"use client"

import { ICandidate } from "@/interfaces/CandidateInterfaces";
import { IContest } from "@/interfaces/ContestInterfaces";

/**
 * Returns a render of the Candidate List Item
 * @param candidate_info The Candidate to render the item for 
 * @returns A render of the Candidate List Item
 */
export function CandidateListItem (props : {contest_info : IContest, candidate_info : ICandidate}){
    if (props.candidate_info.image === null){
        return (
            <div>
                <p>No image avalible fool!</p>
                {props.candidate_info.name}
                {props.candidate_info.website}
            </div>
        )
    }
      return (
    <div className="candidate-card">
      <div className="candidate-card-headshot">
        <img src={props.candidate_info.image} alt={props.candidate_info.name} />
      </div>
      <div className="candidate-card-details">
        <h3>{props.candidate_info.name}</h3>
        {props.candidate_info.website}
      </div>
    </div>
  );
}