import { ICandidate } from "./CandidateInterfaces";

/**Interface for a Contest */
export interface IContest {
    /**The boundary type for the election */
    boundary_type: string;
    /**The title of the election */
    title_string: string;
    /**The name of the election's area name */
    area_name: string;
    /**District char */
    district_char: string | null;
    /**Position char */
    position_char: string | null;
    /**The candidates running in the election */
    candidates: ICandidate[];
}