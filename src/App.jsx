// App.jsx FINAL - tree visualisasi aman, book juga jalan

import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import Navbar from "./components/Navbar";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import SearchForm from "./components/SearchForm";
import SearchMetadata from "./components/SearchMetadata";
import SearchHistory from "./components/SearchHistory";
import SearchStats from "./components/SearchStats";
import Spinner from "./components/Spinner";
import Book from "./components/Book";
import RecipePagination from "./components/RecipePagination";
import useRecipeSearch from "./hooks/useRecipeSearch";
import useLiveUpdate from "./hooks/useLiveUpdate";
import LiveUpdateVisualizer from "./components/LiveUpdateVisualizer";
import paper from "./assets/paper1.png";
import wood from "./assets/wood2.png";
import "./index.css";

const RecipeTree = lazy(() => import("./components/RecipeTree"));

function App() {
  const [viewMode, setViewMode] = useState("form");
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, results, currentSearch, search } = useRecipeSearch();
  const stableCombos = useMemo(() => results?.combos || [], [results]);

  const basicElements = useMemo(() => {
    const allOutputs = new Set(stableCombos.map((c) => c.output));
    const allInputs = new Set(
      stableCombos.flatMap((c) => (Array.isArray(c.inputs) ? c.inputs : []))
    );
    return [...allInputs].filter((input) => !allOutputs.has(input));
  }, [stableCombos]);

  const [liveUpdateEnabled, setLiveUpdateEnabled] = useState(false);
  const {
    updateHistory,
    currentStep,
    isRunning,
    partialCombos,
    setUpdateSpeed,
    stopLiveUpdate,
  } = useLiveUpdate(
    liveUpdateEnabled && currentSearch?.liveUpdate,
    currentSearch?.algorithm,
    currentSearch,
    stableCombos
  );

  const { allRecipeTrees, totalRecipePaths } = useMemo(() => {
    function cartesianProduct(arrays) {
      return arrays.reduce(
        (a, b) =>
          a.length === 0 || b.length === 0
            ? []
            : a.flatMap((d) =>
                b.map((e) => (Array.isArray(d) ? [...d, e] : [d, e]))
              ),
        [[]]
      );
    }

    const uniqueCombosMap = new Map();
    stableCombos.forEach((combo) => {
      if (!combo || !Array.isArray(combo.inputs)) return;
      const key = combo.output + "|" + [...combo.inputs].sort().join("+");
      if (!uniqueCombosMap.has(key)) uniqueCombosMap.set(key, combo);
    });
    const uniqueCombos = Array.from(uniqueCombosMap.values());

    const uniqueRecipesByOutput = new Map();
    uniqueCombos.forEach((combo) => {
      if (!uniqueRecipesByOutput.has(combo.output)) {
        uniqueRecipesByOutput.set(combo.output, []);
      }
      uniqueRecipesByOutput.get(combo.output).push(combo);
    });

    const BASIC_ELEMENTS = (() => {
      const allOutputs = new Set(uniqueCombos.map((c) => c.output));
      const allInputs = new Set(
        uniqueCombos.flatMap((c) => (Array.isArray(c.inputs) ? c.inputs : []))
      );
      return [...allInputs].filter((input) => !allOutputs.has(input));
    })();

    function buildRecipeTreesFromUnique(currentElement) {
      if (BASIC_ELEMENTS.includes(currentElement)) {
        return [
          { name: currentElement, attributes: { type: "Basic Element" } },
        ];
      }

      const possibleRecipes = uniqueRecipesByOutput.get(currentElement) || [];
      if (possibleRecipes.length === 0) return [];

      const treesForCurrentElement = [];
      possibleRecipes.forEach((recipe) => {
        const childrenTreeOptions = recipe.inputs.map((input) =>
          buildRecipeTreesFromUnique(input)
        );
        if (childrenTreeOptions.some((options) => options.length === 0)) return;
        const allCombinedChildrenSets = cartesianProduct(childrenTreeOptions);
        allCombinedChildrenSets.forEach((childrenCombination) => {
          treesForCurrentElement.push({
            name: recipe.output,
            attributes: { type: "Combined" },
            children: childrenCombination,
          });
        });
      });

      return treesForCurrentElement;
    }

    function getTreeSignature(node) {
      if (!node) return "";
      let signature = node.name;
      if (node.children && node.children.length > 0) {
        const sortedChildrenSignatures = node.children
          .map(getTreeSignature)
          .sort()
          .join(",");
        signature += `(${sortedChildrenSignatures})`;
      }
      return signature;
    }

    const targetElement = currentSearch?.targetElement;
    if (BASIC_ELEMENTS.includes(targetElement)) {
      return {
        allRecipeTrees: [
          {
            name: targetElement,
            attributes: { type: "Basic Element" },
            children: [],
          },
        ],
        totalRecipePaths: 1,
      };
    }

    const allPossibleTrees = buildRecipeTreesFromUnique(targetElement);
    const uniqueRecipeTrees = [];
    const seenSignatures = new Set();
    allPossibleTrees.forEach((tree) => {
      const signature = getTreeSignature(tree);
      if (!seenSignatures.has(signature)) {
        seenSignatures.add(signature);
        uniqueRecipeTrees.push(tree);
      }
    });

    return {
      allRecipeTrees: uniqueRecipeTrees,
      totalRecipePaths: uniqueRecipeTrees.length,
    };
  }, [stableCombos, currentSearch?.targetElement]);

  const isBasicTarget = useMemo(() => {
    const allOutputs = new Set(stableCombos.map((c) => c.output));
    const allInputs = new Set(
      stableCombos.flatMap((c) => (Array.isArray(c.inputs) ? c.inputs : []))
    );
    const BASIC_ELEMENTS = [...allInputs].filter(
      (input) => !allOutputs.has(input)
    );
    return BASIC_ELEMENTS.includes(currentSearch?.targetElement);
  }, [stableCombos, currentSearch?.targetElement]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentSearch, allRecipeTrees]);

  const currentTreeData =
    allRecipeTrees[currentIndex] || allRecipeTrees[0] || null;

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) setSearchHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = (formData) => {
    if (isRunning) stopLiveUpdate();
    const normalized = {
      ...formData,
      targetElement:
        formData.targetElement.charAt(0).toUpperCase() +
        formData.targetElement.slice(1).toLowerCase(),
    };
    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          item.targetElement !== normalized.targetElement ||
          item.algorithm !== normalized.algorithm ||
          item.isMultiple !== normalized.isMultiple ||
          item.liveUpdate !== normalized.liveUpdate
      );
      return [normalized, ...filtered.slice(0, 4)];
    });
    search(normalized);
    setLiveUpdateEnabled(normalized.liveUpdate);
    if (viewMode !== "split") setViewMode("results");
  };

  const handlePathChange = (newIndex) => {
    const maxIndex = totalRecipePaths > 0 ? totalRecipePaths - 1 : 0;
    const validIndex = Math.max(0, Math.min(newIndex, maxIndex));
    setCurrentIndex(validIndex);
  };

  const renderForm = () => (
    <div
      className="bg-cover p-6 rounded-xl shadow-xl"
      style={{ backgroundImage: `url(${paper})` }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Cari Recipe Elemen Alkimia
      </h2>
      <SearchForm onSearch={handleSearch} />
      <div className="mt-8 border-t border-gray-300 pt-6">
        <SearchHistory history={searchHistory} onSelect={handleSearch} />
      </div>
    </div>
  );

  const renderResults = () => (
    <div
      className="bg-cover p-6 rounded-xl shadow-xl"
      style={{ backgroundImage: `url(${paper})` }}
    >
      {loading && <Spinner text="Sedang mencari recipe..." />}
      {!loading && error && (
        <div className="text-center text-red-700">
          <p className="text-xl font-bold">🚫 Terjadi Kesalahan</p>
          <p className="italic mt-2">{error}</p>
          <button
            onClick={() => setViewMode("form")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kembali ke Form
          </button>
        </div>
      )}
      {!loading && !error && currentSearch && (
        <>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Hasil Ramuan untuk: {currentSearch.targetElement}
          </h2>
          <SearchMetadata
            searchParams={currentSearch}
            currentPage={totalRecipePaths > 0 ? currentIndex + 1 : 0}
            totalPages={totalRecipePaths}
          />
          {results?.stats && (
            <SearchStats
              stats={results.stats}
              totalRecipes={totalRecipePaths}
            />
          )}
          {liveUpdateEnabled &&
          currentSearch.liveUpdate &&
          isRunning &&
          partialCombos ? (
            <LiveUpdateVisualizer
              partialCombos={partialCombos}
              targetElement={currentSearch.targetElement}
              currentStep={currentStep}
              setUpdateSpeed={setUpdateSpeed}
              stopLiveUpdate={stopLiveUpdate}
            />
          ) : (
            <Suspense
              fallback={
                <div className="text-center text-yellow-800 italic">
                  Memuat visualisasi alkimia...
                </div>
              }
            >
              {totalRecipePaths > 0 && currentTreeData ? (
                <RecipeTree treeData={currentTreeData} />
              ) : (
                <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-inner flex items-center justify-center">
                  <p className="text-yellow-800 font-merriweather italic text-center p-4">
                    Tidak ada resep lengkap yang ditemukan untuk{" "}
                    {currentSearch.targetElement}.
                    {isBasicTarget
                      ? " Ini adalah elemen dasar dan tidak memiliki resep kombinasi."
                      : ""}
                  </p>
                </div>
              )}
            </Suspense>
          )}
          {totalRecipePaths > 1 && !liveUpdateEnabled && (
            <RecipePagination
              currentPage={currentIndex}
              totalPages={totalRecipePaths}
              onPageChange={handlePathChange}
            />
          )}
        </>
      )}
    </div>
  );

  const renderBook = () => (
    <div
      className="bg-cover p-6 rounded-xl shadow-xl"
      style={{ backgroundImage: `url(${paper})` }}
    >
      <Book combos={stableCombos} basicElements={basicElements} />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover flex flex-col"
      style={{ backgroundImage: `url(${wood})` }}
    >
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentSearch={currentSearch}
        isRunningLiveUpdate={isRunning}
        stopLiveUpdate={stopLiveUpdate}
      />
      <NavigationBreadcrumbs
        currentView={viewMode}
        onSwitchView={setViewMode}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {viewMode === "form" && (
          <div className="max-w-4xl mx-auto">{renderForm()}</div>
        )}
        {viewMode === "results" && (
          <div className="max-w-4xl mx-auto">{renderResults()}</div>
        )}
        {viewMode === "split" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>{renderForm()}</div>
            <div>{renderResults()}</div>
          </div>
        )}
        {viewMode === "book" && renderBook()}
      </main>
      <footer className="mt-auto py-8 px-4 text-center text-sm text-amber-100/80 bg-black/70 backdrop-blur-sm font-merriweather shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.2)]">
        <p className="tracking-wide">
          Little Alchemy Recipe Finder - Tugas Besar Strategi Algoritma
        </p>
        <p className="mt-2 text-xs text-amber-100/70">
          Keyboard Shortcuts:
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+F
          </span>{" "}
          (Form),
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+R
          </span>{" "}
          (Results),
          <span className="font-mono bg-black/25 rounded-sm px-1.5">
            Ctrl+S
          </span>{" "}
          (Split),
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
