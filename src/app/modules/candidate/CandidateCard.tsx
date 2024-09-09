import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import './CandidateCard.module.css';
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

// import * as d3 from 'd3';


interface CandidateCardProps {
    candidate: Candidate;
    unpickedCandidates: Set<number> 
    setUnpickedCandidates: Dispatch<SetStateAction<Set<number>>>;
}


export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, unpickedCandidates, setUnpickedCandidates }) => {
    const { selectedPolitigram, setSelectedPolitigram,
            touchLock, setTouchLock } = useDecisionFlowContext();
    const prioritiesRef = useRef<HTMLOListElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // TODO: change from document.create... to a more React way of doing things
    // Handles change to selected politigram
    // Repopulates priorities and background items with color changes
    // Function to update priorities and background
    const updateContent = () => {
        const color: string | null = selectedPolitigram 
            ? politigramAttributes[selectedPolitigram].color
            : null;

        if (prioritiesRef.current && candidate.priorities) {
            prioritiesRef.current.innerHTML = '';
            for (let index = 0; index < 3; index++) {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__text');
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
            return `<span class="card__text--highlighted" style="opacity: 1; background-color: ${color};">${priority.text}</span>`;                        
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
        h2.classList.add('card__text', 'card__text--header');
        h2.textContent = backgroundData['header'];

        const p = document.createElement('p');
        p.classList.add('card__text');
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
                    styledText += `${beforeText}<span class="card__text--highlighted" style="opacity: 1; background-color: ${color};">${highlightedText}</span>`;                        
                    lastIndex = end;
                });
            }

            return styledText + `${afterText}`;
        }
    }

    // interface ArcData {
    //     value: number;
    // }
      
    // interface D3ArcDatum {
    //     data: ArcData;
    // }

    // const politigram = candidate.politigram || {};
    // const data = Object.entries(politigram).map(([key, value]) => ({
    //     name: key,
    //     value: value,
    // }));

    // const totalValue = d3.sum(data, d => d.value);

    // // visually sets the minimum value for the radius of the smallest segment
    // // as a percentage of the full radius
    // // if we were to set this to 0, the smallest segment in a row would not even appear!
    // const MIN_RADIUS = 0.44

    // // visually sets the minimum value for the arc of the smallest segment
    // // as a percentage of the full arc
    // // 0 === invisible
    // const MIN_ARC = 0.65

    // const BRIGHTNESS = 0.65;
    

    // // Get the parent element and set politigrams size to match it
    // // divide `side` by 200
    // // size of `side` / 2 for radius
    // // size of `side` / 100 for maximum politigram rating
    // const parentElement = document.querySelector('.card__grid-item--politigram');
    // const parentRect = parentElement!.getBoundingClientRect();
    // const side = parentRect.width;
    // const radius = side / 200;

    // // Assigns colors
    // const rootStyles = getComputedStyle(document.documentElement);
    // const color = d3.scaleOrdinal()
    //     .domain(data.map(d => d.name))
    //     .range([
    //         rootStyles.getPropertyValue('--color-teal').trim(),
    //         rootStyles.getPropertyValue('--color-red').trim(),
    //         rootStyles.getPropertyValue('--color-yellow').trim(),
    //         rootStyles.getPropertyValue('--color-purple').trim(),
    //         rootStyles.getPropertyValue('--color-green').trim()
    //     ]);

    // // Radius length
    // const arc = d3.arc<D3ArcDatum>()
    //     .innerRadius(0)
    //     .outerRadius(d => radius * (d.data.value + MIN_RADIUS * (100 - d.data.value)))
    //     .cornerRadius(side / 10);

    // // New pie chart, computes start and end angles for each segment
    // const pie = d3.pie()
    //     .value(d => (((d.value / totalValue) * (1 - MIN_ARC)) + (MIN_ARC / data.length)))
    //     .sort(null); // this sorts the politigram so it is the same order everytime

    // // Populates the svg
    // const svg = d3.select(".card__politigram")
    //     .append("svg")
    //     .attr("width", side)
    //     .attr("height", side)
    //     .append("g")
    //     // then we have to center the politigram in the container
    //     .attr("transform", `translate(${side / 2}, ${side / 2})`);

    // function updateSelectedName() {
    //     const nameDiv = document.querySelector('.card__text--politigram');
    //     if (selectedPolitigram) {
    //         const name = (selectedPolitigram as any).__data__.data.name;
    //         nameDiv.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    //         const color = d3.color(d3.select(selectedPolitigram).attr('fill')).darker(2);
    //         nameDiv.style.color = color
    //         setState(name);
    //     } else {
    //         nameDiv.innerHTML = '<i>Select</i>';
    //         setState(null);
    //     }
    // }

    // // Handles the logic for touching the svg
    // svg.selectAll('path')
    //     .data(pie(data))
    //     .enter()
    //     .append('path')
    //     .attr('d', arc)
    //     .attr('fill', d => color(d.data.name))
    //     .on('click', handleInsideClick)
    //     .on('mouseleave', handleMouseLeave)
    //     .on('mouseover', handleMouseOver)

    // function handleMouseOver(event, d) {
    //     if (!touchLock) {
    //         selectedPolitigram = this;
    //         breakPulseCycle();
    //         d3.select(this)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(color(d.data.name)).brighter(BRIGHTNESS/2));
    //         updateSelectedName();
    //     }
    // }
    
    // function handleMouseLeave(event, d) {
    //     // if we are just mousing over, we can trigger a mouse out event
    //     if (!touchLock && selectedPolitigram !== null) {
    //         selectedPolitigram = null;
    //         d3.select(this)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', color(d.data.name));
    //         updateSelectedName();
    //     }
    // }

    // function handleInsideClick(event, d) {
    //     // if no wing is selected, then we can take the touchlock
    //     if (!touchLock) {
    //         touchLock = true;
    //         selectedPolitigram = this;
    //         breakPulseCycle();
    //         d3.select(this)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(color(d.data.name)).brighter(BRIGHTNESS));
    //         updateSelectedName();
    //     // transition touch
    //     // here we have a touchlock set, but we are selecting another wing
    //     } else if (this !== selectedPolitigram) {
    //         const oldColor = color(selectedPolitigram.__data__.data.name);
    //         d3.select(selectedPolitigram)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(oldColor));
    //         selectedPolitigram = this;
    //         breakPulseCycle();
    //         d3.select(this)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(color(d.data.name)).brighter(BRIGHTNESS));
    //         updateSelectedName();
    //     // deselect click
    //     } 
    //     else {
    //         d3.select(selectedPolitigram)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', color(d.data.name));
    //         setSelectedPolitigram(null);
    //         setTouchLock(false);
    //         updateSelectedName();
    //     }
    // }

    // // Function to rotate and expand the pie chart simultaneously
    // function rotateAndExpandPie() {
    //     svg.transition()
    //     .duration(850)
    //     .ease(d3.easeCubicOut) // Use easeCubicOut for quick start and smooth stop
    //     .attrTween("transform", function() {
    //         return function(t) {
    //             const scale = d3.interpolate(0, 1)(t);
    //             const rotate = d3.interpolate(0, 360)(t);
    //             return `translate(${side / 2}, ${side / 2}) scale(${scale}) rotate(${rotate})`;
    //         };
    //     });
    // }

    // let pulseInterval: number;

    // // Function to pulse the SVG
    // function pulseSVG() {
    //     if (selectedPolitigram !== null) {
    //         clearInterval(pulseInterval);
    //         return;
    //     }

    //     svg.transition()
    //         .duration(2500) // Duration of the pulse
    //         .ease(d3.easeSinInOut) // Easing function for smooth pulsing
    //         .attr("transform", `translate(${side / 2}, ${side / 2}) scale(0.95)`) // Scale down
    //         .transition()
    //         .duration(1500) // Duration of the pulse
    //         .ease(d3.easeSinInOut) // Easing function for smooth pulsing
    //         .attr("transform", `translate(${side / 2}, ${side / 2}) scale(1)`) // Scale back to original
    // }

    // // breaks out of the pulse right away and snaps the politigram back to it's original size
    // function breakPulseCycle() {
    //     clearInterval(pulseInterval);
    //     svg.interrupt(); // Cancel any ongoing transitions
    //     svg.transition()
    //         .duration(100) // Duration of the transition
    //         .ease(d3.easeLinear) // Easing function for smooth transition
    //         .attr("transform", `translate(${side / 2}, ${side / 2}) scale(1)`);
    // }

    return (
        <div className="card">
            <div className="card__grid card__grid--header">
                <div className="card__grid-item card__grid-item--name">
                    <h2 className="card__text card__text--header">{candidate.name}</h2>
                </div>
                {candidate.website ?? (
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
                )}
            </div>
            <div className="card__grid card__grid--politigram">
                <div className="card__grid-item card__grid-item--header">
                    <h2 className="card__text card__text--header">Politigram</h2>
                </div>
                <div className="card__grid-item card__grid-item--politigram">
                    <div className="card__politigram"></div>
                </div>
                <div className="card__grid-item card__grid-item--politigram-text">
                    <h2 className="card__text card__text--politigram">Overwrite politigram title</h2>
                </div>
            </div>
            {/* TODO: only show tags if they exist! */}
            <div className="card__priorities">
                <h2 className="card__text card__text--header">Top priorities</h2>
                <ol ref={prioritiesRef}></ol>
            </div>
            <div className="card__background" ref={backgroundRef}></div>
        </div>
    );
};

export default CandidateCard;