// ContestPage.tsx
import { useState, useEffect, FC } from 'react';
import { useElectionContext } from '@/context/ElectionContext';
import { useCandidateContext } from '@/context/CandidateContext';
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
    selectedContest
  } = useElectionContext();
  const {
    pinnedCandidates, setPinnedCandidates,
    hiddenCandidates,
  } = useCandidateContext();

  const [defaultAccordion, setDefaultAccordion] = useState('Unpicked');
  const [unpickedCandidates, setUnpickedCandidates] = useState<Set<number>>(new Set());
  const { isDesktop } = useMasterContext();

  /** I would like to dedicate this function to Copilot and Stack Overflow */
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      console.log('Navigation attempt detected. Staying on the page.');
      onBackClick();
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBackClick]);

  useEffect(() => {
    // update the unpickedCandidates state with the list of candidates
    // who are not pinned and not hidden for the selected election and contest.
    if (selectedElection === null || selectedContest === null) return;
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
  useEffect(() => {
    if (selectedElection === null || selectedContest === null) return;
    if (!isDesktop) {
      window.scrollTo(0, 0)
    }
  }, [])

  if (selectedElection === null || selectedContest === null) return;

  if (isDesktop) {
    return (
      <div className="px-3 py-3" style={{ background: 'white',  }}>
        <div className="rounded-md py-3 px-1" style={{ background: 'white', border: '1px solid lightgray' }}>
          <div style={{ display: 'flex',  }}>
            <button className="px-3" onClick={onBackClick} style={{ paddingTop: "5px" }}>
              <ArrowBackIcon onClick={onBackClick} style={{ fontSize: '30px', transform: "translateY(-2px)" }} />
            </button>
            <h1 className="font-bold text-3xl py-2 px-3">{election.contests[selectedContest].jurisdiction}&nbsp;{election.contests[selectedContest].title}</h1>
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
      <div className="font-bold" style={{ padding: "10px", borderBottom: '1px solid #24262814', backgroundColor: "#2426280D" }}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }} />
        &nbsp;&nbsp;&nbsp;{`${election.contests[selectedContest].jurisdiction} ${election.contests[selectedContest].title}`}
      </div>
      <br></br>
      <div>
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