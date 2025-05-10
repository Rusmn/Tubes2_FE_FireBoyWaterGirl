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
    const seen = new Set();
    const allOutputs = new Set(combos.map((c) => c.output));

    combos.forEach((c) => {
      const comboId = `combo_${c.id}`;

      if (!seen.has(c.output)) {
        seen.add(c.output);
        els.push({
          data: { id: c.output, label: c.output, type: "element" },
        });
      }

      els.push({ data: { id: comboId, type: "combo" } });
      els.push({ data: { source: comboId, target: c.output } });

      c.inputs.forEach((inp) => {
        const nodeId = allOutputs.has(inp) ? inp : `${comboId}_${inp}`;

        if (!seen.has(nodeId)) {
          seen.add(nodeId);
          els.push({
            data: { id: nodeId, label: inp, type: "element" },
          });
        }

        els.push({ data: { source: nodeId, target: comboId } });
      });
    });

    setElements(els);
  }, [combos]);

  useEffect(() => {
    if (!cy || elements.length === 0) return;
    cy.elements().remove();
    cy.add(elements);
    const layout = cy.layout({
      name: "dagre",
      rankDir: "TB",
      nodeSep: 80,
      rankSep: 120,
      edgeSep: 10,
      animate: true,
    });
    layout.run();
    layout.promiseOn("layoutstop").then(() => cy.fit(50));
  }, [cy, elements]);

  const stylesheet = [
    {
      selector: 'node[type="element"]',
      style: {
        "background-color": "#fef3c7",
        label: "data(label)",
        "text-valign": "center",
        "text-halign": "center",
        color: "#78350f",
        "font-weight": "bold",
        width: 70,
        height: 70,
        "border-width": 2,
        "border-color": "#d97706",
        "font-size": 12,
      },
    },
    {
      selector: 'node[type="combo"]',
      style: {
        "background-color": "#fde68a",
        shape: "roundrectangle",
        width: 18,
        height: 18,
        "border-width": 1,
        "border-color": "#92400e",
      },
    },
    {
      selector: `node[id = "${target}"]`,
      style: {
        "border-color": "#dc2626",
        "border-width": 4,
        "background-color": "#facc15",
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "arrow-scale": 1.2,
        "line-color": "#a16207",
        "target-arrow-color": "#78350f",
        width: 2,
      },
    },
  ];

  return (
    <div
      className="border-2 border-yellow-700 rounded-xl shadow-md overflow-hidden bg-yellow-50"
      style={{ width: "100%", height: 500 }}
    >
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={{ name: "preset" }}
        style={{ width: "100%", height: "100%" }}
        cy={setCy}
      />
    </div>
  );
}