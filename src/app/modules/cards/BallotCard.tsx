import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Contest, Election } from "@/types";
import { CandidateListItem } from "./CandidateListCard";
import AddIcon from '@mui/icons-material/Add';


interface BallotCardProps {
    /** The contest that the Ballot Card is a part of */
    contest: Contest;
    /** Function that happens when the user click on the ballot card */
    onClick?: () => void;
}

/**
 * Shows the pinned candidate of the user, or indicates that they need to pin a candidate for the contest
 * @param props Ballot Card Props for the Ballot Card
 * @returns A blank card with a plus symbol if no candidate is pinned for the contest, or a Candidate List Item
 * featuring the pinned candidate for the contest if otherwise!
 */
export const BallotCard: React.FC<BallotCardProps> = ({contest, onClick}) => {
    const {
        pinnedCandidates,
        selectedElection,
    } = useDecisionFlowContext();

    //Just to get rid of type errors!
    if (selectedElection === null) {
        return <div></div>;
    }

    //Pinned candidate contest card
    if (pinnedCandidates[selectedElection][contest.id] !== null) {
        return (
            <div onClick={onClick} className="flex flex-col items-center">
                <h3 className="font-bold">{contest.jurisdiction} {contest.title} &#x2022;
                    {Object.values(contest.candidates).length} candidates</h3>
                {/** I probably need to find a better way to do this to be honest */}
                {Object.values(contest.candidates)
                    .filter((candidate) => candidate.id === pinnedCandidates[selectedElection][contest.id])
                    .map((candidate) => (
                        <CandidateListItem name={candidate.name}
                            website={candidate.website}
                            image={candidate.image}
                            key={candidate.id} />
                    ))}
            </div>
        )
    }
    //Ballot card with no selection
    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full mb-2">
                <h3 className="text-subtitle flex-1">{contest.jurisdiction} {contest.title}</h3>
                <span>{Object.values(contest.candidates).length} candidates</span>
            </div>
            <div className="flex w-full py-16 md:py-12 items-center justify-center bg-background-white hover:bg-gray-100 hover:cursor-pointer rounded-md border-dashed border-2 border-border-primary" onClick={onClick}>
                <AddIcon fontSize="large" style={{ color: 'darkgray' }} />
            </div>
        </div>
    );
}