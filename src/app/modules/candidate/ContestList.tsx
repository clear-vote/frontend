import { Election } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { CandidateDrawer } from "./CandidateDrawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useElectionContext } from "@/context/ElectionContext";

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

  const { selectedContest } = useElectionContext();
  if (selectedContest === null) return null;

  return (
    <div className="py-1">
      {pinnedCandidate && (
        <div>
          <p className="font-bold text-xl px-1">Pinned</p>
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
      {Array.from(unpickedCandidates).length > 0 && <p className="font-bold text-xl px-1">Candidates</p>}
      <div className="grid grid-cols-2">
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