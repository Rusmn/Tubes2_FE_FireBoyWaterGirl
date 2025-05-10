import React from "react";
import logo from "../assets/logo.png";

function Navbar({ viewMode, setViewMode, currentSearch }) {
  const baseButtonClass =
    "px-3.5 py-2 text-sm rounded-lg transition-all duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-950/70 tracking-wide";
  const activeButtonStyle =
    "bg-amber-100 text-yellow-950 font-bold ring-amber-300";
  const inactiveButtonStyle =
    "bg-yellow-900/50 text-amber-100 hover:bg-amber-200 hover:text-yellow-950 focus:ring-amber-400";
  const groupBorderColor = "border-yellow-700/20";

  return (
    <nav className="bg-yellow-950/95 text-amber-100 px-4 sm:px-6 py-3.5 sticky top-0 z-20 font-merriweather shadow-2xl backdrop-blur-lg border-b-2 border-black/30">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-cinzelDecorative tracking-wider font-extrabold drop-shadow-xl whitespace-nowrap">
          <img src={logo} alt="Logo RBR" className="w-10 h-10" />
          <span className="text-red-400 hover:text-red-300 transition-colors">
            FIRE
          </span>{" "}
          <span className="text-amber-100 hover:text-white transition-colors">
            BOY
          </span>{" "}
          <span className="text-blue-300 hover:text-blue-200 transition-colors">
            WATER
          </span>{" "}
          <span className="text-amber-100 hover:text-white transition-colors">
            GIRL
          </span>
        </h1>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 mt-2 sm:mt-0">
          <button
            onClick={() => setViewMode("book")}
            className={`${baseButtonClass} ${
              viewMode === "book" ? activeButtonStyle : inactiveButtonStyle
            }`}
            aria-label="Beralih ke tampilan Pustaka"
            aria-pressed={viewMode === "book"}
          >
            📖 Pustaka
          </button>

          {currentSearch && (
            <div className="text-xs sm:text-sm bg-yellow-800/60 py-1.5 px-3 rounded-lg shadow-inner border border-yellow-700/40 text-amber-100 whitespace-nowrap flex items-center gap-1.5">
              <span>🔎</span>
              <span>Target:</span>
              <strong className="tracking-wider font-nunitoSans">
                {currentSearch.targetElement}
              </strong>
            </div>
          )}

          <div
            className={`flex border ${groupBorderColor} rounded-lg overflow-hidden shadow-md`}
          >
            <button
              onClick={() => setViewMode("form")}
              className={`${baseButtonClass} ${
                viewMode === "form" ? activeButtonStyle : inactiveButtonStyle
              } rounded-r-none border-r ${groupBorderColor}`}
              aria-label="Beralih ke tampilan Form"
              aria-pressed={viewMode === "form"}
            >
              Form
            </button>
            <button
              onClick={() => setViewMode("results")}
              className={`${baseButtonClass} ${
                viewMode === "results" ? activeButtonStyle : inactiveButtonStyle
              } rounded-none ${
                !currentSearch &&
                "opacity-70 cursor-not-allowed hover:bg-yellow-900/50 hover:text-amber-100"
              }`}
              disabled={!currentSearch}
              aria-label="Beralih ke tampilan Hasil"
              aria-pressed={viewMode === "results"}
            >
              Hasil
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`${baseButtonClass} ${
                viewMode === "split" ? activeButtonStyle : inactiveButtonStyle
              } rounded-l-none border-l ${groupBorderColor}`}
              aria-label="Beralih ke tampilan Split"
              aria-pressed={viewMode === "split"}
            >
              Split
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
