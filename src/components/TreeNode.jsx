import React from "react";

function TreeNode({ element, isBasic, children }) {
  return (
    <div className="relative font-merriweather text-yellow-900">
      <div
        className={`p-3 rounded-lg border shadow-sm ${
          isBasic
            ? "bg-yellow-200/80 border-yellow-500"
            : "bg-yellow-50/80 border-yellow-400"
        }`}
      >
        <span className="font-bold tracking-wide">{element}</span>
        {isBasic && (
          <span className="text-xs ml-2 text-yellow-700 italic">
            (Elemen Dasar)
          </span>
        )}
      </div>

      {children && (
        <div className="ml-8 mt-2 pl-3 border-l-2 border-yellow-600">
          {children}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
