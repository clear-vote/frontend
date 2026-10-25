import { Candidate, Contest } from "@/types";
import { CandidateListItem } from "./CandidateListCard";
import { getContestHeading } from "./BallotCard";
import { useElectionContext } from "@/context/ElectionContext";
import { useCandidateContext } from "@/context/CandidateContext";

export type BallotSelection = {
    contest: Contest;
    candidate: Candidate;
}

/**
 * Collects the pinned candidate for every contest in the selected election
 * @returns A list of contests paired with the user's pinned candidate
 */
export const useBallotSelections = (): BallotSelection[] => {
    const { elections, selectedElection } = useElectionContext();
    const { pinnedCandidates } = useCandidateContext();

    if (selectedElection === null || !elections[selectedElection]) {
        return [];
    }

    const pinned = pinnedCandidates[selectedElection] ?? {};
    return Object.values(elections[selectedElection].contests)
        .filter((contest) => pinned[contest.id] != null)
        .map((contest) => ({ contest, candidate: contest.candidates[pinned[contest.id]!] }))
        .filter((selection) => selection.candidate !== undefined);
}

/**
 * Preview of the user's ballot: each contest heading with the pinned candidate's card below it
 */
export const BallotSummary: React.FC = () => {
    const selections = useBallotSelections();

    return (
        <div className="flex flex-col gap-4 w-full">
            {selections.map(({ contest, candidate }) => (
                <div key={contest.id} className="flex flex-col">
                    <h3 className="font-bold text-left">{getContestHeading(contest)}</h3>
                    <div className="flex justify-center items-center">
                        <CandidateListItem
                            name={candidate.name}
                            website={candidate.website}
                            image={candidate.image}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
