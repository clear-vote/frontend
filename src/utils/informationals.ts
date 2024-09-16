import { Contest, Politigram } from './../types/index.d';

interface JurisdictionLevel {
  description: string;
  positions: string[];
}

interface PositionInfo {
  duties: string;
  salary: string[];
  term: string;
  constituents: string;
  source: string;
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

// TODO: I'm sure there's better structure here; e.g. salary seems off? The intention is to allow it to change year over year, not sure what the best way to handle that is.
const positionInfo: Record<string, PositionInfo> = {
  "US Senator": {
    "duties": "The Senate and House of Representatives make up the legislative branch of the Federal government. The chambers have equal responsibility for making Federal laws.\nThe Senate has several exclusive powers, including consenting to treaties, confirming appointments made by the President, and trying Federal officials impeached by the House.",
    "salary": ["2024", "$174,000"],
    "term": "Serves for 6 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "US Representative": {
    "duties": "The Senate and House of Representatives make up the legislative branch of the Federal government. The chambers have equal responsibility for making Federal laws.",
    "salary": ["2024", "$174,000"],
    "term": "Serves for 2 years",
    "constituents": "Elected by voters in the Congressional District",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Governor": {
    "duties": "Oversees the implementation of State law, appoints administrative and judicial positions, proposes a State budget, and can approve or veto legislation passed by the Legislature.",
    "salary": ["2024", "$198,257"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Lieutenant Governor": {
    "duties": "Presides over the Washington State Senate, and acts as Governor if the Governor is unable to perform their official duties.",
    "salary": ["2024", "$124,127"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Secretary of State": {
    "duties": "Manages corporation and charity filings, collects and preserves historical State records, and provides oversight and infrastructure for elections.",
    "salary": ["2024", "$145,714"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "State Treasurer": {
    "duties": "Manages the banking, fincancial, and investment needs of the State government.",
    "salary": ["2024", "$162,555"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "State Auditor": {
    "duties": "Conducts audits of all Washington government agencies, investigates fraud and abuse, and leads whistleblower investigations about State agencies.",
    "salary": ["2024", "$145,714"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Attorney General": {
    "duties": "Serves as the State government's legal counsel and enforces the Consumer Protection Act.",
    "salary": ["2024", "$187,543"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Commissioner of Public Lands": {
    "duties": "Oversees the management, conservation, and regulation of public lands, and leads wildfire prevention and firefighting efforts.",
    "salary": ["2024", "$161,905"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Superintendent of Public Instruction": {
    "duties": "Oversees the administration of K-12 education.",
    "salary": ["2024", "$161,905"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Insurance Commissioner": {
    "duties": "Oversees regulation of the Insurance industry in Washington State and investigates consumer complaints.",
    "salary": ["2024", "$145,714"],
    "term": "Serves for 4 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "State Senator": {
    "duties": "The State Senate and State House of Representatives make up the legislative branch of the government. The chambers have equal responsibility for making laws, levying and collecting taxes, and negotiating state budget priorities.\nWith 49 members, the Senate also is responsible for confirming appointments made by the governor.",
    "salary": ["2024", "$60,191"],
    "term": "Serves for 4 years",
    "constituents": "Elected by voters in the Legislative District",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "State Representative": {
    "duties": "The State Senate and State House of Representatives make up the legislative branch of the government. The chambers have equal responsibility for making laws, levying and collecting taxes, and negotiating state budget priorities.\nThe State House of Representatives is made of 98 members. Two members are elected from each of the State's 49 Legislative Districts.",
    "salary": ["2024", "$60,191"],
    "term": "Serves for 2 years",
    "constituents": "Elected by voters in the Legislative District",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "State Supreme Court Justice": {
    "duties": "At the highest court officials in the State, Justices hear appeals and review decisions from Courts of Appeals and other lower courts.",
    "salary": ["2024", "$239,868"],
    "term": "Serves for 6 years",
    "constituents": "Elected by all voters in Washington",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "City of Seattle Councilmember": {
    "duties": "Approves the city's budget, develops laws and policies, and oversees public services.",
    "salary": ["2024", "$144,614"],
    "term": "Serves for an unexpired 1-year term",
    "constituents": "Elected by voters in the City of Seattle",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
  },
  "Precinct Committe Officer (PCO)": {
    "duties": "Represents the precinct in political party activities. Under State law, PCO is a position within each major political party. One Democratic PCO and one Republican PCO can be elected in each precinct*\n*PCO candidates do not appear in the local voters' pamphlet.",
    "salary": ["2024", "No annual salary"],
    "term": "Serves for 2 years",
    "constituents": "Elected by voters within the precinct",
    "source": "King County Official Local Voters' Pamphlet (August 6, 2024)"
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



// TODO: delete this method
export const getPositionInfo = (position: string): string => {
  switch (position) {
    case 'City Council':
      return 'This is the information for city council.';
    case 'County Council':
      return 'This is the information for county council.';
    default:
      return 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
  }
}

// This is a more specific method name than "getPositionInfo"
export const getPositionDuties = (position: string): string => {
  const pos = positionInfo[position];
  return pos ? pos.duties : 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
}

// TODO: salary index is horribly programmed her. Not sure how to account for th eyear
export const getPositionSalary = (position: string): string => {
  const pos = positionInfo[position];
  return pos ? pos.salary[1] : 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
}

export const getPositionTermLength = (position: string): string => {
  const pos = positionInfo[position];
  return pos ? pos.term : 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
}

export const getPositionConstituents = (position: string): string => {
  const pos = positionInfo[position];
  return pos ? pos.constituents : 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
}