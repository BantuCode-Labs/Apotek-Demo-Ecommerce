import { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Check, Star, ShoppingCart, Eye, ArrowUpDown, X } from 'lucide-react';

interface SearchScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
}

export default function SearchScreen({
  products,
  onAddToCart,
  searchQuery,
  setSearchQuery,
  selectedProductDetail,
  setSelectedProductDetail
}: SearchScreenProps) {
  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Categories &amp; Brands configuration with counts
  const categoriesList = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.category)));
    return list.map(cat => ({
      name: cat,
      count: products.filter(p => p.category === cat).length
    }));
  }, [products]);

  const brandsList = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand)));
    return list.map(brand => ({
      name: brand,
      count: products.filter(p => p.brand === brand).length
    }));
  }, [products]);

  // Handle category toggle
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Handle brand toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Clear all filter entries
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setOnlyAvailable(false);
    setSortBy('relevance');
    setSearchQuery('');
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 3. Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // 4. Price range filter
    if (minPrice !== '') {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    // 5. Stock availability check
    if (onlyAvailable) {
      result = result.filter(p => p.stockStatus === 'available');
    }

    // 6. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategories, selectedBrands, minPrice, maxPrice, onlyAvailable, sortBy]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Breadcrumb indicator */}
      <nav id="search-breadcrumb" className="text-xs text-gray-400 font-sans flex items-center gap-2">
        <span className="cursor-pointer hover:text-[#006c51]" onClick={handleResetFilters}>Beranda</span>
        <span>/</span>
        <span className="text-gray-650 font-medium">Cari Obat &amp; Vitamin</span>
        {searchQuery && (
          <>
            <span>/</span>
            <span className="text-[#006c51] font-bold">"{searchQuery}"</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPACT FILTER PANEL */}
        <aside id="search-filters-panel" className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#006c51]" />
              Filter Pencarian
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#006c51] hover:underline cursor-pointer"
            >
              Hapus Semua
            </button>
          </div>

          {/* Categories category */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Kategori Obat</h4>
            <div className="space-y-2">
              {categoriesList.map(cat => (
                <label key={cat.name} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="w-4.5 h-4.5 rounded text-[#006c51] focus:ring-[#006c51] border-gray-300"
                  />
                  <span className="flex-grow font-sans">{cat.name}</span>
                  <span className="text-xs font-bold text-gray-300 font-mono">({cat.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Drug Brands list */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Pabrikan / Brand</h4>
            <div className="space-y-2">
              {brandsList.map(brand => (
                <label key={brand.name} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                    className="w-4.5 h-4.5 rounded text-[#006c51] focus:ring-[#006c51] border-gray-300"
                  />
                  <span className="flex-grow font-sans">{brand.name}</span>
                  <span className="text-xs font-bold text-gray-300 font-mono">({brand.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing parameters bounds */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Rentang Harga (Rp)</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006c51]"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006c51]"
              />
            </div>
          </div>

          {/* Stock availability toggle */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-700 font-sans">Sembunyikan Stok Habis</span>
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              type="button"
              className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none ${
                onlyAvailable ? 'bg-[#006c51]' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  onlyAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </aside>

        {/* RIGHT MEDICAL PRODUCTS CONTAINER */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Catalog stats banner &amp; order controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {searchQuery ? `Hasil Pencarian untuk: "${searchQuery}"` : 'Semua Katalog Produk Medis'}
              </h2>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Menemukan {filteredProducts.length} produk obat orisinal terlisensi
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="text-xs text-gray-400 font-bold whitespace-nowrap">Urutkan:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 bg-white focus:outline-none focus:border-[#006c51] appearance-none cursor-pointer"
                >
                  <option value="relevance">Tingkat Relevansi</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Pengguna</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Products matching grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800">Produk Obat Tidak Ditemukan</h3>
              <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto">
                Maaf, tidak ada produk yang cocok dengan kriteria filter atau nama pencarian harian Anda. Harap hapus beberapa filter pencarian.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#006c51] text-white font-bold text-xs rounded-lg hover:bg-emerald-800 transition-all cursor-pointer"
              >
                Atur Ulang Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stockStatus === 'out_of_stock';
                return (
                  <div
                    key={p.id}
                    className={`bg-white border hover:shadow-md transition-all rounded-xl overflow-hidden flex flex-col justify-between relative group ${
                      isOutOfStock ? 'border-gray-200' : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    {/* Discount badge display */}
                    {p.discountBadge && !isOutOfStock && (
                      <span className="absolute top-3 left-3 bg-[#e33d26] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full z-10">
                        {p.discountBadge}
                      </span>
                    )}

                    {/* Stock Status Label */}
                    {isOutOfStock && (
                      <span className="absolute top-3 right-3 bg-gray-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full z-10">
                        Stok Habis
                      </span>
                    )}

                    {/* Product visual showcase */}
                    <div 
                      className={`p-4 flex items-center justify-center h-44 cursor-pointer relative overflow-hidden ${
                        isOutOfStock ? 'bg-gray-100/70' : 'bg-gray-50'
                      }`}
                      onClick={() => setSelectedProductDetail(p)}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className={`max-h-36 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 ${
                          isOutOfStock ? 'opacity-40 grayscale-[40%]' : ''
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-white text-gray-800 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#006c51]" /> Lihat Detail
                        </span>
                      </div>
                    </div>

                    {/* Info content block */}
                    <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                          {p.brand}
                        </span>
                        <h3 
                          onClick={() => setSelectedProductDetail(p)}
                          className={`font-semibold text-gray-900 text-sm line-clamp-2 mt-1 hover:text-[#006c51] cursor-pointer ${
                            isOutOfStock ? 'text-gray-400 line-through' : ''
                          }`}
                        >
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-sans mt-0.5">{p.unit}</p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-1 text-xs text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-gray-700">{p.rating.toFixed(1)}</span>
                          <span className="text-gray-400">({p.ratingCount})</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className={`text-sm sm:text-base font-extrabold ${isOutOfStock ? 'text-gray-400' : 'text-gray-950'}`}>
                            Rp {p.price.toLocaleString('id-ID')}
                          </span>
                          {p.originalPrice && !isOutOfStock && (
                            <span className="text-xs text-gray-400 line-through">
                              Rp {p.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>

                        {isOutOfStock ? (
                          <button
                            disabled
                            type="button"
                            className="w-full py-2 bg-gray-200 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed uppercase"
                          >
                            Hubungi Apoteker
                          </button>
                        ) : (
                          <button
                            onClick={() => onAddToCart(p)}
                            type="button"
                            className="w-full py-2 bg-[#006c51] hover:bg-[#00543e] text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Masukkan Keranjang
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* 4. PRODUCT ACTION DETAILS MODAL */}
      {selectedProductDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 bg-gray-50 p-4 rounded-xl flex items-center justify-center h-48 sm:h-64">
                  <img
                    src={selectedProductDetail.image}
                    alt={selectedProductDetail.name}
                    referrerPolicy="no-referrer"
                    className="max-h-40 sm:max-h-48 object-contain mix-blend-multiply"
                  />
                </div>
                
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {selectedProductDetail.brand}
                    </span>
                    <span className="text-xs text-gray-400 font-sans">
                      Category: {selectedProductDetail.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                    {selectedProductDetail.name}
                  </h2>
                  <p className="text-xs text-gray-400 font-sans">{selectedProductDetail.unit}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-gray-800">{selectedProductDetail.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedProductDetail.ratingCount} Ulasan Pasien</span>
                  </div>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-2xl font-extrabold text-[#006c51]">
                      Rp {selectedProductDetail.price.toLocaleString('id-ID')}
                    </span>
                    {selectedProductDetail.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        Rp {selectedProductDetail.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description body */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900">Deskripsi Lengkap</h4>
                  <p className="text-xs sm:text-sm text-gray-505 leading-relaxed font-sans">
                    {selectedProductDetail.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900">Pemberitahuan Kontraindikasi</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Hanya gunakan sesuai anjuran tertulis dari lembar produk atau anjuran dokter Anda. Jangan lampaui konsumsi harian maksimal demi mencegah toksisitas ginjal harian. Simpan di tempat jauh dari kelembaban.
                  </p>
                </div>
              </div>

              {/* CTA bottom row */}
              <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Status Ketersediaan:</span>
                  <div className="text-sm font-bold mt-0.5">
                    {selectedProductDetail.stockStatus === 'available' ? (
                      <span className="text-[#006c51] flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Ready Stok Apotek
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full" /> Habis, Sedang Dikirim Ulang
                      </span>
                    )}
                  </div>
                </div>

                {selectedProductDetail.stockStatus === 'available' ? (
                  <button
                    onClick={() => {
                      onAddToCart(selectedProductDetail);
                      setSelectedProductDetail(null);
                    }}
                    className="px-6 py-2.5 bg-[#006c51] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> Tambah Ke Keranjang
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-6 py-2.5 bg-gray-150 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed uppercase"
                  >
                    Stok Kosong
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
