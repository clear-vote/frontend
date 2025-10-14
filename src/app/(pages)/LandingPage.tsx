// LandingPage.tsx
"use client"

import Image from "next/image";
import * as React from "react"
import { Button } from "@mui/material";
import { MapboxSearchInput } from '../modules/misc/MapboxSearchInput';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Link from "next/link";
import { useState, useEffect } from 'react';

const PRIMARY_DATE = '2025-10-16T23:59:59';
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
      <br></br>
      <h1 className="text-white font-bold">Clearvote will return for the 2025 General Election on October 17th, 2025:</h1>
      <CountdownToDate targetDate="2025-10-17T23:59:59" />
      <br/>
      <h1 className="text-white font-bold"></h1>
          <h2 className="text-white"><HorizontalRuleIcon/>In the meantime, check out an example ballot below!<HorizontalRuleIcon/></h2>
        <br/>
        <Link href="/decisionFlow" passHref>
          <Button className="bg-[#947fee] hover:bg-[#D3D3D3] text-white font-bold">See Example Ballot!</Button>
        </Link>
      </div>
  );
};

/** Countdown Component */
const CountdownToDate = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      if (!updated) {
        clearInterval(timer);
      }
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!timeLeft) {
    return <h1>It&apos;s go time! We&apos;ll be back soon!</h1>;
  }

  return (
    <div>
      <h2 className="text-white font-bold">
        {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes, {timeLeft.seconds} Seconds
      </h2>
    </div>
  );
};
