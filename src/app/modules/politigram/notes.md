  // function updateSelectedName() {
  //   if (!politigramRef) {
  //     console.error('politigramRef is null, cannot update');
  //     return;
  //   }
  
  //   if (selectedPolitigram) {
  //     const data = (selectedPolitigram as any).__data__?.data;
  //     if (!data || typeof data.name !== 'string') {
  //       console.error('Invalid data structure in selectedPolitigram');
  //       return;
  //     }

  //     const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  //     nameDiv.innerHTML = name;

  //     const fillColor = d3.select(selectedPolitigram).attr('fill');
  //     const color = d3.color(fillColor);
  //     if (color) {
  //       (nameDiv as HTMLElement).style.color = color.darker(2).toString();
  //     } else {
  //       console.warn('Invalid color');
  //     }

  //     setSelectedPolitigram(name);
  //   } else {
  //     nameDiv.innerHTML = '<i>Select</i>';
  //     setSelectedPolitigram(null);
  //   }
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

    <!-- // Function to rotate and expand the pie chart simultaneously
  function rotateAndExpandPie() {
      svg.transition()
      .duration(850)
      .ease(d3.easeCubicOut) // Use easeCubicOut for quick start and smooth stop
      .attrTween("transform", function() {
          return function(t) {
              const scale = d3.interpolate(0, 1)(t);
              const rotate = d3.interpolate(0, 360)(t);
              return `translate(${sideSize / 2}, ${sideSize / 2}) scale(${scale}) rotate(${rotate})`;
          };
      });
  } -->