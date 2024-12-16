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

/** LINKS */
const DISCORD_LINK = "https://discord.gg/SmsS3tP9tk";
const DONATE_LINK = "https://donate.stripe.com/3cs0061x75s88OA000";
const BLOG_LINK = "https://medium.com/clearvote";

export const Toolbar: React.FC<ToolbarProps> = ({ isDesktop }) => {

  /** Mobile mode toolbar */
  if (!isDesktop) {
    return (
      <div className="toolbar-mobile" style={{ position: 'fixed', zIndex: 100, justifyContent: 'space-between', fontFamily: "'IBM Plex Mono', sans-serif"}}>
        <Link href="/" className="flex items-center">
          <Image src="/branding/favicon.svg" alt="Home" width={26} height={26} />
          <h1 className="font-bold">&nbsp;Clearvote</h1>
        </Link>
        <ToolbarMobileModal/>
      </div>
    );
  }

  /** Desktop mode toolbar */
  return (
    <div className="toolbar-desktop" style={{ position: 'fixed', 
    zIndex: 100, 
    justifyContent: 'space-between', 
    fontFamily: "'IBM Plex Mono', sans-serif",
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <Link href="/">
        <img src="/branding/favicon.svg" alt="Home" style={{ width: '48px', height: '38px' }} />
      </Link>
      <div>
        <Link href="/about"><Button variant="ghost">About</Button></Link>
        <Link href="https://donate.stripe.com/3cs0061x75s88OA000" target='_blank'><Button variant="ghost">Donate</Button></Link>
        <Link href="https://medium.com/clearvote" target="_blank"><Button variant="ghost">Blog</Button></Link>
        <Link href="https://www.instagram.com/clearvote.info/" target="_blank"><Button variant="ghost">Instagram</Button></Link>
        <Link href="https://discord.gg/SmsS3tP9tk" target="_blank"><Button variant="ghost">Join our Discord</Button></Link>
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
          <Link href={BLOG_LINK} onClick={() => setIsDialogOpen(false)}><p className="font-bold">Blog</p></Link>
          <Link href={DONATE_LINK} onClick={() => setIsDialogOpen(false)}><p className="font-bold">Donate</p></Link>
          <Link href={DISCORD_LINK} ><p className="font-bold">Join Our Discord</p></Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Toolbar;