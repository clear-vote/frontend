"use client"

import { IElection } from "@/interfaces/ElectionInterfaces";
import React, { useEffect, useState } from "react";
import { ContestView } from "./views/ContestView";
import { RejectedCandidatesProvider } from "@/context/RejectedCandidatesContext";

/**
 * Creates the homepage of the website!
 * @returns The homepage of the website!
 */
export default function Home() {
  return(
    <div>{TestComponent()}</div>
  );

}

/**
 * Allows you to run the test for the components!
 * @returns A render of the test
 */
const TestComponent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/data/electionFoo.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);
  //Loading icon for test
  if (!data) {
    return <div>Loading...</div>;
  }
  const election_info : IElection = data[0];
  return (
    <div>
      <RejectedCandidatesProvider>
        <ContestView {...election_info.contests[0]}/>
      </RejectedCandidatesProvider>
    </div>
  );
}
