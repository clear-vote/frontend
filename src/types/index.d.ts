import { HiddenCandidates } from './index.d';
import { SelectionStatus } from "@/utils";

export interface Candidate {
  id: number;
  name: string;
  website: string|null;
  image: string|null;
  politigram: object|null; // TODO: if this is null, we DO NOT use the candidate
  priorities: {"text": string, "politigram": Politigram[]}[]|null;
  financing: object|null; // not yet implemented fully TODO: help us support this
  background: object[]|null;
  sources: object[]|null;
}

export interface Contest {
  id: number;
  title: string;
  jurisdiction: string;
  district: string;
  position: string;
  candidates: Record<number, Candidate>;
}

export interface Election {
  id: number;
  type: string;
  voting_start: Date;
  register_by: Date;
  voting_end: Date;
  contests: Record<number, Contest>;
}

export type PinnedCandidates = {
  [electionId: number]: {
    [contestId: number]: number | null;
  };
};

export type HiddenCandidates = {
  [electionId: number]: {
    [contestId: number]: Set<number>;
  };
};

// Defines a type for a function that logs in a user
export type LoginFunction = (email: string, password: string) => Promise<User>;

export type Politigram = 'community' | 'humanitarianism' | 'prosperity' | 'liberty' | 'stewardship';