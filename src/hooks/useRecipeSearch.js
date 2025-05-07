import { useState, useCallback } from 'react';

/**
 * Custom hook untuk melakukan pencarian recipe (versi sederhana dengan data dummy)
 * @returns {Object} - Objek berisi state dan fungsi untuk pencarian recipe
 */
function useRecipeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);

  /**
   * Fungsi untuk melakukan pencarian recipe (simulasi)
   * @param {Object} searchParams - Parameter pencarian
   */
  const search = useCallback(async (searchParams) => {
    if (!searchParams.targetElement) {
      setError('Elemen target tidak boleh kosong');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentSearch(searchParams);
    
    // Simulasi delay API call
    setTimeout(() => {
      try {
        // Generate dummy data sesuai dengan parameter pencarian
        const dummyData = generateDummyResults(searchParams);
        setResults(dummyData);
        setLoading(false);
      } catch (err) {
        setError('Terjadi kesalahan saat mencari recipe');
        setLoading(false);
      }
    }, 1500); // Delay 1.5 detik untuk simulasi loading
  }, []);

  /**
   * Fungsi untuk membersihkan hasil pencarian
   */
  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  /**
   * Generate data dummy untuk hasil pencarian
   * @param {Object} params - Parameter pencarian
   * @returns {Object} - Data dummy hasil pencarian
   */
  const generateDummyResults = (params) => {
    const targetElement = params.targetElement;
    const algorithm = params.algorithm;
    const isMultiple = params.isMultiple;
    const maxRecipes = params.maxRecipes || 5;

    // Elemen dasar
    const basicElements = ['Air', 'Earth', 'Fire', 'Water'];
    
    // Apakah target adalah elemen dasar
    const isBasicTarget = basicElements.includes(targetElement);

    // Jumlah recipe yang akan digenerate
    const recipeCount = isMultiple ? Math.min(maxRecipes, 5) : 1;

    // Generate dummy recipes
    const recipes = [];
    
    if (isBasicTarget) {
      // Jika target adalah elemen dasar, tidak ada recipe
      recipes.push({
        id: "basic-" + targetElement,
        targetElement: targetElement,
        steps: [],
        isBasic: true
      });
    } else {
      // Generate beberapa recipe dummy
      for (let i = 0; i < recipeCount; i++) {
        recipes.push(generateSingleRecipe(targetElement, i));
      }
    }

    // Generate statistik pencarian
    const stats = {
      time: Math.floor(Math.random() * 200) + 50, // 50-250ms
      nodesVisited: Math.floor(Math.random() * 100) + 20, // 20-120 nodes
      algorithm: algorithm
    };

    return {
      recipes,
      stats
    };
  };

  /**
   * Generate data untuk satu recipe
   * @param {string} targetElement - Elemen target
   * @param {number} index - Indeks recipe
   * @returns {Object} - Data recipe dummy
   */
  const generateSingleRecipe = (targetElement, index) => {
    // Elemen dummy
    const intermediateElements = [
      'Steam', 'Mud', 'Lava', 'Dust', 'Pressure', 'Energy',
      'Stone', 'Rain', 'Sea', 'Volcano', 'Mountain', 'Cloud'
    ];
    
    // Pilih elemen intermediate secara acak
    const intermediate1 = intermediateElements[Math.floor(Math.random() * intermediateElements.length)];
    const intermediate2 = intermediateElements[Math.floor(Math.random() * intermediateElements.length)];
    
    // Determine recipe depth (1-3 levels)
    const depth = Math.floor(Math.random() * 3) + 1;
    
    // Recipe sederhana (1 level)
    if (depth === 1) {
      return {
        id: `recipe-${targetElement}-${index}`,
        targetElement: targetElement,
        steps: [
          {
            result: targetElement,
            ingredients: ['Fire', 'Water'],
            level: 0
          }
        ]
      };
    } 
    // Recipe 2 level
    else if (depth === 2) {
      return {
        id: `recipe-${targetElement}-${index}`,
        targetElement: targetElement,
        steps: [
          {
            result: targetElement,
            ingredients: [intermediate1, 'Earth'],
            level: 0
          },
          {
            result: intermediate1,
            ingredients: ['Fire', 'Water'],
            level: 1
          }
        ]
      };
    } 
    // Recipe 3 level
    else {
      return {
        id: `recipe-${targetElement}-${index}`,
        targetElement: targetElement,
        steps: [
          {
            result: targetElement,
            ingredients: [intermediate1, intermediate2],
            level: 0
          },
          {
            result: intermediate1,
            ingredients: ['Earth', 'Water'],
            level: 1
          },
          {
            result: intermediate2,
            ingredients: ['Fire', 'Air'],
            level: 1
          }
        ]
      };
    }
  };

  return {
    loading,
    error,
    results,
    currentSearch,
    search,
    clearResults
  };
}

export default useRecipeSearch;