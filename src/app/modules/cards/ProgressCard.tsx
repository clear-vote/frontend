import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Election, Contest } from '@/types';
import { useCandidateContext } from '@/context/CandidateContext';
import { useElectionContext } from '@/context/ElectionContext';
import { jsPDF,  } from 'jspdf';
import { Download } from 'lucide-react';

interface ProgressCardProps {
  onSendResultsClick: () => void;
}


export const ProgressCard: React.FC<ProgressCardProps> = ({ onSendResultsClick }: ProgressCardProps) => {
  const { elections, selectedElection} = useElectionContext();
  const { pinnedCandidates } = useCandidateContext();

  // Calculate the number of contests and the difference
  const calculateContestsRemaining = (election: Election): number => {
    const numContests = Object.keys(election.contests).length;
    if (!pinnedCandidates[election.id]) {
      return numContests;
    }
    return numContests - Object.values(pinnedCandidates[election.id]).filter(value => value !== null).length;
  }
  const contestsRemaining = calculateContestsRemaining(elections[selectedElection!]);

  const downloadCandidatesPdf = (election: Election) => {
    // pinnedCandidates[election.id].forEach()
    // array = Array.from(pinnedCandidates[election.id], ([name, value]) => ({ name, value }));
    // return JSON.stringify(pinnedCandidates[election.id]);
    // return JSON.stringify(Object.entries(election.contests));
    const doc = new jsPDF('p', 'pt');
    // alert(JSON.stringify(doc.getFontList()));
    // return;
    const contestTitleToPinned = new Map<String, String>();
    // console.log(JSON.stringify(pinnedCandidates[election.id]));
    let n = 30;
    // console.log(`Election Contests: ${JSON.stringify(election.contests)}`);
    for (const contestId in election.contests) {
      const contestTitle = election.contests[contestId].title;
      // console.log(`Contest: ${election.contests[contestId].title}`);
      const pinnedCandidateId = pinnedCandidates[election.id][contestId];
      doc.setFont("helvetica", "bold");
      doc.text(contestTitle, 30, n);
      doc.setFont("helvetica", "normal");
      const pinnedCandidateName: string = election.contests[contestId].candidates[pinnedCandidateId!]?.name;
      if (pinnedCandidateName !== undefined) {
        doc.text(`${pinnedCandidateName}`, 30, n+20); // have to put in string literal so TS doesn't get mad
      } else {
        doc.text("undecided", 30, n+18);
      }

      n += 50;
      // console.log(`--> Pinned: ${election.contests[contestId].candidates[pinnedCandidateId!]?.name}`);
      // console.log(JSON.stringify(contestTitleToPinned));
    }
    doc.save("clearvote-my-ballot.pdf")
    return JSON.stringify(contestTitleToPinned);
    // return Map.from( Object.entries(pinnedCandidates[election.id]).map(([key, value]) => (election.contests[key].title)));
    // return Object.keys(pinnedCandidates[election.id]
  }
  // const pinned = showPinnedCandidates(elections[selectedElection!]);

  return (
    <div className="flex justify-center items-center">
      <div style={{ width: "90%", maxWidth: "1099px" }}>
      <h3 className="font-bold text-lg">Your Ballot Progress!  <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/></h3>
        <ProgressBar value={(contestsRemaining * 100) / Object.keys(elections[selectedElection!].contests).length} />
        <p className="font-bold" style={{ fontSize: '12px', color: 'gray' }}>
          {Math.floor(100 - (contestsRemaining * 100) / Object.keys(elections[selectedElection!].contests).length)}&#x25; of votes cast!
        </p>
        <br />
        {/* <p>{pinned}</p> */}
          <div className="flex justify-center items-center text-white">
            <Button
              variant="outline"
              onClick={() => downloadCandidatesPdf(elections[selectedElection!])}
              style={{ backgroundColor: "#60D052" }}
            >
              &nbsp;Save Your Ballot! <Download></Download>
            </Button>
          </div>
      </div>
    </div>
  );
};