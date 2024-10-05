import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ToolbarProps {
  isDesktop: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isDesktop }) => {

  // TODO: We can't have a mobile toolbar yet, because it blocks the back button in the candidate flow!
  if (!isDesktop) {
    return null;
  }
  // /** Mobile mode toolbar */
  // if (!isDesktop) {
  //   return (
  //     <div className="toolbar-mobile" style={{ position: 'fixed', zIndex: 100, justifyContent: 'space-between', fontFamily: "'IBM Plex Mono', sans-serif"}}>
  //       <Link href="/" className="flex items-center">
  //         <Image src="/branding/favicon.svg" alt="Home" width={26} height={26} />
  //         <h1 className="font-bold">&nbsp;Clearvote</h1>
  //       </Link>
  //       <ToolbarMobileModal/>
  //     </div>
  //   );
  // }

  /** Desktop mode toolbar */
  return (
    <div className="toolbar-desktop" style={{ position: 'fixed', zIndex: 100, justifyContent: 'space-between', fontFamily: "'IBM Plex Mono', sans-serif"}}>
        <Link href="/" className="flex items-center">
          <Image src="/branding/favicon.svg" alt="Home" width={26} height={26} />
          <h1 className="font-bold">&nbsp;Clearvote</h1>
        </Link>
      <div className="flex justify-end space-x-4">
        <Link href="/about"><h3 className="font-bold">About</h3></Link>
        <Link href="https://medium.com/clearvote"><p className="font-bold">Blog</p></Link>
        <Link href="https://discord.gg/A7teH7NV">
          <Button style={{height: '25px', transform: "translateY(1px)"}}>Join Our Discord</Button>
        </Link>
      </div>
    </div>
  );
};

const ToolbarMobileModal = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <MenuIcon/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Explore Clear Vote!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Link href="/" onClick={() => setIsDialogOpen(false)}><h3 className="font-bold">Home</h3></Link>
          <Link href="/about" onClick={() => setIsDialogOpen(false)}><h3 className="font-bold">About</h3></Link>
          <Link href="https://medium.com/clearvote" onClick={() => setIsDialogOpen(false)}><p className="font-bold">Blog</p></Link>
          <Link href="https://discord.gg/A7teH7NV" ><p className="font-bold">Join Our Discord</p></Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Toolbar;