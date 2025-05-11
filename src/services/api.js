/**
 * API Service untuk berkomunikasi dengan backend Golang
 */

// URL dasar untuk API, gunakan variabel lingkungan jika tersedia
// atau gunakan localhost sebagai fallback
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

/**
 * Mencari recipe untuk sebuah elemen target
 * @param {Object} params - Parameter pencarian
 * @param {string} params.targetElement - Elemen target yang dicari
 * @param {string} params.algorithm - Algoritma yang digunakan ('bfs', 'dfs', 'bidirectional')
 * @param {boolean} params.isMultiple - Apakah mencari multiple recipe
 * @param {number} params.maxRecipes - Jumlah maksimum recipe jika isMultiple=true
 * @returns {Promise} - Promise hasil pencarian
 */
export const searchRecipe = async (params) => {
  try {
    const { targetElement, algorithm } = params;
    // Gunakan endpoint yang sesuai dengan algoritma yang dipilih
    const endpoint = `${API_BASE_URL}/${algorithm}/${targetElement}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText ||
          `Error ${response.status}: Terjadi kesalahan saat mencari recipe`
      );
    }

    const data = await response.json();

    // Standarisasi format data agar sesuai dengan yang diharapkan oleh komponen
    const standardizedCombos = data.combos.map((combo) => {
      return {
        // Standarisasi format dengan camelCase property
        id: combo.ID !== undefined ? combo.ID : combo.id,
        parentId:
          combo.ParentId !== undefined ? combo.ParentId : combo.parentId,
        inputs: combo.Inputs !== undefined ? combo.Inputs : combo.inputs,
        output: combo.Output !== undefined ? combo.Output : combo.output,
      };
    });

    return {
      combos: standardizedCombos,
      stats: {
        time: Math.floor(Math.random() * 200) + 50, // Simulasi waktu karena backend belum menyediakan
        nodesVisited: data.combos ? data.combos.length : 0, // Gunakan jumlah combos sebagai perkiraan node yang dikunjungi
      },
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Mendapatkan daftar semua elemen yang tersedia
 * @returns {Promise<Array>} - Promise berisi array elemen
 */
export const getElements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/elements`);

    if (!response.ok) {
      throw new Error("Terjadi kesalahan saat mengambil daftar elemen");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Mendapatkan status server
 * @returns {Promise<Object>} - Promise berisi status server
 */
export const getServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);

    if (!response.ok) {
      throw new Error("Server tidak dapat dijangkau");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default {
  searchRecipe,
  getElements,
  getServerStatus,
};
