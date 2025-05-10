import React, { useState } from "react";
import AlgorithmSelector from "./AlgorithmSelector";
import ElementInput from "./ElementInput";
import ModeToggle from "./ModeToggle";
import RecipeCounter from "./RecipeCounter";
import { DEFAULT_FORM_VALUES } from "../utils/Constants";

function SearchForm({ onSearch }) {
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES);
  const [liveUpdate, setLiveUpdate] = useState(false);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleModeToggle = (isMultiple) => {
    setFormState((prev) => ({ ...prev, isMultiple }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.targetElement) return;
    onSearch({
      ...formState,
      mode: formState.isMultiple ? "multiple" : "shortest",
      liveUpdate,
    });
  };

  const sectionWrapperClasses =
    "p-5 border-2 border-yellow-700/30 rounded-xl bg-amber-50/60 space-y-5 shadow-lg backdrop-blur-[1px]";
  const sectionTitleClasses =
    "font-semibold mb-3 text-yellow-950 font-merriweather text-lg tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 font-lora">
      <ElementInput
        value={formState.targetElement}
        onChange={(value) => handleChange("targetElement", value)}
      />

      <AlgorithmSelector
        selected={formState.algorithm}
        onChange={(value) => handleChange("algorithm", value)}
      />

      <div className={sectionWrapperClasses}>
        <ModeToggle
          isMultiple={formState.isMultiple}
          onChange={handleModeToggle}
        />
        {formState.isMultiple && (
          <RecipeCounter
            value={formState.maxRecipes}
            onChange={(value) => handleChange("maxRecipes", value)}
          />
        )}
      </div>

      <div className={sectionWrapperClasses}>
        <h3 className={sectionTitleClasses}>⚙️ Fitur Tambahan</h3>
        <label className="flex items-center text-yellow-900 cursor-pointer group py-1">
          <input
            type="checkbox"
            checked={liveUpdate}
            onChange={(e) => setLiveUpdate(e.target.checked)}
            className="mr-3 h-4 w-4 accent-yellow-700 rounded border-yellow-600/60 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-amber-50/60 transition shadow-sm"
          />
          <span className="text-sm font-nunitoSans group-hover:text-yellow-950">
            Aktifkan Live Update Visualisasi
          </span>
        </label>
        {liveUpdate && (
          <p className="text-xs text-yellow-800/90 mt-1 italic font-nunitoSans pl-7">
            Visualisasi tree akan diperbarui secara bertahap selama pencarian.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!formState.targetElement}
        className={`w-full p-4 rounded-xl font-bold text-base tracking-wider transition-all duration-150 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-amber-50/90 ${
          !formState.targetElement
            ? "bg-yellow-500/50 text-yellow-700/70 cursor-not-allowed"
            : "bg-yellow-700 hover:bg-yellow-800 text-white focus:ring-yellow-600/70"
        } font-nunitoSans`}
      >
        {!formState.targetElement
          ? "PILIH ELEMEN TARGET DAHULU"
          : "🔍 CARI RESEP ALKIMIA"}
      </button>

      <div className="mt-6 p-3.5 bg-amber-50/50 text-xs text-yellow-950/80 border-2 border-yellow-700/20 rounded-xl shadow-md font-nunitoSans space-y-2 tracking-wide">
        <div className="flex justify-between">
          <strong className="text-yellow-950">Mode:</strong>
          <span>
            {formState.isMultiple ? "Multiple Recipes" : "Shortest Path"}
          </span>
        </div>
        <hr className="border-yellow-700/20" />
        <div className="flex justify-between">
          <strong className="text-yellow-950">Algoritma:</strong>{" "}
          <span>{formState.algorithm.toUpperCase()}</span>
        </div>
        {liveUpdate && (
          <>
            <hr className="border-yellow-700/20" />
            <div className="flex justify-between">
              <strong className="text-yellow-950">Live Update:</strong>{" "}
              <span className="text-green-700 font-semibold">Aktif</span>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
