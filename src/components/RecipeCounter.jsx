import React from "react";

function RecipeCounter({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(isNaN(newValue) ? 1 : Math.max(1, Math.min(50, newValue)));
  };

  const increment = () => onChange(Math.min(50, value + 1));
  const decrement = () => onChange(Math.max(1, value - 1));

  return (
    <div className="font-merriweather text-yellow-900">
      <div className="flex items-center">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= 1}
          className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border border-yellow-600 rounded-l-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Kurangi"
        >
          -
        </button>
        <input
          id="recipe-counter"
          type="number"
          min="1"
          max="50"
          value={value}
          onChange={handleChange}
          className="w-16 text-center p-1 border-t border-b border-yellow-600 text-yellow-900 bg-yellow-50 focus:outline-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={value >= 50}
          className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border border-yellow-600 rounded-r-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Tambah"
        >
          +
        </button>
        <span className="ml-2 text-sm text-yellow-800">(1-50)</span>
      </div>
    </div>
  );
}

export default RecipeCounter;
