// ContestAccordions.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CandidateDrawer } from './CandidateDrawer';
import { Contest } from "@/types/index";
import { Dispatch, SetStateAction } from "react";

interface ContestAccordionsProps {
  electionId: number;
  selectedContest: Contest;
  pinnedCandidate: number|null;
  hiddenCandidates: Set<number>;
  unpickedCandidates: Set<number>;
  defaultAccordion: string;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}

const ContestAccordions = ({
  electionId,
  selectedContest,
  pinnedCandidate,
  hiddenCandidates,
  unpickedCandidates,
  defaultAccordion,
  setDefaultAccordion,
  setUnpickedCandidates,
}: ContestAccordionsProps) => {

  return (
    <Accordion key={defaultAccordion} type="single" defaultValue={defaultAccordion} collapsible>
      {pinnedCandidate && (
        <AccordionItem value="Pinned">
          <AccordionTrigger>Pinned</AccordionTrigger>
          <AccordionContent>
            <CandidateDrawer
              key={selectedContest.candidates[pinnedCandidate].name}
              electionId={electionId}
              contest={selectedContest}
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
              key={selectedContest.candidates[candidateId].name}
              electionId={electionId}
              contest={selectedContest}
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
                key={selectedContest.candidates[hiddenCandidate].name}
                electionId={electionId}
                contest={selectedContest}
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
