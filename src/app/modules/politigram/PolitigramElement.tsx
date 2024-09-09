import React, { FC } from 'react';
import styles from './politigram.module.css';
interface PolitigramProps {};

const PolitigramElement: FC<PolitigramProps> = (props) => {
    // const politigram = candidate.politigram || {};
    // type PolitigramEvent = d3.D3DragEvent<SVGPathElement, PolitigramData, PolitigramData>;
    // type PolitigramDatum = d3.PieArcDatum<PolitigramData>;

    // interface PolitigramData {
    //     name: Politigram;
    //     value: number;
    // }

    // const data: PolitigramData[] = Object.entries(politigram).map(([key, value]) => ({
    //     name: key as Politigram,
    //     value: value as number,
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
    // const parentElement = document.querySelector(card.gridItemPolitigram);
    // const parentRect = parentElement!.getBoundingClientRect();
    // const side = parentRect.width;
    // const radius = side / 200;

    // // Assigns colors
    // const color = d3.scaleOrdinal()
    //     .domain(data.map(d => d.name))
    //     .range([
    //         politigramAttributes['Community'].color,
    //         politigramAttributes['Humanitarianism'].color,
    //         politigramAttributes['Prosperity'].color,
    //         politigramAttributes['Liberty'].color,
    //         politigramAttributes['Stewardship'].color,
    //     ]);

    // // Radius length
    // const arc = d3.arc<d3.PieArcDatum<PolitigramData>>()
    //     .innerRadius(0)
    //     .outerRadius(d => radius * (d.data.value + MIN_RADIUS * (100 - d.data.value)))
    //     .cornerRadius(side / 10);

    // // New pie chart, computes start and end angles for each segment
    // const pie = d3.pie<PolitigramData>()
    //     .value(d => (((d.value / totalValue) * (1 - MIN_ARC)) + (MIN_ARC / data.length)))
    //     .sort(null); // this sorts the politigram so it is the same order everytime

    // // Populates the svg
    // const svg = d3.select(card.politigram)
    //     .append("svg")
    //     .attr("width", side)
    //     .attr("height", side)
    //     .append("g")
    //     // then we have to center the politigram in the container
    //     .attr("transform", `translate(${side / 2}, ${side / 2})`);

    // function updateSelectedName() {
    //     const nameDiv = document.querySelector(card.textPolitigram);
    //     if (!nameDiv) {
    //         console.error('nameDiv is null, cannot update');
    //         return;
    //     }
    
    //     if (selectedPolitigram) {
    //         const data = (selectedPolitigram as any).__data__?.data;
    //         if (!data || typeof data.name !== 'string') {
    //             console.error('Invalid data structure in selectedPolitigram');
    //             return;
    //         }
    
    //         const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    //         nameDiv.innerHTML = name;
    
    //         const fillColor = d3.select(selectedPolitigram).attr('fill');
    //         const color = d3.color(fillColor);
    //         if (color) {
    //             (nameDiv as HTMLElement).style.color = color.darker(2).toString();
    //         } else {
    //             console.warn('Invalid color');
    //         }
    
    //         setSelectedPolitigram(name);
    //     } else {
    //         nameDiv.innerHTML = '<i>Select</i>';
    //         setSelectedPolitigram(null);
    //     }
    // }

    // const handleMouseOver = (event: PolitigramEvent, d: PolitigramDatum) => {
    //     if (!touchLock) {
    //         setSelectedPolitigram(event.target);
    //         breakPulseCycle();
    //         d3.select(event.target)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(politigramAttributes[d.data.name].color)!.brighter(BRIGHTNESS/2).toString());
    //         updateSelectedName();
    //     }
    // };
    
    // const handleMouseLeave = (event: PolitigramEvent, d: PolitigramDatum) => {
    //     if (!touchLock && selectedPolitigram !== null) {
    //         setSelectedPolitigram(null);
    //         d3.select(event.target)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', politigramAttributes[d.data.name].color);
    //         updateSelectedName();
    //     }
    // };
    
    // const handleInsideClick = (event: PolitigramEvent, d: PolitigramDatum) => {
    //     const target = event.target;
        
    //     if (!touchLock) {
    //         setTouchLock(true);
    //         setSelectedPolitigram(target);
    //         breakPulseCycle();
    //         d3.select(target)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(politigramAttributes[d.data.name].color)!.brighter(BRIGHTNESS).toString());
    //         updateSelectedName();
    //     } else if (target !== selectedPolitigram) {
    //         const oldData = d3.select(selectedPolitigram).datum() as PolitigramDatum;
    //         const oldColor = politigramAttributes[oldData.data.name].color;
    //         d3.select(selectedPolitigram)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', oldColor);
    //         setSelectedPolitigram(target);
    //         breakPulseCycle();
    //         d3.select(target)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', d3.color(politigramAttributes[d.data.name].color)!.brighter(BRIGHTNESS).toString());
    //         updateSelectedName();
    //     } else {
    //         d3.select(selectedPolitigram)
    //             .transition()
    //             .duration(200)
    //             .attr('fill', politigramAttributes[d.data.name].color);
    //         setSelectedPolitigram(null);
    //         setTouchLock(false);
    //         updateSelectedName();
    //     }
    // };

    // // Handles the logic for touching the svg
    // svg.selectAll('path')
    //     .data(pie(data))
    //     .enter()
    //     .append('path')
    //     .attr('d', arc)
    //     .attr('fill', d => politigramAttributes[d.data.name as Politigram].color)
    //     .on('click', handleInsideClick)
    //     .on('mouseleave', handleMouseLeave)
    //     .on('mouseover', handleMouseOver)

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
      <div className={styles.politigram}/>
    );
}
export default PolitigramElement;