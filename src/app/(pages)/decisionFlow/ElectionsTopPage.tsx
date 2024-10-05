import { memo, useState, useMemo } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMasterContext } from "@/context/MasterContext";
import PrecinctMapCard from "@/app/modules/cards/PrecinctMapCard";
import { ElectionDetailsCard } from "@/app/modules/cards/ElectionDetailsCard";
import { ProgressCard } from "@/app/modules/cards/ProgressCard";

// Memoized subcomponents
const MemoizedElectionDetailsCard = memo(({ setDropdownIsOpen }: { setDropdownIsOpen: (isOpen: boolean) => void }) => (
  <ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />
));

const MemoizedProgressCard = memo(({ onSendResultsClick }: { onSendResultsClick: () => void }) => (
  <ProgressCard onSendResultsClick={onSendResultsClick} />
));

interface ElectionsTopPageProps {
  onSendResultsClick: () => void;
}

const ElectionsTopPage: React.FC<ElectionsTopPageProps> = memo(({ onSendResultsClick }) => {
  const { isDesktop } = useMasterContext();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // Memoize the PrecinctMapCard
  const MemoizedPrecinctMapCard = useMemo(
    () => <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />, 
    []
  );

  // Memoize the content based on isDesktop
  const content = useMemo(() => {
    if (isDesktop) {
      return (
        <div>
          <br />
          <div className="flex justify-center items-center">
            {MemoizedPrecinctMapCard}
          </div>
          <br />
          <div style={{ padding: "8px" }}>
            <MemoizedElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />
            <br />
            <MemoizedProgressCard onSendResultsClick={onSendResultsClick} />
          </div>
        </div>
      );
    }

    return (
      <>
        {MemoizedPrecinctMapCard}
        <div style={{padding: "8px"}}>
          <MemoizedElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />
          <br /><br />
          <MemoizedProgressCard onSendResultsClick={onSendResultsClick} />
        </div>
      </>
    );
  }, [isDesktop, MemoizedPrecinctMapCard, onSendResultsClick]);

  return content;
});

ElectionsTopPage.displayName = 'ElectionsTopPage';

export { ElectionsTopPage };