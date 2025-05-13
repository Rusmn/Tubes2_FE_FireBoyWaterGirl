import React from "react";

function LiveUpdateVisualizer({ partialCombos, targetElement }) {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center bg-amber-100/80 p-3 rounded-lg border border-yellow-500/50 shadow-sm">
        <div>
          <h3 className="font-bold text-yellow-950">
            🔄 Live Update Visualisasi
          </h3>
          <p className="text-xs text-yellow-800 mt-1">
            Proses pencarian sedang berlangsung dan akan diperbarui secara
            bertahap.
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-yellow-950 font-merriweather">
          🌳 Visualisasi Progresif:
        </h4>
        <div className="bg-amber-50/80 rounded-lg border-2 border-yellow-600/50 shadow-lg min-h-[240px] flex flex-wrap gap-2 p-4">
          {Array.isArray(partialCombos) && partialCombos.length > 0 ? (
            partialCombos.map((combo, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-white border border-yellow-600/30 rounded-md text-sm shadow text-yellow-950"
              >
                <strong>{combo.output}</strong> ← {combo.inputs?.join(" + ")}
              </div>
            ))
          ) : (
            <div className="w-full text-center text-yellow-800/80 italic">
              Belum ada data recipe untuk divisualisasikan
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50/70 p-3 rounded-lg border border-yellow-500/40 text-sm">
        <div className="flex items-center">
          <span className="font-semibold text-yellow-950 mr-2">Status:</span>
          {Array.isArray(partialCombos) && partialCombos.length > 0 ? (
            <span className="text-green-600 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Pencarian sedang berlangsung...
            </span>
          ) : (
            <span className="text-yellow-700">
              ⏳ Menunggu data hasil pencarian...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveUpdateVisualizer;
