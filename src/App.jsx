import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import SearchForm from "./components/SearchForm";
import SearchMetadata from "./components/SearchMetadata";
import SearchHistory from "./components/SearchHistory";
import Spinner from "./components/Spinner";
import Book from "./components/Book";
import paper from "./assets/paper1.png";
import wood from "./assets/wood2.png";
import "./index.css";

const RecipeTree = lazy(() => import("./components/RecipeTree"));

function App() {
  const [viewMode, setViewMode] = useState("form");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("searchHistory");
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Gagal memuat riwayat:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } catch (err) {
      console.error("Gagal menyimpan riwayat:", err);
    }
  }, [searchHistory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      if (e.ctrlKey) {
        if (e.key === "f") {
          e.preventDefault();
          setViewMode("form");
        } else if (e.key === "r" && searchResults) {
          e.preventDefault();
          setViewMode("results");
        } else if (e.key === "s") {
          e.preventDefault();
          setViewMode("split");
        } else if (e.key === "b") {
          e.preventDefault();
          setViewMode("book");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchResults]);

  const handleSearch = (formData) => {
    setError(null);
    setLoading(true);
    setSearchResults(null);
    setCurrentSearch(formData);

    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          item.targetElement !== formData.targetElement ||
          item.algorithm !== formData.algorithm ||
          item.isMultiple !== formData.isMultiple
      );
      return [formData, ...filtered.slice(0, 4)];
    });

    setTimeout(() => {
      try {
        // Simulasi hasil pencarian
        setSearchResults({
          combos: [
            { id: 0, inputs: ["Mud", "Fire"], output: "Brick" },
            { id: 1, inputs: ["Clay", "Stone"], output: "Brick" },
            { id: 2, inputs: ["Lava", "Air"], output: "Stone" },
            { id: 3, inputs: ["Earth", "Pressure"], output: "Stone" },
            { id: 4, inputs: ["Fire", "Earth"], output: "Lava" },
          ],
          stats: {
            time: Math.floor(Math.random() * 100) + 50,
            nodesVisited: Math.floor(Math.random() * 100) + 20,
          },
        });
        setLoading(false);

        if (viewMode !== "split") setViewMode("results");
      } catch (e) {
        setError("Terjadi kesalahan saat memuat hasil.");
        setLoading(false);
      }
    }, 1500);
  };

  const paperCardBaseClasses =
    "bg-cover bg-center p-6 sm:p-8 rounded-xl shadow-2xl h-full border-2 border-yellow-700/40 backdrop-blur-sm bg-opacity-[0.97]";
  const pageTitleBaseClasses =
    "text-3xl sm:text-4xl mb-8 sm:mb-10 font-bold text-center text-yellow-950 drop-shadow-xl tracking-wider";

  const renderForm = () => (
    <div
      className={`${paperCardBaseClasses} font-lora`}
      style={{ backgroundImage: `url(${paper})` }}
    >
      <h2 className={`${pageTitleBaseClasses} font-cinzel`}>
        Cari Recipe Elemen Alkimia
      </h2>
      <SearchForm onSearch={handleSearch} />
      <div className="mt-8 sm:mt-10 sm: border-t-2 border-yellow-700/20">
        <SearchHistory history={searchHistory} onSelect={handleSearch} />
      </div>
    </div>
  );

  const renderResults = () => (
    <div
      className={`${paperCardBaseClasses} font-lora`}
      style={{ backgroundImage: `url(${paper})` }}
    >
      {loading && <Spinner />}
      {!loading && error && (
        <div className="py-16 text-center text-red-700 font-merriweather">
          <p className="text-xl mb-3">🚫 Terjadi Kesalahan</p>
          <p className="text-sm mb-6 italic">{error}</p>
        </div>
      )}
      {!loading && !error && searchResults && currentSearch && (
        <>
          <h2 className={`${pageTitleBaseClasses} font-cinzel`}>
            Hasil Ramuan untuk: {currentSearch.targetElement}
          </h2>
          <SearchMetadata searchParams={currentSearch} />
          <Suspense
            fallback={
              <div className="py-10 text-center text-yellow-800/90 font-merriweather italic">
                Memuat visualisasi alkimia...
              </div>
            }
          >
            <RecipeTree
              combos={searchResults.combos}
              target={currentSearch.targetElement}
            />
          </Suspense>
          <div className="mt-8 p-4 bg-yellow-50 rounded shadow-sm">
            <p className="text-sm text-gray-700 mb-1">
              ⏱️ Waktu: <strong>{searchResults.stats.time} ms</strong>
            </p>
            <p className="text-sm text-gray-700">
              🔍 Node dikunjungi:{" "}
              <strong>{searchResults.stats.nodesVisited}</strong>
            </p>
          </div>
        </>
      )}
      {!loading && !error && !searchResults && (
        <div className="py-16 text-center text-yellow-800/90 font-merriweather">
          <p className="text-xl mb-3">🔮 Belum Ada Hasil.</p>
          <p className="text-sm mb-6 italic">
            Silakan mulai pencarian baru untuk melihat hasil ramuan.
          </p>
          <button
            onClick={() => setViewMode("form")}
            className="px-8 py-3 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition-all duration-150 ease-in-out shadow-lg focus:outline-none"
          >
            Mulai Pencarian Baru
          </button>
        </div>
      )}
    </div>
  );

  const renderBook = () => (
    <div
      className={`${paperCardBaseClasses} font-lora`}
      style={{ backgroundImage: `url(${paper})` }}
    >
      <Book />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${wood})` }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-100 text-yellow-800 p-3 z-50 rounded-lg shadow-lg"
      >
        Langsung ke Konten Utama
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

      <main id="main-content" className="container mx-auto px-4 py-8 sm:py-12">
        {viewMode === "form" && (
          <div className="max-w-3xl lg:max-w-4xl mx-auto">{renderForm()}</div>
        )}
        {viewMode === "results" && (
          <div className="max-w-3xl lg:max-w-4xl mx-auto">
            {renderResults()}
          </div>
        )}
        {viewMode === "split" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>{renderForm()}</div>
            <div>{renderResults()}</div>
          </div>
        )}
        {viewMode === "book" && (
          <div className="max-w-4xl lg:max-w-6xl mx-auto">{renderBook()}</div>
        )}
      </main>

      <footer className="mt-auto py-8 px-4 text-center text-sm text-amber-100/80 bg-black/70 backdrop-blur-sm font-merriweather shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.2)]">
        <p className="tracking-wide">
          Little Alchemy Recipe Finder - Tugas Besar Strategi Algoritma
        </p>
        <p className="mt-2 text-xs text-amber-100/70">
          Keyboard Shortcuts:{" "}
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+F
          </span>{" "}
          (Form),{" "}
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+R
          </span>{" "}
          (Results),{" "}
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+S
          </span>{" "}
          (Split),{" "}
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+B
          </span>{" "}
          (Book)
        </p>
      </footer>
    </div>
  );
}

export default App;
