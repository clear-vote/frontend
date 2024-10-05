import { Contest } from "@/types";
import { CandidateListItem } from "./CandidateListCard";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useElectionContext } from "@/context/ElectionContext";
import { useCandidateContext } from "@/context/CandidateContext";


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
        selectedElection,
    } = useElectionContext();
    
    const {
        pinnedCandidates,
    } = useCandidateContext();
    
    //Just to get rid of type errors!
    if (selectedElection === null) {
        return <div></div>;
    }

    //Pinned candidate contest card
    if (pinnedCandidates[selectedElection][contest.id] !== null) {
        return (
            <div onClick={onClick} className="flex flex-col">
                <div className="flex justify-between items-center">
                <h3 className="font-bold mr-auto truncate overflow-hidden whitespace-nowrap max-w-xs">{contest.jurisdiction} {contest.title}</h3>
                    <CheckCircleIcon className="ml-auto" style={{ color: "#947FEE" }} />
                </div>
                {/** I probably need to find a better way to do this to be honest */}
                <div className="flex justify-center items-center">
                    {Object.values(contest.candidates)
                        .filter((candidate) => candidate.id === pinnedCandidates[selectedElection][contest.id])
                        .map((candidate) => (
                            <CandidateListItem 
                                name={candidate.name}
                                website={candidate.website}
                                image={candidate.image}
                                key={candidate.id} 
                            />
                        ))}
                </div>
            </div>
        )
    }
    //Ballot card with no selection
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <h3 className="font-bold mr-4 truncate overflow-hidden whitespace-nowrap max-w-xs">
                    {contest.jurisdiction} {contest.title}
                </h3>
                <p className='text-xs text-gray-500 flex-shrink-0'>
                    {Object.values(contest.candidates).length} {Object.values(contest.candidates).length > 1 ? "Candidates" : "Candidate"}
                </p>
            </div>
                <div className="flex justify-center items-center">
            <div className="list-item-plus-card rounded-md flex justify-center items-center" onClick={onClick}>
                <AddIcon style={{ color: 'darkgray' }} />
            </div>
            </div>
        </div>
    );
}