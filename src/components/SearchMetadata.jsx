import React from "react";

function SearchMetadata({ searchParams, currentPage, totalPages }) {
  if (!searchParams) return null;

  const metadataItemClasses =
    "flex flex-col p-2 bg-amber-50/60 rounded-md shadow-sm border border-yellow-600/30";
  const labelClasses = "text-xs text-yellow-800/90";
  const valueClasses = "font-semibold text-yellow-950 mt-0.5";

  return (
    <div className="mb-6 p-4 bg-amber-100/70 rounded-lg border border-yellow-600/50 text-sm font-merriweather shadow-md">
      <h3 className="font-bold mb-3 text-base text-yellow-950 tracking-wide">
        📜 Parameter Pencarian:
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={metadataItemClasses}>
          <span className={labelClasses}>🎯 Elemen Target:</span>
          <span className={valueClasses}>{searchParams.targetElement}</span>
        </div>
        <div className={metadataItemClasses}>
          <span className={labelClasses}>🧠 Algoritma:</span>
          <span className={valueClasses}>
            {searchParams.algorithm.toUpperCase()}
          </span>
        </div>
        <div className={metadataItemClasses}>
          <span className={labelClasses}>🔢 Jumlah Resep Maksimum:</span>
          <span className={valueClasses}>{searchParams.maxRecipes}</span>
        </div>

        {currentPage !== undefined &&
          totalPages !== undefined &&
          totalPages > 1 && (
            <div className={`${metadataItemClasses} md:col-span-4`}>
              <span className={labelClasses}>📖 Resep:</span>
              <span className={valueClasses}>
                Menampilkan resep {currentPage} dari {totalPages} resep yang diminta
              </span>
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchMetadata;
