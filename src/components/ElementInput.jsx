import React from "react";
import { BASIC_ELEMENTS } from "../utils/Constants";

function ElementInput({ value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="element-input" className="block mb-2 font-medium">
        Elemen Target:
      </label>
      <input
        id="element-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Masukkan nama elemen yang ingin dicari"
        className="w-full p-2 border rounded"
      />

      <div className="mt-3">
        <p className="mb-2 font-medium">Elemen Dasar:</p>
        <div className="flex flex-wrap gap-2">
          {BASIC_ELEMENTS.map((element) => (
            <button
              key={element}
              type="button"
              onClick={() => onChange(element)}
              className="px-3 py-1 border rounded"
            >
              {element}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementInput;
