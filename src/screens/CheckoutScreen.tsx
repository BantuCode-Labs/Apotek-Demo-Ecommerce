import { useState, useEffect } from 'react';
import { CartItem, Address, Product, Order } from '../types';
import { MapPin, Phone, User, Truck, CreditCard, Landmark, Wallet, Check, ChevronRight, ShieldCheck } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  mainAddress: Address;
  isPromoApplied: boolean;
  onPlaceOrder: (
    shippingMethod: string,
    shippingCost: number,
    paymentMethod: string,
    paymentProvider: string
  ) => void;
}

export default function CheckoutScreen({
  cart,
  mainAddress,
  isPromoApplied,
  onPlaceOrder
}: CheckoutScreenProps) {
  // Shipping Method
  const [shippingTier, setShippingTier] = useState<'reguler' | 'kilat' | 'ambil'>('reguler');
  
  // Payment Type State
  const [paymentType, setPaymentType] = useState<'transfer' | 'ewallet' | 'card'>('transfer');
  const [selectedProvider, setSelectedProvider] = useState<string>('BCA');

  // QR Code countdown state
  const [qrisTimer, setQrisTimer] = useState<number>(900); // 15 minutes = 900 seconds

  // Reset or run QRIS timer when payment type changes
  useEffect(() => {
    if (paymentType !== 'ewallet') return;
    
    // reset timer to 15m
    setQrisTimer(900);

    const interval = setInterval(() => {
      setQrisTimer(prev => {
        if (prev <= 1) {
          return 900; // loop back
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentType]);

  const shippingCost = {
    reguler: 10000,
    kilat: 15000,
    ambil: 0
  }[shippingTier];

  const shippingName = {
    reguler: 'Motor Courier Reguler (2-3 Hari Kerja)',
    kilat: 'Kurir Kilat (1 Hari Sampai)',
    ambil: 'Ambil Sendiri di Apotek Cabang'
  }[shippingTier];

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = isPromoApplied && subtotal > 15000 ? 15000 : 0;
  const grandTotal = subtotal + shippingCost - discount;

  const handlePlaceOrderSubmit = () => {
    let paymentStr = 'Transfer Bank';
    if (paymentType === 'ewallet') paymentStr = 'Dompet Digital';
    if (paymentType === 'card') paymentStr = 'Kartu Kredit';

    onPlaceOrder(shippingName, shippingCost, paymentStr, selectedProvider);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2.5xl font-extrabold tracking-tight text-gray-900">
          Penyelesaian Pesanan &amp; Checkout
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-sans mt-0.5">
          Verifikasi alamat tujuan medis, tentukan model logistik, dan lakukan pembayaran aman 256-bit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: MULTI-STEP CHECKOUT FORMS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: DELIVERY ADDRESS CONFIGURATION */}
          <section id="checkout-step-address" className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-bold">1</span>
              Alamat Pengiriman Utama
            </h3>

            <div className="p-4 border-2 border-emerald-500/10 bg-emerald-500/5 rounded-xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#006c51] text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Alamat Utama
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#006c51] shrink-0 mt-0.5" />
                <div className="space-y-1 font-sans text-xs sm:text-sm text-gray-700">
                  <p className="font-bold text-gray-900 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <User className="w-3.5 h-3.5" /> {mainAddress.name}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5" /> {mainAddress.phone}
                    </span>
                  </p>
                  <p className="leading-relaxed leading-relaxed font-normal pt-1">{mainAddress.street}</p>
                </div>
              </div>
            </div>

            <button
              disabled
              className="text-xs font-bold text-gray-400 cursor-not-allowed hover:underline flex items-center gap-1"
            >
              Ubah Alamat / Tambah Alamat Baru (Mode Single-User Aktif)
            </button>
          </section>

          {/* STEP 2: LOGISTICS SHIPPING METHODS CHOICE */}
          <section id="checkout-step-shipping" className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-bold">2</span>
              Metode Pengiriman (Opsi Logistik)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Reguler options */}
              <div
                onClick={() => setShippingTier('reguler')}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-4 font-sans select-none ${
                  shippingTier === 'reguler'
                    ? 'border-[#006c51] bg-emerald-50/20'
                    : 'border-gray-200 hover:border-emerald-250'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#006c51]" /> Motor Reguler
                  </span>
                  <p className="text-[10px] text-gray-400 leading-snug">Estimasi tiba dalam 2-3 hari kerja langsung dari pusat operasional.</p>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400">Ongkir:</span>
                  <span className="text-sm font-extrabold text-gray-900">Rp 10.000</span>
                </div>
              </div>

              {/* Express option */}
              <div
                onClick={() => setShippingTier('kilat')}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-4 font-sans select-none ${
                  shippingTier === 'kilat'
                    ? 'border-[#006c51] bg-emerald-50/20'
                    : 'border-gray-200 hover:border-emerald-250'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Kurir Kilat
                  </span>
                  <p className="text-[10px] text-gray-400 leading-snug">Layanan prioritas 1 hari sampai sampai ke depan gang rumah Anda.</p>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400">Ongkir:</span>
                  <span className="text-sm font-extrabold text-gray-900">Rp 15.000</span>
                </div>
              </div>

              {/* Take away yourself option */}
              <div
                onClick={() => setShippingTier('ambil')}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-4 font-sans select-none ${
                  shippingTier === 'ambil'
                    ? 'border-[#006c51] bg-emerald-50/20'
                    : 'border-gray-200 hover:border-emerald-250'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5">
                    Ambil Sendiri
                  </span>
                  <p className="text-[10px] text-gray-400 leading-snug">Ambil langsung paket di Cabang Apotek Sehat Sentosa Sudirman (08.00 - 21.00).</p>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-100 font-sans">
                  <span className="text-[11px] font-bold text-gray-400">Ongkir:</span>
                  <span className="text-xs font-extrabold text-[#006c51] uppercase">Gratis</span>
                </div>
              </div>

            </div>
          </section>

          {/* STEP 3: FINANCIAL SECURE PAYMENT OPTIONS GRIDS */}
          <section id="checkout-step-payment" className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#006c51] text-white flex items-center justify-center text-[10px] font-bold">3</span>
              Metode Pembayaran Online
            </h3>

            {/* Vertical Sub-Tabs switcher */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => { setPaymentType('transfer'); setSelectedProvider('BCA'); }}
                type="button"
                className={`flex-1 py-2.5 font-bold text-xs sm:text-sm text-center border-b-2 font-sans transition-colors ${
                  paymentType === 'transfer' ? 'border-[#006c51] text-[#006c51]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Virtual Account/Transfer
              </button>
              <button
                onClick={() => { setPaymentType('ewallet'); setSelectedProvider('GOPAY'); }}
                type="button"
                className={`flex-1 py-2.5 font-bold text-xs sm:text-sm text-center border-b-2 font-sans transition-colors ${
                  paymentType === 'ewallet' ? 'border-[#006c51] text-[#006c51]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                E-Wallet (QRIS)
              </button>
              <button
                onClick={() => { setPaymentType('card'); setSelectedProvider('VISA'); }}
                type="button"
                className={`flex-1 py-2.5 font-bold text-xs sm:text-sm text-center border-b-2 font-sans transition-colors ${
                  paymentType === 'card' ? 'border-[#006c51] text-[#006c51]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Kartu Kredit / Debit
              </button>
            </div>

            {/* Sub-grids based on selection */}
            {paymentType === 'transfer' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['BCA', 'Mandiri', 'BNI', 'BRI'].map(prov => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvider(prov)}
                    type="button"
                    className={`p-3.5 border-2 rounded-xl text-center relative font-extrabold text-sm font-sans transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      selectedProvider === prov ? 'border-[#006c51] bg-emerald-50/10 text-[#006c51]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{prov} VA</span>
                    <span className="text-[9px] text-gray-450 uppercase font-light">Automatic Ledger</span>
                    {selectedProvider === prov && (
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#006c51] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {paymentType === 'ewallet' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['GOPAY', 'OVO', 'DANA', 'LINKAJA'].map(prov => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvider(prov)}
                      type="button"
                      className={`p-3.5 border-2 rounded-xl text-center relative font-extrabold text-sm font-sans transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                        selectedProvider === prov ? 'border-[#006c51] bg-emerald-50/10 text-[#006c51]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{prov}</span>
                      <span className="text-[9px] text-gray-450 uppercase font-light">Instant QRIS Scan</span>
                      {selectedProvider === prov && (
                        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#006c51] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* DUMMY QRIS QR CODE AND VERIFICATION PLACEHOLDER */}
                <div className="border border-gray-200 bg-gray-50/70 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center space-y-4 shadow-inner max-w-md mx-auto">
                  <div className="text-center space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 border border-emerald-200 text-[#006c51] text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      QRIS DINAMIS AKTIF
                    </div>
                    <h4 className="text-sm font-extrabold text-gray-900 font-sans">
                      Pindai Kode QRIS {selectedProvider === 'GOPAY' ? 'GoPay' : selectedProvider}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                      Silakan buka aplikasi e-wallet Anda ({selectedProvider}), pilih tombol <span className="font-bold">Bayar / Scan QR</span>, kemudian lakukan pemindaian pada gambar QRIS resmi di bawah ini.
                    </p>
                  </div>

                  {/* QR Core Container with elegant framing, glowing visual layer, scan overlays */}
                  <div className="relative p-5 bg-white border border-gray-150 rounded-2xl shadow-sm group">
                    {/* Retro alignment outer border corners */}
                    <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#006c51] rounded-tl-sm pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#006c51] rounded-tr-sm pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#006c51] rounded-bl-sm pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#006c51] rounded-br-sm pointer-events-none" />

                    {/* QR Code Graphic element */}
                    <div className="relative bg-white p-2">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-40 h-40 sm:w-44 sm:h-44 text-slate-955 transition-transform duration-300 group-hover:scale-[1.02]"
                      >
                        {/* Top-left finder */}
                        <rect x="5" y="5" width="22" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="4.5"/>
                        <rect x="11" y="11" width="10" height="10" rx="1" fill="currentColor"/>
                        
                        {/* Top-right finder */}
                        <rect x="73" y="5" width="22" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="4.5"/>
                        <rect x="79" y="11" width="10" height="10" rx="1" fill="currentColor"/>
                        
                        {/* Bottom-left finder */}
                        <rect x="5" y="73" width="22" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="4.5"/>
                        <rect x="11" y="79" width="10" height="10" rx="1" fill="currentColor"/>

                        {/* Little matrix squares simulating data */}
                        <rect x="32" y="5" width="4" height="4" fill="currentColor"/>
                        <rect x="40" y="5" width="8" height="4" fill="currentColor"/>
                        <rect x="52" y="5" width="4" height="8" fill="currentColor"/>
                        <rect x="60" y="5" width="4" height="4" fill="currentColor"/>
                        
                        <rect x="32" y="13" width="8" height="4" fill="currentColor"/>
                        <rect x="48" y="13" width="4" height="4" fill="currentColor"/>
                        <rect x="64" y="13" width="4" height="8" fill="currentColor"/>
                        
                        <rect x="32" y="21" width="4" height="4" fill="currentColor"/>
                        <rect x="44" y="21" width="12" height="4" fill="currentColor"/>
                        <rect x="60" y="21" width="8" height="4" fill="currentColor"/>
                        
                        <rect x="5" y="32" width="4" height="12" fill="currentColor"/>
                        <rect x="13" y="32" width="8" height="4" fill="currentColor"/>
                        <rect x="25" y="32" width="4" height="4" fill="currentColor"/>
                        <rect x="32" y="32" width="12" height="4" fill="currentColor"/>
                        <rect x="48" y="32" width="8" height="8" fill="currentColor"/>
                        <rect x="60" y="32" width="4" height="4" fill="currentColor"/>
                        <rect x="68" y="32" width="16" height="4" fill="currentColor"/>
                        <rect x="88" y="32" width="4" height="12" fill="currentColor"/>

                        <rect x="5" y="48" width="12" height="4" fill="currentColor"/>
                        <rect x="21" y="44" width="4" height="8" fill="currentColor"/>
                        <rect x="32" y="44" width="8" height="4" fill="currentColor"/>
                        <rect x="44" y="44" width="4" height="4" fill="currentColor"/>
                        <rect x="64" y="44" width="12" height="4" fill="currentColor"/>
                        <rect x="80" y="48" width="4" height="8" fill="currentColor"/>
                        <rect x="88" y="48" width="8" height="4" fill="currentColor"/>
                        
                        <rect x="13" y="56" width="4" height="4" fill="currentColor"/>
                        <rect x="25" y="56" width="12" height="4" fill="currentColor"/>
                        <rect x="44" y="52" width="8" height="8" fill="currentColor"/>
                        <rect x="56" y="56" width="4" height="12" fill="currentColor"/>
                        <rect x="68" y="56" width="8" height="4" fill="currentColor"/>
                        <rect x="80" y="56" width="12" height="4" fill="currentColor"/>

                        <rect x="5" y="64" width="8" height="4" fill="currentColor"/>
                        <rect x="21" y="64" width="4" height="4" fill="currentColor"/>
                        <rect x="29" y="64" width="4" height="12" fill="currentColor"/>
                        <rect x="37" y="64" width="12" height="4" fill="currentColor"/>
                        <rect x="64" y="64" width="4" height="4" fill="currentColor"/>
                        <rect x="72" y="64" width="8" height="8" fill="currentColor"/>
                        <rect x="88" y="64" width="4" height="4" fill="currentColor"/>

                        <rect x="32" y="76" width="8" height="4" fill="currentColor"/>
                        <rect x="44" y="76" width="4" height="12" fill="currentColor"/>
                        <rect x="52" y="76" width="12" height="4" fill="currentColor"/>
                        <rect x="68" y="76" width="4" height="4" fill="currentColor"/>
                        
                        <rect x="32" y="84" width="4" height="12" fill="currentColor"/>
                        <rect x="40" y="88" width="12" height="4" fill="currentColor"/>
                        <rect x="56" y="84" width="8" height="4" fill="currentColor"/>
                        <rect x="68" y="84" width="12" height="4" fill="currentColor"/>
                        <rect x="84" y="84" width="8" height="12" fill="currentColor"/>

                        {/* Central Medical Logo Plate for bantutoko.app */}
                        <rect x="39" y="39" width="22" height="22" rx="3.5" fill="white" stroke="#006c51" strokeWidth="2.5"/>
                        <rect x="48" y="42.5" width="4" height="15" fill="#006c51" rx="1"/>
                        <rect x="42.5" y="48" width="15" height="4" fill="#006c51" rx="1"/>
                      </svg>

                      {/* Moving laser scan line preview */}
                      <div className="absolute inset-x-5 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse-progress pointer-events-none" style={{ top: '50%' }} />
                    </div>
                  </div>

                  {/* QRIS Billing Info Display */}
                  <div className="w-full bg-white border border-gray-150 rounded-xl p-3.5 text-center space-y-1.5 font-sans">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      TOTAL TAGIHAN TRANSPARAN
                    </p>
                    <p className="text-xl font-extrabold text-[#006c51]">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-sans border-t border-gray-100 pt-2.5">
                      <span>ID: BT-{grandTotal.toString().slice(-4)}</span>
                      <span>•</span>
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-600 animate-ping inline-block" />
                        Kedaluwarsa: {Math.floor(qrisTimer / 60)}:{('0' + (qrisTimer % 60)).slice(-2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentType === 'card' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['VISA', 'MASTERCARD', 'GPN', 'JCB'].map(prov => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvider(prov)}
                    type="button"
                    className={`p-3.5 border-2 rounded-xl text-center relative font-extrabold text-sm font-sans transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      selectedProvider === prov ? 'border-[#006c51] bg-emerald-50/10 text-[#006c51]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{prov} Card</span>
                    <span className="text-[9px] text-gray-450 uppercase font-light">Secure 3DSecure</span>
                    {selectedProvider === prov && (
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#006c51] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
              <span>Proteksi Jaringan Terenkripsi Penuh Bank Indonesia Terdaftar</span>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: CART ITEM REVIEW &amp; BILLS CALCULATION */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Review of products */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-2 border-b border-gray-100">
              Ulas Obat Pesanan
            </h4>

            <div className="divide-y divide-gray-100 max-h-52 overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="py-2.5 flex justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 truncate">{item.product.name}</p>
                    <p className="text-gray-400 mt-0.5">{item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}</p>
                  </div>
                  <span className="font-semibold text-gray-900 shrink-0 font-sans text-right">
                    Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing parameters calculations */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-2 border-b border-gray-100">
              Struktur Rincian Biaya
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm font-sans text-gray-650">
              <div className="flex justify-between">
                <span>Total Belanja</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengiriman</span>
                <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-[#006c51] font-bold text-emerald-700">
                  <span>Diskon Kupon</span>
                  <span>-Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              
              <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-base text-gray-950">
                <span>Total Tagihan</span>
                <span className="text-[#006c51]">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrderSubmit}
              type="button"
              className="w-full py-3 bg-[#006c51] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Bayar Secure &amp; Lacak Pesanan
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
