import React, { useState } from 'react';
import './CandidateCard.module.css';
import { Candidate } from '@/types';

interface CandidateCardProps {
    candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    const [candidateIndex, setCandidateIndex] = useState(0);
    const [jurisdiction, setJurisdiction] = useState("Washington");
    const [title, setTitle] = useState("Governor");
    const [selectedPolitigram, setSelectedPolitigram] = useState(null);
    const [touchLock, setTouchLock] = useState(false);

    return (
        <div className="card">
            <div className="card__grid card__grid--header">
                <div className="card__grid-item card__grid-item--name">
                    <h2 className="card__text card__text--header">{candidate.name}</h2>
                </div>
                {/* {candidate.website ?? (
                    <div className="card__grid-item card__grid-item--website">
                        <a className="card__link" href={candidate.website!}>
                            <i className="fa-solid fa-link"></i>
                            <span className="card__text">{candidate.website}</span>
                        </a>
                    </div>
                )}
                {candidate.image ?? (
                    <div className="card__grid-item card__grid-item--profile-pic">
                        <img className="card__profile-pic" src={candidate.image!} alt="Candidate Photo" />
                    </div>
                )} */}
            </div>
            <div className="card__grid card__grid--politigram">
                <div className="card__grid-item card__grid-item--header">
                    <h2 className="card__text card__text--header">Politigram</h2>
                </div>
                <div className="card__grid-item card__grid-item--politigram">
                    <div className="card__politigram"></div>
                </div>
                <div className="card__grid-item card__grid-item--politigram-text">
                    <h2 className="card__text card__text--politigram">[Overwrite politigram title]</h2>
                </div>
            </div>
            <div className="card__priorities">
                <h2 className="card__text card__text--header">Top priorities</h2>
                {/* <ol className="card__list">
                    {candidate.priorities!.map((priority, index) => (
                        <li key={index} className="card__list-item card__text">{priority.text}</li>
                    ))}
                </ol> */}
            </div>
            <div className="card__background"></div>
            <div className="card__buttons">
                <button className="card__button card__button--pin">
                    <span className="card__text">Pin candidate</span>
                </button>
                <button className="card__button card__button--hide">
                    <span className="card__text">Hide candidate</span>
                </button>
            </div>
        </div>
    );
};

export default CandidateCard;