import { IContest } from "./ContestInterfaces";

/**Interface for an Election */
export interface IElection {
    /**The ID for the election */
    election_id: number;
    /**The type of the election (i.e. primary, general) */
    election_type: string;
    /**The voting start date (YYYY/MM/DD) */
    voting_start: number;
    /**The registration date (YYYY/MM/DD) */
    register_by: number;
    /**The voting end date (YYYY/MM/DD) */
    voting_end: number;
    /**The contests which are happening within the election */
    contests: IContest[];
}