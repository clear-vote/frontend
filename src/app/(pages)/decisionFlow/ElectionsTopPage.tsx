/* ElectionsPage.tsx */

import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { ProgressCard } from "@/app/modules/cards/ProgressCard";
import PrecinctMapCard from "@/app/modules/cards/PrecinctMapCard";
import { useState, useMemo } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { ElectionDetailsCard } from "@/app/modules/cards/ElectionDetailsCard";
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMasterContext } from "@/context/MasterContext";


interface ElectionsTopPageProps {
  onSendResultsClick: () => void;
}

export const ElectionsTopPage: React.FC<ElectionsTopPageProps> = ({ onSendResultsClick }) => {
  const { elections, selectedElection } = useDecisionFlowContext();
  const { isDesktop } = useMasterContext();

  // This prevents the user from clicking elements on the drop down behind itself
  // TODO: Not currently used, because dropdown doesn't populate over any interactable elements
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // Prevents the map from being rerendered on every single state change; that wouldn't be good!
  const MemoizedPrecinctMapCard = useMemo(
    () => <PrecinctMapCard 
      token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />, 
    []
  );

  /** Mobile Mode */
  const selectedElectionData = elections[selectedElection!];
  return ( 
    <>
      <div className="flex flex-col md:flex-row gap-8">

        {MemoizedPrecinctMapCard}
        
        <div className="flex flex-col">
          <div className="border rounded-lg bg-background-white">
            <div className="gap-16 px-8 py-8">
              {/* left side */}
              <div className="flex flex-col gap-6">
                <ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />

                <div className="flex flex-col gap-2 flex-1">
                  <h1 className="font-bold text-header text-text-primary">{selectedElectionData.type} Election</h1>
                  <p className="text-text-body">A general election and a special election are both types of elections, but they serve different
                    purposes and occur under different circumstances.</p>
                </div>

                {/** TODO: Replace with "Sign up for reminders" modal */}
                <div className="flex flex-row md:flex-col lg:flex-row gap-2">
                  <Button variant="brand"><a href="https://www.youtube.com/watch?v=rv4wf7bzfFE">
                    <PersonIcon style={{width : '15px'}}/> Sign up for reminders</a>
                  </Button>
                  <Button style={{ backgroundColor: 'white', border: '1px solid lightgray', color: 'black' }}><a href="https://www.sos.wa.gov/elections/voters/voter-registration/register-vote-washington-state">
                    <HowToVoteIcon style={{width : '15px'}}/> Get registered</a>
                  </Button>

                </div>
              </div>

              {/* right side */}
              {/* <div className="col-span-2 flex flex-col p-6 bg-background-tertiary rounded-lg">
                <h4 className="text-title mb-4">Dates & Deadlines</h4>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-6">
                    <p className="w-[75px] flex-none text-body-500">April 5</p>
                    <p className="flex-1 text-text-body">Start of 18-day voting period (through Election Day). Ballots are mailed out and Accessible Voting Units (AVUs) are available at voting centers.</p>
                  </li>
                  <li className="flex gap-6">
                    <p className="w-[75px] flex-none text-body-500">April 15</p>
                    <p className="flex-1 text-text-body">Deadline for online & mail registration.</p>
                  </li>
                  <li className="flex gap-6">
                    <p className="w-[75px] flex-none text-body-500">April 23</p>
                    <p className="flex-1 text-text-body">Deposit your ballot in an official drop box by 8 p.m. on Election Day.</p>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>

          <h3 className="font-bold text-lg mt-8">Explore Your Ballot! 
            <ArrowDownwardIcon style={{ width: "20px", transform: "translateY(-1px)" }}/>
          </h3>
          <ProgressCard onSendResultsClick={onSendResultsClick}/>
        </div>
      </div>
      
    </>
  );
};
