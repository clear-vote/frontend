import { memo, useState, useMemo, useEffect } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMasterContext } from "@/context/MasterContext";
import PrecinctMapCard from "@/app/modules/cards/PrecinctMapCard";
import { ElectionDetailsCard } from "@/app/modules/cards/ElectionDetailsCard";
import { ProgressCard } from "@/app/modules/cards/ProgressCard";

interface ElectionsTopPageProps {
  onSendResultsClick: () => void;
}

const ElectionsTopPage: React.FC<ElectionsTopPageProps> = memo(({ onSendResultsClick }) => {
  const { isDesktop } = useMasterContext();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  // const [isLargeScreen, setIsLargeScreen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsLargeScreen(window.innerWidth > 1024);
  //   };
    
  //   handleResize(); // Check on initial render
  //   window.addEventListener("resize", handleResize);
    
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Memoize the PrecinctMapCard
  const MemoizedPrecinctMapCard = useMemo(
    () => (
      <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
    ), []
  );

  const content = useMemo(() => {
    // layout for mobile
    if (!isDesktop) {
      return (
        <div>
          <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
          <div style={{padding: "8px"}}>
            <ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />
            <br /><br />
            <ProgressCard onSendResultsClick={onSendResultsClick} />
          </div>
        </div>
      );
    }
    
    // // layout for small screens
    // if (!isLargeScreen) (
    //   <div>
    //     <div className="flex justify-center items-center">
    //       <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
    //     </div>
    //     <br />
    //     <div style={{ padding: "8px" }}>
    //       <ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} isLargeScreen={false}/>
    //       <br />
    //       <ProgressCard onSendResultsClick={onSendResultsClick} />
    //     </div>
    //   </div>
    // );

    // Layout for screens larger than 1000px
    return (
      <div className="flex justify-center">
        <div style={{ width: "60%", paddingRight: "16px" }}>
          <ElectionDetailsCard setDropdownIsOpen={setDropdownIsOpen} />
          <br />
          <ProgressCard onSendResultsClick={onSendResultsClick} />
        </div>
        <div style={{ width: "40%" }}>
          <PrecinctMapCard token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
        </div>
      </div>
    );
  }, [isDesktop, /*isLargeScreen,*/ MemoizedPrecinctMapCard, onSendResultsClick]);

  return content;
});

ElectionsTopPage.displayName = 'ElectionsTopPage';

export { ElectionsTopPage };