/**
 * Mengecek apakah elemen adalah elemen dasar
 * @param {string} element - Nama elemen
 * @returns {boolean}
 */
export function isBasicElement(element) {
    const basicElements = ['Air', 'Earth', 'Fire', 'Water'];
    return basicElements.includes(element);
  }
  
  /**
   * Menghasilkan ID unik untuk node dalam tree
   * @returns {string}
   */
  export function generateNodeId() {
    return Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Format data tree untuk visualisasi
   * Fungsi ini tidak memerlukan data dari backend
   * @param {Array} data - Data tree untuk diformat
   * @returns {Array}
   */
  export function formatTreeData(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    // Logika untuk memformat data tree
    // Ini akan diimplementasikan setelah integrasi dengan backend
    
    return data;
  }