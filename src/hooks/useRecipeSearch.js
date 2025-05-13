import { useState, useCallback } from "react";
import { searchRecipe } from "../services/api";

function useRecipeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [liveCombos, setLiveCombos] = useState([]);

  const search = useCallback(async (searchParams) => {
    const { targetElement, algorithm, liveUpdate, n = 10 } = searchParams;

    if (!targetElement || !algorithm) {
      setError("Elemen target dan algoritma harus diisi.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setCurrentSearch(searchParams);

    if (liveUpdate && algorithm === "dfs") {
      try {
        const socket = new WebSocket(
          `ws://localhost:8080/api/dfs/live/${targetElement}?n=${n}`
        );

        let comboBuffer = [];
        setLiveCombos([]);
        setIsLiveUpdating(true);

        socket.onopen = () => {
          console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          comboBuffer.push(data);
          setLiveCombos([...comboBuffer]);

          // nonaktifkan loading segera setelah data pertama masuk
          if (comboBuffer.length === 1) {
            setLoading(false);
          }
        };

        socket.onerror = (err) => {
          console.error("WebSocket Error:", err);
          setError("Koneksi WebSocket gagal.");
          setIsLiveUpdating(false);
          setLoading(false);
        };

        socket.onclose = () => {
          console.log("WebSocket closed");
          setResults({
            combos: comboBuffer,
            stats: {
              time: null,
              nodesVisited: comboBuffer.length,
            },
          });
          setIsLiveUpdating(false);
        };
      } catch (err) {
        console.error("Live search error:", err);
        setError("Terjadi kesalahan saat koneksi WebSocket");
        setIsLiveUpdating(false);
        setLoading(false);
      }
    } else {
      try {
        const data = await searchRecipe(searchParams);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError(err.message || "Terjadi kesalahan saat mencari recipe");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
    setLiveCombos([]);
    setIsLiveUpdating(false);
  }, []);

  return {
    loading,
    error,
    results,
    currentSearch,
    isLiveUpdating,
    liveCombos,
    search,
    clearResults,
  };
}

export default useRecipeSearch;
