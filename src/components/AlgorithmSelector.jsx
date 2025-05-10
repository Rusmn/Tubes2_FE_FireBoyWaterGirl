import React from "react";

function AlgorithmSelector({ selected, onChange }) {
  const algorithms = [
    {
      id: "bfs",
      name: "BFS (Breadth-First Search)",
      description: "Menelusuri grafik secara melebar, level per level",
    },
    {
      id: "dfs",
      name: "DFS (Depth-First Search)",
      description:
        "Menelusuri grafik secara mendalam, mengikuti satu jalur sampai akhir",
    },
    {
      id: "bidirectional",
      name: "Bidirectional",
      description:
        "Mencari dari dua arah secara bersamaan (elemen dasar dan target)",
    },
  ];

  return (
    <div className="mb-6 font-merriweather text-yellow-900">
      <h3 className="text-lg font-bold mb-3 tracking-wide">
        🧠 Pilih Algoritma
      </h3>
      <div className="space-y-2">
        {algorithms.map((algo) => (
          <label
            key={algo.id}
            className={`flex items-center cursor-pointer px-3 py-2 rounded border transition ${
              selected === algo.id
                ? "bg-yellow-200 border-yellow-600 shadow-inner"
                : "bg-yellow-100/60 hover:bg-yellow-200 border-yellow-500"
            }`}
          >
            <input
              type="radio"
              className="form-radio text-yellow-700 focus:ring-yellow-500 h-4 w-4"
              name="algorithm"
              value={algo.id}
              checked={selected === algo.id}
              onChange={() => onChange(algo.id)}
            />
            <div className="ml-3">
              <span className="font-medium">{algo.name}</span>
              {selected === algo.id && (
                <p className="text-xs mt-1 text-yellow-800">
                  {algo.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default AlgorithmSelector;
