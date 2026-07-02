import React, { useState, useEffect } from 'react'
import laporanService from '../../services/laporanService'
import bookingService from '../../services/bookingService'
import authService from '../../services/authService'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function LaporanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('laporan')
  const [showExportPopup, setShowExportPopup] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState('pdf-bulan')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') navigate('admin-jadwal-pendakian')
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'manajemen-galeri') navigate('admin-manajemen-galeri')
    else if (page === 'laporan') {
      // Stay here
    } else if (page === 'pengaturan-tampilan') navigate('admin-pengaturan-tampilan')
    else if (page === 'pengaturan') navigate('admin-pengaturan')
  }

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

  // Selalu gunakan bulan berjalan
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-indexed
  const bulanNama = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  const [laporanData, setLaporanData] = useState(null)
  const [loadingLaporan, setLoadingLaporan] = useState(true)
  const [errorLaporan, setErrorLaporan] = useState('')
  const [bookingList, setBookingList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoadingLaporan(true)
      setErrorLaporan('')
      try {
        const [laporan, bookings] = await Promise.all([
          laporanService.getByMonth(currentYear, currentMonth).catch(() => null),
          bookingService.getAll().catch(() => []),
        ])
        if (laporan) setLaporanData(laporan?.data || laporan)
        const list = Array.isArray(bookings) ? bookings : (bookings?.data ?? [])
        setBookingList(list)
      } catch (err) {
        setErrorLaporan(err.userMessage || 'Gagal memuat data laporan.')
      } finally {
        setLoadingLaporan(false)
      }
    }
    fetchData()
  }, [])

  const navItems = [
    { id: 'ringkasan', label: 'Ringkasan', icon: 'dashboard' },
    { id: 'manajemen-tiket', label: 'Manajemen Tiket', icon: 'confirmation_number' },
    { id: 'jadwal-pendakian', label: 'Jadwal Pendakian', icon: 'landscape' },
    { id: 'manajemen-pengguna', label: 'Manajemen Pengguna', icon: 'group' },
    { id: 'manajemen-galeri', label: 'Manajemen Galeri', icon: 'photo_library' },
    { id: 'kotak-masuk', label: 'Kotak Masuk', icon: 'inbox' },
    { id: 'laporan', label: 'Laporan', icon: 'analytics' },
    { id: 'pengaturan-tampilan', label: 'Atur Tampilan', icon: 'web' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  // Filter booking untuk bulan berjalan
  const filteredBookings = bookingList.filter(b => {
    const dateStr = b.created_at || b.tanggal || ''
    if (!dateStr) return false
    const d = new Date(dateStr)
    return !isNaN(d.getTime()) &&
      d.getFullYear() === currentYear &&
      d.getMonth() + 1 === currentMonth
  })

  // Total pendapatan bulan ini (dari API laporan backend — sama dengan ringkasan)
  const totalPendapatanBulan = laporanData?.total_pendapatan ?? 0
  const totalBookingBulan = laporanData?.total_booking ?? 0
  const totalPembayaranBulan = laporanData?.total_pembayaran ?? 0
  const totalPelangganBulan = laporanData?.total_pelanggan ?? 0

  // Build daily chart dari booking bulan terpilih
  const buildDailyData = () => {
    const dayLabels = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
    const counts = [0, 0, 0, 0, 0, 0, 0]

    filteredBookings.forEach(b => {
      const dateStr = b.created_at || b.tanggal || ''
      if (dateStr) {
        const d = new Date(dateStr)
        if (!isNaN(d.getTime())) {
          counts[d.getDay()]++
        }
      }
    })

    const maxCount = Math.max(...counts, 1)

    return dayLabels.map((label, idx) => {
      const count = counts[idx]
      const pct = Math.max(Math.round((count / maxCount) * 100), 4)

      let bgClass = 'bg-[#eeeeec]'
      if (pct >= 75) bgClass = 'bg-[#163422]'
      else if (pct >= 45) bgClass = 'bg-[#c0c8c2]'

      return { label, pct, bgClass, count }
    })
  }

  const dailyData = buildDailyData()

  // Booking terkonfirmasi/lunas untuk tabel laporan
  const bookingTerkonfirmasi = filteredBookings.filter(b => {
    const s = (b.status_booking || b.status || '').toLowerCase()
    return s === 'dikonfirmasi' || s === 'lunas' || s === 'selesai' || s === 'diproses'
  })

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>

      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-40 border-r border-outline-variant/10">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-none">Galunggung</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mt-1">Otoritas Pariwisata</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`${
                  isActive
                    ? 'bg-[#163422] text-[#f9f9f7] rounded-xl shadow-lg shadow-[#163422]/10'
                    : 'text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl'
                } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all w-full`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer logout */}
        <div className="mt-auto space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-[#ba1a1a] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-end items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10 gap-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
              <p className="text-[10px] text-secondary mt-1">{localStorage.getItem('admin_jabatan') || 'Super Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
              <img
                alt="Profil Administrator"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"
              />
            </div>
          </div>
        </header>

        {/* Content canvas */}
        <div className="flex-1 bg-[#f4f4f2] p-10 overflow-y-auto space-y-8">

          {/* Error banner */}
          {errorLaporan && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl mb-4 max-w-7xl">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{errorLaporan}</p>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-start gap-6 max-w-7xl">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-[#163422] tracking-tight">Laporan Analitik</h2>
              <p className="text-secondary text-sm font-medium mt-2 max-w-2xl leading-relaxed">
                Ringkasan performa pariwisata Gunung Galunggung berdasarkan data transaksi per bulan.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {/* Badge bulan berjalan (tidak bisa diubah) */}
              <div className="flex items-center gap-2 bg-white border border-[#e2e3e1] text-[#163422] rounded-xl text-sm font-semibold py-2.5 px-4 shadow-sm">
                <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                {bulanNama}
              </div>
              <button
                onClick={() => setShowExportPopup(true)}
                className="px-6 py-2.5 bg-primary text-white hover:opacity-90 rounded-full font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-primary/10 active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Export Laporan
              </button>
            </div>
          </div>

          {/* Bento Grid Metrics */}
          <div className="grid grid-cols-12 gap-6 max-w-7xl">
            {/* Card 1: Total Pendapatan Bulan Ini */}
            <div className="col-span-12 lg:col-span-8 bg-primary rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              <div>
                <span className="text-[#c8ebd0] bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  TOTAL PENDAPATAN — {bulanNama.toUpperCase()}
                </span>
                <h3 className="text-5xl font-extrabold text-white mt-6">
                  {loadingLaporan ? 'Memuat...' : `Rp ${Number(totalPendapatanBulan).toLocaleString('id-ID')}`}
                </h3>
              </div>
              {/* Stats subdivisions */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-8">
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Booking</p>
                  <p className="text-xl font-bold text-white">{loadingLaporan ? '...' : totalBookingBulan}</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Pembayaran</p>
                  <p className="text-xl font-bold text-white">{loadingLaporan ? '...' : totalPembayaranBulan}</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Pelanggan</p>
                  <p className="text-xl font-bold text-white">{loadingLaporan ? '...' : totalPelangganBulan}</p>
                </div>
              </div>
            </div>

            {/* Card 2: Total Transaksi Dikonfirmasi */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="p-3.5 bg-secondary-container rounded-2xl">
                    <span className="material-symbols-outlined text-[#695d47]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                  </div>
                </div>
                <h4 className="text-4xl font-extrabold text-[#163422] mt-6 tracking-tight">
                  {loadingLaporan ? '...' : bookingTerkonfirmasi.length}
                </h4>
                <p className="text-secondary font-medium text-xs mt-1">Transaksi Dikonfirmasi</p>
                <p className="text-outline text-[10px] mt-1">Bulan {bulanNama}</p>
              </div>
              <div className="mt-8">
                <div className="w-full bg-[#eeeeec] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#163422] h-full rounded-full transition-all duration-500"
                    style={{
                      width: filteredBookings.length > 0
                        ? `${Math.round((bookingTerkonfirmasi.length / filteredBookings.length) * 100)}%`
                        : '0%'
                    }}
                  ></div>
                </div>
                <p className="text-[10px] text-outline mt-2">
                  {filteredBookings.length > 0
                    ? `${Math.round((bookingTerkonfirmasi.length / filteredBookings.length) * 100)}% dari ${filteredBookings.length} booking`
                    : 'Belum ada data'}
                </p>
              </div>
            </div>

            {/* Card 3: Daily Visit Chart */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-lg font-bold text-[#163422]">Grafik Kunjungan Harian</h4>
                  <p className="text-xs text-secondary mt-1">Berdasarkan hari dalam minggu — {bulanNama}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {dailyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div
                      className={`w-full ${data.bgClass} rounded-t-lg transition-all duration-300 relative group-hover:brightness-95`}
                      style={{ height: `${data.pct || 4}%` }}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#163422] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {data.count != null ? `${data.count} booking` : data.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-secondary tracking-widest uppercase">
                {dailyData.map((data, index) => (
                  <span key={index} className="flex-1 text-center">{data.label}</span>
                ))}
              </div>
            </div>

            {/* Card 4: Tabel Laporan Booking Bulan Ini */}
            <div className="col-span-12 bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-lg font-bold text-[#163422]">Detail Transaksi</h4>
                  <p className="text-xs text-secondary mt-1">Semua booking pada {bulanNama}</p>
                </div>
                <span className="text-xs text-secondary font-semibold">
                  {filteredBookings.length} booking ditemukan
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#eeeeec]">
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">ID Tiket</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Nama Pelanggan</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Jenis Tiket</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Qty</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Total</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Status</th>
                      <th className="pb-3 text-[10px] font-bold tracking-widest uppercase text-secondary">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f2]">
                    {filteredBookings.length === 0 && !loadingLaporan && (
                      <tr>
                        <td colSpan="7" className="py-10 text-center text-secondary text-sm">
                          <span className="material-symbols-outlined block mx-auto mb-2 text-3xl text-outline/40">analytics</span>
                          Belum ada data transaksi pada {bulanNama}.
                        </td>
                      </tr>
                    )}
                    {loadingLaporan && (
                      <tr>
                        <td colSpan="7" className="py-10 text-center text-secondary text-sm">Memuat data...</td>
                      </tr>
                    )}
                    {!loadingLaporan && filteredBookings.map((b, idx) => {
                      const pelanggan = b.pelanggan || {}
                      const name = pelanggan.nama_lengkap || pelanggan.nama || b.nama || '-'
                      const idTiket = b.id_tiket || ('BOOK-' + String(b.id_booking || b.id).padStart(4, '0'))
                      const total = Number(b.total_harga || b.total_payar || 0)
                      const status = b.status_booking || b.status || '-'
                      const dateStr = (b.created_at || b.tanggal || '').substring(0, 10)
                      const s = status.toLowerCase()
                      let badgeCls = 'bg-amber-100 text-amber-800'
                      if (s === 'dikonfirmasi' || s === 'lunas' || s === 'selesai' || s === 'diproses') badgeCls = 'bg-emerald-100 text-emerald-800'
                      else if (s === 'batal' || s === 'dibatalkan') badgeCls = 'bg-red-100 text-red-800'

                      return (
                        <tr key={b.id_booking || b.id || idx} className="hover:bg-[#f9f9f7] transition-colors">
                          <td className="py-3 font-semibold text-primary">{idTiket}</td>
                          <td className="py-3 text-[#163422]">{name}</td>
                          <td className="py-3 text-secondary">{b.jenis_tiket || '-'}</td>
                          <td className="py-3 text-secondary">{b.jumlah_tiket || b.jml_tiket || 1}</td>
                          <td className="py-3 font-bold text-[#163422]">Rp {total.toLocaleString('id-ID')}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${badgeCls}`}>{status}</span>
                          </td>
                          <td className="py-3 text-outline tabular-nums">{dateStr || '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  {filteredBookings.length > 0 && !loadingLaporan && (
                    <tfoot>
                      <tr className="border-t-2 border-[#163422]/10">
                        <td colSpan="4" className="py-3 font-bold text-[#163422] text-sm">Total Pendapatan (Dikonfirmasi)</td>
                        <td className="py-3 font-extrabold text-primary text-sm">
                          Rp {Number(totalPendapatanBulan).toLocaleString('id-ID')}
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Export Popup Modal */}
      {showExportPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(22,52,34,0.15)] overflow-hidden w-full max-w-sm p-8 text-left relative mx-4 animate-fade-in-up border border-[#e2e3e1]">
            {/* Headline */}
            <h3 className="font-display font-extrabold text-[#163422] text-xl tracking-tight mb-2">
              Ekspor Laporan Keuangan
            </h3>
            <p className="text-[#695d47] font-['Inter'] text-xs leading-relaxed mb-2 font-medium">
              Laporan yang akan diunduh: <strong>{bulanNama}</strong>
            </p>

            {/* Option Cards */}
            <div className="space-y-3 mb-8 mt-4">
              {/* PDF Option — bulan terpilih */}
              <div
                onClick={() => setSelectedFormat('pdf-bulan')}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all duration-200 ${
                  selectedFormat === 'pdf-bulan'
                    ? 'border-[#163422] bg-[#f4f4f2]'
                    : 'border-transparent bg-[#f9f9f7] hover:bg-[#f4f4f2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#eeeeec] flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0", color: '#ba1a1a' }}>picture_as_pdf</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-[#1a1c1b] text-xs">PDF Laporan Bulan — {selectedBulan.label}</h4>
                  <p className="text-[10px] text-secondary font-medium mt-0.5 leading-tight">
                    Berisi semua transaksi & total pendapatan bulan ini.
                  </p>
                </div>
              </div>

              {/* PDF Semua Data */}
              <div
                onClick={() => setSelectedFormat('pdf-semua')}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all duration-200 ${
                  selectedFormat === 'pdf-semua'
                    ? 'border-[#163422] bg-[#f4f4f2]'
                    : 'border-transparent bg-[#f9f9f7] hover:bg-[#f4f4f2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#eeeeec] flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0", color: '#163422' }}>table_chart</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-[#1a1c1b] text-xs">PDF Semua Transaksi Bulan Ini</h4>
                  <p className="text-[10px] text-secondary font-medium mt-0.5 leading-tight">
                    Termasuk semua status booking (menunggu, dikonfirmasi, batal).
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full mb-6">
              <button
                className="flex-1 py-3 bg-[#eeeeec] hover:bg-[#e2e3e1] text-[#1a1c1b] font-headline font-bold rounded-full transition-all duration-300 active:scale-95 text-xs shadow-sm"
                onClick={() => setShowExportPopup(false)}
              >
                Batal
              </button>
              <button
                className="flex-1 py-3 bg-[#163422] text-[#f9f9f7] font-headline font-bold rounded-full transition-all duration-300 active:scale-95 shadow-md hover:opacity-90 text-xs flex items-center justify-center gap-1.5"
                onClick={() => {
                  // Tentukan list yang akan di-export
                  const exportList = selectedFormat === 'pdf-semua'
                    ? filteredBookings
                    : bookingTerkonfirmasi

                  const doc = new jsPDF()
                  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
                  doc.setFont('helvetica')

                  // Title
                  doc.setFontSize(16)
                  doc.setFont('helvetica', 'bold')
                  doc.setTextColor(22, 52, 34)
                  doc.text('LAPORAN KEUANGAN GUNUNG GALUNGGUNG', pageWidth / 2, 20, { align: 'center' })

                  // Subtitle
                  doc.setFontSize(10)
                  doc.setFont('helvetica', 'normal')
                  doc.setTextColor(105, 93, 71)
                  doc.text(`Periode: ${selectedBulan.label}`, pageWidth / 2, 28, { align: 'center' })
                  if (selectedFormat === 'pdf-bulan') {
                    doc.text('(Hanya transaksi dikonfirmasi/lunas)', pageWidth / 2, 34, { align: 'center' })
                  }

                  const tableData = exportList.map((b, index) => {
                    const pelanggan = b.pelanggan || {}
                    return [
                      index + 1,
                      `BOOK-${String(b.id_booking || b.id).padStart(4, '0')}`,
                      pelanggan.nama_lengkap || pelanggan.nama || b.nama || '-',
                      (b.created_at || b.tanggal || '').substring(0, 10),
                      b.jenis_tiket || '-',
                      `${b.jumlah_tiket || b.jml_tiket || 1}`,
                      `Rp ${Number(b.total_harga || b.total_payar || 0).toLocaleString('id-ID')}`,
                      b.status_booking || b.status || '-',
                    ]
                  })

                  autoTable(doc, {
                    startY: selectedFormat === 'pdf-bulan' ? 42 : 36,
                    head: [['No', 'ID Booking', 'Nama Pelanggan', 'Tanggal', 'Jenis Tiket', 'Qty', 'Total', 'Status']],
                    body: tableData,
                    theme: 'grid',
                    headStyles: { fillColor: [22, 52, 34] },
                    styles: { fontSize: 8 }
                  })

                  // Total
                  const totalPend = selectedFormat === 'pdf-bulan'
                    ? totalPendapatanBulan
                    : filteredBookings.reduce((sum, b) => sum + Number(b.total_harga || b.total_payar || 0), 0)

                  const finalY = doc.lastAutoTable.finalY || 40
                  doc.setFontSize(11)
                  doc.setFont('helvetica', 'bold')
                  doc.setTextColor(22, 52, 34)
                  doc.text(`Total Pendapatan: Rp ${totalPend.toLocaleString('id-ID')}`, 14, finalY + 12)

                  // Signature Block
                  const endDateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                  const signatureY = finalY + 30
                  doc.setFontSize(10)
                  doc.setFont('helvetica', 'normal')
                  doc.setTextColor(0, 0, 0)
                  doc.text(`Tasikmalaya, ${endDateStr}`, pageWidth - 14, signatureY, { align: 'right' })
                  doc.text('Mengetahui,', pageWidth - 14, signatureY + 6, { align: 'right' })
                  const adminName = localStorage.getItem('admin_nama') || 'Administrator'
                  const adminJabatan = localStorage.getItem('admin_jabatan') || 'Super Administrator'
                  doc.setFont('helvetica', 'bold')
                  doc.text(adminName, pageWidth - 14, signatureY + 30, { align: 'right' })
                  doc.setFont('helvetica', 'normal')
                  doc.text(adminJabatan, pageWidth - 14, signatureY + 35, { align: 'right' })

                  doc.save(`Laporan_Keuangan_${selectedBulan.label.replace(' ', '_')}.pdf`)
                  setShowExportPopup(false)
                }}
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Unduh Sekarang
              </button>
            </div>

            {/* Footer Metadata */}
            <div className="text-[9px] font-label font-bold tracking-widest text-secondary/40 text-center uppercase border-t border-[#eeeeec] pt-4">
              WAKTU PEMBUATAN: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
