import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import SearchForm from "./components/SearchForm";
import SearchMetadata from "./components/SearchMetadata";
import SearchHistory from "./components/SearchHistory";
import Spinner from "./components/Spinner";
import Book from "./components/Book";
import "./index.css";

const RecipeTree = lazy(() => import("./components/RecipeTree"));
// Atau ganti ke RecipeGraph jika ingin gunakan versi graph
// const RecipeGraph = lazy(() => import('./components/RecipeGraph'));

function App() {
  const [viewMode, setViewMode] = useState("form");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load history dari localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("searchHistory");
      if (saved) setSearchHistory(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to load history", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } catch (err) {
      console.error("Failed to save history", err);
    }
  }, [searchHistory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        setViewMode("form");
      } else if (e.ctrlKey && e.key === "r" && searchResults) {
        e.preventDefault();
        setViewMode("results");
      } else if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setViewMode("split");
      } else if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setViewMode("book");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchResults]);

  const handleSearch = (formData) => {
    setCurrentSearch(formData);
    setLoading(true);

    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          item.targetElement !== formData.targetElement ||
          item.algorithm !== formData.algorithm ||
          item.isMultiple !== formData.isMultiple
      );
      return [formData, ...filtered.slice(0, 4)];
    });

    // Simulasi hasil API
    setTimeout(() => {
      setLoading(false);
      setSearchResults({
        combos: [
          { id: 0, inputs: ["Mud", "Fire"], output: "Brick" },
          { id: 1, inputs: ["Clay", "Stone"], output: "Brick" },
          { id: 2, inputs: ["Lava", "Air"], output: "Stone" },
          { id: 3, inputs: ["Earth", "Pressure"], output: "Stone" },
          { id: 4, inputs: ["Fire", "Earth"], output: "Lava" },
        ],
        stats: { time: 120, nodesVisited: 42 },
      });

      if (viewMode !== "split") {
        setViewMode("results");
      }
    }, 1500);
  };

  const renderForm = () => (
    <div className="bg-white p-6 rounded shadow h-full">
      <h2 className="text-xl font-bold mb-4">Cari Recipe Elemen</h2>
      <SearchForm onSearch={handleSearch} />
      <SearchHistory history={searchHistory} onSelect={handleSearch} />
    </div>
  );

  const renderResults = () => (
    <div className="bg-white p-6 rounded shadow h-full">
      {loading ? (
        <Spinner message="Sedang mencari recipe..." />
      ) : searchResults && currentSearch ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            Recipe untuk {currentSearch.targetElement}
          </h2>
          <SearchMetadata searchParams={currentSearch} />
          <Suspense
            fallback={
              <div className="p-8 text-center">Loading visualizer...</div>
            }
          >
            <RecipeTree
              combos={searchResults.combos}
              target={currentSearch.targetElement}
            />
            {/* Jika pakai graph:
            <RecipeGraph combos={searchResults.combos} target={currentSearch.targetElement} /> */}
          </Suspense>
          <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded mt-4">
            <div>
              <p className="text-sm text-gray-600">Waktu pencarian:</p>
              <p className="font-semibold">{searchResults.stats.time} ms</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Node yang dikunjungi:</p>
              <p className="font-semibold">
                {searchResults.stats.nodesVisited}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>Belum ada hasil pencarian.</p>
          <button
            onClick={() => setViewMode("form")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Mulai Pencarian
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-600 p-2 z-50"
      >
        Langsung ke konten utama
      </a>

      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentSearch={currentSearch}
      />
      <NavigationBreadcrumbs
        currentView={viewMode}
        onSwitchView={setViewMode}
      />

      <main id="main-content" className="container mx-auto px-4 py-4">
        {viewMode === "form" && (
          <div className="max-w-4xl mx-auto">{renderForm()}</div>
        )}
        {viewMode === "results" && (
          <div className="max-w-4xl mx-auto">{renderResults()}</div>
        )}
        {viewMode === "split" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>{renderForm()}</div>
            <div>{renderResults()}</div>
          </div>
        )}
        {viewMode === "book" && <Book />}
      </main>

      <footer className="mt-auto py-4 px-4 text-center text-sm text-gray-500 border-t">
        <p>Little Alchemy 2 Recipe Finder - Tugas Besar 2 Strategi Algoritma</p>
        <p className="mt-1">
          Keyboard Shortcuts: <span className="font-mono">Ctrl+F</span> (Form),
          <span className="font-mono"> Ctrl+R</span> (Results),
          <span className="font-mono"> Ctrl+S</span> (Split View),
          <span className="font-mono"> Ctrl+B</span> (Book)
        </p>
      </footer>
    </div>
  );
}

export default App;
