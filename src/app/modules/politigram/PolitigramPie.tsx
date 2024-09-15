import React, { FC, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './politigram.module.css';
import { Politigram, PolitigramScores } from '@/types';
import * as d3 from 'd3';
import { politigramAttributes } from './politigram';
import { useDecisionFlowContext } from '@/context/DecisionFlowContext';

const MIN_RADIUS: number = 0.33 // 0 to 1
const MIN_ARC: number = 0.5; // 0 to 1
const CORNER_ROUNDING: number = 0.15;

interface PolitigramPieProps {
  parent: React.RefObject<HTMLDivElement>;
  header: React.RefObject<HTMLHeadingElement>
};

interface PolitigramData {
  name: Politigram;
  value: number;
}

const PolitigramPie: FC<PolitigramPieProps> = ({parent, header}) => {
  const politigramRef = useRef<HTMLDivElement>(null);
  const { 
    selectedElection,
    elections,
    selectedContest,
    selectedCandidate,
    selectedPolitigram, setSelectedPolitigram,
    touchLock, setTouchLock
  } = useDecisionFlowContext();

  const contest = elections[selectedElection!].contests[selectedContest!];
  const politigramScores = contest.candidates[selectedCandidate!].politigram;
  // const maximumCompositeScore: number = contest.maximumCompositeScore!;

  // should change whenever selectedCandidate changes
  const data: PolitigramData[] = Object.entries(politigramScores).map(([key, value]) => ({
    name: key as Politigram,
    value: value as number,
  }));

  // this should just be constant and unchanging i don't know why it wouldn't be
  const color = (name: string) => d3.scaleOrdinal()
  .domain(data.map(d => d.name))
  .range([
    politigramAttributes['community'].color,
    politigramAttributes['humanitarianism'].color,
    politigramAttributes['prosperity'].color,
    politigramAttributes['liberty'].color,
    politigramAttributes['stewardship'].color,
  ]);

  // should happen whenvever selectedPolitigram is changed OR  selectedCandidate goes from null to non-null
  const highlight = (target: SVGPathElement | null, name: Politigram | null) => {
    // Highlight the selected segment white
    if (target && name) {
      d3.select(target).attr("fill", "white");
    }
  };

  // should happen whenever selectedCandidate or selectedPolitigram is selected
  const updateSelectedName = () => {
    if (!politigramRef.current) {
      console.error('politigramRef is null, cannot update');
      return;
    }

    if (selectedPolitigram) {
      const displayScore: string = ((politigramScores[selectedPolitigram] / 100) * 9 + 1).toFixed(1);
      const name = selectedPolitigram.charAt(0).toUpperCase() + selectedPolitigram.slice(1) + ": " + displayScore;
      header.current!.innerHTML = name;
    } else {
      header.current!.innerHTML = '<i>Select</i>';
    }
  };

  // should happen whenever selectedCandidate goes from null to non-null
  const spinOpenEffect = () => {
    console.log("spinOpenEffect");
    // WILL DO LATER
  }

  // should happen whenever selectedPolitigram goes from null to nonNull
  const expand = () => {
    console.log("expand");
    // WILL DO LATER
  }

  // should happen whenever selectedPolitigram goes from nonNull to null
  const contract = () => {
    console.log("contract");
    // WILL DO LATER
  }

  const handleInsideClick = (event: React.MouseEvent<SVGPathElement>, d: d3.PieArcDatum<PolitigramData>) => {
    const target = event.target as SVGPathElement;
    console.log("Clicked path:", target);
    console.log("Data:", d.data.name);
  
    const currentSelection = selectedPolitigram;
  
    if (currentSelection === null) {
      console.log("Setting politigram...");
      setSelectedPolitigram(d.data.name as Politigram);
      setTouchLock(true);
      highlight(target, d.data.name);
      expand();
    } else if (currentSelection !== d.data.name) {
      console.log("Switching politigram...");
      setSelectedPolitigram(d.data.name as Politigram);
      highlight(target, d.data.name);
    } else {
      console.log("Deselecting politigram");
      contract();
      setSelectedPolitigram(null);
      setTouchLock(false);
      highlight(null, null); // remove highlight
    }
    updateSelectedName();
  };

  const handleHover = () => {
    if (touchLock) return; // hover states should only be active on hover
    console.log("hovering");
  }

  const renderPolitigram = () => {
    if (!politigramRef.current || !parent.current) return;

    d3.select(politigramRef.current).selectAll("*").remove();

    const totalValue: number = d3.sum(data, d => d.value) || 0;
    const sideSize: number = parent.current.getBoundingClientRect().width;
    const radiusSize: number = sideSize / 200;
  
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
      .attr("height", sideSize)
      .append("g")
      .attr("transform", `translate(${sideSize / 2}, ${sideSize / 2})`);

    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.name) as unknown as string)
      .attr("data-name", d => d.data.name)
      .on('click', handleInsideClick);
      // .on('hover', handleHover);
  };

  useEffect(() => {
    renderPolitigram();
  }, [selectedPolitigram, parent, data]);

  return (
    <div className={styles.politigram} ref={politigramRef}/>
  );
}

export default PolitigramPie;