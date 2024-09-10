import { Candidate, Politigram } from '@/types/index';

export interface PolitigramAttributes {
  color: string;
  description: string;
}

// Create a mapping object for Politigram attributes
export const politigramAttributes: Record<Politigram, PolitigramAttributes> = {
  community: {
      color: '#16BAC5',
      description: "Focuses on community building and social cohesion.",
  },
  humanitarianism: {
      color: '#C84630',
      description: "Emphasizes humanitarian efforts and social welfare.",
  },
  prosperity: {
      color: '#EA9010',
      description: "Aims for economic growth and prosperity.",
  },
  liberty: {
      color: '#C179B9',
      description: "Values individual freedoms and liberties.",
  },
  stewardship: {
      color: '#447604',
      description: "Focuses on environmental stewardship and sustainability.",
  }
};

export const scalePolitigramScores = (candidates: Record<number, Candidate>): Record<number, Candidate> => {
    
}