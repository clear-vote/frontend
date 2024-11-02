  import CandidateCard from "./CandidateCard"
  import { HideButton } from "@/app/modules/misc/HideButton"
  import { PinButton } from "@/app/modules/misc/PinButton"
  import ScrollArea from "@/app/modules/misc/ScrollArea"
  import { useElectionContext } from "@/context/ElectionContext"
  import { Election } from "@/types"
  import { AlignCenter, ChevronLeft, ChevronRight } from "lucide-react"
  import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
  import { useMasterContext } from "@/context/MasterContext"
  import { useCandidateContext } from "@/context/CandidateContext"
  import PolitigramPie from "./PolitigramPie"
  import PolitigramInfoModal from "../modals/PolitigramInfoModal"
  import { useUIContext } from "@/context/UIContext"
  import { politigramAttributes } from "./politigram"
  import card from './card.module.css';

  interface CandidatePageProps {
    election: Election,
    unpickedCandidates: Set<number>;
    setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
    open: boolean;
  }

  export const CandidatePage = ({election, unpickedCandidates, setUnpickedCandidates, open}: CandidatePageProps) => {
    const {selectedContest, selectedCandidate, setSelectedCandidate } = useElectionContext();
    const [showButtons, setShowButtons] = useState(true);
    const { isDesktop } = useMasterContext();
    const { selectedPolitigram } = useUIContext();
    const parentRef = useRef<HTMLDivElement>(null); 
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const isSwiping = useRef<boolean>(false);
    
    if (!selectedContest || !selectedCandidate) return;
    
    const handleShowButtons = (scrollPosition: number): void => {
      // TODO: experimential feature. we can probably remove this or reuse the logic somewhere else
      if (scrollPosition >= 0) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    }

    const getNextCandidate = (direction: 'left' | 'right') => {
      const unpickedArray = Array.from(unpickedCandidates);
      const currentIndex = unpickedArray.indexOf(selectedCandidate);
      
      if (direction === 'left') {
        return currentIndex > 0 ? unpickedArray[currentIndex - 1] : unpickedArray[unpickedArray.length - 1];
      } else {
        return currentIndex < unpickedArray.length - 1 ? unpickedArray[currentIndex + 1] : unpickedArray[0];
      }
    };

    const handleLeftSwipe = () => {
      const nextCandidate = getNextCandidate('left');
      setSelectedCandidate(nextCandidate);
    };

    const handleRightSwipe = () => {
      const nextCandidate = getNextCandidate('right');
      setSelectedCandidate(nextCandidate);
    };


    const mainContent = (
      <>
        <ScrollArea positionHook={handleShowButtons}>
          <div className="relative min-h-screen w-full">
          <CandidateCard 
            position={election.contests[selectedContest].title} 
            candidate={election.contests[selectedContest].candidates[selectedCandidate]} 
            open={open}
          />
          <div
            style={{
              position: "sticky",
              bottom: "0",
              height: "50px",
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              zIndex: 9,
              pointerEvents: "none",
            }}
          />
          </div>
        </ScrollArea>
        {unpickedCandidates.has(selectedCandidate) && unpickedCandidates.size > 1 && (
          <div
            style={{
              position: "fixed",
              bottom: "60px",
              left: 0,
              right: 0,
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 40px",
              zIndex: 11,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <button onClick={handleLeftSwipe} className="bg-[#D283FF] text-white hover:bg-purple-200" style={{width: "50px", height: "50px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", border: "none", cursor: "pointer", color: "white", fontWeight: "bold"}}>
              <ChevronLeft size={28} />
            </button>
            <button onClick={handleRightSwipe} className="bg-[#D283FF] text-white hover:bg-purple-200" style={{width: "50px", height: "50px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", border: "none", cursor: "pointer", color: "white", fontWeight: "bold"}}>
              <ChevronRight size={28} />
            </button>
          </div>
        )}
        <div
          style={{
            position: "fixed",
            bottom: "50px",
            left: 0,
            right: 0,
            height: "50px",
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            zIndex: 9,
            opacity: showButtons ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: 0,
            right: 0,
            height: "50px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            background: "white",
            zIndex: 10,
            opacity: showButtons ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <PinButton 
            candidateId={selectedCandidate} 
            unpickedCandidates={unpickedCandidates} 
            setUnpickedCandidates={setUnpickedCandidates}
          />
          <HideButton 
            candidateId={selectedCandidate}
            unpickedCandidates={unpickedCandidates}
            setUnpickedCandidates={setUnpickedCandidates}
          />
        </div>
      </>
    );

  
  if (isDesktop) {
    const candidate = election.contests[selectedContest].candidates[selectedCandidate];
    return (
      <>
        <div style={{ display: 'flex'}}>
          <div style={{ width: '30%', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
              candidate.image && (
                <div className="rounded-lg">
                  <img className="rounded-lg h-[200px]" src={candidate.image} alt="Candidate Photo" />
                </div>
              )
            }
            <div className="overflow-visible w-full" ref={parentRef} style={{ display: 'flex', justifyContent: 'center' }}>
              <PolitigramPie parent={parentRef} politigramScores={candidate.politigram} open={open}/>
            </div>
            <div className="flex flex-col gap-1">
              {
                selectedPolitigram 
                ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 className={`${card.text} ${card.textPolitigram}`} style={{ backgroundColor: politigramAttributes[selectedPolitigram].color }}>
                      {selectedPolitigram.charAt(0).toUpperCase() + selectedPolitigram.slice(1)}
                    </h2>
                    <span>{((candidate.politigram[selectedPolitigram] / 100) * 9 + 1).toFixed(1)}</span>
                  </div>
                  <PolitigramInfoModal politigram={selectedPolitigram}/>
                </>
              :
                <h2 className={`${card.text} ${card.glow}`}>Click me ⬆</h2>
              }
            </div>
          </div>
          <div style={{ width: '70%', position: 'relative' }}>
            <div className="text-title text-text-primary" style={{alignItems: 'center', justifyContent: 'center', display: "flex"}}>
              <h2>{candidate.name}</h2>
            </div>
            {mainContent}
          </div>
        </div>
      </>
    );
  }

    return mainContent;
  }