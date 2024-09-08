import { Contest } from './../types/index.d';

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

export const getJurisdictionLevelDescription = (jurisdiction: string): string|null => {
  const level = jurisdictionLevels[jurisdiction];
  console.log(jurisdiction, level);
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
}
