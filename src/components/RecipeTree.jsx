import React, { useEffect } from "react";
import Tree from "react-d3-tree";

const RecipeTree = ({ treeData, elementName }) => {
  useEffect(() => {
    console.log("🧪 Debug treeData:", treeData);
  }, [treeData]);

  if (!treeData && elementName) {
    return (
      <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-inner flex flex-col items-center justify-center space-y-4">
        <div className="px-8 py-4 bg-amber-50 text-3xl font-bold text-yellow-900 border-4 border-yellow-600 rounded-full shadow-md">
          {elementName}
        </div>
        <p className="text-yellow-800 font-merriweather italic text-center">
          Ini adalah elemen dasar tanpa resep kombinasi.
        </p>
      </div>
    );
  }

  if (
    typeof treeData === "object" &&
    !Array.isArray(treeData) &&
    treeData?.attributes?.type === "Basic Element"
  ) {
    return (
      <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-inner flex flex-col items-center justify-center space-y-4">
        <div className="px-8 py-4 bg-amber-50 text-3xl font-bold text-yellow-900 border-4 border-yellow-600 rounded-full shadow-md">
          {treeData.name}
        </div>
        <p className="text-yellow-800 font-merriweather italic text-center">
          Menampilkan elemen dasar tanpa resep kombinasi.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-inner">
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        zoomable
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
};

export default RecipeTree;
