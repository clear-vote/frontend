// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { ICandidate } from '@/interfaces/CandidateInterfaces';
// import { IContest } from '@/interfaces/ContestInterfaces';

// /**This is the type for the rejected context; pretty simple! */
// type RejectedCandidatesContextType = {
//   rejectedCandidates: Map<IContest, Set<ICandidate>>;
//   addRejectedCandidate: (contest: IContest, candidate: ICandidate) => void;
// };

// /**The Rejected Candidate Context, a map that leads to the rejected set for each context! */
// const RejectedCandidatesContext = createContext<RejectedCandidatesContextType | undefined>(undefined);

// /**
//  * The Rejected Candidates Provider
//  * @param param0 The child of the component which will utilize the provider
//  * @returns A wrapped render of the child component!
//  */
// export function RejectedCandidatesProvider({ children }: { children: ReactNode }) {
//   const [rejectedCandidates, setRejectedCandidates] = useState<Map<IContest, Set<ICandidate>>>(new Map());

//   /**
//    * Adds a Candidate to a Contest's rejected set
//    * @param contest The Contest of which the Candidate is a part of
//    * @param candidate The Candidate to be rejected
//    */
//   const addRejectedCandidate = (contest: IContest, candidate: ICandidate) => {
//     setRejectedCandidates(prevRejectedCandidates => {
//       const newRejectedCandidates = new Map(prevRejectedCandidates);
//       const newRejectedSet = newRejectedCandidates.get(contest) || new Set<ICandidate>();
//       const updatedRejectedSet = new Set(newRejectedSet);
//       updatedRejectedSet.add(candidate);
//       newRejectedCandidates.set(contest, updatedRejectedSet);
//       return newRejectedCandidates;
//     });
//   };

//   /**
//    * "Restores" or moreso removes a Candidate from a Contest's rejected set
//    * @param contest The Contest of which the Candidate is a part of
//    * @param candidate The Candidate to be restored
//    */
//   const restoreRejectedCandidate = (contest: IContest, candidate: ICandidate) => {
//     setRejectedCandidates(prevRejectedCandidates => {
//       const newRejectedCandidates = new Map(prevRejectedCandidates);
//       const newRejectedSet = newRejectedCandidates.get(contest) || new Set<ICandidate>();
//       const updatedRejectedSet = new Set(newRejectedSet);
//       updatedRejectedSet.delete(candidate);
//       newRejectedCandidates.set(contest, updatedRejectedSet);
//       return newRejectedCandidates;
//     });
//   };



//   return (
//     <RejectedCandidatesContext.Provider value={{ rejectedCandidates, addRejectedCandidate }}>
//       {children}
//     </RejectedCandidatesContext.Provider>
//   );
// }

// /**
//  * The hook to use the Rejected Candidate Context
//  * @returns A hook for the Rejected Candidate Context
//  */
// export function useRejectedCandidates() {
//   const context = useContext(RejectedCandidatesContext);
//   if (context === undefined) {
//     throw new Error('useRejectedCandidates must be used within a RejectedCandidatesProvider');
//   }
//   return context;
// }
