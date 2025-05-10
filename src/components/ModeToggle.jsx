import React from "react";

function ModeToggle({ isMultiple, onChange }) {
  return (
    <div className="mb-6 font-merriweather text-yellow-900">
      <label className="block mb-3 font-semibold text-lg tracking-wide">
        🧩 Mode Pencarian
      </label>
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 px-4 py-3 rounded-xl border font-semibold transition ${
            !isMultiple
              ? "bg-yellow-500 text-white border-yellow-700 shadow-inner"
              : "bg-yellow-100 text-yellow-900 border-yellow-600 hover:bg-yellow-200"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">⚡</span>
            <span>Shortest Path</span>
          </div>
          {!isMultiple && (
            <div className="text-xs mt-1 text-yellow-100">
              Mencari satu resep terpendek untuk mencapai elemen target
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 px-4 py-3 rounded-xl border font-semibold transition ${
            isMultiple
              ? "bg-yellow-500 text-white border-yellow-700 shadow-inner"
              : "bg-yellow-100 text-yellow-900 border-yellow-600 hover:bg-yellow-200"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🔄</span>
            <span>Multiple Recipes</span>
          </div>
          {isMultiple && (
            <div className="text-xs mt-1 text-yellow-100">
              Mencari beberapa resep alternatif untuk mencapai elemen target
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default ModeToggle;
