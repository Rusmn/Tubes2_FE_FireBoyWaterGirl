import React, { useState, useEffect, useRef } from 'react';

/**
 * Komponen visualisasi tree untuk recipe elemen (versi sederhana)
 * @param {Object} props
 * @param {Array} props.data - Array data recipe
 * @param {boolean} props.isLiveUpdate - Apakah mode live update diaktifkan
 */
function RecipeTree({ data = [], isLiveUpdate = false }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });

  // Resize handler
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(600, containerRef.current.clientHeight)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Visualization effect
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Set SVG attributes
    svg.setAttribute('width', dimensions.width);
    svg.setAttribute('height', dimensions.height);
    
    // Draw placeholder visualization
    const drawPlaceholder = () => {
      const width = dimensions.width;
      const height = dimensions.height;
      
      // Create text element
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', width / 2);
      text.setAttribute('y', height / 2);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#6B7280'); // gray-500
      text.textContent = 'Recipe Tree Visualization';
      svg.appendChild(text);
      
      // Create subtitle
      const subtitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      subtitle.setAttribute('x', width / 2);
      subtitle.setAttribute('y', height / 2 + 30);
      subtitle.setAttribute('text-anchor', 'middle');
      subtitle.setAttribute('fill', '#9CA3AF'); // gray-400
      subtitle.setAttribute('font-size', '14');
      subtitle.textContent = '(Contoh visualisasi tree recipe)';
      svg.appendChild(subtitle);
      
      // Create simple tree structure
      const centerX = width / 2;
      const startY = height / 2 - 100;
      
      // Root node
      const rootCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      rootCircle.setAttribute('cx', centerX);
      rootCircle.setAttribute('cy', startY);
      rootCircle.setAttribute('r', 25);
      rootCircle.setAttribute('fill', '#3B82F6'); // blue-500
      svg.appendChild(rootCircle);
      
      // Root label
      const rootLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      rootLabel.setAttribute('x', centerX);
      rootLabel.setAttribute('y', startY + 5);
      rootLabel.setAttribute('text-anchor', 'middle');
      rootLabel.setAttribute('fill', 'white');
      rootLabel.textContent = 'Target';
      svg.appendChild(rootLabel);
      
      // First level left
      const child1X = centerX - 100;
      const child1Y = startY + 80;
      
      // Line to child 1
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', centerX);
      line1.setAttribute('y1', startY + 25);
      line1.setAttribute('x2', child1X);
      line1.setAttribute('y2', child1Y - 20);
      line1.setAttribute('stroke', '#D1D5DB'); // gray-300
      line1.setAttribute('stroke-width', 2);
      svg.appendChild(line1);
      
      // Child 1 circle
      const child1Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      child1Circle.setAttribute('cx', child1X);
      child1Circle.setAttribute('cy', child1Y);
      child1Circle.setAttribute('r', 20);
      child1Circle.setAttribute('fill', '#8B5CF6'); // purple-500
      svg.appendChild(child1Circle);
      
      // Child 1 label
      const child1Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      child1Label.setAttribute('x', child1X);
      child1Label.setAttribute('y', child1Y + 5);
      child1Label.setAttribute('text-anchor', 'middle');
      child1Label.setAttribute('fill', 'white');
      child1Label.setAttribute('font-size', '12');
      child1Label.textContent = 'Elem 1';
      svg.appendChild(child1Label);
      
      // First level right
      const child2X = centerX + 100;
      const child2Y = startY + 80;
      
      // Line to child 2
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', centerX);
      line2.setAttribute('y1', startY + 25);
      line2.setAttribute('x2', child2X);
      line2.setAttribute('y2', child2Y - 20);
      line2.setAttribute('stroke', '#D1D5DB'); // gray-300
      line2.setAttribute('stroke-width', 2);
      svg.appendChild(line2);
      
      // Child 2 circle
      const child2Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      child2Circle.setAttribute('cx', child2X);
      child2Circle.setAttribute('cy', child2Y);
      child2Circle.setAttribute('r', 20);
      child2Circle.setAttribute('fill', '#8B5CF6'); // purple-500
      svg.appendChild(child2Circle);
      
      // Child 2 label
      const child2Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      child2Label.setAttribute('x', child2X);
      child2Label.setAttribute('y', child2Y + 5);
      child2Label.setAttribute('text-anchor', 'middle');
      child2Label.setAttribute('fill', 'white');
      child2Label.setAttribute('font-size', '12');
      child2Label.textContent = 'Elem 2';
      svg.appendChild(child2Label);
      
      // Second level - left side
      const basic1X = child1X - 50;
      const basic1Y = child1Y + 60;
      const basic2X = child1X + 50;
      const basic2Y = child1Y + 60;
      
      // Lines to basic elements
      const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line3.setAttribute('x1', child1X);
      line3.setAttribute('y1', child1Y + 20);
      line3.setAttribute('x2', basic1X);
      line3.setAttribute('y2', basic1Y - 15);
      line3.setAttribute('stroke', '#D1D5DB');
      line3.setAttribute('stroke-width', 2);
      svg.appendChild(line3);
      
      const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line4.setAttribute('x1', child1X);
      line4.setAttribute('y1', child1Y + 20);
      line4.setAttribute('x2', basic2X);
      line4.setAttribute('y2', basic2Y - 15);
      line4.setAttribute('stroke', '#D1D5DB');
      line4.setAttribute('stroke-width', 2);
      svg.appendChild(line4);
      
      // Basic elements
      const basic1Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      basic1Circle.setAttribute('cx', basic1X);
      basic1Circle.setAttribute('cy', basic1Y);
      basic1Circle.setAttribute('r', 15);
      basic1Circle.setAttribute('fill', '#10B981'); // green-500
      svg.appendChild(basic1Circle);
      
      const basic1Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      basic1Label.setAttribute('x', basic1X);
      basic1Label.setAttribute('y', basic1Y + 5);
      basic1Label.setAttribute('text-anchor', 'middle');
      basic1Label.setAttribute('fill', 'white');
      basic1Label.setAttribute('font-size', '10');
      basic1Label.textContent = 'Air';
      svg.appendChild(basic1Label);
      
      const basic2Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      basic2Circle.setAttribute('cx', basic2X);
      basic2Circle.setAttribute('cy', basic2Y);
      basic2Circle.setAttribute('r', 15);
      basic2Circle.setAttribute('fill', '#10B981'); // green-500
      svg.appendChild(basic2Circle);
      
      const basic2Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      basic2Label.setAttribute('x', basic2X);
      basic2Label.setAttribute('y', basic2Y + 5);
      basic2Label.setAttribute('text-anchor', 'middle');
      basic2Label.setAttribute('fill', 'white');
      basic2Label.setAttribute('font-size', '10');
      basic2Label.textContent = 'Fire';
      svg.appendChild(basic2Label);
      
      // Second level - right side
      const basic3X = child2X - 50;
      const basic3Y = child2Y + 60;
      const basic4X = child2X + 50;
      const basic4Y = child2Y + 60;
      
      // Lines to basic elements
      const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line5.setAttribute('x1', child2X);
      line5.setAttribute('y1', child2Y + 20);
      line5.setAttribute('x2', basic3X);
      line5.setAttribute('y2', basic3Y - 15);
      line5.setAttribute('stroke', '#D1D5DB');
      line5.setAttribute('stroke-width', 2);
      svg.appendChild(line5);
      
      const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line6.setAttribute('x1', child2X);
      line6.setAttribute('y1', child2Y + 20);
      line6.setAttribute('x2', basic4X);
      line6.setAttribute('y2', basic4Y - 15);
      line6.setAttribute('stroke', '#D1D5DB');
      line6.setAttribute('stroke-width', 2);
      svg.appendChild(line6);
      
      // Basic elements
      const basic3Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      basic3Circle.setAttribute('cx', basic3X);
      basic3Circle.setAttribute('cy', basic3Y);
      basic3Circle.setAttribute('r', 15);
      basic3Circle.setAttribute('fill', '#10B981'); // green-500
      svg.appendChild(basic3Circle);
      
      const basic3Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      basic3Label.setAttribute('x', basic3X);
      basic3Label.setAttribute('y', basic3Y + 5);
      basic3Label.setAttribute('text-anchor', 'middle');
      basic3Label.setAttribute('fill', 'white');
      basic3Label.setAttribute('font-size', '10');
      basic3Label.textContent = 'Earth';
      svg.appendChild(basic3Label);
      
      const basic4Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      basic4Circle.setAttribute('cx', basic4X);
      basic4Circle.setAttribute('cy', basic4Y);
      basic4Circle.setAttribute('r', 15);
      basic4Circle.setAttribute('fill', '#10B981'); // green-500
      svg.appendChild(basic4Circle);
      
      const basic4Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      basic4Label.setAttribute('x', basic4X);
      basic4Label.setAttribute('y', basic4Y + 5);
      basic4Label.setAttribute('text-anchor', 'middle');
      basic4Label.setAttribute('fill', 'white');
      basic4Label.setAttribute('font-size', '10');
      basic4Label.textContent = 'Water';
      svg.appendChild(basic4Label);
    };
    
    drawPlaceholder();
    
  }, [dimensions]);

  return (
    <div 
      ref={containerRef} 
      className="border rounded p-4 bg-gray-50 h-96 overflow-auto"
    >
      <svg 
        ref={svgRef} 
        className="w-full h-full"
        style={{ minHeight: '500px' }}
      ></svg>
    </div>
  );
}

export default RecipeTree;