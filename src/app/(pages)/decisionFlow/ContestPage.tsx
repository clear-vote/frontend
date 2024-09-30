// ContestPage.tsx
import { useState, useEffect, FC } from 'react';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import ContestAccordions from '@/app/modules/candidate/ContestAccordion';
import { Candidate, Election } from "@/types/index";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMasterContext } from '@/context/MasterContext';
import { CandidateDrawer } from '@/app/modules/candidate/CandidateDrawer';
import ContestList from '@/app/modules/candidate/ContestList';
import PositionInfoCard from '@/app/modules/cards/PositionInfoCard';
import CloseIcon from '@mui/icons-material/Close';

interface ContestPageProps {
  election: Election;
  onBackClick: () => void;
}

const ContestPage: FC<ContestPageProps> = ({ election, onBackClick }) => {
  const {
    selectedElection,
    selectedContest,
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates,
  } = useDecisionFlowContext();

  const [defaultAccordion, setDefaultAccordion] = useState('Unpicked');
  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  const { isDesktop } = useMasterContext();

  if (selectedElection === null || selectedContest === null) return;

  useEffect(() => {
    // update the unpickedCandidates state with the list of candidates
    // who are not pinned and not hidden for the selected election and contest.
    setUnpickedCandidates(
      new Set(
        Object.values(election.contests[selectedContest].candidates).filter(
          (candidate: Candidate) =>
            pinnedCandidates[selectedElection]?.[selectedContest] !== candidate.id &&
            !hiddenCandidates[selectedElection]?.[selectedContest]?.has(candidate.id)
        ).map(candidate => candidate.id)
      )
    );
  }, [selectedElection, selectedContest, pinnedCandidates, setPinnedCandidates]);

  //Thanks Stack Overflow! This is to ensure that the Contest Page scrolls to the top when loaded in mboile mode
  if (!isDesktop) {
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  }

  if (isDesktop) {
    return (
      <div className="px-3 py-3" style={{background: 'white'}}>
      <div className="rounded-md py-3 px-1" style={{ background: 'white', border: '1px solid lightgray' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="font-bold text-3xl py-2 px-3">{election.contests[selectedContest].jurisdiction}&nbsp;{election.contests[selectedContest].title}</h1>
          <button className="px-3" onClick={onBackClick} style={{ paddingTop: "5px" }}>
            <CloseIcon />
          </button>
        </div>
        <hr style={{ width: '99%', border: '1px solid lightgray', margin: '0 auto' }} />
        <ContestList
          election={election}
          pinnedCandidate={pinnedCandidates[selectedElection][selectedContest]}
          hiddenCandidateSet={hiddenCandidates[selectedElection][selectedContest]}
          unpickedCandidates={unpickedCandidates}
          defaultAccordion={defaultAccordion}
          setDefaultAccordion={setDefaultAccordion}
          setUnpickedCandidates={setUnpickedCandidates}
        />
      </div>
      </div>
    );
  }


  return (
    <div>
      <div className="font-bold" style={{ padding: "10px", borderBottom: '1px solid #24262814',backgroundColor: "#2426280D" }}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }} />
        &nbsp;&nbsp;&nbsp;{`${election.contests[selectedContest].jurisdiction} ${election.contests[selectedContest].title}`}
      </div>
      <div style={{ padding: '8px' }}>
        <PositionInfoCard position={election.contests[selectedContest].title} />
        <ContestAccordions
          election={election}
          pinnedCandidate={pinnedCandidates[selectedElection][selectedContest]}
          hiddenCandidateSet={hiddenCandidates[selectedElection][selectedContest]}
          unpickedCandidates={unpickedCandidates}
          defaultAccordion={defaultAccordion}
          setDefaultAccordion={setDefaultAccordion}
          setUnpickedCandidates={setUnpickedCandidates}
        />
      </div>
    </div>
  );
}

export default ContestPage;