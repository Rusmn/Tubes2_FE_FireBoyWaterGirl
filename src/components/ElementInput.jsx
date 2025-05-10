import React from "react";
import { BASIC_ELEMENTS } from "../utils/Constants";

function ElementInput({ value, onChange }) {
  const elementIcons = {
    "Air": "💨",
    "Earth": "🌍",
    "Fire": "🔥",
    "Water": "💧"
  };

  return (
    <div className="mb-6 font-merriweather text-yellow-900">
      <label
        htmlFor="element-input"
        className="block mb-3 font-semibold tracking-wide text-lg"
      >
        🎯 Elemen Target
      </label>
      <input
        id="element-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Masukkan nama elemen yang ingin dicari"
        className="w-full p-3 rounded-lg border border-yellow-500 bg-yellow-50 placeholder-yellow-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-700"
      />

      <div className="mt-5">
        <p className="mb-2 font-semibold">🔹 Elemen Dasar:</p>
        <div className="flex flex-wrap gap-2">
          {BASIC_ELEMENTS.map((element) => (
            <button
              key={element}
              type="button"
              onClick={() => onChange(element)}
              className={`px-4 py-1.5 font-semibold rounded-full border shadow-sm transition ${
                value === element
                  ? "bg-yellow-400 text-yellow-900 border-yellow-700"
                  : "bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border-yellow-600"
              }`}
            >
              {elementIcons[element] || ""} {element}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementInput;