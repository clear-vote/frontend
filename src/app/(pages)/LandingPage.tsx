// LandingPage.tsx
"use client"

import Image from "next/image";
import * as React from "react"
import { Button } from "@mui/material";
import { MapboxSearchInput } from '../modules/misc/MapboxSearchInput';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Link from "next/link";
import { useState, useEffect } from 'react';

/** We're pushing this off a little bit... */
const PRIMARY_DATE = '2025-07-28T23:59:59';
const WA_STATE: string = [-124.9036503, 45.6798, -116.7196941, 49.1739043].join(',');
const MAX_RESULTS: number = 5;

/** Landing page design works for both desktop & mobile mode */
export default function LandingPage() {

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center the-fancy-background">
      <div className="flex items-center justify-center h-full" style={{ maxWidth: "95%"}} >
        <Image src="/branding/clearvote-full-banner.svg" alt="Clearvote Logo" width={300} height={300}/>
        <br></br>
      </div>
      <div className="flex flex-col items-center justify-center" style={{ padding: "8px", width: "90%", maxWidth: "500px", textAlign: "center"}}>
        <div className="flex w-full items-center space-x-2">
          <MapboxSearchInput
            type="search"
            placeholder="Enter an address to get started..."
            className="w-full"
            token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            bounds={WA_STATE}
            maxResults={MAX_RESULTS}
          />
        </div>
        <br></br>
        <small className="text-white"><HorizontalRuleIcon/>Currently supporting Washington State elections<HorizontalRuleIcon/></small>
      </div>
              <small className="text-white"><HorizontalRuleIcon/>Check out an example ballot below!<HorizontalRuleIcon/></small>
        <br/>
        <Link href="/decisionFlow" passHref>
          <Button className="bg-[#947fee] hover:bg-[#D3D3D3] text-white">See Example Ballot</Button>
        </Link>
      </div>
  );
};