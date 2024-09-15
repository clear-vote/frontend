import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import card from './card.module.css';
import {
    Politigram,
    PolitigramScores,
    Priority,
    VotingRecord,
    Financing,
    Background,
    Source,
    Candidate
} from '@/types/index';
import { politigramAttributes } from '../politigram/politigram';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import PolitigramPie from '../politigram/PolitigramPie';

interface CandidateCardProps {
    candidate: Candidate;
    unpickedCandidates: Set<number> 
    setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}


export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, unpickedCandidates, setUnpickedCandidates }) => {
    const { selectedPolitigram } = useDecisionFlowContext();
    const prioritiesRef = useRef<HTMLOListElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);


    // Invariant: Politigram should not be null. Candidates with null politigrams are filtered out.
    if (candidate.politigram === null) return;

    // Handles change to selected politigram
    // Repopulates priorities and background items with color changes
    // Function to update priorities and background
    // TODO: change from document.create... to a more React way of doing things
    const updateContent = () => {
        const color: string | null = selectedPolitigram 
            ? politigramAttributes[selectedPolitigram].color
            : null;

        if (prioritiesRef.current && candidate.priorities) {
            prioritiesRef.current.innerHTML = '';
            for (let index = 0; index < 3; index++) {
                const li = document.createElement('li');
                li.classList.add(card.listItem, card.text);
                li.innerHTML = colorPriorities(candidate.priorities[index], selectedPolitigram, color);
                prioritiesRef.current.appendChild(li);
            }
        }

        if (backgroundRef.current && candidate.background) {
            backgroundRef.current.innerHTML = '';
            for (const backgroundItem of candidate.background) {
                populateBackground(backgroundRef.current, backgroundItem, selectedPolitigram, color);
            }
        }
    };

    // Update content when candidate or selectedPolitigram changes
    useEffect(() => {
        updateContent();
    }, [candidate, selectedPolitigram]);

    // Prioroties get colored, if they are not null
    // Otherwise the priority text is returned plain
    function colorPriorities(
        priority: Priority,
        politigramName: Politigram | null,
        color: string | null
    ) {
        if (politigramName === null || !(priority.politigram.includes(politigramName))) {
            return priority.text
        } else {           
            return `<span class="${card.textHighlighted}" style="opacity: 1; background-color: ${color};">${priority.text}</span>`;                        
        }
    }

    // Function to create <p> elements for each text field in 'about'
    function populateBackground(
        backgroundDiv: HTMLDivElement, 
        backgroundData: Background,
        politigramName: string | null,
        color: string | null,
    ) {
        const div = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.classList.add(card.text, card.textHeader);
        h2.textContent = backgroundData['header'];

        const p = document.createElement('p');
        p.classList.add(card.text);
        p.innerHTML = colorParagraph(backgroundData, politigramName, color);

        div.appendChild(h2);
        div.appendChild(p);

        backgroundDiv.appendChild(div);
    }

    // Function to set the state and apply styles
    function colorParagraph(
        background: Background,
        politigramName: string | null, 
        color: string | null
    ) {
        if (politigramName === null || !(politigramName in background.politigram)) {
            return background.text;
        } else {
            let styledText = '';
            let lastIndex = 0;
            let afterText = '';
    
            const politigramEntries = background.politigram[politigramName];
            if (politigramEntries) {
                politigramEntries.forEach(([start, end]) => {
                    const beforeText = background.text.slice(lastIndex, start);
                    const highlightedText = background.text.slice(start, end);
                    afterText = background.text.slice(end);
                    styledText += `${beforeText}<span class="${card.textHighlighted}" style="opacity: 1; background-color: ${color};">${highlightedText}</span>`;                        
                    lastIndex = end;
                });
            }

            return styledText + `${afterText}`;
        }
    }

    return (
        <>
            <div className={`${card.grid} ${card.gridHeader}`}>
                <div className={`${card.gridItem} ${card.gridItemName}`}>
                    <h2 className={`${card.text} ${card.textHeader}`}>{candidate.name}</h2>
                </div>
                {candidate.website && (
                    <div className={`${card.gridItem} ${card.gridItemWebsite}`}>
                        <a className={card.link} href={candidate.website}>
                            {/* TODO: icon for link */}
                            <i className="fa-solid fa-link"></i>
                            <span className={card.text}>{candidate.website}</span>
                        </a>
                    </div>
                )}
                {candidate.image && (
                    <div className={`${card.gridItem} ${card.gridItemProfilePic}`}>
                        <img className={card.profilePic} src={candidate.image} alt="Candidate Photo" />
                    </div>
                )}
            </div>
                <div className={`${card.grid} ${card.gridPolitigram}`}>
                <div className={`${card.gridItem} ${card.gridItemHeader}`}>
                    <h2 className={`${card.text} ${card.textHeader}`}>Politigram</h2>
                </div>
                <div className={`${card.gridItem} ${card.gridItemPolitigram}`} ref={parentRef}>
                    <PolitigramPie parent={parentRef} header={headerRef}/>
                </div>
                <div className={`${card.gridItem} ${card.gridItemPolitigramText}`}>
                    <h2 className={`${card.text} ${card.textPolitigram}`} ref={headerRef}>Overwrite politigram title</h2>
                </div>
            </div>
            {/* TODO: only show tags if they exist! */}
            <div className={card.priorities}>
                <h2 className={`${card.text} ${card.textHeader}`}>Top priorities</h2>
                <ol ref={prioritiesRef}></ol>
            </div>
            <div className={card.background} ref={backgroundRef}></div>
        </>
    );
};

export default CandidateCard;