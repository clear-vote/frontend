import React, { FC, useEffect, useRef, useCallback, useMemo, MutableRefObject } from 'react';
import { Politigram, PolitigramScores } from '@/types';
import * as d3 from 'd3';
import { politigramAttributes } from './politigram';
import { lighten } from 'polished';
import { useUIContext } from '@/context/UIContext';

const MIN_RADIUS: number = 0.33 // 0 to 1
const MIN_ARC: number = 0.5; // 0 to 1
const SCALE: number = 1.1;
const CORNER_ROUNDING: number = 0.15;
const TRANSITION_DURATION: number = 300;

interface PolitigramPieProps {
  parent: React.RefObject<HTMLDivElement>;
  politigramScores: PolitigramScores;
  open: boolean;
}

interface PolitigramData {
  name: Politigram;
  value: number;
}

const PolitigramPie: FC<PolitigramPieProps> = ({ parent, politigramScores, open }) => {
  const {
    selectedPolitigram,
    setSelectedPolitigram,
    clickLock,
    setClickLock
  } = useUIContext();

  const selectedPolitigramRef: React.MutableRefObject<Politigram|null> = useRef(selectedPolitigram);
  const firstRender = useRef(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const data: PolitigramData[] = useMemo(() => Object.entries(politigramScores).map(([key, value]) => ({
    name: key as Politigram,
    value: value as number,
  })), [politigramScores]);

  const colorSeries = useMemo(() => d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(Object.values(politigramAttributes).map(attr => attr.color)),
  [data]);

  const getColor = useCallback((d: any): string => {
    const baseColor = colorSeries(d.data.name) as string;
    if (selectedPolitigramRef.current === d.data.name) {
      return clickLock ? lighten(0.1, baseColor) : lighten(0.05, baseColor);
    }
    return baseColor;
  }, [selectedPolitigram, clickLock, colorSeries]);

  const handleInsideClick = useCallback((event: React.MouseEvent<SVGPathElement>, d: d3.PieArcDatum<PolitigramData>) => {
    event.stopPropagation();
  
    if (selectedPolitigramRef.current === null) {
      setSelectedPolitigram(d.data.name);
      setClickLock(true);
    } else if (selectedPolitigramRef.current !== d.data.name) {
      setSelectedPolitigram(d.data.name);
    } else {
      setSelectedPolitigram(null);
      setClickLock(false);
    }
  }, [setSelectedPolitigram, setClickLock]);

  const handleMouseEnter = useCallback((event: React.MouseEvent<SVGPathElement>, d: any) => {
    if (!clickLock) {  // Only apply hover if not touch-locked
      setSelectedPolitigram(d.data.name);
    }
  }, [setSelectedPolitigram, clickLock]);

  const handleMouseLeave = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    if (!clickLock) {  // Only remove selection if not touch-locked
      setSelectedPolitigram(null);
    }
  }, [setSelectedPolitigram, clickLock]);

  const rotateAndExpandPie = useCallback(() => {
    if (!svgRef.current) return;
  
    const svg = d3.select(svgRef.current);
    const sideSize: number = Number(svg.attr("width"));
  
    svg.select('g').style("opacity", 0);
  
    setTimeout(() => {
      svg.select('g')
        .transition()
        .duration(850)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)
        .attrTween("transform", function() {
          return function(t) {
            const scale = d3.interpolate(0, (selectedPolitigram ? SCALE : 1))(t);
            const rotate = d3.interpolate(0, 360)(t);
            return `translate(${sideSize / 2}, ${sideSize / 2}) scale(${scale}) rotate(${rotate})`;
          };
        });
    }, 300);
  }, [selectedPolitigram]);

  const renderPolitigram = useCallback(() => {
    if (!parent.current || !svgRef.current) return;

    // const totalValue: number = d3.sum(data, d => d.value) || 0;
    // const sideSize: number = parent.current.getBoundingClientRect().width;
    // const radiusSize: number = sideSize / 235;

    const totalValue: number = d3.sum(data, d => d.value) || 0;
    const parentRect = parent.current.getBoundingClientRect();
    const sideSize = Math.min(parentRect.width, parentRect.height);
    const radiusSize = sideSize / 220;

    const arc = d3.arc<d3.PieArcDatum<PolitigramData>>()
      .innerRadius(0)
      .outerRadius(d => radiusSize * (d.data.value + MIN_RADIUS * (100 - d.data.value)))
      .cornerRadius(sideSize * CORNER_ROUNDING);

    const pie = d3.pie<PolitigramData>()
      .value(d => (((d.value / totalValue) * (1 - MIN_ARC)) + (MIN_ARC / data.length)))
      .sort(null);

    const svg = d3.select(svgRef.current)
      .attr("class", selectedPolitigram === null ? "pulsate" : "")
      .attr("width", sideSize)
      .attr("height", sideSize)
      .style("display", "block")
      .style("margin", "0 auto");


    // Ensure the container g element is properly centered
    const g = svg.select('g')

    // Update scale
    g.transition()
      .duration(TRANSITION_DURATION)
      .attr("transform", `translate(${sideSize / 2}, ${sideSize / 2})`);

    const path = g.selectAll<SVGPathElement, d3.PieArcDatum<PolitigramData>>("path")
      .data(pie(data), d => d.data.name);

    path.enter()
      .append("path")
      .attr("fill", getColor)
      .attr("d", arc)
      .attr("data-name", d => d.data.name)
      .on('click', handleInsideClick)
      .each(function(d) { (this as any)._current = d; }); // Store initial angles

    path.transition()
      .duration(TRANSITION_DURATION)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate((this as any)._current, d);
        (this as any)._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t)) || '';
        };
      })
      .attr("fill", getColor);

    path.exit()
      .transition()
      .duration(TRANSITION_DURATION)
      .attrTween("d", function(this: SVGPathElement, d: unknown) {
        const datum = d as d3.PieArcDatum<PolitigramData>;
        const currentAngle = (this as any)._current;
        const interpolate = d3.interpolate(currentAngle, {
          startAngle: datum.startAngle,
          endAngle: datum.startAngle
        });
        (this as any)._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t) as d3.PieArcDatum<PolitigramData>) || '';
        };
      })
      .remove();
  }, [data, parent, colorSeries, handleInsideClick, getColor, selectedPolitigram]);

  useEffect(() => {
    if (!parent.current) return;
  
    const sideSize = parent.current.getBoundingClientRect().width;
  
    const svg = d3.select(parent.current)
      .append("svg")
      .attr("width", sideSize)
      .attr("height", sideSize);
  
    svg.append("g");
  
    svgRef.current = svg.node();
  
    return () => {
      svg.remove();
    };
  }, [parent]);

  useEffect(() => {
    selectedPolitigramRef.current = selectedPolitigram;
    renderPolitigram();
  }, [selectedPolitigram, renderPolitigram]);

  useEffect(() => {
    if (!firstRender) return;
    firstRender.current = false;
    rotateAndExpandPie();
  }, [open]);

  return null;
}

export default PolitigramPie;