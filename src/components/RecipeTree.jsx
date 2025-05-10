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
    const outputNodes = new Map(); // Untuk melacak output berdasarkan parentId
    const inputNodes = new Map();  // Untuk melacak input nodes per combo
  
    // 1. Buat semua output node dan catat parentId-nya
    combos.forEach(c => {
      const outputKey = c.parentId !== null ? `${c.output}_${c.parentId}` : c.output;
      
      if (!outputNodes.has(outputKey)) {
        outputNodes.set(outputKey, true);
        els.push({
          data: {
            id: outputKey,
            label: c.output,
            type: 'element',
            isOutput: true,
            parentComboId: c.parentId // Tambahkan info parent combo
          }
        });
      }
    });
  
    // 2. Buat combo nodes dan input nodes
    combos.forEach(c => {
      const comboId = `combo_${c.id}`;
      const outputKey = c.parentId !== null ? `${c.output}_${c.parentId}` : c.output;
  
      // Combo node
      els.push({ 
        data: { 
          id: comboId, 
          type: 'combo',
          parentId: c.parentId 
        } 
      });
  
      // Koneksi combo ke output
      els.push({ 
        data: { 
          source: comboId, 
          target: outputKey 
        } 
      });
  
      // Buat input nodes dan simpan mapping-nya
      c.inputs.forEach(input => {
        const inputId = `${comboId}_${input}`;
        
        els.push({
          data: {
            id: inputId,
            label: input,
            type: 'element',
            isInput: true,
            belongsToCombo: c.id // Tambahkan info combo pemilik
          }
        });
  
        // Simpan mapping input untuk koneksi nanti
        if (!inputNodes.has(input)) {
          inputNodes.set(input, []);
        }
        inputNodes.get(input).push(inputId);
  
        // Koneksi input ke combo
        els.push({ 
          data: { 
            source: inputId, 
            target: comboId 
          } 
        });
      });
    });
  
    // 3. Buat koneksi antara output dengan input di parent combo
    combos.forEach(c => {
      if (c.parentId !== null) {
        const outputKey = `${c.output}_${c.parentId}`;
        
        // Cari parent combo
        const parentCombo = combos.find(combo => combo.id === c.parentId);
        if (parentCombo) {
          // Cari input node di parent combo yang sesuai dengan output ini
          const parentInputNodes = inputNodes.get(c.output) || [];
          parentInputNodes.forEach(inputId => {
            if (inputId.startsWith(`combo_${c.parentId}_`)) {
              els.push({
                data: {
                  source: outputKey,
                  target: inputId,
                  isHierarchy: true // Untuk styling khusus
                }
              });
            }
          });
        }
      }
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
    {
      selector: 'edge[isHierarchy]',
      style: {
        'line-color': '#4CAF50',
        'line-style': 'dashed',
        'target-arrow-shape': 'triangle',
        'curve-style': 'unbundled-bezier'
      }
      },
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