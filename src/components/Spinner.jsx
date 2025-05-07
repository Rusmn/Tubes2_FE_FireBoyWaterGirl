import React from 'react';

/**
 * Komponen loading spinner
 * @param {Object} props
 * @param {string} props.message - Pesan yang ditampilkan di bawah spinner
 */
function Spinner({ message = 'Sedang memproses...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      
      {/* Message */}
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default Spinner;