import React from "react";

function Navbar({ viewMode, setViewMode, currentSearch }) {
  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-xl font-bold">Little Alchemy 2 Recipe Finder</h1>

        <button
          onClick={() => setViewMode("book")}
          className={`px-3 py-1 text-sm ${
            viewMode === "book"
              ? "bg-white text-blue-600"
              : "bg-blue-700 text-white"
          } ml-auto`} // Corrected here with ml-auto
          aria-label="Beralih ke tampilan book"
          aria-pressed={viewMode === "book"}
        >
          📖
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          {currentSearch && (
            <span className="text-sm bg-blue-700 py-1 px-2 rounded">
              Elemen: <strong>{currentSearch.targetElement}</strong>
            </span>
          )}

          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setViewMode("form")}
              className={`px-3 py-1 text-sm ${
                viewMode === "form"
                  ? "bg-white text-blue-600"
                  : "bg-blue-700 text-white"
              }`}
              aria-label="Beralih ke tampilan form"
              aria-pressed={viewMode === "form"}
            >
              Form
            </button>
            <button
              onClick={() => setViewMode("results")}
              className={`px-3 py-1 text-sm ${
                viewMode === "results"
                  ? "bg-white text-blue-600"
                  : "bg-blue-700 text-white"
              }`}
              disabled={!currentSearch}
              aria-label="Beralih ke tampilan hasil"
              aria-pressed={viewMode === "results"}
            >
              Hasil
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`px-3 py-1 text-sm ${
                viewMode === "split"
                  ? "bg-white text-blue-600"
                  : "bg-blue-700 text-white"
              }`}
              aria-label="Beralih ke tampilan split"
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
