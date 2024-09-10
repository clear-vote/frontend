import { Candidate, Contest, Election, PinnedCandidates, HiddenCandidates } from '@/types/index';

export const getElectionsRecord = (data: any[]): Record<number, Election> => {
  const electionsRecord: Record<number, Election> = {};
  data.forEach(election => {
    const contestsRecord: Record<number, Contest> = {};
    election.contests.forEach((contest: any) => {
      const candidatesRecord: Record<number, Candidate> = {};
      contest.candidates.forEach((candidate: any) => {
        if (candidate.politigram !== null) {
          candidatesRecord[candidate.candidate_id] = {
            id: candidate.candidate_id,
            name: candidate.name,
            website: candidate.website,
            image: candidate.image,
            politigram: candidate.politigram,
            priorities: candidate.priorities,
            voting_record: candidate.voting_record,
            financing: candidate.financing,
            background: candidate.background,
            sources: candidate.sources
          };
        }
      });
      if (Object.keys(candidatesRecord).length > 0) {
        contestsRecord[contest.contest_id] = {
          id: contest.contest_id,
          title: contest.title,
          jurisdiction: contest.jurisdiction,
          district: contest.district,
          position: contest.position,
          candidates: candidatesRecord,
        };
      }
    });
    electionsRecord[election.election_id] = {
      id: election.election_id,
      type: election.election_type,
      voting_start: convertToDate(election.voting_start),
      voting_end: convertToDate(election.voting_end),
      register_by: convertToDate(election.register_by),
      contests: contestsRecord,
    };
  });
  return electionsRecord;
};

// converts electionsRecord into a sorted list by voting start date (NOT by election id!)
export const getSortedElections = (electionsRecord: Record<number, Election>): Election[] => {
  return Object.values(electionsRecord).sort((a, b) => a.voting_start.getTime() - b.voting_start.getTime());
}

// should always be most recent election where the voting start date has elapsed
export const getDefaultEid = (elections: Record<number, Election>, date: Date): number => {
  const sortedElections = getSortedElections(elections);
  for (let i = sortedElections.length - 1; i >= 0; i--) {
    if (sortedElections[i].voting_start < date) {
      return sortedElections[i].id;
    }
  }
  return 0;
}

export const initPinnedCandidates = (elections: Record<number, Election>) => {
  const pinnedCandidates: PinnedCandidates = {};

  Object.keys(elections).forEach(electionId => {
    const election: Election = elections[Number(electionId)];
    pinnedCandidates[election.id] = {};
    Object.keys(election.contests).forEach(contestId => {
      if (contestId) {
        pinnedCandidates[election.id][Number(contestId)] = null;
      }
    });
  });

  // console.log("pinnedCandidates", pinnedCandidates);
  return pinnedCandidates;
}

export const initHiddenCandidates = (elections: Record<number, Election>) => {
  const hiddenCandidates: HiddenCandidates = {};

  Object.keys(elections).forEach(electionId => {
    const election: Election = elections[Number(electionId)];
    hiddenCandidates[election.id] = {};
    Object.keys(election.contests).forEach(contestId => {
      if (contestId) {
        hiddenCandidates[election.id][Number(contestId)] = new Set();
      }
    });
  });

  // console.log("hidden candidates", hiddenCandidates);
  return hiddenCandidates;
}

export const convertToDate = (dateString: string): Date => {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1; // Months are zero-based in JavaScript
  const day = parseInt(dateString.slice(6, 8));
  return new Date(year, month, day);
};

export const trimLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, '');
}