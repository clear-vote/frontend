// LandingPage.tsx
import Link from 'next/link';
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Toolbar from './components/Toolbar';

export default function LandingPage() {
  return (
    <div> 
      <Toolbar/>
      <div className="flex items-center justify-center h-full">
        <Image src="/branding/veebee-plain.svg" alt="Clearvote Logo" width="200" height="200" />
        <h1 className="font-bold">"Hey wassup I'm Veebee welcome to Clearvote"</h1>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Enter your address" />
        <Link href="/decisionFlow">
          <Button>Submit</Button>
        </Link>
      </div>
    </div>
  );
}
