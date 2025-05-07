import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

export default function RecipeTree({ combos, target }) {
  const [elements, setElements] = useState([]);
  const [cy, setCy] = useState(null);

  useEffect(() => {
    if (!combos) return;
    const els = [];
    const seen = new Set();

    // Kumpulkan semua output untuk dijadikan node global
    const allOutputs = new Set(combos.map(c => c.output));

    combos.forEach(c => {
      const comboId = `combo_${c.id}`;

      // 1) Output: satu node global
      if (!seen.has(c.output)) {
        seen.add(c.output);
        els.push({ data:{ id: c.output, label: c.output, type: 'element' } });
      }

      // 2) Combo node
      els.push({ data:{ id: comboId, type: 'combo' } });
      els.push({ data:{ source: comboId, target: c.output } });

      // 3) Inputs: unique per combo jika bukan output
      c.inputs.forEach(inp => {
        const nodeId = allOutputs.has(inp)
          ? inp             // jika juga output, treat global
          : `${comboId}_${inp}`; // else prefix dengan comboId

        if (!seen.has(nodeId)) {
          seen.add(nodeId);
          els.push({ data:{ id: nodeId, label: inp, type: 'element' } });
        }

        els.push({ data:{ source: nodeId, target: comboId } });
      });
    });

    setElements(els);
  }, [combos]);

  // Layout & fit
  useEffect(() => {
    if (!cy || elements.length === 0) return;
    cy.elements().remove();
    cy.add(elements);
    const layout = cy.layout({ name:'dagre', rankDir:'TB', nodeSep:80, rankSep:120, edgeSep:10, animate:true });
    layout.run();
    layout.promiseOn('layoutstop').then(() => cy.fit(50));
  }, [cy, elements]);

  const stylesheet = [
    { selector:'node[type="element"]', style:{
        'background-color':'#6FB1FC','label':'data(label)','text-valign':'center','text-halign':'center',
        'color':'#fff','width':60,'height':60,'border-width':2,'border-color':'#3A7ECF'
      }},
    { selector:'node[type="combo"]', style:{
        'background-color':'#F5A45D','shape':'roundrectangle','width':14,'height':14
      }},
    { selector:`node[id = "${target}"]`, style:{
        'border-color':'#FF5733','border-width':4
      }},
    { selector:'edge', style:{
        'curve-style':'bezier','target-arrow-shape':'triangle','arrow-scale':1,'line-color':'#bbb'
      }}
  ];

  return (
    <div style={{ width:'100%',height:500,border:'1px solid #ddd',borderRadius:8 }}>
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={{ name:'preset' }}
        style={{ width:'100%',height:'100%' }}
        cy={setCy}
      />
    </div>
  );
}