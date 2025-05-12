import React from "react";

export default function RecipePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        className={`px-3 py-1 rounded-md shadow-sm border ${
          currentPage <= 0
            ? "bg-yellow-100 text-yellow-400 border-yellow-200 cursor-not-allowed"
            : "bg-yellow-200 text-yellow-800 border-yellow-400 hover:bg-yellow-300"
        }`}
      >
        ←
      </button>

      <span className="px-3 py-1 text-sm bg-amber-50/80 rounded-md border border-yellow-600/50 text-yellow-900 font-merriweather">
        Resep {currentPage + 1} dari {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className={`px-3 py-1 rounded-md shadow-sm border ${
          currentPage >= totalPages - 1
            ? "bg-yellow-100 text-yellow-400 border-yellow-200 cursor-not-allowed"
            : "bg-yellow-200 text-yellow-800 border-yellow-400 hover:bg-yellow-300"
        }`}
      >
        →
      </button>
    </div>
  );
}
