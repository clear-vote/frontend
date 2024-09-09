import { Politigram } from '@/types/index';
import './CandidateCard.module.css';

export interface PolitigramAttributes {
  color: string;
  description: string;
}

// Create a mapping object for Politigram attributes
export const politigramAttributes: Record<Politigram, PolitigramAttributes> = {
  Community: {
      color: '#16BAC5',
      description: "Focuses on community building and social cohesion.",
  },
  Humanitarianism: {
      color: '#C84630',
      description: "Emphasizes humanitarian efforts and social welfare.",
  },
  Prosperity: {
      color: '#EA9010',
      description: "Aims for economic growth and prosperity.",
  },
  Liberty: {
      color: '#C179B9',
      description: "Values individual freedoms and liberties.",
  },
  Stewardship: {
      color: '#447604',
      description: "Focuses on environmental stewardship and sustainability.",
  }
};