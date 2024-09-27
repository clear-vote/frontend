import { Election } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { CandidateDrawer } from "./CandidateDrawer";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

interface ContestListProps {
    election: Election;
    pinnedCandidate: number | null;
    hiddenCandidateSet: Set<number>;
    unpickedCandidates: Set<number>;
    setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
    defaultAccordion: string;
    setDefaultAccordion: Dispatch<SetStateAction<string>>;
}

const ContestList = ({
    election,
    pinnedCandidate,
    hiddenCandidateSet,
    unpickedCandidates, setUnpickedCandidates
}: ContestListProps) => {

    const { selectedContest } = useDecisionFlowContext();
    if (selectedContest === null) return null;

    return (
        <div style={{background: "#FFFFFF"}}>
            <p className="font-bold text-xl">{election.contests[selectedContest].title}</p>
            {Array.from(unpickedCandidates).map(unpickedCandidate => (
                <CandidateDrawer
                    key={election.contests[selectedContest].candidates[unpickedCandidate].name}
                    election={election}
                    candidateId={unpickedCandidate}
                    unpickedCandidates={unpickedCandidates}
                    setUnpickedCandidates={setUnpickedCandidates}
                />
            ))}
        </div>
    )
}

export default ContestList;