import React, { FC, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import styles from './politigram.module.css';
import { Politigram, PolitigramScores } from '@/types';
import * as d3 from 'd3';
import { politigramAttributes } from './politigram';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';
import { lighten } from 'polished';

const MIN_RADIUS: number = 0.33 // 0 to 1
const MIN_ARC: number = 0.5; // 0 to 1
const SCALE: number = 1.1;
const CORNER_ROUNDING: number = 0.15;

interface PolitigramPieProps {
  parent: React.RefObject<HTMLDivElement>;
  politigramScores: PolitigramScores;
};

interface PolitigramData {
  name: Politigram;
  value: number;
}

const PolitigramPie: FC<PolitigramPieProps> = ({parent, politigramScores}) => {
  // enables us to attach the svg to a div (maybe there is a better way to do this?)
  const politigramRef = useRef<HTMLDivElement>(null);
  
  const {
    selectedPolitigram, setSelectedPolitigram,
    touchLock, setTouchLock
  } = useDecisionFlowContext();

  // should change whenever selectedCandidate changes
  const data: PolitigramData[] = useMemo(() => Object.entries(politigramScores).map(([key, value]) => ({
    name: key as Politigram,
    value: value as number,
  })), [politigramScores]);

  // this should just be constant and unchanging i don't know why it wouldn't be
  const colorSeries = useMemo(() => d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range([
      politigramAttributes['community'].color,
      politigramAttributes['humanitarianism'].color,
      politigramAttributes['prosperity'].color,
      politigramAttributes['liberty'].color,
      politigramAttributes['stewardship'].color,
    ]), [data]);

  const getColor = (d: any): string => {
    const baseColor = colorSeries(d.data.name) as unknown as string;
    if (selectedPolitigram === d.data.name) {
      if (touchLock) {
        return lighten(0.1, baseColor);
      }
      return lighten(0.05, baseColor);
    }
    return baseColor;
  };

  // TODO: spin open effect

  // should happen whenever .on('click', handleInsideClick); happens
  const handleInsideClick = useCallback((event: React.MouseEvent<SVGPathElement>, d: d3.PieArcDatum<PolitigramData>) => {
    const target = event.target as SVGPathElement;
    const currentSelection = selectedPolitigram;
    
    if (currentSelection === null) {
      console.log("handleInsideClick.currentSelection===null");
      setSelectedPolitigram(d.data.name as Politigram);
      setTouchLock(true);
    } else if (currentSelection !== d.data.name) {
      console.log("handleInsideClick.currentSelection!==d.data.name");
      setSelectedPolitigram(d.data.name as Politigram);
    } else {
      console.log("handleInsideClick.else")
      setSelectedPolitigram(null);
      setTouchLock(false);
    }
  }, [selectedPolitigram, setSelectedPolitigram, setTouchLock/*, expand, contract*/]);

  // should happen whenever .on('hover', handleHover); happens
  const handleHover = useCallback(() => {
    // console.log("handleHover");
    if (touchLock) return;
    // Implement hover effect
  }, [touchLock]);

const renderPolitigram = useCallback(() => {
  if (!politigramRef.current || !parent.current) return;

  d3.select(politigramRef.current).selectAll("*").remove();

  const totalValue: number = d3.sum(data, d => d.value) || 0;
  const sideSize: number = parent.current.getBoundingClientRect().width;
  const radiusSize: number = sideSize / 210;

  const arc = d3.arc<d3.PieArcDatum<PolitigramData>>()
    .innerRadius(0)
    .outerRadius(d => radiusSize * (d.data.value + MIN_RADIUS * (100 - d.data.value)))
    .cornerRadius(sideSize * CORNER_ROUNDING);

  const pie = d3.pie<PolitigramData>()
    .value(d => (((d.value / totalValue) * (1 - MIN_ARC)) + (MIN_ARC / data.length)))
    .sort(null);

  const svg = d3.select(politigramRef.current)
    .append("svg")
    .attr("width", sideSize)
    .attr("height", sideSize);

  const g = svg.append("g")
    .attr("transform", `translate(${sideSize / 2}, ${sideSize / 2}) scale(${selectedPolitigram !== null ? SCALE : 1})`);

  g.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => getColor(d))
    .attr("data-name", d => d.data.name)
    .on('click', handleInsideClick)
    .on('mouseover', handleHover);

  // Smooth transition when switching slices or deselecting
  g.transition()
    .duration(300)
    .attr("transform", `translate(${sideSize / 2}, ${sideSize / 2}) scale(${selectedPolitigram !== null ? SCALE : 1})`);

}, [data, parent, colorSeries, handleInsideClick, handleHover, selectedPolitigram]);
  useEffect(() => {
    renderPolitigram();
  }, [renderPolitigram]);

  return (
    <div className={styles.politigram} ref={politigramRef}/>
  );
}

export default PolitigramPie;