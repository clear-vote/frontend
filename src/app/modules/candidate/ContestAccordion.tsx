// ContestAccordions.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CandidateDrawer } from './CandidateDrawer';
import { Election } from "@/types/index";
import { Dispatch, SetStateAction } from "react";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { useMasterContext } from "@/context/MasterContext";

interface ContestAccordionsProps {
  election: Election;
  pinnedCandidate: number|null;
  hiddenCandidateSet: Set<number>;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
  defaultAccordion: string;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
}

const ContestAccordions = ({
  election,
  pinnedCandidate,
  hiddenCandidateSet,
  unpickedCandidates, setUnpickedCandidates
}: ContestAccordionsProps) => {

  const { selectedContest } = useDecisionFlowContext();
  const { isDesktop } = useMasterContext();
  if (selectedContest === null) return null;
  if (isDesktop) {
    return (
      <div>Desktop not supported</div>
    )
  }

  return (
    <Accordion key={pinnedCandidate} type="single" defaultValue={"Visible"} collapsible>
      {pinnedCandidate && (
        <AccordionItem value="Visible">
          <AccordionTrigger>Pinned</AccordionTrigger>
          <AccordionContent>
            <CandidateDrawer
              key={election.contests[selectedContest].candidates[pinnedCandidate].name}
              election={election}
              candidateId={pinnedCandidate}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="Visible">
        <AccordionTrigger>Candidates {unpickedCandidates.size}</AccordionTrigger>
        <AccordionContent>
          {Array.from(unpickedCandidates).map(unpickedCandidate => (
            <CandidateDrawer
              key={election.contests[selectedContest].candidates[unpickedCandidate].name}
              election={election}
              candidateId={unpickedCandidate}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
      {hiddenCandidateSet.size > 0 && (
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
      )}
    </Accordion>
  );
};

export default ContestAccordions;
