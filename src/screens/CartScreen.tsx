import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { Trash2, Plus, Minus, Tag, ShieldAlert, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  isPromoApplied: boolean;
  setIsPromoApplied: (applied: boolean) => void;
  onNavigate: (tab: string) => void;
}

export default function CartScreen({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  isPromoApplied,
  setIsPromoApplied,
  onNavigate
}: CartScreenProps) {
  const [promoCodeInput, setPromoCodeInput] = useState('SEHATSENTOSA15');
  const [promoMessage, setPromoMessage] = useState<string | null>(
    isPromoApplied ? 'Kupon SEHATSENTOSA15 aktif! (Potongan Rp 15.000)' : null
  );

  // Math Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 0 ? 10000 : 0;
  const discount = isPromoApplied && subtotal > 15000 ? 15000 : 0;
  const grandTotal = subtotal + shippingCost - discount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim().toUpperCase() === 'SEHATSENTOSA15') {
      setIsPromoApplied(true);
      setPromoMessage('Kupon SEHATSENTOSA15 berhasil digunakan! Diskon Rp 15.000 diaktifkan.');
    } else {
      setPromoMessage('Kupon tidak valid atau telah kadaluarsa. Coba pakai SEHATSENTOSA15.');
    }
  };

  const handleDisablePromo = () => {
    setIsPromoApplied(false);
    setPromoMessage(null);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Page headers */}
      <div>
        <h2 className="text-2.5xl font-extrabold tracking-tight text-gray-900">
          Keranjang Belanja Anda
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-sans mt-0.5">
          Kelola obat pilihan Anda sebelum lanjut melakukan verifikasi data alamat pengiriman.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-800">Keranjang Belanja Anda Kosong</h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Sepertinya Anda belum menambahkan keperluan medis, tablet paracetamol, atau vitamin penambah imunitas harian Anda ke keranjang belanja.
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="px-5 py-2.5 bg-[#006c51] hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
          >
            Mulai Belanja Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION: LIST OF SELECTED PRODUCTS */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-55 flex justify-between items-center">
                <span className="font-extrabold text-xs uppercase tracking-wider text-gray-400">Rincian Obat &amp; Jumlah</span>
                <span className="text-xs font-bold text-gray-300 font-sans">Subtotal Item</span>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Image and name details */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="max-h-12 max-w-12 object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-extrabold text-[#006c51] uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm truncate mt-0.5">{item.product.name}</h4>
                        <p className="text-xs text-gray-400 font-sans">{item.product.unit}</p>
                        <p className="text-xs font-bold text-gray-600 mt-1 sm:hidden">
                          Rp {item.product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Increments controls and totals */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 shrink-0 border-t border-gray-100 pt-3 sm:pt-0 sm:border-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          type="button"
                          className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:text-[#006c51] flex items-center justify-center transition-colors text-gray-600 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold font-mono text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          type="button"
                          className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:text-[#006c51] flex items-center justify-center transition-colors text-gray-600 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <p className="font-extrabold text-gray-900 text-sm font-sans">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          type="button"
                          className="text-[10px] font-bold text-red-500 hover:text-red-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Hapus Item
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* General advice message */}
            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-normal font-sans">
                Harap pastikan semua obat yang terdaftar di atas merupakan obat sediaan yang aman bagi lambung atau dikombinasikan dengan anjuran apoteker. Obat-obatan tertentu mungkin memerlukan ketersediaan resep fisik saat motor kurir kami tiba.
              </p>
            </div>
          </div>

          {/* RIGHT SECTION: CALCULATED TOTALS &amp; PROMO CODES */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo coupon input card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#006c51]" /> Kode Promo Apotek
              </h4>
              
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: SEHATSENTOSA15"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006c51] uppercase font-mono font-bold"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#006c51] text-white font-bold text-xs rounded hover:bg-emerald-800 transition-all cursor-pointer"
                >
                  Gunakan
                </button>
              </form>

              {promoMessage && (
                <div className={`p-2.5 rounded text-[10px] leading-relaxed font-sans flex items-center justify-between ${
                  isPromoApplied ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
                }`}>
                  <span className="font-medium mr-2">{promoMessage}</span>
                  {isPromoApplied && (
                    <button
                      onClick={handleDisablePromo}
                      type="button"
                      className="text-red-600 font-extrabold hover:underline select-none uppercase shrink-0"
                    >
                      Batal
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Financial summary calculations card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-2 border-b border-gray-100">
                Ringkasan Belanja
              </h4>

              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((ct, it) => ct + it.quantity, 0)} Item)</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Pengiriman</span>
                  <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Diskon Voucher</span>
                    <span>-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-base text-gray-950">
                  <span>Total Tagihan</span>
                  <span className="text-[#006c51]">Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Checkout transition button */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-3 bg-[#006c51] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Lanjutkan ke Pembayaran
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-[10px] text-gray-400 font-sans text-center">
                Pajak PPN 11% sudah terhitung dan dideklarasikan pada faktur pembayaran resmi Anda.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
