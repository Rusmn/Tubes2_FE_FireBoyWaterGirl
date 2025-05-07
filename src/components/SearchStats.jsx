import React from 'react';

/**
 * Komponen untuk menampilkan statistik pencarian
 * @param {Object} props
 * @param {Object} props.stats - Objek statistik pencarian
 * @param {number} props.stats.time - Waktu pencarian dalam milidetik
 * @param {number} props.stats.nodesVisited - Jumlah node yang dikunjungi
 */
function SearchStats({ stats }) {
  if (!stats) {
    return null;
  }

  const { time, nodesVisited } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">Waktu pencarian:</span>
        <span className="font-semibold">
          {time < 1000 ? `${time} ms` : `${(time / 1000).toFixed(2)} detik`}
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">Node yang dikunjungi:</span>
        <span className="font-semibold">{nodesVisited.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default SearchStats;