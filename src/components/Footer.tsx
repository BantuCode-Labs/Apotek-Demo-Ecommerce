import { Activity, ShieldCheck, Lock, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-lg bg-[#006c51] flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-[#006c51] tracking-tight">
                bantutoko.app
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-sans">
              Solusi kesehatan terpercaya, cepat, dan berkualitas persembahan bantutoko.app untuk seluruh masyarakat Indonesia. Kami hanya menyediakan obat-obatan asli berlisensi tinggi dengan pengawasan apoteker profesional.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck className="w-5 h-5 text-[#006c51]" />
              <span>Sertifikat Resmi IDI &amp; IAI</span>
            </div>
          </div>

          {/* Quick Navigations */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">
              Navigasi Cepat
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  type="button" 
                  className="font-medium text-gray-500 hover:text-[#006c51] transition-colors"
                >
                  Beranda Apotek
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')} 
                  type="button" 
                  className="font-medium text-gray-500 hover:text-[#006c51] transition-colors"
                >
                  Cari Produk Obat
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('prescription')} 
                  type="button" 
                  className="font-medium text-gray-500 hover:text-[#006c51] transition-colors"
                >
                  Unggah Resep Dokter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('history')} 
                  type="button" 
                  className="font-medium text-gray-500 hover:text-[#006c51] transition-colors"
                >
                  Lacak Pengiriman Saya
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 font-sans">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-[#25D366]/10 flex items-center justify-center">
                  <span className="text-[#25D366] text-xs font-bold font-sans">WA</span>
                </div>
                <a
                  href="https://wa.me/628155145845"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-gray-700 hover:text-[#006c51] transition-colors flex items-center gap-1 hover:underline"
                >
                  WhatsApp: 08155145845 <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-sans uppercase">Aktif 24 Jam</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span>Customer Care: +62 21-8840-128</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span>Email: asisten@sehatsentosa.co.id</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                <span>Jl. Kesehatan Raya No. 123, Central Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Checkout & Secure Systems */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">
              Sistem Pembayaran Aman
            </h4>
            <p className="text-xs text-gray-400 font-sans">
              Kami mendukung penuh sistem transfer bank otomatis, QRIS instant, Gopay, OVO, dan kartu kredit Visa/Mastercard.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-1 bg-white border border-gray-200 text-[10px] font-extrabold text-gray-500 rounded uppercase">BCA</span>
              <span className="px-2 py-1 bg-white border border-gray-200 text-[10px] font-extrabold text-[#006c51] rounded uppercase">GOPAY</span>
              <span className="px-2 py-1 bg-white border border-gray-200 text-[10px] font-extrabold text-[#006c51] rounded uppercase">OVO</span>
              <span className="px-2 py-1 bg-white border border-gray-200 text-[10px] font-extrabold text-blue-800 rounded uppercase">VISA</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Checkout Terenkripsi 256-Bit SSL</span>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:items-center text-xs text-gray-400 font-sans">
          <p>© 2026 bantutoko.app (Apotek Sehat Sentosa). Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex justify-center gap-4 mt-4 md:mt-0 font-medium text-gray-500">
            <a href="#" className="hover:text-[#006c51] hover:underline">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-[#006c51] hover:underline">Syarat &amp; Ketentuan</a>
            <span>•</span>
            <a href="#" className="hover:text-[#006c51] hover:underline">Hubungi Kami</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
