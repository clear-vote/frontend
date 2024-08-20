// ContestAccordions.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CandidateDrawer } from './CandidateDrawer';
import { getPinnedCandidate, getHiddenCandidatesList } from '@/utils/index';
import { Candidate, Contest } from "@/types/index";
import { Dispatch, SetStateAction, useEffect } from "react";

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

  /**Function to change currently open accordion */
  useEffect(() => {
    if (pinnedCandidate) {
      setDefaultAccordion("Pinned");
    } else {
      setDefaultAccordion("Unpicked");
    }
  }, [pinnedCandidate, setDefaultAccordion]);

  return (
    <Accordion key={defaultAccordion} type="single" defaultValue={defaultAccordion} collapsible>
      <AccordionItem value="Pinned">
        <AccordionTrigger>Pinned</AccordionTrigger>
        {pinnedCandidate ? (
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
        ) : (
          <AccordionContent>
            <p>No pinned candidate; try pinning a candidate to get started!</p>
          </AccordionContent>
        )}
      </AccordionItem>
      <AccordionItem value="Unpicked">
        <AccordionTrigger>Candidates ({unpickedCandidates.length})</AccordionTrigger>
        <AccordionContent>
          {(unpickedCandidates.length > 0) ? (
            unpickedCandidates.map((candidate) => (
              <CandidateDrawer
                key={candidate.name}
                contest={selectedContest}
                candidate={candidate}
                setDefaultAccordion={setDefaultAccordion}
                unpickedCandidates={unpickedCandidates}
                setUnpickedCandidates={setUnpickedCandidates}
              />
            ))
          ) : ((pinnedCandidate) ? (
            <div>No candidates left; unhide or unpin a candidate to choose another.</div>
          ) : (
          <div>No candidates left; unhide a candidate to find your pick.</div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Hidden">
        <AccordionTrigger>Hidden Candidates ({hiddenCandidatesList.length})</AccordionTrigger>
        <AccordionContent>
          {(hiddenCandidatesList.length > 0) ? (
            hiddenCandidatesList.map(candidate => (
              <div>
                <CandidateDrawer
                  key={candidate.name}
                  contest={selectedContest}
                  candidate={candidate}
                  setDefaultAccordion={setDefaultAccordion}
                  unpickedCandidates={unpickedCandidates}
                  setUnpickedCandidates={setUnpickedCandidates}
                />
              </div>
            ))
          ) : (
            <p>Your hidden candidates will show up here.</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ContestAccordions;
