import React from "react";

function SearchStats({ stats, totalRecipes }) {
  if (!stats) return null;

  const { time, nodesVisited } = stats;

  const statItemClasses =
    "flex flex-col p-3 bg-amber-50/60 rounded-md shadow-sm border border-yellow-600/30";
  const labelClasses = "text-sm text-yellow-800/90";
  const valueClasses = "font-bold tracking-wide text-yellow-950 mt-0.5 text-lg";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-100/70 p-4 rounded-lg border border-yellow-600/50 shadow-md font-merriweather mb-6">
      <h3 className="font-bold text-base text-yellow-950 tracking-wide sm:col-span-3 mb-1">
        📊 Statistik Pencarian:
      </h3>
      <div className={statItemClasses}>
        <span className={labelClasses}>⏱ Waktu Pencarian:</span>
        <span className={valueClasses}>
          {time < 10_000_000
            ? `${(time / 10_000).toFixed(0)} ms`
            : `${(time / 10_000_000).toFixed(2)} detik`}
        </span>
      </div>
      <div className={statItemClasses}>
        <span className={labelClasses}>🧭 Node Dikunjungi:</span>
        <span className={valueClasses}>{nodesVisited.toLocaleString()}</span>
      </div>
      <div className={statItemClasses}>
        <span className={labelClasses}>🧩 Total Resep Ditemukan:</span>
        <span className={valueClasses}>{totalRecipes}</span>
      </div>
    </div>
  );
}

export default SearchStats;
