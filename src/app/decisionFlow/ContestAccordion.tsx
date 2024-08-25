// ContestAccordions.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CandidateDrawer } from './CandidateDrawer';
import { Election } from "@/types/index";
import { Dispatch, SetStateAction } from "react";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

interface ContestAccordionsProps {
  election: Election;
  contestId: number;
  pinnedCandidate: number|null;
  hiddenCandidates: Set<number>;
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
  defaultAccordion: string;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
}

const ContestAccordions = ({
  election,
  contestId,
  pinnedCandidate,
  hiddenCandidates,
  unpickedCandidates, setDefaultAccordion,
  defaultAccordion, setUnpickedCandidates,
}: ContestAccordionsProps) => {

  return (
    <Accordion key={defaultAccordion} type="single" defaultValue={defaultAccordion} collapsible>
      {pinnedCandidate && (
        <AccordionItem value="Pinned">
          <AccordionTrigger>Pinned</AccordionTrigger>
          <AccordionContent>
            <CandidateDrawer
              key={election.contests[contestId].candidates[pinnedCandidate].name}
              election={election}
              contestId={contestId}
              candidateId={pinnedCandidate}
              setDefaultAccordion={setDefaultAccordion}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="Unpicked">
        <AccordionTrigger>Candidates {unpickedCandidates.size}</AccordionTrigger>
        <AccordionContent>
          {Array.from(unpickedCandidates).map(candidateId => (
            <CandidateDrawer
              key={election.contests[contestId].candidates[candidateId].name}
              election={election}
              contestId={contestId}
              candidateId={candidateId}
              setDefaultAccordion={setDefaultAccordion}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
      {hiddenCandidates.size > 0 && (
        <AccordionItem value="Hidden">
          <AccordionTrigger>Hidden Candidates ({hiddenCandidates.size})</AccordionTrigger>
          <AccordionContent>
            {Array.from(hiddenCandidates).map(hiddenCandidate => (
              <CandidateDrawer
                key={election.contests[contestId].candidates[hiddenCandidate].name}
                election={election}
                contestId={contestId}
                candidateId={hiddenCandidate}
                setDefaultAccordion={setDefaultAccordion}
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
