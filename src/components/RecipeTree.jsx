import React, { useEffect, useState, useMemo } from "react";
import Tree from "react-d3-tree";

const BASIC_ELEMENTS = ["Air", "Water", "Fire", "Earth"];

function convertCombosToTreeData(combos, target) {
  const comboMap = new Map();
  combos.forEach((combo) => comboMap.set(combo.id, { ...combo, children: [] }));

  combos.forEach((combo) => {
    if (combo.parentId !== -1 && comboMap.has(combo.parentId)) {
      comboMap.get(combo.parentId).children.push(combo);
    }
  });

  const rootCombo = combos.find(
    (c) => c.output === target && c.parentId === -1
  );

  if (!rootCombo) return null;

  function buildNode(combo) {
    return {
      name: combo.output,
      attributes: {
        type: BASIC_ELEMENTS.includes(combo.output)
          ? "Basic Element"
          : "Combined",
      },
      children: combo.inputs.map((input) => {
        const childCombo = combos.find(
          (c) => c.output === input && c.parentId === combo.id
        );

        if (childCombo) {
          return buildNode(childCombo);
        } else {
          return {
            name: input,
            attributes: {
              type: BASIC_ELEMENTS.includes(input)
                ? "Basic Element"
                : "Unknown",
            },
          };
        }
      }),
    };
  }

  return buildNode(rootCombo);
}

export default function RecipeTree({ combos, target }) {
  const treeData = useMemo(
    () => convertCombosToTreeData(combos, target),
    [combos, target]
  );

  return (
    <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-xl">
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        zoomable
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
}
