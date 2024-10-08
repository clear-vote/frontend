import { Politigram } from '@/types/index';
import { HiddenCandidates } from './index.d';
import { SelectionStatus } from "@/utils/helpers";

export type Politigram = "community"|"humanitarianism"|"prosperity"|"liberty"|"stewardship";

export type PolitigramScores = {
  community: number;
  humanitarianism: number;
  prosperity: number;
  liberty: number;
  stewardship: number;
}

export type Priority = {
  text: string;
  politigram: Politigram[];
}

// TODO: figure this out
export type VotingRecord = any;
export type Financing = any;

export type Background = {
  header: string;
  text: string;
  politigram: { [key: string]: [number, number][] }
}

export type Source = {
  text: string;
  link: string;
}

export type Candidate = {
  id: number;
  name: string;
  website: string;
  image: string;
  politigram: PolitigramScores; // a valid candidate will have politigram scores
  priorities: Priority[]|null;
  voting_record: VotingRecord|null;
  financing: Financing|null;
  background: Background[]|null;
  sources: Source[]; // a valid candidate will have at least one source
  compositeScore?: number; // this value is used to determine how our scaled stats equation is doing
}

export type Contest = {
  id: number;
  title: string;
  jurisdiction: string;
  district: string;
  position: string;
  candidates: Record<number, Candidate>;
  maximumCompositeScore?: number;
}

export type Election = {
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