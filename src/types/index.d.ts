/* Use interface:

For defining object shapes, especially when you need to extend or merge interfaces.
When working with classes and needing to enforce a specific shape.

Use type:

For creating complex types, such as unions, intersections, and tuple types.
When you need type aliases for primitives or when working with more complex type compositions. */

// Defines a basic user type

import { SelectionStatus } from "@/utils";

export interface Candidate {
  name: string;
  website: string;
  selection_status: SelectionStatus
}

export interface Contest {
  title_string: string;
  area_name: string;
  district_char: string;
  position_char: string;
  candidates: Candidate[];
}

export interface Election {
  election_id: number;
  contests: Contest[];
}

// Defines a type for a function that logs in a user
export type LoginFunction = (email: string, password: string) => Promise<User>;

export type Politigram = 'community' | 'humanitarianism' | 'prosperity' | 'liberty' | 'stewardship';