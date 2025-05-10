import React, { useState } from "react";

function Book() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "basic", name: "Elemen Dasar" },
    { id: "nature", name: "Alam" },
    { id: "weather", name: "Cuaca" },
    { id: "materials", name: "Material" },
    { id: "tools", name: "Alat" },
    { id: "animals", name: "Hewan" },
    { id: "food", name: "Makanan" },
  ];

  const basicElements = [
    { id: 1, name: "Air", category: "basic", icon: "💨" },
    { id: 2, name: "Earth", category: "basic", icon: "🌍" },
    { id: 3, name: "Fire", category: "basic", icon: "🔥" },
    { id: 4, name: "Water", category: "basic", icon: "💧" },
  ];

  const dummyElements = [
    { id: 5, name: "Lava", category: "nature", icon: "🌋" },
    { id: 6, name: "Steam", category: "weather", icon: "♨️" },
    { id: 7, name: "Dust", category: "materials", icon: "💨" },
    { id: 8, name: "Mud", category: "materials", icon: "🟤" },
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

  const allElements = [...basicElements, ...dummyElements];

  const filteredElements = allElements.filter((element) => {
    const matchesSearch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || element.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageTitleClasses =
    "text-3xl sm:text-4xl mb-8 sm:mb-10 font-bold text-center text-yellow-50 drop-shadow-xl font-cinzelDecorative tracking-wider";
  const inputBaseClasses =
    "w-full p-3.5 rounded-lg border-2 border-yellow-700/70 bg-amber-50/95 placeholder-yellow-700/90 text-yellow-950 shadow-inner focus:outline-none focus:ring-3 focus:ring-yellow-600/70 focus:border-yellow-600 transition-all duration-150 ease-in-out";
  const cardElementClasses =
    "border-2 border-yellow-600/40 rounded-xl p-3 sm:p-4 text-center bg-amber-50/80 hover:bg-amber-100/90 transition-all duration-150 ease-in-out shadow-lg hover:shadow-xl flex flex-col items-center justify-center aspect-square cursor-default transform hover:scale-105 backdrop-blur-[1px]";

  return (
    <>
      <h2 className={pageTitleClasses}>📚 Pustaka Elemen Alkimia</h2>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 font-nunitoSans items-center">
        <input
          type="text"
          placeholder="🔍 Cari nama elemen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${inputBaseClasses} md:col-span-2`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={inputBaseClasses}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="font-nunitoSans bg-amber-100 text-yellow-950 py-1"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 text-sm text-yellow-100/90 font-merriweather italic text-center sm:text-left">
        Menampilkan {filteredElements.length} dari {allElements.length} elemen
        yang tersimpan.
      </div>

      {filteredElements.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredElements.map((element) => (
            <div key={element.id} className={cardElementClasses}>
              <div className="text-4xl sm:text-5xl mb-2 drop-shadow-sm">
                {element.icon}
              </div>
              <div className="font-lora font-bold text-yellow-950 text-sm sm:text-base leading-tight">
                {element.name}
              </div>
              <div className="font-nunitoSans text-xs text-yellow-800/90 mt-1 capitalize italic">
                {categories.find((c) => c.id === element.category)?.name ||
                  element.category}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-yellow-100/90 font-merriweather">
          <p className="text-xl mb-3">🧪 Tidak Ada Elemen Ditemukan.</p>
          <p className="text-sm italic">
            Silakan coba kata kunci atau filter kategori lain untuk pencarian
            Anda.
          </p>
        </div>
      )}
    </>
  );
}

export default Book;
