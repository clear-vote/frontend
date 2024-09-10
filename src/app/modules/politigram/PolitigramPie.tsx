import React, { FC, useEffect, useRef } from 'react';
import styles from './politigram.module.css';
import { Politigram, PolitigramScores } from '@/types';
import * as d3 from 'd3';
import { politigramAttributes } from './politigram';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';

const MIN_RADIUS: number = 0.44
const MIN_ARC: number = 0.65
const BRIGHTNESS: number = 0.65;

interface PolitigramPieProps {
  politigramScores: PolitigramScores;
  parent: React.RefObject<HTMLDivElement>;
  header: React.RefObject<HTMLHeadingElement>
};

interface PolitigramData {
  name: Politigram;
  value: number;
}

const PolitigramPie: FC<PolitigramPieProps> = ({politigramScores, parent, header}) => {
  // type PolitigramEvent = d3.D3DragEvent<SVGPathElement, PolitigramData, PolitigramData>;
  // type PolitigramDatum = d3.PieArcDatum<PolitigramData>;
  const politigramRef = useRef<HTMLDivElement>(null);
  const { selectedPolitigram, setSelectedPolitigram,
          touchLock, setTouchLock
  } = useDecisionFlowContext();
  // const {svgElement, setSvgElement} = setState();

  const data: PolitigramData[] = Object.entries(politigramScores).map(([key, value]) => ({
    name: key as Politigram,
    value: value as number,
  }));

  useEffect(() => {
    d3.select(politigramRef.current).selectAll("*").remove();

    const totalValue: number = d3.sum(data, d => d.value) || 0;
    const sideSize: number = parent.current?.getBoundingClientRect().width || 0;
    const radiusSize: number = sideSize / 200;
  
    // Assigns colors
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range([
          politigramAttributes['community'].color,
          politigramAttributes['humanitarianism'].color,
          politigramAttributes['prosperity'].color,
          politigramAttributes['liberty'].color,
          politigramAttributes['stewardship'].color,
      ]);
  
    const arc = d3.arc<d3.PieArcDatum<PolitigramData>>()
      .innerRadius(0)
      .outerRadius(d => radiusSize * (d.data.value + MIN_RADIUS * (100 - d.data.value)))
      .cornerRadius(sideSize / 10);
  
    // New pie chart, computes start and end angles for each segment
    const pie = d3.pie<PolitigramData>()
        .value(d => (((d.value / totalValue) * (1 - MIN_ARC)) + (MIN_ARC / data.length)))
        .sort(null); // this sorts the politigram so it is the same order everytime
  
    // Populates the svg
    const svg = d3.select(politigramRef.current)
      .append("svg")
      .attr("width", sideSize)
      .attr("height", sideSize)
      .append("g")
      // then we have to center the politigram in the container
      .attr("transform", `translate(${sideSize / 2}, ${sideSize / 2})`);

    const updateSelectedName = () => {
      if (!politigramRef) {
        console.error('politigramRef is null, cannot update');
        return;
      }
    
      if (selectedPolitigram) {
        const data = (selectedPolitigram as any).__data__?.data;
        if (!data || typeof data.name !== 'string') {
          console.error('Invalid data structure in selectedPolitigram');
          return;
        }

        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        header.current!.innerHTML = name;

        const fillColor = d3.select(selectedPolitigram).attr('fill');
        const color = d3.color(fillColor);
        if (color) {
          (header.current! as HTMLElement).style.color = color.darker(2).toString();
        } else {
          console.warn('Invalid color');
        }

        setSelectedPolitigram(name);
      } else {
        header.current!.innerHTML = '<i>Select</i>';
        setSelectedPolitigram(null);
      }
    }

    const handleInsideClick = (event: React.MouseEvent<SVGPathElement>, d: d3.PieArcDatum<PolitigramData>) => {
      const target = event.target as SVGPathElement;
      
      if (!touchLock) {
        setTouchLock(true);
        setSelectedPolitigram(d.data.name);
        // breakPulseCycle();
        d3.select(target)
          .transition()
          .duration(200)
          .attr('fill', d3.color(politigramAttributes[d.data.name].color)!.brighter(BRIGHTNESS).toString());
        // updateSelectedName();
      } else if (d.data.name !== selectedPolitigram) {
        const previousSegment = svg.select(`path[data-name="${selectedPolitigram}"]`);
        previousSegment
          .transition()
          .duration(200)
          .attr('fill', color(selectedPolitigram as string) as string);
    
        setSelectedPolitigram(d.data.name);
        // breakPulseCycle();
        d3.select(target)
          .transition()
          .duration(200)
          .attr('fill', d3.color(politigramAttributes[d.data.name].color)!.brighter(BRIGHTNESS).toString());
        // updateSelectedName();
      } else {
        d3.select(target)
          .transition()
          .duration(200)
          .attr('fill', color(d.data.name) as string);
        setSelectedPolitigram(null);
        setTouchLock(false);
        // updateSelectedName();
      }
    };

    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.name) as string)
      .attr("data-name", d => d.data.name)
      .on('click', handleInsideClick)
      // .on('mouseleave', handleMouseLeave)
      // .on('mouseover', handleMouseOver)
  
  }, [selectedPolitigram, parent])

  return (
    <div className={styles.politigram} ref={politigramRef}/>
  );
}
export default PolitigramPie;
