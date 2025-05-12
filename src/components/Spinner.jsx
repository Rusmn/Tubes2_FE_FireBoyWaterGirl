import React from "react";

/**
 * Komponen spinner loading
 * @param {Object} props - Props komponen
 * @param {string} props.text - Teks yang ditampilkan di bawah spinner
 * @returns {JSX.Element}
 */
function Spinner({ text = "Sedang memuat..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 font-merriweather">
      <div className="relative w-20 h-20">
        {/* Lingkaran luar */}
        <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-400 border-b-amber-300 border-l-yellow-200 animate-spin"></div>

        {/* Lingkaran dalam */}
        <div className="absolute inset-3 rounded-full border-4 border-r-amber-600 border-t-amber-500 border-l-amber-400 border-b-amber-300 animate-spin-slow"></div>

        {/* Simbol alkimia */}
        <div className="absolute inset-0 flex items-center justify-center text-yellow-800 text-2xl">
          ✶
        </div>
      </div>

      <p className="mt-6 text-lg text-yellow-900 animate-pulse">{text}</p>

      <p className="mt-2 text-sm text-yellow-700/80 italic">
        Mencoba mengubah elemen menjadi emas...
      </p>
    </div>
  );
}

export default Spinner;
