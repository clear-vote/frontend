import CandidateCard from "./CandidateCard"
import { HideButton } from "@/app/modules/misc/HideButton"
import { PinButton } from "@/app/modules/misc/PinButton"
import ScrollArea from "@/app/modules/misc/ScrollArea"
import { useElectionContext } from "@/context/ElectionContext"
import { Election } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

interface CandidatePageProps {
  election: Election,
  unpickedCandidates: Set<number>;
  setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
  open: boolean;
}

export const CandidatePage = ({election, unpickedCandidates, setUnpickedCandidates, open}: CandidatePageProps) => {
  const {selectedContest, selectedCandidate, setSelectedCandidate} = useElectionContext();
  const [showButtons, setShowButtons] = useState(true);
  
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

  return(
    <>
      <ScrollArea positionHook={handleShowButtons}>
        <CandidateCard position={election.contests[selectedContest].title} candidate={election.contests[selectedContest].candidates[selectedCandidate]} open={open}/>
        <div
          style={{
            position: "sticky",
            bottom: "0", // Position it just above the buttons
            height: "50px", // Give it a fixed height
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            zIndex: 9, // Ensure this div is below the buttons but above the content
            pointerEvents: "none", // Allows interaction with content underneath
          }}
        />
      </ScrollArea>
      {unpickedCandidates.has(selectedCandidate) && unpickedCandidates.size > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: "60px", // Positioned above the existing buttons
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
          <button
            onClick={handleLeftSwipe}
            style={{
              width: "50px", // Increased size
              height: "50px", // Increased size
              borderRadius: "50%",
              background: "#D283FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // More pronounced drop shadow
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold", // Bolder text
            }}
          >
            <ChevronLeft size={28} /> {/* Increased icon size */}
          </button>
          <button
            onClick={handleRightSwipe}
            style={{
              width: "50px", // Increased size
              height: "50px", // Increased size
              borderRadius: "50%",
              background: "#D283FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // More pronounced drop shadow
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold", // Bolder text
            }}
          >
            <ChevronRight size={28} /> {/* Increased icon size */}
          </button>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: "50px", // Position it just above the buttons
          left: 0,
          right: 0,
          height: "50px", // Give it a fixed height
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
          zIndex: 9, // Ensure this div is below the buttons but above the content
          opacity: showButtons ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none", // Allows interaction with content underneath
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: 0,
          right: 0,
          height: "50px", // Match the height of your buttons
          display: "flex",
          justifyContent: "space-around", // Evenly space the buttons
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
  )
}