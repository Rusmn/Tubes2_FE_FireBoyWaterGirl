import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Spinner from "./components/Spinner";

// Buat mockup RecipeTree sederhana
function MockRecipeTree() {
  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Visualisasi Recipe Tree</h2>
      <div className="bg-gray-100 p-4 text-center">
        <p>Bagian ini akan menampilkan recipe tree</p>
        <p className="text-sm text-gray-500">
          Visualisasi akan diimplementasikan setelah integrasi dengan backend
        </p>
      </div>
    </div>
  );
}

// Buat mockup SearchStats sederhana
function MockSearchStats() {
  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-lg font-medium mb-2">Statistik Pencarian</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Waktu pencarian:</p>
          <p className="font-semibold">120 ms</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Node yang dikunjungi:</p>
          <p className="font-semibold">42</p>
        </div>
      </div>
    </div>
  );
}

function TestPage() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (formData) => {
    console.log("Search data:", formData);
    setLoading(true);

    // Simulasi loading
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Little Alchemy 2 Recipe Finder
      </h1>

      <div className="max-w-lg mx-auto">
        <SearchForm onSearch={handleSearch} />

        {loading && <Spinner />}

        {showResults && (
          <div className="mt-8">
            <MockRecipeTree />
            <MockSearchStats />
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPage;
