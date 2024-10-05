"use client"

import Image from "next/image";
import * as React from "react"
import { MapboxSearchInput } from '../modules/misc/MapboxSearchInput';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

/** Hardcoded for now; I just imported them from the other website! */
const WA_STATE: string = [-124.9036503, 45.6798, -116.7196941, 49.1739043].join(',');
const MAX_RESULTS: number = 5;

/** Landing page design works for both desktop & mobile mode */
export default function LandingPage() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center the-fancy-background">
      <div className="flex items-center justify-center h-full" style={{ maxWidth: "95%"}} >
        <Image src="/branding/clearvote-full-banner.svg" alt="Clearvote Logo" width={300} height={300}/>
        <br></br>
      </div>
      <div className="flex flex-col items-center justify-center" style={{ padding: "8px", width: "90%", maxWidth: "400px" }}>
        <div className="flex w-full items-center space-x-2">
          <MapboxSearchInput
            type="search"
            placeholder="Enter an address..."
            className="w-full"
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            bounds={WA_STATE}
            maxResults={MAX_RESULTS}
          />
        </div>
        <br></br>
        <small className="text-white"><HorizontalRuleIcon/>Currently only supporting Washington State<HorizontalRuleIcon/></small>
        {/* <Button style={{ backgroundColor: '#947FEE' }}><a href="/decisionFlow">See Example!</a></Button> */}
      </div>
    </div>
  );
}
