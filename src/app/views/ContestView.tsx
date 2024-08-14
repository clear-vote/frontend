"use client"

import { IContest } from "@/interfaces/ContestInterfaces";
import { CandidateListItem } from "../components/CandidateListItem";
import { ICandidate } from "@/interfaces/CandidateInterfaces";
import { useRejectedCandidates } from "@/context/RejectedCandidatesContext";

/**
 * The Contest View for a Contest
 * @param contest_info The information for the contest
 * @returns A render of the Contest View
 */
export function ContestView(contest_info: IContest) {
    const { addRejectedCandidate } = useRejectedCandidates();
    //const { removeRejectedCandidate } = useRejectedCandidates();
    const { rejectedCandidates } = useRejectedCandidates();

    /**
     * Handles adding a candidate to the Rejected Set for a contest
     * @param candidate The Candidate to add to the Rejected Set
     */
    const handleAddCandidate = (candidate: ICandidate) => {
        addRejectedCandidate(contest_info, candidate);
    };

    /**
     * Handles adding a candidate to the Rejected Set for a contest
     * @param candidate The Candidate to add to the Rejected Set
     */
    const handleRestoreCandidate = (candidate: ICandidate) => {
        addRejectedCandidate(contest_info, candidate);
    };
    
    /**
     * Renders a Candidate List Item for a rejected candidate
     * @param contest_info The Contest of which the Candidate is a part of
     * @param candidate The Candidate to render the Candidate List Item for
     * @returns A render Candidate List item if the Candidate is rejected, nothing otherwise
     */
    function renderRemovedCandidate(contest_info: IContest, candidate: ICandidate) {
        const { rejectedCandidates } = useRejectedCandidates();
        if (rejectedCandidates.get(contest_info)?.has(candidate)) {
            return (
                <div>
                    <CandidateListItem key={candidate.name} contest_info={contest_info} candidate_info={candidate} />
                </div>

            );
        }
    }

    /**
     * Renders a Candidate List Item for non-rejected candidate
     * @param contest_info The Contest that the Candidate is a part of
     * @param candidate The Candidate to render the Candidate List Item for
     * @returns A rendered Candidate List Item if the Candidate is not rejected, nothing if otherwise
     */
    function renderRemainingCandidate(contest_info: IContest, candidate: ICandidate) {
        const { rejectedCandidates } = useRejectedCandidates();
        if (!rejectedCandidates.get(contest_info)?.has(candidate)) {
            return (
                <div>
                    <CandidateListItem key={candidate.name} contest_info={contest_info} candidate_info={candidate} />
                    <button onClick={() => addRejectedCandidate(contest_info, candidate)}>BOO!</button>
                </div>

            );
        }
    }

    return (
        <div>
            <p className="capitalize">{contest_info.title_string}</p>
            <p>Candidates</p>
            <p>On your ballot &#x2022; {contest_info.candidates.length - (rejectedCandidates.get(contest_info) ?
                rejectedCandidates.get(contest_info)!.size : 0)} Candidates</p>
            {contest_info.candidates.map((candidate, index) =>
                <div key={index}>
                    {renderRemainingCandidate(contest_info, candidate)}
                </div>

            )}
            <p>Hidden &#x2022; {(rejectedCandidates.get(contest_info) ?
                rejectedCandidates.get(contest_info)!.size : 0)} Candidates</p>
            {contest_info.candidates.map((candidate, index) =>
                <div key={index}>{renderRemovedCandidate(contest_info, candidate)}</div>
            )}
        </div>
    );
}
