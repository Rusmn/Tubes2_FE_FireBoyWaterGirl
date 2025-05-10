import React, { useState } from "react";
import AlgorithmSelector from "./AlgorithmSelector";
import ElementInput from "./ElementInput";
// Import SimpleModeToggle instead of ModeToggle
import ModeToggle from "./ModeToggle";
import RecipeCounter from "./RecipeCounter";
import { DEFAULT_FORM_VALUES } from "../utils/Constants";

function SearchForm({ onSearch }) {
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES);
  const [liveUpdate, setLiveUpdate] = useState(false);

  const handleChange = (field, value) => {
    console.log(`Changing ${field} to:`, value);
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleModeToggle = (isMultiple) => {
    console.log("Mode toggle changed to:", isMultiple);
    setFormState((prev) => ({ ...prev, isMultiple }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      ...formState,
      mode: formState.isMultiple ? "multiple" : "shortest",
      liveUpdate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded font-lora"
    >
      <ElementInput
        value={formState.targetElement}
        onChange={(value) => handleChange("targetElement", value)}
      />

      <AlgorithmSelector
        selected={formState.algorithm}
        onChange={(value) => handleChange("algorithm", value)}
      />

      {/* Menggunakan SimpleModeToggle sebagai pengganti ModeToggle */}
      <div className="p-3 border border-gray-200 rounded mb-4 bg-gray-50">
        <ModeToggle
          isMultiple={formState.isMultiple}
          onChange={handleModeToggle}
        />

        {formState.isMultiple && (
          <div className="mt-3">
            <RecipeCounter
              value={formState.maxRecipes}
              onChange={(value) => handleChange("maxRecipes", value)}
            />
          </div>
        )}
      </div>

      <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50">
        <div className="font-medium mb-2">Fitur Bonus:</div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={liveUpdate}
            onChange={(e) => setLiveUpdate(e.target.checked)}
            className="mr-2 h-4 w-4"
          />
          <span className="text-sm">Aktifkan Live Update</span>
        </label>
        {liveUpdate && (
          <p className="text-xs text-gray-600 mt-1">
            Live update akan menampilkan progress pencarian secara real-time.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!formState.targetElement}
        className={`w-full p-2 rounded text-white ${
          !formState.targetElement
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {!formState.targetElement
          ? "Masukkan elemen target terlebih dahulu"
          : "Cari Resep"}
      </button>

      {/* Debug info - melihat state saat ini */}
      <div className="mt-4 p-2 bg-gray-100 text-xs">
        <div>
          Current Mode:{" "}
          {formState.isMultiple ? "Multiple Recipes" : "Shortest Path"}
        </div>
        <div>Algorithm: {formState.algorithm}</div>
        <div>Live Update: {liveUpdate ? "Enabled" : "Disabled"}</div>
      </div>
    </form>
  );
}

export default SearchForm;
