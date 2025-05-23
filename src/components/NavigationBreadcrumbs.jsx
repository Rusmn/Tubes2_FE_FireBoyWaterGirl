import React from "react";

function NavigationBreadcrumbs({ currentView, onSwitchView }) {
  const baseLinkClasses =
    "inline-flex items-center gap-1 cursor-pointer transition-all duration-150 ease-in-out px-1 py-1 rounded text-xs sm:text-sm";
  const activeLinkClasses =
    "font-bold underline underline-offset-4 decoration-2 decoration-yellow-700/90 text-yellow-950 bg-amber-100/70 shadow-sm";
  const inactiveLinkClasses =
    "text-yellow-800/90 hover:underline hover:decoration-yellow-700/80 hover:bg-amber-100/50";
  const separatorClasses =
    "mx-1 text-yellow-700/70 text-xs sm:text-sm select-none";

  const viewLabels = {
    form: "🔍 Formulir Pencarian",
    results: "📋 Hasil Ramuan",
    split: "🧭 Tampilan Split",
    book: "📖 Pustaka Elemen",
  };

  return (
    <div className="py-2 px-2 sm:px-3 bg-amber-100/70 text-xs flex items-center border-b-2 border-yellow-700/20 font-merriweather text-yellow-950 shadow-md backdrop-blur-sm overflow-x-auto whitespace-nowrap">
      <span
        className={`${baseLinkClasses} ${
          currentView === "form" ? activeLinkClasses : inactiveLinkClasses
        }`}
        onClick={() => onSwitchView("form")}
        aria-current={currentView === "form" ? "page" : undefined}
      >
        {viewLabels.form}
      </span>

      {currentView !== "form" && (
        <>
          <span className={separatorClasses}>▶</span>
          <span
            className={`${baseLinkClasses} ${activeLinkClasses}`}
            aria-current="page"
          >
            {viewLabels[currentView]}
          </span>
        </>
      )}
    </div>
  );
}

export default NavigationBreadcrumbs;
