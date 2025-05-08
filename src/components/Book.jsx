import React, { useState } from "react";

function Book() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Kategori elemen
  const categories = [
    { id: "all", name: "Semua" },
    { id: "basic", name: "Elemen Dasar" },
    { id: "nature", name: "Alam" },
    { id: "weather", name: "Cuaca" },
    { id: "materials", name: "Material" },
    { id: "tools", name: "Alat" },
    { id: "animals", name: "Hewan" },
    { id: "food", name: "Makanan" },
  ];

  // Elemen dasar untuk dummy data
  const basicElements = [
    { id: 1, name: "Air", category: "basic", icon: "💨" },
    { id: 2, name: "Earth", category: "basic", icon: "🌍" },
    { id: 3, name: "Fire", category: "basic", icon: "🔥" },
    { id: 4, name: "Water", category: "basic", icon: "💧" },
  ];

  // Dummy data untuk elemen lainnya
  const dummyElements = [
    { id: 5, name: "Lava", category: "nature", icon: "🌋" },
    { id: 6, name: "Steam", category: "weather", icon: "♨️" },
    { id: 7, name: "Dust", category: "materials", icon: "💨" },
    { id: 8, name: "Mud", category: "materials", icon: "💩" },
    { id: 9, name: "Rain", category: "weather", icon: "🌧️" },
    { id: 10, name: "Sea", category: "nature", icon: "🌊" },
    { id: 11, name: "Stone", category: "materials", icon: "🪨" },
    { id: 12, name: "Brick", category: "materials", icon: "🧱" },
    { id: 13, name: "Metal", category: "materials", icon: "⚙️" },
    { id: 14, name: "Wood", category: "materials", icon: "🪵" },
    { id: 15, name: "Tool", category: "tools", icon: "🔧" },
    { id: 16, name: "Axe", category: "tools", icon: "🪓" },
    { id: 17, name: "Bird", category: "animals", icon: "🐦" },
    { id: 18, name: "Fish", category: "animals", icon: "🐟" },
    { id: 19, name: "Bread", category: "food", icon: "🍞" },
    { id: 20, name: "Cheese", category: "food", icon: "🧀" },
  ];

  // Menggunakan dummy data
  const allElements = [...basicElements, ...dummyElements];

  // Filter berdasarkan pencarian dan kategori
  const filteredElements = allElements.filter((element) => {
    const matchesSearch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || element.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Buku Elemen Little Alchemy 2</h2>

      {/* Search dan Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari elemen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="sm:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List Elemen */}
      <>
        <p className="mb-2 text-gray-600">
          Menampilkan {filteredElements.length} elemen
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredElements.map((element) => (
            <div
              key={element.id}
              className="border rounded p-3 text-center hover:bg-gray-50 transition"
            >
              <div className="text-3xl mb-2">{element.icon}</div>
              <div className="font-medium">{element.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {categories.find((c) => c.id === element.category)?.name ||
                  element.category}
              </div>
            </div>
          ))}
        </div>

        {filteredElements.length === 0 && (
          <div className="text-center text-gray-500 p-8">
            <p>Tidak ada elemen yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </>
    </div>
  );
}

export default Book;
