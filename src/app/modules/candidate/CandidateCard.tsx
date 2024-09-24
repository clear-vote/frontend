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
import { politigramAttributes } from './politigram';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import PolitigramPie from './PolitigramPie';
import LinkIcon from '@mui/icons-material/Link';
import CategoryIcon from '@mui/icons-material/Category';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import PolitigramInfoModal from '../modals/PolitigramInfoModal';

interface CandidateCardProps {
    position: string;
    candidate: Candidate;
    open: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ position, candidate, open }) => {
    const { selectedPolitigram } = useDecisionFlowContext();
    const prioritiesRef = useRef<HTMLOListElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const [displayScore, setDisplayScore] = useState<string>('');

    // Scroll position for candidate name
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.pageYOffset);
      };
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    }, [selectedPolitigram, candidate]);

    // Prioroties get colored, if they are not null
    // Otherwise the priority text is returned plain
    function colorPriorities(
        priority: Priority,
        politigramName: Politigram | null,
        color: string | null
    ) {
        // case where priority does not contain a politigram value
        if (politigramName === null || !(priority.politigram.includes(politigramName))) {
            return priority.text
        // otherwise, we have to color it
        } else {      
            console.log("LOGGING", color, priority.text); // TODO: THIS IS WHERE THE PROBLEM I AM REFERRING TO IT 
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
        div.classList.add('mb-4');

        const h2 = document.createElement('h2');
        h2.classList.add('text-symbol-caption', 'font-symbol', 'text-text-secondary', 'underline', 'mb-2');
        h2.textContent = backgroundData['header'];

        const p = document.createElement('p');
        p.classList.add('text-body', 'text-text-body');
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
            <div className="bg-tertiary-background border-b border-border-secondary px-4 py-2 sticky top-0">
                <h6 className="text-sec text-text-secondary">{position}</h6>
                
                {scrollPosition > 100 && (
                    <h1 className="text-header text-text-primary">{candidate.name}</h1>
                )}
            </div>
            <div className="flex gap-4 p-4 bg-background-tertiary border-b border-border-secondary">
                {candidate.image && (
                    <div className="rounded-lg">
                        <img className="rounded-lg h-[200px]" src={candidate.image} alt="Candidate Photo" />
                    </div>
                )}
                <div>
                    <h1 className="text-header text-text-primary max-w-[150px]">{candidate.name}</h1>
                    {candidate.website && (
                    <div className={`${card.gridItem} ${card.gridItemWebsite}`}>
                        <a className={card.link} href={candidate.website}>
                            <LinkIcon/>
                            <span className={card.text}> {candidate.website}</span>
                        </a>
                    </div>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col gap-2 px-4 py-8">
                <div className="flex gap-2">
                    <CategoryIcon />
                    <h3 className="text-title text-text-primary">Politigram</h3>
                </div>
                <div className="flex pl-3 pr-2 py-4 border rounded-lg bg-background-secondary">
                    <div className="overflow-visible w-[32vw] h-[32vw]" ref={parentRef}>
                        <PolitigramPie parent={parentRef} politigramScores={candidate.politigram} open={open}/>
                    </div>
                    <div className="flex flex-col gap-1">
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
            </div>

            {/* TODO: only show tags if they exist! */}
            <div className="flex flex-col gap-2 px-4 py-8">
                <div className="flex gap-2">
                    <FlagRoundedIcon />
                    <h3 className="text-title text-text-primary">Top Priorities</h3>
                </div>
                <div className={card.priorities}>
                    <ul className="list-disc ml-5 text-text-body" ref={prioritiesRef}></ul>
                </div>
            </div>

            <div className="flex flex-col gap-4 px-4 py-8">
                <div className="flex gap-2">
                    <ArticleRoundedIcon />
                    <h3 className="text-title text-text-primary">Statement</h3>
                </div>
                <div ref={backgroundRef}></div>
            </div>
        </>
    );
};

export default CandidateCard;
