import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
import LinkIcon from '@mui/icons-material/Link';
import PolitigramInfoModal from '../modals/PolitigramInfoModal';

interface CandidateCardProps {
    position: string;
    candidate: Candidate;
}


export const CandidateCard: React.FC<CandidateCardProps> = ({ position, candidate }) => {
    const { selectedPolitigram } = useDecisionFlowContext();
    const prioritiesRef = useRef<HTMLOListElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const [displayScore, setDisplayScore] = useState<string>('');

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

        selectedPolitigram 
        ? setDisplayScore(((candidate.politigram[selectedPolitigram] / 100) * 9 + 1).toFixed(1))
        : setDisplayScore('');
        
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

    useEffect(() => {
        const highlightedElements = document.querySelectorAll(`.${card.textHighlighted}`);
        highlightedElements.forEach((element) => {
            const color = element.getAttribute('data-color');
            if (color) {
                setTimeout(() => {
                    (element as HTMLElement).style.backgroundColor = color;
                }, 0);
            }
        });
    }, [selectedPolitigram]);

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
            return `<span class="${card.textHighlighted}" data-color="${color}">${priority.text}</span>`;                        
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
                    styledText += `${beforeText}<span class="${card.textHighlighted}" data-color="${color}">${highlightedText}</span>`;
                });
            }

            return styledText + `${afterText}`;
        }
    }

    return (
        <>
            <div>
                <h2 className={`${card.text} ${card.textHeader}`}>{position}</h2>
            </div>
            <div className={`${card.grid} ${card.gridHeader}`}>
                {candidate.image && (
                    <div className={`${card.gridItem} ${card.gridItemProfile}`}>
                        <img className={card.profile} src={candidate.image} alt="Candidate Photo" />
                    </div>
                )}
                <div className={`${card.gridItem} ${card.gridItemName}`}>
                    <h2 className={`${card.text} ${card.textHeader}`}>{candidate.name}</h2>
                </div>
                {candidate.website && (
                    <div className={`${card.gridItem} ${card.gridItemWebsite}`}>
                        <a className={card.link} href={candidate.website}>
                            <LinkIcon/>
                            <span className={card.text}> {candidate.website}</span>
                        </a>
                    </div>
                )}
            </div>
            <div>
                <h2 className={`${card.text} ${card.textHeader}`}>Politigram</h2>
            </div>
            <div className={`${card.grid} ${card.gridPolitigram}`}>
                <div className={`${card.gridItem} ${card.gridItemPolitigram}`} ref={parentRef}>
                    <PolitigramPie parent={parentRef} politigramScores={candidate.politigram}/>
                </div>
                <div className={`${card.gridItem} ${card.gridItemPolitigramText}`}>
                    {
                        selectedPolitigram 
                    ?
                        <>
                            <h2 className={`${card.text} ${card.textPolitigram}`} style={{ backgroundColor: politigramAttributes[selectedPolitigram].color }}>
                                {selectedPolitigram.charAt(0).toUpperCase() + selectedPolitigram.slice(1)}</h2>
                            <span>{displayScore}</span>
                            <PolitigramInfoModal politigram={selectedPolitigram}/>
                        </>
                    :
                        <h2 className={`${card.text} ${card.glow}`}>Select</h2>
                    }
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
