import React from "react";

function SearchHistory({ history, onSelect }) {
  if (!history || history.length === 0) return null;

  const getAlgorithmIcon = (algo) => {
    switch (algo) {
      case "bfs":
        return "🔎";
      case "dfs":
        return "🔍";
      case "bidirectional":
        return "🧲";
      default:
        return "🔎";
    }
  };

  return (
    <div className="pt-4 border-t border-yellow-700 font-merriweather text-yellow-900">
      <h3 className="text-xl font-semibold mb-4 tracking-wide">
        🔁 Pencarian Terakhir
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 rounded-lg text-sm border border-yellow-600 shadow-sm transition flex items-center gap-2 hover:shadow"
          >
            <span className="text-lg">{getAlgorithmIcon(item.algorithm)}</span>
            <div className="text-left">
              <div className="font-bold">{item.targetElement}</div>
              <div className="text-xs text-yellow-800">
                {item.algorithm.toUpperCase()} •
                {item.isMultiple ? " Multiple" : " Shortest"}
                {item.liveUpdate ? " • Live" : ""}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
