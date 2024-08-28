// LandingPage.tsx
import Link from 'next/link';
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Toolbar from './components/Toolbar';

export default function LandingPage() {
  return (
    <div style={{ paddingTop: '60px' }}> 
      <Toolbar/>
      <h1>Welcome to Clearvote!</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Enter your address" />
        <Link href="/decisionFlow">
          <Button>Submit</Button>
        </Link>
      </div>
    </div>
  );
}
