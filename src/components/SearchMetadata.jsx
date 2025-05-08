import React from "react";

function SearchMetadata({ searchParams }) {
  if (!searchParams) return null;

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-md border text-sm">
      <div className="font-medium mb-1">Parameter Pencarian:</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <span className="text-gray-500">Elemen Target:</span>
          <span className="ml-1 font-medium">{searchParams.targetElement}</span>
        </div>
        <div>
          <span className="text-gray-500">Algoritma:</span>
          <span className="ml-1 font-medium">
            {searchParams.algorithm.toUpperCase()}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Mode:</span>
          <span className="ml-1 font-medium">
            {searchParams.isMultiple ? "Multiple Recipes" : "Shortest Path"}
          </span>
        </div>
        {searchParams.isMultiple && (
          <div>
            <span className="text-gray-500">Max Recipes:</span>
            <span className="ml-1 font-medium">{searchParams.maxRecipes}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMetadata;
