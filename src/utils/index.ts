import { Candidate, Contest, Election } from '@/types/index';

export const getElections = (data: any[]): Election[] => {
  const electionsArray: Election[] = data.map(election => {
    const contests: Contest[] = election.contests.map((contest: any) => {
      const candidates: Candidate[] = contest.candidates.map((candidate: any) => ({
        name: candidate.name,
        website: candidate.website
      }));
      return {
        title_string: contest.title_string,
        area_name: contest.area_name,
        district_char: contest.district_char,
        position_char: contest.position_char,
        candidates: candidates
      };
    });
    return {
      election_id: election.election_id,
      contests: contests
    };
  });
  return electionsArray;
};

export const getElectionIndex = (elections: Election[], id: number) => {
  return elections.findIndex(election => election.election_id === id)
}

export const trimLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, '');
}

export const getPinnedCandidate = (contest: Contest, pinnedCandidates: Set<Candidate>) => {
  return contest.candidates.find(candidate => pinnedCandidates.has(candidate));
};

export const getHiddenCandidatesList = (contest: Contest, hiddenCandidates: Set<Candidate>) => {
  return contest.candidates.filter(candidate =>
    hiddenCandidates.has(candidate)
  );
};