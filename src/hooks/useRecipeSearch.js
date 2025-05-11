import { useState, useCallback } from "react";
import { searchRecipe } from "../services/api";

/**
 * Custom hook untuk melakukan pencarian recipe
 * @returns {Object} - Objek berisi state dan fungsi untuk pencarian recipe
 */
function useRecipeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);

  /**
   * Fungsi untuk melakukan pencarian recipe melalui API
   * @param {Object} searchParams - Parameter pencarian
   */
  const search = useCallback(async (searchParams) => {
    if (!searchParams.targetElement) {
      setError("Elemen target tidak boleh kosong");
      return;
    }

    if (!searchParams.algorithm) {
      setError("Algoritma pencarian harus dipilih");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentSearch(searchParams);

    try {
      // Panggil API backend
      const data = await searchRecipe(searchParams);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Terjadi kesalahan saat mencari recipe");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fungsi untuk membersihkan hasil pencarian
   */
  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    results,
    currentSearch,
    search,
    clearResults,
  };
}

export default useRecipeSearch;
