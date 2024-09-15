import { Candidate, Contest, Election, PinnedCandidates, HiddenCandidates } from '@/types/index';
import { PolitigramScores } from '@/types/index';
import { constants } from 'buffer';

// export type Politigram = "community"|"humanitarianism"|"prosperity"|"liberty"|"stewardship";

// export type PolitigramScores = {
//   community: number;
//   humanitarianism: number;
//   prosperity: number;
//   liberty: number;
//   stewardship: number;
// }

const getStandardDeviations = (politigramScores: Record<string, number[]>) => {
  // Calculate standard deviation for each politigram
  const standardDeviations: Record<string, number> = {};
  Object.entries(politigramScores).forEach(([key, scores]) => {
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const squaredDifferences = scores.map(score => Math.pow(score - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / scores.length;
    standardDeviations[key] = Math.sqrt(variance);
  });

  // Normalize the standard deviations
  const maxStdDev = Math.max(...Object.values(standardDeviations));
  const minStdDev = Math.min(...Object.values(standardDeviations));
  const normalizedStandardDeviations: Record<string, number> = {};

  Object.entries(standardDeviations).forEach(([key, value]) => {
    normalizedStandardDeviations[key] = (value - minStdDev) / (maxStdDev - minStdDev);
  });

  return normalizedStandardDeviations; // Return normalized values instead of original
}

const getNormalizedCandidates = (politigramScores: Record<string, number[]>, candidates: Record<number, Candidate>) => {
   // Find min and max values for each politigram
   const minMaxValues: Record<string, {min: number, max: number}> = {};
   Object.entries(politigramScores).forEach(([key, scores]) => {
     minMaxValues[key] = {
       min: Math.min(...scores),
       max: Math.max(...scores)
     };
   });
 
   // Normalize politigram scores for each candidate
   const normalizedCandidates: Record<number, Candidate> = {};
   Object.entries(candidates).forEach(([id, candidate]) => {
     const normalizedPolitigram: PolitigramScores = {} as PolitigramScores;
     Object.entries(candidate.politigram).forEach(([key, value]) => {
       const { min, max } = minMaxValues[key];
       normalizedPolitigram[key as keyof PolitigramScores] = max === min ? 
         50 : // If all values are the same, set to 50
         ((value - min) / (max - min)) * 100;
     });
     normalizedCandidates[Number(id)] = {
       ...candidate,
       politigram: normalizedPolitigram
     };
   });
 
   return normalizedCandidates;
}

const getWeightedCandidates = (standardDeviations: Record<string, number>, normalizedCandidates: Record<number, Candidate>) => {
  const newNormalizedCandidates: Record<number, Candidate> = {};
  Object.entries(normalizedCandidates).forEach(([id, candidate]) => {
    const newPolitigram: PolitigramScores = {} as PolitigramScores;
    Object.entries(candidate.politigram).forEach(([key, value]) => {
      const stdDev = standardDeviations[key];
      newPolitigram[key as keyof PolitigramScores] = 50 * (1 - stdDev) + value * stdDev;
    });
    newNormalizedCandidates[Number(id)] = {
      ...candidate,
      politigram: newPolitigram
    };
  });

  return newNormalizedCandidates;
}

const getCompositeScore = (candidates: Record<number, Candidate>) => {
  const candidatesAndComposite: Record<number, Candidate> = {};
  Object.entries(candidates).forEach(([id, candidate]) => {
    const composite = Object.values(candidate.politigram).reduce((sum, value) => sum + value, 0);
    candidatesAndComposite[Number(id)] = {
      ...candidate,
      compositeScore: composite,
    };
  });

  return candidatesAndComposite;
}

export const scalePolitigramScores = (candidates: Record<number, Candidate>): Record<number, Candidate> => {
  if (Object.keys(candidates).length === 1) return candidates;
  
  const politigramScores: Record<string, number[]> = {
    community: [],
    humanitarianism: [],
    prosperity: [],
    liberty: [],
    stewardship: []
  };

  // Collect all scores for each politigram
  Object.values(candidates).forEach(candidate => {
    Object.entries(candidate.politigram).forEach(([key, value]) => {
      politigramScores[key].push(value);
    });
  });

  const standardDeviations: Record<string, number> = getStandardDeviations(politigramScores);
  const normalizedCandidates: Record<number, Candidate> = getNormalizedCandidates(politigramScores, candidates);
  const weightedCandidates: Record<number, Candidate> = getWeightedCandidates(standardDeviations, normalizedCandidates);
  const candidatesAndComposite: Record<number, Candidate> = getCompositeScore(weightedCandidates);

  // console.log("standard deviation", standardDeviations);
  // console.log("normalized candidates", normalizedCandidates);
  // console.log("weighted candidates", weightedCandidates);
  // console.log("candidates with composite scores", candidatesAndComposite);
  
  // Return the original candidates object
  return candidatesAndComposite;
}

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
            politigram: candidate.politigram, //type PolitigramScores
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
          candidates: scalePolitigramScores(candidatesRecord),
        };
        const oldContestRecord = contestsRecord[contest.contest_id];
        const candidates = Object.values(oldContestRecord.candidates);
        const maximumCompositeScore = Math.max(...candidates.map(candidate => candidate.compositeScore || 0));
        contestsRecord[contest.contest_id] = {
          ...oldContestRecord,
          maximumCompositeScore: maximumCompositeScore,
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
  console.log(electionsRecord);
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