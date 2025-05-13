const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://fireboy-watergirl-web-backen";

/**
 * Melakukan pencarian resep dari API backend
 * @param {Object} params - Parameter pencarian dari form
 * @param {string} params.targetElement - Elemen target
 * @param {string} params.algorithm - Algoritma pencarian
 * @param {number} params.n - Batas jumlah resep yang diambil dari API
 */

export const searchRecipe = async (params) => {
  try {
    const { targetElement, algorithm, n = 10 } = params; // default n = 10
    const endpoint = `${API_BASE_URL}/${algorithm}/${targetElement}?n=${n}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText ||
          `Error ${response.status}: Terjadi kesalahan saat mencari recipe`
      );
    }

    const data = await response.json();

    const standardizedCombos = Array.isArray(data.combos)
      ? data.combos.map((combo) => ({
          id: combo.ID ?? combo.id,
          parentId: combo.ParentId ?? combo.parentId,
          inputs: combo.Inputs ?? combo.inputs,
          output: combo.Output ?? combo.output,
        }))
      : null;

    return {
      combos: standardizedCombos,
      stats: {
        time: data.duration,
        nodesVisited: data.nNode,
      },
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

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
