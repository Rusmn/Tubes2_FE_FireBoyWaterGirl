import React, { useState, useEffect } from "react";
import { getElements } from "../services/api";
import Spinner from "./Spinner";

function Book() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "All", name: "Semua Kategori" },
    { id: "Basic", name: "Elemen Dasar" },
    { id: "Nature", name: "Alam" },
    { id: "Weather", name: "Cuaca" },
    { id: "Materials", name: "Material" },
    { id: "Tools", name: "Alat" },
    { id: "Animals", name: "Hewan" },
    { id: "Food", name: "Makanan" },
    { id: "Other", name: "Lainnya" },
  ];

  useEffect(() => {
    const fetchElements = async () => {
      setLoading(true);
      try {
        const data = await getElements();
        setElements(data);
      } catch (err) {
        setError(`${err.message || "Gagal mengambil data elemen"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  const filteredElements = elements.filter((element) => {
    const matchesSearch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || element.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fungsi untuk mendapatkan ikon berdasarkan kategori
  const getElementIcon = (element) => {
    switch (element.category) {
      case "basic":
        return "🧪";
      case "animals":
        return "🐾";
      case "food":
        return "🍽️";
      case "tools":
        return "🔧";
      case "nature":
        return "🌿";
      case "weather":
        return "🌦️";
      case "materials":
        return "🧱";
      default:
        return "✨"; // Default icon for unknown categories
    }
  };

  // Fungsi untuk memisahkan kategori berdasarkan huruf besar
  const getCategoryList = (categoryString) => {
    // Gunakan regex untuk memisahkan kategori berdasarkan huruf besar
    return categoryString.match(/[A-Z][a-z]+/g) || [];
  };

  // Fungsi untuk memodifikasi URL gambar
  const getModifiedImageUrl = (imageUrl) => {
    // Memotong URL setelah .svg
    const modifiedUrl = imageUrl.split(".svg")[0] + ".svg";
    return modifiedUrl;
  };

  const pageTitleClasses =
    "text-3xl sm:text-4xl mb-8 sm:mb-10 font-bold text-center text-yellow-50 drop-shadow-xl font-cinzelDecorative tracking-wider";
  const inputBaseClasses =
    "w-full p-3.5 rounded-lg border-2 border-yellow-700/70 bg-amber-50/95 placeholder-yellow-700/90 text-yellow-950 shadow-inner focus:outline-none focus:ring-3 focus:ring-yellow-600/70 focus:border-yellow-600 transition-all duration-150 ease-in-out";
  const cardElementClasses =
    "border-2 border-yellow-600/40 rounded-xl p-3 sm:p-4 text-center bg-amber-50/80 hover:bg-amber-100/90 transition-all duration-150 ease-in-out shadow-lg hover:shadow-xl flex flex-col items-center justify-center aspect-square cursor-default transform hover:scale-105 backdrop-blur-[1px]";

  if (loading) {
    return (
      <>
        <h2 className={pageTitleClasses}>📚 Pustaka Elemen Alkimia</h2>
        <Spinner text="Memuat elemen alkimia..." />
      </>
    );
  }

  return (
    <>
      <h2 className={pageTitleClasses}>📚 Pustaka Elemen Alkimia</h2>

      {error && (
        <div className="mb-6 p-4 bg-yellow-800/30 border border-yellow-600/40 rounded-lg text-yellow-100 font-merriweather text-sm">
          <p className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <span>{error}</span>
          </p>
          <p className="mt-1 text-xs italic">
            Menampilkan data cadangan/fallback. Beberapa elemen mungkin tidak
            lengkap.
          </p>
        </div>
      )}

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
        Menampilkan {filteredElements.length} dari {elements.length} elemen yang
        tersimpan.
      </div>

      {filteredElements.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredElements.map((element, index) => (
            <div key={index} className={cardElementClasses}>
              <div className="text-4xl sm:text-5xl mb-2 drop-shadow-sm">
                {element.imageUrl ? (
                  <img
                    src={getModifiedImageUrl(element.imageUrl)} // Modifikasi gambar
                    alt={element.name}
                    className="w-16 h-16 object-contain mx-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `<span class="text-4xl">${getElementIcon(
                        element
                      )}</span>`; // Menampilkan ikon kategori jika gambar gagal dimuat
                    }}
                  />
                ) : (
                  <span>{getElementIcon(element)}</span> // Menampilkan ikon kategori jika gambar tidak ada
                )}
              </div>
              <div className="font-lora font-bold text-yellow-950 text-sm sm:text-base leading-tight">
                <a
                  href={element.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {element.name}
                </a>
              </div>

              {/* Menampilkan kategori yang dipisahkan */}
              {element.category && (
                <div className="text-xs text-yellow-700">
                  {getCategoryList(element.category).join(", ")}
                </div>
              )}
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
