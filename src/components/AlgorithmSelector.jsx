import React from 'react';

function AlgorithmSelector({ selected, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Algoritma:</label>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="algorithm"
            value="bfs"
            checked={selected === 'bfs'}
            onChange={() => onChange('bfs')}
            className="mr-2"
          />
          <span>BFS (Breadth-First Search)</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="algorithm"
            value="dfs"
            checked={selected === 'dfs'}
            onChange={() => onChange('dfs')}
            className="mr-2"
          />
          <span>DFS (Depth-First Search)</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="algorithm"
            value="bidirectional"
            checked={selected === 'bidirectional'}
            onChange={() => onChange('bidirectional')}
            className="mr-2"
          />
          <span>Bidirectional (Bonus)</span>
        </label>
      </div>
    </div>
  );
}

export default AlgorithmSelector;