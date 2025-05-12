import React from "react";
import RecipeTree from "./RecipeTree";

/**
 * Komponen untuk menampilkan visualisasi live update
 * @param {Object} props - Props komponen
 * @param {Array} props.updateHistory - Riwayat update
 * @param {number} props.currentStep - Langkah saat ini
 * @param {boolean} props.isRunning - Apakah update sedang berjalan
 * @param {Array} props.partialCombos - Kombinasi parsial untuk visualisasi
 * @param {function} props.setUpdateSpeed - Fungsi untuk mengatur kecepatan update
 * @param {function} props.stopLiveUpdate - Fungsi untuk menghentikan update
 * @param {string} props.targetElement - Elemen target pencarian
 * @returns {JSX.Element}
 */
function LiveUpdateVisualizer({
  updateHistory,
  currentStep,
  isRunning,
  partialCombos,
  setUpdateSpeed,
  stopLiveUpdate,
  targetElement,
}) {
  // Jika belum ada history, tampilkan pesan inisialisasi
  if (updateHistory.length === 0) {
    return (
      <div className="p-6 text-center text-yellow-800 font-merriweather italic">
        <p className="text-lg mb-3">⏳ Menunggu pencarian dimulai...</p>
        <p className="text-sm">
          Visualisasi akan muncul saat proses pencarian dimulai.
        </p>
      </div>
    );
  }

  // Dapatkan step terakhir untuk ditampilkan
  const lastStep = updateHistory[updateHistory.length - 1];

  // Tentukan warna berdasarkan tipe pesan
  const getMessageColor = (type) => {
    switch (type) {
      case "info":
        return "text-blue-700";
      case "visit":
        return "text-yellow-700";
      case "process":
        return "text-purple-700";
      case "discover":
        return "text-green-700";
      case "success":
        return "text-red-600 font-bold";
      default:
        return "text-yellow-900";
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Header dengan kontrol */}
      <div className="flex justify-between items-center bg-amber-100/80 p-3 rounded-lg border border-yellow-500/50 shadow-sm">
        <div>
          <h3 className="font-bold text-yellow-950">
            🔄 Live Update Visualisasi
          </h3>
          <p className="text-xs text-yellow-800 mt-1">
            Langkah {currentStep} dari {isRunning ? "?" : updateHistory.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <label
              htmlFor="speed-control"
              className="text-xs text-yellow-800 mr-2"
            >
              Kecepatan:
            </label>
            <select
              id="speed-control"
              className="text-xs p-1 bg-yellow-50 border border-yellow-600 rounded"
              onChange={(e) => setUpdateSpeed(Number(e.target.value))}
              disabled={!isRunning}
            >
              <option value="1000">Lambat</option>
              <option value="500">Normal</option>
              <option value="200">Cepat</option>
            </select>
          </div>

          {isRunning && (
            <button
              onClick={stopLiveUpdate}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 text-xs rounded border border-red-300"
            >
              Hentikan
            </button>
          )}
        </div>
      </div>

      {/* Message Log */}
      <div className="max-h-40 overflow-y-auto p-3 bg-amber-50/70 rounded-lg border border-yellow-500/40 font-merriweather shadow-inner">
        <h4 className="font-semibold mb-2 text-yellow-950">
          📋 Log Pencarian:
        </h4>
        <div className="space-y-1">
          {updateHistory.map((step, idx) => (
            <div
              key={idx}
              className={`text-sm ${
                idx === updateHistory.length - 1
                  ? "font-semibold"
                  : "opacity-90"
              } ${getMessageColor(step.type)}`}
            >
              {idx + 1}. {step.message}
            </div>
          ))}
        </div>
      </div>

      {/* Visualisasi Tree */}
      <div>
        <h4 className="font-semibold mb-2 text-yellow-950 font-merriweather">
          🌳 Visualisasi Progresif:
        </h4>
        <div className="bg-amber-50/80 rounded-lg border-2 border-yellow-600/50 shadow-lg p-1">
          {partialCombos && partialCombos.length > 0 ? (
            <RecipeTree combos={partialCombos} target={targetElement} />
          ) : (
            <div className="h-60 flex items-center justify-center text-yellow-800/80 italic">
              Belum ada data recipe untuk divisualisasikan
            </div>
          )}
        </div>
      </div>

      {/* Status saat ini */}
      <div className="bg-amber-50/70 p-3 rounded-lg border border-yellow-500/40 text-sm">
        <div className="flex items-center">
          <span className="font-semibold text-yellow-950 mr-2">Status:</span>
          {isRunning ? (
            <span className="text-green-600 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Pencarian sedang berlangsung...
            </span>
          ) : updateHistory.some((step) => step.type === "success") ? (
            <span className="text-green-700">
              ✅ Pencarian selesai - Elemen ditemukan!
            </span>
          ) : (
            <span className="text-yellow-700">
              ⏹ Pencarian dihentikan / tidak lengkap
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveUpdateVisualizer;
