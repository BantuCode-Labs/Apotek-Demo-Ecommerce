import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, X, Search, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onSearch,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'search', label: 'Cari & Kategori' },
    { id: 'prescription', label: 'Resep Dokter' },
    { id: 'history', label: 'Riwayat Pesanan' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Name / Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-3 cursor-pointer shrink-0 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006c51] flex items-center justify-center text-white">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#006c51] leading-none mb-0.5 tracking-tight font-sans">
              bantutoko.app
            </h1>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Apotek Sehat Sentosa
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-sm lg:text-base font-semibold transition-colors duration-200 py-2 relative ${
                activeTab === link.id
                  ? 'text-[#006c51] font-bold'
                  : 'text-gray-600 hover:text-[#006c51]'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c51] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Global Product Search Engine */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block relative max-w-xs xl:max-w-md w-full">
          <input
            type="text"
            placeholder="Cari obat, vitamin, atau lambung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006c51] focus:ring-1 focus:ring-[#006c51] bg-gray-50 transition-all font-sans"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Icon Trigger Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/628155145845"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-transform hover:scale-105 shadow-xs"
            title="Chat WhatsApp bantutoko.app"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>WA: 08155145845</span>
          </a>
          
          {/* Wishlist Link (dummy representation) */}
          <button 
            onClick={() => setActiveTab('search')}
            type="button" 
            className="p-2 text-gray-500 hover:text-[#006c51] transition-all relative rounded-full hover:bg-gray-100 hidden sm:block"
            title="Sukai Produk"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Checkout Cart Link */}
          <button
            onClick={() => setActiveTab('cart')}
            type="button"
            className="p-2 text-gray-500 hover:text-[#006c51] transition-all relative rounded-full hover:bg-gray-100"
            title="Keranjang Belanja"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#006c51] text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile/Account Link */}
          <button
            onClick={() => setActiveTab('history')}
            type="button"
            className={`p-2 transition-all rounded-full hover:bg-gray-100 ${
              activeTab === 'history' ? 'text-[#006c51] bg-gray-50' : 'text-gray-500 hover:text-[#006c51]'
            }`}
            title="Menu Akun Saya"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="p-2 text-gray-500 hover:text-[#006c51] md:hidden rounded-full hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1.5">
            {/* Mobile WhatsApp Button */}
            <a
              href="https://wa.me/628155145845"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-extrabold rounded-lg shadow-sm mb-3 transition-colors text-center"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
              <span>Hubungi WA: 08155145845</span>
            </a>
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
              <input
                type="text"
                placeholder="Cari obat atau vitamin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006c51] bg-gray-50"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left font-semibold text-sm px-3 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                  activeTab === link.id
                    ? 'text-white bg-[#006c51]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
