import { Contest, Politigram } from './../types/index.d';

interface JurisdictionLevel {
  description: string;
  positions: string[];
}

// TODO: complete this
const jurisdictionLevels: Record<string, JurisdictionLevel> = {
  "Presidential Contests": {
    "description": "All these candidates are for a national level election",
    "positions": [
      "President"
    ],
  },
  "Federal Legislature": {
    "description": "All these candidates are for the federal legislature",
    "positions": [
      "U.S. Representative",
      "U.S. Senator"
    ],
  },
  "State Contests": {
    "description": "All these candidates are for a state level election",
    "positions": [
      "Governor",
      "Lieutenant Governor",
      "Commissioner of Public Lands",
      "Insurance Commissioner",
      "Secretary of State",
      "State Attorney General",
      "State Auditor",
      "State Treasurer",
      "State Supreme Court",
      "Superintendent of Public Instruction"
    ],
  },
  "State Legislature": {
    "description": "All these candidates are for the state legislature",
    "positions": [
      "State Senator",
      "State Representative"
    ],
  },
  "County Contests": {
    "description": "All these contests are county level or lower",
    "positions": [
      "County Council (at Large)",
      "County Executive",
      "County Assessor",
      "County Auditor",
      "County Director of Elections",
      "County Prosecuting Attorney",
      "County Sheriff",
      "County Treasurer",
      "Superior Court Justice",
      "County Council",
      "County Commissioner"
    ],
  },
  "City Contests": {
    "description": "All these contests are city level",
    "positions": [
      "Mayor",
      "City Council (at Large)",
      "City Attorney",
      "City Treasurer",
      "City Council"
    ],
  },
  "School District Contests": {
    "description": "All these contests are for school districts",
    "positions": [
      "School District Director"
    ],
  }
};

export const getPositionInfo = (position: string): string => {
  switch (position) {
    case 'President':
      return 'The President is the head of state and government of the United States, responsible for executing federal laws, overseeing the executive branch, and serving as commander-in-chief of the armed forces.';
    case 'U.S. Representative':
      return 'A U.S. Representative serves in the House of Representatives, representing a congressional district for a two-year term. They propose, debate, and vote on legislation affecting the nation.';
    case 'U.S. Senator':
      return 'A U.S. Senator represents an entire state in the U.S. Senate for a six-year term. Senators vote on federal legislation, ratify treaties, and confirm judicial appointments.';
    case 'Governor':
      return 'The Governor is the chief executive of the state, responsible for implementing state laws, overseeing the state government, and managing state resources.';
    case 'Lieutenant Governor':
      return 'The Lt. Governor is the second-highest state official, typically presiding over the state senate and serving as the successor to the Governor.';
    case 'Commissioner of Public Lands':
      return 'The Commissioner of Public Lands oversees the management of state-owned lands, forests, and natural resources, ensuring sustainable use and environmental protection.';
    case 'Insurance Commissioner':
      return 'The Insurance Commissioner regulates the state\'s insurance industry, ensuring compliance with laws and protecting consumers through policy oversight.';
    case 'Secretary of State':
      return 'The Secretary of State manages elections, business registrations, and the maintenance of official state records, ensuring transparency and accuracy.';
    case 'State Attorney General':
      return 'The State Attorney General is the chief legal officer of the state, representing the state in legal matters and enforcing state laws.';
    case 'State Auditor':
      return 'The State Auditor oversees audits of public agencies, ensuring proper use of public funds and accountability in state government operations.';
    case 'State Treasurer':
      return 'The State Treasurer manages the state’s finances, including investments, debt, and revenue collection.';
    case 'State Supreme Court':
      return 'Justices on the State Supreme Court interpret state laws and the state constitution, hearing appeals from lower courts and making final legal rulings.';
    case 'Superintendent of Public Instruction':
      return 'The Superintendent of Public Instruction is responsible for overseeing public education in the state, implementing education policies, and managing public school funding.';
    case 'State Senator':
      return 'A State Senator represents a district in the state legislature, voting on state laws, budgets, and policies. They serve in the upper house of the legislature.';
    case 'State Representative':
      return 'Members of the State Legislature (also known as State Representatives or Assembly members) propose and vote on laws that impact the state, representing smaller districts.';
    case 'County Council (at Large)':
      return 'A County Council member (at Large) is elected to represent the entire county in legislative matters, such as setting policies, budgets, and overseeing county services.';
    case 'County Executive':
      return 'The County Executive is the chief administrative officer of the county, responsible for executing policies, managing county departments, and preparing the county budget.';
    case 'County Assessor':
      return 'The County Assessor determines the value of properties within the county for tax purposes, ensuring fair and accurate property tax assessments.';
    case 'County Auditor':
      return 'The County Auditor oversees financial audits, public records, and elections within the county, ensuring transparency and accountability in county operations.';
    case 'County Director of Elections':
      return 'The County Director of Elections manages and oversees the county\'s elections, ensuring they are conducted fairly, accurately, and in compliance with election laws.';
    case 'County Prosecuting Attorney':
      return 'The County Prosecuting Attorney represents the county in criminal and civil cases, prosecuting crimes and providing legal advice to county agencies.';
    case 'County Sheriff':
      return 'The County Sheriff is responsible for law enforcement in the county, including operating the county jail, serving warrants, and ensuring public safety.';
    case 'County Treasurer':
      return 'The County Treasurer manages the county’s finances, including tax collection, revenue disbursement, and managing county funds and investments.';
    case 'Superior Court Justice':
      return 'A Superior Court Justice presides over trials and hearings in the state’s superior courts, dealing with serious criminal cases, civil disputes, and appeals from lower courts.';
    case 'County Council':
      return 'A County Council member represents a district within the county, creating and voting on county policies, ordinances, and budgets.';
    case 'County Commissioner':
      return 'A County Commissioner is responsible for legislative and executive functions in counties without a county council, overseeing policy, budgeting, and county services.';
    case 'Mayor':
      return 'The Mayor is the chief executive of the city, responsible for managing city government, public services, and implementing city policies.';
    case 'City Council (at Large)':
      return 'A City Council member (at Large) represents the entire city in making decisions about city policies, budgets, and ordinances.';
    case 'City Attorney':
      return 'The City Attorney is the chief legal advisor to the city government, representing the city in legal matters and providing counsel on city policies and contracts.';
    case 'City Treasurer':
      return 'The City Treasurer manages the city’s finances, including tax collection, budget oversight, and financial planning.';
    case 'City Council':
      return 'A City Council member represents a specific district within the city, making decisions on local laws, policies, and the city budget.';
    case 'School District Director':
      return 'A School District Director serves on the school board, setting policies, budgets, and educational goals for the public schools within the district.';
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