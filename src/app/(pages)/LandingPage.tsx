"use client"

import Image from "next/image";
import Toolbar from '../modules/misc/Toolbar';
import * as React from "react"
import { MapboxSearchInput } from '../modules/misc/MapboxSearchInput';
import { Button } from '@/components/ui/button';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useMasterContext } from "@/context/MasterContext";

/** Hardcoded for now; I just imported them from the other website! */
const KING_COUNTY: string = [-122.515967, 47.096484, -121.333360, 47.734145].join(',');
const MAX_RESULTS: number = 5;

/** Landing page design works for both desktop & mobile mode */
export default function LandingPage() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center the-fancy-background">
      <div className="flex items-center justify-center h-full">
        <Image src="/branding/clearvote-full-banner.svg" alt="Clearvote Logo" width="300" height="300" style={{ maxWidth: "95%"}} />
      </div>
      <div className="text-white font-bold" style={{ padding: "8px" }}>
        <br></br>
        <center>
          <p>Welcome to Clear Vote!</p>
          <p>Stay up to date during local, off-cycle elections!</p>
        </center>
      </div>
      <br></br>
      <div className="flex flex-col items-center justify-center" style={{ padding: "8px", width: "90%", maxWidth: "600px" }}>
        <div className="flex w-full items-center space-x-2">
          <MapboxSearchInput
            type="search"
            placeholder="Enter your address..."
            className="w-full"
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            bounds={KING_COUNTY}
            maxResults={MAX_RESULTS}
          />
        </div>
        <br></br>
        <small className="text-white"><HorizontalRuleIcon/>OR<HorizontalRuleIcon/></small>
        <br></br>
        <Button style={{ backgroundColor: '#947FEE' }}><a href="/decisionFlow">See Example!</a></Button>
      </div>
    </div>
  );
}
