import React from "react";

function RecipeCounter({ value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="recipe-counter" className="block mb-2 font-medium">
        Jumlah Recipe Maksimal:
      </label>
      <input
        id="recipe-counter"
        type="number"
        min="1"
        max="20"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className="p-2 border rounded w-20"
      />
    </div>
  );
}

export default RecipeCounter;
