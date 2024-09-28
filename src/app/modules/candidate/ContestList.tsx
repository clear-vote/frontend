import { Election } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { CandidateDrawer } from "./CandidateDrawer";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        <div className="py-1" style={{background: "#FFFFFF"}}>
            {pinnedCandidate && (
                <div>
                <p className="font-bold text-xl">Pinned</p>
                <CandidateDrawer
                    key={election.contests[selectedContest].candidates[pinnedCandidate].name}
                    election={election}
                    candidateId={pinnedCandidate}
                    unpickedCandidates={unpickedCandidates}
                    setUnpickedCandidates={setUnpickedCandidates}
                    pinned={true}
                />
                </div>
            )}
            <p className="font-bold text-xl">Candidates</p>
            {Array.from(unpickedCandidates).map(unpickedCandidate => (
                <CandidateDrawer
                    key={election.contests[selectedContest].candidates[unpickedCandidate].name}
                    election={election}
                    candidateId={unpickedCandidate}
                    unpickedCandidates={unpickedCandidates}
                    setUnpickedCandidates={setUnpickedCandidates}
                />
            ))}
        {hiddenCandidateSet.size > 0 && (
        <Accordion key={pinnedCandidate} type="single" defaultValue={"Visible"} collapsible>
        <AccordionItem value="Hidden">
          <AccordionTrigger>Hidden Candidates ({hiddenCandidateSet.size})</AccordionTrigger>
          <AccordionContent>
            {Array.from(hiddenCandidateSet).map(hiddenCandidate => (
              <CandidateDrawer
                key={election.contests[selectedContest].candidates[hiddenCandidate].name}
                election={election}
                candidateId={hiddenCandidate}
                unpickedCandidates={unpickedCandidates}
                setUnpickedCandidates={setUnpickedCandidates}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        </Accordion>
      )}
        </div>
    )
}

export default ContestList;