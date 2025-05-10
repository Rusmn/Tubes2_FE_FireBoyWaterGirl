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
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target_element: params.targetElement,
        algorithm: params.algorithm,
        multiple: params.isMultiple,
        max_recipes: params.isMultiple ? params.maxRecipes : 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Terjadi kesalahan saat mencari recipe"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Mendapatkan daftar semua elemen yang tersedia
 * @returns {Promise<Array>} - Promise berisi array elemen
 */
export const getAllElements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/elements`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Terjadi kesalahan saat mengambil daftar elemen"
      );
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
  getAllElements,
  getServerStatus,
};
