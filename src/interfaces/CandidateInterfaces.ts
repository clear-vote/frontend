/**Interface for a Candidate */
export interface ICandidate {
    /**The name of the Candidate */
    name : string;
    /**A link to a headshot for the candidate, or null if none */
    image : string|null;
    /**The email for the candidate, or null if none */
    email : string|null;
    /**The website for the candidate, or null if none */
    website : string|null;
    /**The information for the About section for the Candidate*/
    about : IAbout;
}

/**Interface for the About section for a candidate */
export interface IAbout {
    /**The Politigram informtation for the candidate */
    politigram : IPolitigram;
    /*The education information for the candidate w/ politigram metrics*/
    education : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**The occupation information for the candidate w/ politigram metrics*/
    occupation : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**Candidate statement information for the candidate w/ politigram metrics*/
    statement : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**Candidate financing information for the candidate w/ politigram metrics*/
    financing : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**ClearVote's sources for the candidates */
    sources : {name : string, link : string}[];
}

/**Interface for the world famous Politigram */
export interface IPolitigram {
    /**The Candidate's focus on community */
    community : number;
    /**The Candidate's focus on humanitarianism*/
    humanitarianism : number;
    /**The Candidate's focus on prosperity */
    prosperity : number;
    /**The Candidate's focus on liberty */
    liberty : number;
    /**The Candidate's focus on utilitarianism */
    utilitarianism : number;
}