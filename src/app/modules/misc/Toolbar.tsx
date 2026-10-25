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
const INSTAGRAM_LINK = "https://www.instagram.com/clearvote.info/";

/** Wireframe social icons */
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.25" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="black" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="-1 -1 26 26" fill="none" stroke="black" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.1.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419Z" />
  </svg>
);

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
      <div className="flex items-center">
        <Link href="/about"><Button variant="ghost">About</Button></Link>
        <Link href="https://donate.stripe.com/3cs0061x75s88OA000" target='_blank'><Button variant="ghost">Donate</Button></Link>
        <Link href="https://medium.com/clearvote" target="_blank"><Button variant="ghost">Blog</Button></Link>
        <Link href="https://www.instagram.com/clearvote.info/" target="_blank"><Button variant="ghost" size="icon" aria-label="Instagram"><InstagramIcon/></Button></Link>
        <Link href="https://discord.gg/SmsS3tP9tk" target="_blank"><Button variant="ghost" size="icon" aria-label="Join our Discord"><DiscordIcon/></Button></Link>
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
          <Link href={INSTAGRAM_LINK} ><p className="font-bold">Instagram</p></Link>
          <Link href={DISCORD_LINK} ><p className="font-bold">Join Our Discord</p></Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Toolbar;