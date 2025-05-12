import React from "react";
import Tree from "react-d3-tree";

// Komponen RecipeTree sekarang hanya menerima prop 'treeData'
const RecipeTree = ({ treeData }) => {
  // Jika treeData adalah null atau undefined, tampilkan pesan
  if (!treeData) {
    return (
      <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-xl flex items-center justify-center">
        <p className="text-yellow-800 font-merriweather italic text-center p-4">
          Tidak ada data resep yang dapat divisualisasikan untuk jalur ini.
        </p>
      </div>
    );
  }

  // Render komponen Tree dengan data yang sudah disediakan
  return (
    <div className="w-full h-[600px] bg-[#fef9c3] border border-yellow-700 rounded-xl shadow-xl">
      <Tree
        data={treeData}
        orientation="vertical" // Tata letak vertikal (akar di atas)
        pathFunc="step" // Gaya garis penghubung antar node
        zoomable // Memungkinkan zoom dan pan
        separation={{ siblings: 1.5, nonSiblings: 2 }} // Jarak antar node
        // Anda bisa menambahkan prop kustomisasi lain di sini, misalnya:
        // nodeSize={{ x: 120, y: 120 }} // Ukuran node
        // translate={{ x: window.innerWidth / 2, y: 100 }} // Posisi awal tree
      />
    </div>
  );
};

export default RecipeTree;
