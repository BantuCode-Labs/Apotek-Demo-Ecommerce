import { Product } from '../types';
import { Truck, ShieldCheck, HeartPulse, Clock, FileSpreadsheet, Headset, Star, ArrowRight, MessageSquareCode } from 'lucide-react';

interface HomeScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (tab: string) => void;
  onViewProductDetail: (product: Product) => void;
}

export default function HomeScreen({
  products,
  onAddToCart,
  onNavigate,
  onViewProductDetail
}: HomeScreenProps) {
  // Take first 4 available products as popular ones
  const popularProducts = products.filter(p => p.stockStatus === 'available').slice(0, 4);

  const steps = [
    {
      num: '01',
      title: 'Pilih Obat atau Unggah Resep',
      desc: 'Cari obat bebas Anda atau ajukan resep resmi dokter secara langsung melalui panel spesialis kami.'
    },
    {
      num: '02',
      title: 'Verifikasi &amp; Konsultasi',
      desc: 'Tim Apoteker senior kami segera memvalidasi komposisi resep dan memberikan dosis penggunaan optimal.'
    },
    {
      num: '03',
      title: 'Pembayaran Aman',
      desc: 'Bayar dengan gampang menggunakan Transfer Mandiri/BCA, QRIS instant, atau E-wallet andalan Anda.'
    },
    {
      num: '04',
      title: 'Pengiriman Cepat',
      desc: 'Paket dikirim dengan wadah kedap suhu khusus langsung menuju rumah Anda lewat jaringan motor instant.'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO PROMO BANNER */}
      <section id="hero-banner" className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#003d2e] to-[#006c51] text-white my-4 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#26e3bc]/20 text-[#26e3bc] text-xs font-bold uppercase tracking-wider rounded-full">
              <Clock className="w-3.5 h-3.5" /> Layanan Apotek 24/7 Nonstop
            </span>
            <h1 className="text-3.5xl sm:text-4.5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Belanja Obat Aman, <br />
              <span className="text-[#26e3bc]">Tanpa Ribet</span> Antre!
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed font-sans">
              Dapatkan obat bebas, tebus resep dokter terpercaya, vitamin harian, dan peralatan medis bersertifikat resmi langsung dikirim ke depan pintu Anda dengan cepat dan terlindung.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('search')}
                className="px-6 py-3 bg-white text-[#006c51] font-bold rounded-xl shadow hover:bg-emerald-50 focus:outline-none transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                Cari Obat Flu &amp; Vitamin
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('prescription')}
                className="px-6 py-3 bg-emerald-800 text-white font-bold rounded-xl border border-emerald-600 hover:bg-emerald-700 focus:outline-none transition-all text-sm sm:text-base cursor-pointer"
              >
                Unggah Resep Dokter
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVvdwT87XMiMvA6gMghWniuQ5QKNwKaM4wB-cKEYpqy3c5MoNl8Np3Io_moOshaHtk9o3bZwOWRmF4V3hrqHAryXzospb0WNmFjJwzB1WjlxoU1YBQ9tJjQbEMnKpI3SeBBZ-gedJZ3jzZZvHwvQaqNwjvro_mVNs2MsBeOXiUh69BdunxCNpakQvlvB1azafHvjrRLkhsTHI6X6hwk-TGtKNsD9OXCNHyFUUYqSJhs8k5wO_ZiyQkEWspz0Pb33HQhp_7GG10LzM"
              alt="Sehat Sentosa Medis Catalog"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 lg:absolute lg:inset-0 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003d2e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#003d2e] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. INSTANT TRUST VALUE LABELS */}
      <section id="trust-features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#006c51] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Asli &amp; Terlisensi</h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5">Semua obat bersertifikasi BPOM</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#006c51] flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Pengiriman Kilat</h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5">Paket reguler &amp; instan 1 jam</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#006c51] flex items-center justify-center shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Rekomendasi Ahli</h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5">Konsultasi apoteker gratis</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#006c51] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Responsif 15-Menit</h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5">Balas resep secepat kilat</p>
          </div>
        </div>
      </section>

      {/* 3. MULTI-SERVICE MODULE CARDS */}
      <section id="services-grid" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Layanan Spesialis Kesehatan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#006c51]/5 border border-[#006c51]/10 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#006c51] text-white rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg pt-1">Tebus Resep Online</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Unggah resep fisik dari dokter Anda melalui pindaian foto atau dokumen PDF. Kami verifikasi dosis dan siapkan pesanan langsung.
              </p>
            </div>
            <button
              onClick={() => onNavigate('prescription')}
              className="text-[#006c51] text-sm font-bold flex items-center gap-1.5 group cursor-pointer hover:underline"
            >
              Coba Unggah Resep <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="p-6 bg-amber-500/5 border border-amber-500/15 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg pt-1">Diskon &amp; Promo Mingguan</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Dapatkan produk perawatan tubuh, antiseptik, pembersih wajah, obat flu anak, dan suplemen harian dengan potongan hingga 20%.
              </p>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="text-amber-700 text-sm font-bold flex items-center gap-1.5 group cursor-pointer hover:underline"
            >
              Lihat Promo Tersedia <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="p-6 bg-sky-500/5 border border-sky-500/15 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-sky-600 text-white rounded-lg flex items-center justify-center">
                <Headset className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg pt-1">Tanya Apoteker Senior</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Ragu mengenai dosis paracetamol atau antibiotik? Tanyakan langsung ke tim spesialis kami lewat WhatsApp otomatis secara instant.
              </p>
            </div>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 text-sm font-bold flex items-center gap-1.5 group hover:underline"
            >
              Chat WhatsApp <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. POPULAR PRODUCT EXHIBITION CATALOG */}
      <section id="popular-catalog" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Produk Terlaris &amp; Paling Dicari
            </h2>
            <p className="text-xs text-gray-400 mt-1">Obat-obatan umum penurun demam, nyeri, dan pencegah flu</p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-sm font-bold text-[#006c51] hover:underline flex items-center gap-1"
          >
            Lihat Semua Obat <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all rounded-xl overflow-hidden flex flex-col justify-between relative group"
            >
              {p.discountBadge && (
                <span className="absolute top-3 left-3 bg-[#e33d26] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full z-10">
                  {p.discountBadge}
                </span>
              )}
              
              <div 
                className="p-4 bg-gray-50 flex items-center justify-center h-48 cursor-pointer overflow-hidden"
                onClick={() => onViewProductDetail(p)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="max-h-36 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                    {p.brand}
                  </span>
                  <h3 
                    onClick={() => onViewProductDetail(p)}
                    className="font-bold text-gray-900 text-sm line-clamp-2 mt-1 hover:text-[#006c51] cursor-pointer"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">{p.unit}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-gray-700">{p.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({p.ratingCount})</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-gray-900">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        Rp {p.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(p)}
                    className="w-full py-2 bg-[#006c51] hover:bg-[#00543e] text-white text-xs font-bold rounded-lg transition-all shadow hover:shadow-md cursor-pointer"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SHOPPING STEPS INDICATORS */}
      <section id="shopping-steps" className="bg-gray-50 border border-gray-100 rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Bagaimana Cara Belanja Hemat di Sini?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-sans">
            Layanan tebus resep digital dan pemesanan obat resep &amp; bebas terintegrasi instan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="relative space-y-3">
              <div className="text-4xl font-extrabold text-emerald-200 leading-none">
                {s.num}
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">
                {s.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PHARMACIST HELP CARD CHAT */}
      <section id="pharmacist-widget" className="bg-emerald-50 border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-4 max-h-56 overflow-hidden md:h-full flex items-center justify-center bg-teal-100">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUdnXYG7t_HoGyThBxyDbaJMEY5bgkpII0kvggX0mce4h9giprM2pRpaRm-ly6SjerZhPoB3PurZLlgEcHnlw7YbePfK6FdQVans3j9HvXhHLvdhMzDWjEFc42sPV2LGhoiimnEqg11dshjk30c5owrsa0h6Un-lCArpqkCuXWwHBSUiuSdYgF3fY6r4azD4EGeHzNOl9wdARcW8LKYGqFPo6zSs-h3z5SEIREN3mRrdJQVtcH11acgTRFeXMAUT_bHHo7FVBu6x0"
              alt="Apoteker Sehat Sentosa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-56 md:max-h-72 object-top mix-blend-multiply"
            />
          </div>
          <div className="md:col-span-8 p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 leading-snug">
              Ada Kendala Mengenai Penggunaan Obat Anda?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
              Setiap keluhan kesehatan memerlukan saran klinis terbaik. Konsultasikan aturan pakai amoxicillin, paracetamol berlebih, efek samping antihistamin, atau obat ibu menyusui secara live bersama apoteker jaga senior kami.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-1 font-sans">
              <a
                href="https://wa.me/628155145845"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
              >
                <MessageSquareCode className="w-4.5 h-4.5" />
                Hubungi bantutoko.app (WA: 08155145845)
              </a>
              <span className="text-xs font-bold text-[#006c51] flex items-center gap-1.5 bg-white border border-emerald-100 px-3 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                Sedang Online Jaga
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
