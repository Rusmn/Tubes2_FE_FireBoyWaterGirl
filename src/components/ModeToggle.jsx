import React from "react";

function ModeToggle({ isMultiple, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Mode Pencarian:</label>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-4 py-2 rounded ${
            !isMultiple ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Shortest Path
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-4 py-2 rounded ${
            isMultiple ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Multiple Recipes
        </button>
      </div>
    </div>
  );
}

export default ModeToggle;
