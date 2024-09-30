import { Contest, Politigram } from './../types/index.d';

interface JurisdictionLevel {
  description: string;
  positions: string[];
}

// TODO: complete this
const jurisdictionLevels: Record<string, JurisdictionLevel> = {
  "County Contests": {
    "description": "All these contests are county level or lower",
    "positions": [
      "County Council",
      "County Assessor",
      "County Director of Elections",
      "Port Commissioner",
      "Mayor",
      "City Council",
      "School District Director"
    ],
  },
  "Federal Contests": {
    "description": "All these candidates are for a national level election",
    "positions": [
      "President",
      "Senate",
      "House of Representatives"
    ],
  }
}

// TODO: complete this
export const getPositionInfo = (position: string): string => {
  switch (position) {
    case 'City Council':
      return 'This is the information for city council.';
    case 'County Council':
      return 'This is the information for county council.';
    default:
      return 'We don\'t have any information for this position at the moment. \n Let us know at hello@clearvote.info!';
  }
}

export const getJurisdictionLevelDescription = (jurisdiction: string): string|null => {
  const level = jurisdictionLevels[jurisdiction];
  return level ? level.description : null;
};

export const getJurisdictionLevelPositions = (contests: Record<number, Contest>): Record<string, Contest[]> => {
  const jurisdictions: Record<string, Contest[]> = {};
  Object.values(contests).forEach((value) => {
    let found = false;
    for (const [name, data] of Object.entries(jurisdictionLevels)) {
      if (data["positions"].includes(value.title)) {
        jurisdictions[name] = jurisdictions[name] ? [...jurisdictions[name], value] : [value];
        found = true;
        break;
      }
    }
    if (!found) {
      jurisdictions["Other Contests"] = jurisdictions["Other Contests"] ? [...jurisdictions["Other Contests"], value] : [value];
    }
  });
  return jurisdictions;
};

// TODO: this can be much better
export const getPolitigramInfo = (politigram: Politigram): string => {
  switch (politigram) {
    case 'community':
      return 'Community is a measure of how much a candidate values the well-being of their community.';
    case 'humanitarianism':
      return 'Humanitarianism is a measure of how much a candidate values the well-being of all people.';
    case 'prosperity':
      return 'Prosperity is a measure of how much a candidate values economic growth and financial stability.';
    case 'liberty':
      return 'Liberty is a measure of how much a candidate values individual freedoms and personal rights.';
    case 'stewardship':
      return 'Stewardship is a measure of how much a candidate values the environment and natural resources.';
  }
};