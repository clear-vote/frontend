// LandingPage.tsx
"use client"

import Image from "next/image";
import * as React from "react"
import { Button } from "@mui/material";
//import { MapboxSearchInput } from '../modules/misc/MapboxSearchInput';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Link from "next/link";
import { useState, useEffect } from 'react';

const PRIMARY_DATE = '2025-07-19T23:59:59';
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
        {/* <div className="flex w-full items-center space-x-2">
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
        <small className="text-white"><HorizontalRuleIcon/>Currently only supporting Washington State<HorizontalRuleIcon/></small>
        <br></br> */}
        <p className="mt-2 text-white">Stay up-to-date during local, off-cycle elections.</p>
        <p className="mt-2 text-white">Understand who you are voting for.</p>
        <br/>
        <p className="font-bold mt-2 text-white">Clearvote will be avalible again for the 2025 August Primary: </p>
        <CountdownTimer targetDate={PRIMARY_DATE} />
        <br/>
        <small className="text-white"><HorizontalRuleIcon/>Meanwhile, check out an example ballot below!<HorizontalRuleIcon/></small>
        <br/>
        <Link href="/decisionFlow" passHref>
          <Button className="bg-[#947fee] hover:bg-[#D3D3D3] text-white">See Example Ballot</Button>
        </Link>
      </div>
    </div>
  );
}

const CountdownTimer = ({ targetDate } : any) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (value : any) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div>
      {timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
        <div className="text-white font-bold">
          <span>{formatTime(timeLeft.days)} days : </span>
          <span>{formatTime(timeLeft.hours)} hours : </span>
          <span>{formatTime(timeLeft.minutes)} minutes : </span>
          <span>{formatTime(timeLeft.seconds)} seconds</span>
        </div>
      ) : (
        <span>Time to get voting!</span>
      )}
    </div>
  );
};