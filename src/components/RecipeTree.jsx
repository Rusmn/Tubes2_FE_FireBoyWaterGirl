import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export default function RecipeTree({ combos, target }) {
  const [elements, setElements] = useState([]);
  const [cy, setCy] = useState(null);
  
  useEffect(() => {
    if (!combos) return;
    
    const els = [];
    const processedCombos = new Set(); // Track processed combos to avoid duplicates
    
    // First, create the target (Brick) node as the root
    const targetId = 'target_node';
    els.push({
      data: {
        id: targetId,
        label: target,
        type: 'element',
        element: target,
        level: 0,
        isTarget: true
      }
    });

    // Create all nodes and edges
    const createNodesAndEdges = (comboId, parentNodeId, level = 1) => {
      // If we've already processed this combo, skip it
      if (processedCombos.has(comboId)) return;
      processedCombos.add(comboId);
      
      const combo = combos.find(c => c.id === comboId);
      if (!combo) return;
      
      // Create a combo junction node
      const junctionId = `junction_${combo.id}`;
      els.push({
        data: {
          id: junctionId,
          type: 'junction',
          level: level
        }
      });
      
      // Connect junction to parent node
      els.push({
        data: {
          id: `edge_${junctionId}_${parentNodeId}`,
          source: junctionId,
          target: parentNodeId
        }
      });
      
      // Create inputs nodes and connect them to junction
      combo.inputs.forEach((input, idx) => {
        const inputId = `input_${combo.id}_${idx}`;
        els.push({
          data: {
            id: inputId,
            label: input,
            type: 'element',
            element: input,
            level: level + 1
          }
        });
        
        // Connect input to junction node
        els.push({
          data: {
            id: `edge_${inputId}_${junctionId}`,
            source: inputId,
            target: junctionId
          }
        });
        
        // Find child combos that create this input
        const childCombos = combos.filter(c => c.parentId === comboId && c.output === input);
        
        // For each child combo that creates this input
        childCombos.forEach(childCombo => {
          // Process the child combo recursively
          createNodesAndEdges(childCombo.id, inputId, level + 2);
        });
      });
    };
    
    // Start with root combos (those with null parentId) and connect them to the target
    const rootCombos = combos.filter(c => c.parentId === -1 && c.output === target);
    rootCombos.forEach(combo => createNodesAndEdges(combo.id, targetId));
    
    setElements(els);
  }, [combos, target]);

  useEffect(() => {
    if (!cy || elements.length === 0) return;
    
    cy.elements().remove();
    cy.add(elements);
    
    // Apply custom layout
    const layout = cy.layout({
      name: 'dagre',
      rankDir: 'TB', // Top to Bottom direction
      rankSep: 80,   // Vertical separation between ranks
      nodeSep: 60,   // Minimum horizontal separation between nodes
      edgeSep: 20,   // Minimum separation between edges
      spacingFactor: 1.5, // Adjust spacing
      fit: true,     // Fit to viewport
      padding: 50,   // Padding around final layout
      animate: true, // Animate layout changes
      animationDuration: 800
    });
    
    layout.run();
    
    // After layout completes, fit to view
    layout.promiseOn('layoutstop').then(() => {
      cy.fit(50);
      cy.center();
    });
  }, [cy, elements]);

  const stylesheet = [
    // Basic node styling
    {
      selector: 'node[type="element"]',
      style: {
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '16px',
        'font-weight': 'normal',
        'color': '#333',
        'width': 80,
        'height': 40,
        'shape': 'rectangle',
        'border-width': 3,
        'border-color': '#999',
        'border-style': 'solid',
        'text-margin-y': 0,
        'background-color': '#FFFFFF' // Default color
      }
    },
    // Custom colors for specific elements
    {
      selector: 'node[element="Earth"]',
      style: {
        'background-color': '#c8e6c9' // Light green
      }
    },
    {
      selector: 'node[element="Water"]',
      style: {
        'background-color': '#bbdefb' // Light blue
      }
    },
    {
      selector: 'node[element="Fire"]',
      style: {
        'background-color': '#ffcdd2' // Light red
      }
    },
    // Target node (Brick)
    {
      selector: 'node[isTarget]',
      style: {
        'border-width': 2,
        'border-color': '#FF5733', // Red
        'font-weight': 'bold'
      }
    },
    // Junction nodes (combo points)
    {
      selector: 'node[type="junction"]',
      style: {
        'width': 14,
        'height': 14,
        'background-color': '#FFCA28', // Yellow
        'shape': 'ellipse',
        'border-width': 0
      }
    },
    // Edge styling
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#999',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#999',
        'arrow-scale': 0.8,
        'curve-style': 'bezier',
        'control-point-step-size': 40
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: 600, border: '1px solid #ddd', borderRadius: 8 }}>
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={{ name: 'preset' }}
        style={{ width: '100%', height: '100%' }}
        cy={setCy}
        wheelSensitivity={0.2}
      />
    </div>
  );
}