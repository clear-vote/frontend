// ContestAccordions.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CandidateDrawer } from './CandidateDrawer';
import { getPinnedCandidate, getHiddenCandidatesList } from '@/utils/index';
import { Candidate, Contest } from "@/types/index";
import { Dispatch, SetStateAction } from "react";

interface ContestAccordionsProps {
  selectedContest: Contest;
  pinnedCandidates: Set<Candidate>;
  hiddenCandidates: Set<Candidate>;
  unpickedCandidates: Candidate[];
  defaultAccordion: string;
  setDefaultAccordion: Dispatch<SetStateAction<string>>;
  setUnpickedCandidates: Dispatch<SetStateAction<Candidate[]>>;
}

const ContestAccordions = ({
  selectedContest,
  pinnedCandidates,
  hiddenCandidates,
  unpickedCandidates,
  defaultAccordion,
  setDefaultAccordion,
  setUnpickedCandidates,
}: ContestAccordionsProps) => {

  const pinnedCandidate = getPinnedCandidate(selectedContest, pinnedCandidates);
  const hiddenCandidatesList = getHiddenCandidatesList(selectedContest, hiddenCandidates);

  return (
    <Accordion key={defaultAccordion} type="single" defaultValue={defaultAccordion} collapsible>
      {pinnedCandidate && (
        <AccordionItem value="Pinned">
          <AccordionTrigger>Pinned</AccordionTrigger>
          <AccordionContent>
            <CandidateDrawer
              key={pinnedCandidate.name}
              contest={selectedContest}
              candidate={pinnedCandidate}
              setDefaultAccordion={setDefaultAccordion}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="Unpicked">
        <AccordionTrigger>Candidates ({unpickedCandidates.length})</AccordionTrigger>
        <AccordionContent>
          {unpickedCandidates.map(candidate => (
            <CandidateDrawer
              key={candidate.name}
              contest={selectedContest}
              candidate={candidate}
              setDefaultAccordion={setDefaultAccordion}
              unpickedCandidates={unpickedCandidates}
              setUnpickedCandidates={setUnpickedCandidates}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
      {hiddenCandidatesList.length > 0 && (
        <AccordionItem value="Hidden">
          <AccordionTrigger>Hidden Candidates ({hiddenCandidatesList.length})</AccordionTrigger>
          <AccordionContent>
            {hiddenCandidatesList.map(candidate => (
              <CandidateDrawer
                key={candidate.name}
                contest={selectedContest}
                candidate={candidate}
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
