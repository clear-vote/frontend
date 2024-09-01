"use client"

// LandingPage.tsx
import Link from 'next/link';
import Image from "next/image";
import Toolbar from './components/Toolbar';
import * as React from "react"
import { MapboxSearchInput } from './components/MapboxSearchInput';

/** Hardcoded for now; I just imported them from the other website! */
const KING_COUNTY: string = [-122.515967, 47.096484, -121.333360, 47.734145].join(',');
const MAX_RESULTS: number = 5;

export default function LandingPage() {
  return (
    <div> 
      <Toolbar/>
      <div className="flex items-center justify-center h-full">
        <Image src="/branding/veebee-plain.svg" alt="Clearvote Logo" width="200" height="200" />
        <h1 className="font-bold">"Hey wassup I'm Veebee welcome to Clearvote"</h1>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <MapboxSearchInput
            type="search"
            placeholder="Enter an address..."
            className="w-full"
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            bounds={KING_COUNTY}
            maxResults={MAX_RESULTS}
          />
      </div>
    </div>
  );
}
