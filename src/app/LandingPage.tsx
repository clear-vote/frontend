"use client"

// LandingPage.tsx
import Link from 'next/link';
import Image from "next/image";
import Toolbar from './components/Toolbar';
import * as React from "react"
import { MapboxSearchInput } from './components/MapboxSearchInput';
import { Button } from '@/components/ui/button';

/** Hardcoded for now; I just imported them from the other website! */
const KING_COUNTY: string = [-122.515967, 47.096484, -121.333360, 47.734145].join(',');
const MAX_RESULTS: number = 5;

export default function LandingPage() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center the-fancy-background">
      <Toolbar />
      <div className="flex items-center justify-center h-full">
        <Image src="/branding/clearvote-full-banner.svg" alt="Clearvote Logo" width="300" height="300" />
        <br></br>
      </div>
      <div className="flex flex-col items-center justify-center" style={{ padding: "8px", width: "90%", maxWidth: "400px" }}>
        <div className="flex w-full items-center space-x-2">
          <MapboxSearchInput
            type="search"
            placeholder="Enter an address..."
            className="w-full"
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            bounds={KING_COUNTY}
            maxResults={MAX_RESULTS}
          />
        </div>
        <br></br>
        <p>or</p>
        <br></br>
        <Button style={{ backgroundColor: '#947FEE' }}><a href="/decisionFlow">See Example!</a></Button>
      </div>
    </div>
  );
}
