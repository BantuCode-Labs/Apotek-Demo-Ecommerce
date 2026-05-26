import { useState, useMemo } from 'react';
import { Order, Product } from '../types';
import { User, MapPin, Receipt, LogOut, Package, Truck, Search, Calendar, ChevronRight, CheckCircle2, Map, X, Landmark } from 'lucide-react';

interface HistoryScreenProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  onSetStatus: (orderId: string, status: 'Diproses' | 'Dikirim' | 'Selesai') => void;
}

export default function HistoryScreen({
  orders,
  onReorder,
  onSetStatus
}: HistoryScreenProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState('orders');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Filter orders based on chosen status tab
  const filteredOrders = useMemo(() => {
    if (statusFilter === 'Semua') return orders;
    return orders.filter(o => o.status === statusFilter);
  }, [orders, statusFilter]);

  // Account information simulation details
  const profile = {
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    rank: 'Gold Member (Pasien Prioritas)',
    joinDate: 'Terdaftar Sejak Januari 2023',
    phone: '+62 812-3456-7890'
  };

  const menuItems = [
    { id: 'profile', label: 'Profil Saya', icon: User },
    { id: 'address', label: 'Daftar Alamat', icon: MapPin },
    { id: 'orders', label: 'Riwayat Pesanan', icon: Receipt },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Container row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PROFILE SIDEBAR PANEL */}
        <aside id="history-sidebar" className="lg:col-span-3 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Header Details */}
          <div className="p-6 bg-gradient-to-br from-[#004d3d] to-[#006c51] text-white text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006c51] font-extrabold text-xl flex items-center justify-center mx-auto border-4 border-white shadow shadow-inner">
              BS
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm tracking-tight leading-normal">{profile.name}</h3>
              <p className="text-[10px] text-emerald-250 font-bold uppercase tracking-wider">{profile.rank}</p>
            </div>
          </div>

          {/* Sidebar Menu items list */}
          <nav className="p-4 space-y-1">
            {menuItems.map(item => {
              const IconComp = item.icon;
              const isSelected = activeSidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarTab(item.id)}
                  type="button"
                  className={`w-full text-left font-bold text-xs sm:text-sm px-3.5 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    isSelected 
                      ? 'bg-emerald-500/5 text-[#006c51]' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComp className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 bg-[#006c51] rounded-full ml-auto" />}
                </button>
              );
            })}
            
            <button
              onClick={() => alert('Log out simulasi berhasil!')}
              type="button"
              className="w-full text-left font-bold text-xs sm:text-sm px-3.5 py-3 rounded-lg flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors pt-4 border-t border-gray-100 mt-4"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Keluar Akun</span>
            </button>
          </nav>
        </aside>

        {/* RIGHT CONTENT WORKPLACE */}
        <main className="lg:col-span-9 space-y-6">
          
          {activeSidebarTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Title &amp; Status Subtabs selector */}
              <div className="md:flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-950">Riwayat Pesanan Anda</h2>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">Pantau status obat resep, proses apoteker, dan pengiriman kurir instant.</p>
                </div>

                {/* Filter pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 md:mt-0 font-sans">
                  {['Semua', 'Diproses', 'Dikirim', 'Selesai'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      type="button"
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        statusFilter === status
                          ? 'bg-[#006c51] text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* List of filtered cards */}
              {filteredOrders.length === 0 ? (
                <div className="bg-white border border-gray-250 p-12 text-center rounded-xl space-y-4 font-sans">
                  <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-800">Tidak Ada Pesanan</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Anda tidak memiliki pesanan medis terdaftar dengan status penelusuran "{statusFilter}" untuk saat ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredOrders.map((order) => {
                    const statusColors = {
                      Diproses: 'text-amber-800 bg-amber-50 border-amber-100',
                      Dikirim: 'text-blue-800 bg-blue-50 border-blue-100',
                      Selesai: 'text-emerald-800 bg-emerald-50 border-[#006c51]/10'
                    }[order.status];

                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-gray-300 transition-all font-sans"
                      >
                        {/* Header card info */}
                        <div className="px-5 py-3.5 bg-gray-55 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-extrabold text-[#006c51] font-mono whitespace-nowrap">{order.id}</span>
                            <span className="text-gray-350">•</span>
                            <span className="text-gray-500 inline-flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" /> {order.date}
                            </span>
                          </div>
                          
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusColors}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order items content review */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-8 flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-50 border border-gray-150 p-2.5 rounded flex items-center justify-center shrink-0">
                              <img
                                src={order.items[0]?.image}
                                alt={order.items[0]?.name}
                                referrerPolicy="no-referrer"
                                className="max-h-10 max-w-10 object-contain mix-blend-multiply"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-gray-800 text-sm truncate">{order.items[0]?.name}</h4>
                              <p className="text-[11px] text-gray-400 mt-1">{order.items[0]?.unit} x {order.items[0]?.quantity}</p>
                              {order.items[0]?.extraCount && (
                                <p className="text-[10px] text-[#006c51] font-bold mt-1.5 bg-emerald-500/5 inline-block px-1.5 py-0.5 rounded">
                                  + {order.items[0].extraCount} produk medis lainnya
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 text-left md:text-right font-sans">
                            <span className="text-[10px] text-gray-400 uppercase font-medium">Total Pembayaran</span>
                            <p className="font-extrabold text-gray-900 text-sm md:text-base mt-0.5">
                              Rp {order.totalPrice.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        {/* Action triggers footer */}
                        <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-gray-500">
                          <div>
                            <span className="text-gray-400 font-normal">Metode Bayar: </span>
                            <span className="text-gray-700">{order.paymentMethod}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {order.status === 'Selesai' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => alert(`Faktur Invoice ${order.id} berhasil diunduh ke gadget!`)}
                                  className="px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-650 rounded transition-colors cursor-pointer"
                                >
                                  Cetak Faktur
                                </button>
                                <button
                                  onClick={() => onReorder(order)}
                                  type="button"
                                  className="px-3 py-1.5 bg-[#006c51] hover:bg-emerald-800 text-white rounded shadow-sm hover:shadow transition-colors cursor-pointer"
                                >
                                  Beli Lagi
                                </button>
                              </>
                            )}

                            {order.status === 'Dikirim' && (
                              <>
                                <button
                                  onClick={() => setActiveTrackingOrder(order)}
                                  type="button"
                                  className="px-3 py-1.5 bg-white border border-[#006c51]/25 text-[#006c51] rounded transition-all flex items-center gap-1 hover:bg-[#006c51]/5 cursor-pointer"
                                >
                                  <Truck className="w-3.5 h-3.5" /> Lacak Paket
                                </button>
                                <button
                                  onClick={() => onSetStatus(order.id, 'Selesai')}
                                  type="button"
                                  className="px-3 py-1.5 bg-[#006c51] hover:bg-emerald-800 text-white rounded transition-colors cursor-pointer"
                                >
                                  Selesaikan Pesanan
                                </button>
                              </>
                            )}

                            {order.status === 'Diproses' && (
                              <>
                                <button
                                  onClick={() => alert('Detail resep sedang diverifikasi secara ketat...')}
                                  type="button"
                                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-650 rounded cursor-pointer hover:bg-gray-50"
                                >
                                  Lihat Detail
                                </button>
                                <button
                                  onClick={() => onSetStatus(order.id, 'Dikirim')}
                                  type="button"
                                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-all shrink-0 cursor-pointer text-xs"
                                >
                                  Keluarkan dari Gudang (Kirim)
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {activeSidebarTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-gray-950">Profil Pengguna</h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">Kelola data keanggotaan dan kredensial utama login Anda.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs sm:text-sm">
                <div className="p-4 border border-gray-150 rounded-lg space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Nama Lengkap</span>
                  <p className="font-bold text-gray-800">{profile.name}</p>
                </div>
                <div className="p-4 border border-gray-150 rounded-lg space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Alamat Email</span>
                  <p className="font-bold text-gray-800">{profile.email}</p>
                </div>
                <div className="p-4 border border-gray-150 rounded-lg space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Nomor Ponsel Pasien</span>
                  <p className="font-bold text-gray-800">{profile.phone}</p>
                </div>
                <div className="p-4 border border-gray-150 rounded-lg space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Pendaftaran Keanggotaan</span>
                  <p className="font-bold text-[#006c51]">{profile.joinDate}</p>
                </div>
              </div>
            </div>
          )}

          {activeSidebarTab === 'address' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
              <div>
                <h3 className="text-lg font-extrabold text-gray-950">Daftar Alamat Pengiriman</h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5 font-normal">Simpan berbagai alamat pengiriman obat ke kantor, ruko, atau rumah.</p>
              </div>

              <div className="p-5 border-2 border-[#006c51]/15 bg-emerald-500/5 rounded-xl space-y-3 relative overflow-hidden">
                <span className="bg-[#006c51] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded absolute top-0 right-0 tracking-wider">Default</span>
                
                <h4 className="font-bold text-gray-805 text-sm">Alamat Rumah Utama</h4>
                <div className="text-xs text-gray-600 font-sans space-y-1 leading-normal">
                  <p className="font-semibold text-gray-800">{profile.name} (Ponsel: {profile.phone})</p>
                  <p>Jl. Kesehatan No. 123, Kel. Merdeka, Kec. Sejahtera, Kota Jakarta Pusat, DKI Jakarta, 10110.</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* TRACKING LIVE PACKAGE MAP MODAL OVERLAY */}
      {activeTrackingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            
            {/* Modal header */}
            <div className="p-5 bg-gradient-to-r from-[#003d2e] to-[#006c51] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm tracking-tight">Status Pengiriman Pengantaran</h3>
                <p className="text-[10px] text-emerald-200 font-sans mt-0.5">Kode Lacak Resmi: {activeTrackingOrder.id}</p>
              </div>
              <button
                onClick={() => setActiveTrackingOrder(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Live Vector Tracker Map Visual Representation */}
            <div className="p-4 bg-gray-50 border-b border-gray-150 relative h-48 overflow-hidden flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-emerald-50 opacity-40">
                {/* SVG pattern overlay map lookalike */}
                <div className="absolute top-10 left-12 w-20 h-2 bg-emerald-100 rounded transform -rotate-12" />
                <div className="absolute top-24 left-32 w-28 h-2 bg-emerald-100 rounded transform rotate-45" />
                <div className="absolute top-16 right-12 w-16 h-2 bg-emerald-100 rounded transform -rotate-45" />
                <div className="absolute bottom-10 left-24 w-40 h-2 bg-emerald-100 rounded" />
              </div>

              <div className="z-10 bg-white/95 px-5 py-4 rounded-xl border border-gray-250 border-t-4 border-t-[#006c51] max-w-xs space-y-2 shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006c51] flex items-center justify-center mx-auto animate-bounce">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-xs">Kurir Sentosa (Ryan, Motor #4)</h4>
                <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                  "Menghubungi nomor penerima... Sedang mengemudi melewati perempatan Roxy menuju lokasi tebusan rumah Anda."
                </p>
              </div>
            </div>

            {/* Stepper details checklist */}
            <div className="p-6 space-y-6 max-h-64 overflow-y-auto font-sans text-xs">
              <div className="relative pl-6 border-l-2 border-emerald-500 space-y-1">
                <span className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
                <p className="font-bold text-gray-805">16.30 - Kurir Sedang Menuju Rumah</p>
                <p className="text-[10px] text-gray-400">Obat diserahterimakan dari petugas logistik apotek ke motor Ryan.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-gray-200 space-y-1">
                <span className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
                <p className="font-bold text-gray-805">16.15 - Pengemasan Selesai (Quality Pass)</p>
                <p className="text-[10px] text-gray-400">Pemberian segel kedap air higienis dan asuransi sediaan obat lengkap.</p>
              </div>

              <div className="relative pl-6 space-y-1">
                <span className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
                <p className="font-bold text-gray-805">16.02 - Resep Terdaftar &amp; Terverifikasi</p>
                <p className="text-[10px] text-gray-400">Verifikator sistem mendokumentasikan kecocokan muatan.</p>
              </div>
            </div>

            {/* Close visual modal */}
            <div className="p-4 bg-gray-55 text-center border-t border-gray-150">
              <button
                onClick={() => setActiveTrackingOrder(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Tutup Pelacakan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
