import React from "react";

function AlgorithmSelector({ selected, onChange }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Pilih Algoritma</h3>
      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio"
            name="algorithm"
            value="bfs"
            checked={selected === "bfs"}
            onChange={() => onChange("bfs")}
          />
          <span className="ml-2">BFS (Breadth-First Search)</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio"
            name="algorithm"
            value="dfs"
            checked={selected === "dfs"}
            onChange={() => onChange("dfs")}
          />
          <span className="ml-2">DFS (Depth-First Search)</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio"
            name="algorithm"
            value="bidirectional"
            checked={selected === "bidirectional"}
            onChange={() => onChange("bidirectional")}
          />
          <span className="ml-2">Bidirectional (Bonus)</span>
        </label>
      </div>
    </div>
  );
}

export default AlgorithmSelector;
