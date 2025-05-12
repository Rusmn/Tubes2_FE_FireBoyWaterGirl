const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const searchRecipe = async (params) => {
  try {
    const { targetElement, algorithm, jumlahresep } = params;
    const endpoint = `${API_BASE_URL}/${algorithm}/${targetElement}?n=${jumlahresep}`;

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
        time: Math.round(data.duration / 1000),
        nodesVisited: data.nNode
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
