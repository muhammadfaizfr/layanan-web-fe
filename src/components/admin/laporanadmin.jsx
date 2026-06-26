import React, { useState, useEffect } from 'react'
import laporanService from '../../services/laporanService'
import bookingService from '../../services/bookingService'
import authService from '../../services/authService'

export default function LaporanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('laporan')
  const [showExportPopup, setShowExportPopup] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState('csv')

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
    } else if (page === 'pengaturan') navigate('admin-pengaturan')
  }

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

  const [laporanData, setLaporanData] = useState(null)
  const [loadingLaporan, setLoadingLaporan] = useState(true)
  const [errorLaporan, setErrorLaporan] = useState('')
  const [bookingList, setBookingList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [laporan, bookings] = await Promise.all([
          laporanService.getAll().catch(() => null),
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
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  // Build daily chart dynamically from booking data
  const buildDailyData = () => {
    // If API provides grafik_harian, use it directly
    if (laporanData?.grafik_harian) return laporanData.grafik_harian

    const dayLabels = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
    const counts = [0, 0, 0, 0, 0, 0, 0] // Sun=0..Sat=6

    bookingList.forEach(b => {
      const dateStr = b.tanggal || b.created_at || ''
      if (dateStr) {
        const d = new Date(dateStr)
        if (!isNaN(d.getTime())) {
          counts[d.getDay()]++
        }
      }
    })

    const maxCount = Math.max(...counts, 1) // avoid division by zero

    return dayLabels.map((label, idx) => {
      // Reorder: SEN(1) SEL(2) RAB(3) KAM(4) JUM(5) SAB(6) MIN(0)
      const dayIdx = idx === 6 ? 0 : idx + 1
      const count = counts[dayIdx]
      const pct = Math.max(Math.round((count / maxCount) * 100), 4) // min 4% so bar is visible

      let bgClass = 'bg-[#eeeeec]'
      if (pct >= 75) bgClass = 'bg-[#163422]'
      else if (pct >= 45) bgClass = 'bg-[#c0c8c2]'

      return { label, pct, bgClass, count }
    })
  }

  const dailyData = buildDailyData()

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
            logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-end items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10 gap-6">
          <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
              <span className="material-symbols-outlined text-secondary">notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-secondary">settings</span>
            </button>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
              <p className="text-[10px] text-secondary mt-1">Administrator Super</p>
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

        {/* Content canvas container */}
        <div className="flex-1 bg-[#f4f4f2] p-10 overflow-y-auto space-y-8">
          {/* Header Section */}
          {errorLaporan && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl mb-4 max-w-7xl">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{errorLaporan}</p>
            </div>
          )}
          <div className="flex justify-between items-start gap-6 max-w-7xl">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-[#163422] tracking-tight">Laporan Analitik</h2>
              <p className="text-secondary text-sm font-medium mt-2 max-w-2xl leading-relaxed">
                Ringkasan performa pariwisata Gunung Galunggung untuk periode Oktober 2023.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-surface-container-high text-[#695d47] hover:bg-surface-container-highest transition-colors rounded-full font-bold text-xs tracking-wide">
                Filter Periode
              </button>
              <button 
                onClick={() => setShowExportPopup(true)}
                className="px-6 py-2.5 bg-primary text-white hover:opacity-90 rounded-full font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-primary/10 active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Export Semua
              </button>
            </div>
          </div>

          {/* Bento Grid Metrics */}
          <div className="grid grid-cols-12 gap-6 max-w-7xl">
            {/* Card 1: Total Pendapatan */}
            <div className="col-span-12 lg:col-span-8 bg-primary rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[#c8ebd0] bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  TOTAL PENDAPATAN
                </span>
                <h3 className="text-5xl font-extrabold text-white mt-6">
                  {loadingLaporan ? 'Memuat...' : (
                    laporanData?.total_pendapatan
                      ? `Rp ${Number(laporanData.total_pendapatan).toLocaleString('id-ID')}`
                      : 'Rp 0'
                  )}
                </h3>
              </div>
              {/* Stats subdivisions */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-8">
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Booking</p>
                  <p className="text-xl font-bold text-white">
                    {loadingLaporan ? '...' : (laporanData?.total_booking ?? '-')}
                  </p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Pembayaran</p>
                  <p className="text-xl font-bold text-white">
                    {loadingLaporan ? '...' : (laporanData?.total_pembayaran ?? '-')}
                  </p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Total Pelanggan</p>
                  <p className="text-xl font-bold text-white">
                    {loadingLaporan ? '...' : (laporanData?.total_pelanggan ?? '-')}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Total Pelanggan */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="p-3.5 bg-secondary-container rounded-2xl">
                    <span className="material-symbols-outlined text-[#695d47]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                  </div>
                </div>
                <h4 className="text-4xl font-extrabold text-[#163422] mt-6 tracking-tight">
                  {loadingLaporan ? '...' : (laporanData?.total_pelanggan ?? '-')}
                </h4>
                <p className="text-secondary font-medium text-xs mt-1">Total Pelanggan Terdaftar</p>
              </div>
              <div className="mt-8">
                <div className="w-full bg-[#eeeeec] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#163422] h-full w-full rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Card 3: Daily Visit Chart (aligned under the first card) */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-lg font-bold text-[#163422]">Grafik Kunjungan Harian</h4>
                <div className="relative">
                  <select className="bg-[#f4f4f2] text-[#695d47] border-none rounded-xl text-xs font-bold focus:ring-0 py-2 pl-4 pr-10 appearance-none cursor-pointer">
                    <option>7 Hari Terakhir</option>
                    <option>30 Hari Terakhir</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" style={{ fontSize: '16px' }}>
                    keyboard_arrow_down
                  </span>
                </div>
              </div>

              {/* Chart container */}
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {dailyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div
                      className={`w-full ${data.bgClass} rounded-t-lg transition-all duration-300 relative group-hover:brightness-95`}
                      style={{ height: `${data.pct || 4}%` }}
                    >
                      {/* Hover Tooltip/Value */}
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
          </div>
        </div>
      </main>

      {/* Export Popup Modal */}
      {showExportPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(22,52,34,0.15)] overflow-hidden w-full max-w-sm p-8 text-left relative mx-4 animate-fade-in-up border border-[#e2e3e1]">
            {/* Headline */}
            <h3 className="font-display font-extrabold text-[#163422] text-xl tracking-tight mb-2">
              Ekspor Semua Data
            </h3>
            {/* Description */}
            <p className="text-[#695d47] font-['Inter'] text-xs leading-relaxed mb-6 font-medium">
              Pilih format file untuk mengunduh seluruh data laporan periode Oktober 2023.
            </p>

            {/* Option Cards */}
            <div className="space-y-3 mb-8">
              {/* CSV Option */}
              <div 
                onClick={() => setSelectedFormat('csv')}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all duration-200 ${
                  selectedFormat === 'csv'
                    ? 'border-[#163422] bg-[#f4f4f2]'
                    : 'border-transparent bg-[#f9f9f7] hover:bg-[#f4f4f2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#eeeeec] flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>table_chart</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-[#1a1c1b] text-xs">Format CSV (.csv)</h4>
                  <p className="text-[10px] text-secondary font-medium mt-0.5 leading-tight">
                    Cocok untuk pengolahan data di Excel atau Sheets.
                  </p>
                </div>
              </div>

              {/* PDF Option */}
              <div 
                onClick={() => setSelectedFormat('pdf')}
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer border-2 transition-all duration-200 ${
                  selectedFormat === 'pdf'
                    ? 'border-[#163422] bg-[#f4f4f2]'
                    : 'border-transparent bg-[#f9f9f7] hover:bg-[#f4f4f2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#eeeeec] flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0", color: '#ba1a1a' }}>picture_as_pdf</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-[#1a1c1b] text-xs">Format PDF (.pdf)</h4>
                  <p className="text-[10px] text-secondary font-medium mt-0.5 leading-tight">
                    Format dokumen siap cetak dan presentasi.
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
                  alert(`Downloading as ${selectedFormat.toUpperCase()}...`)
                  setShowExportPopup(false)
                }}
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Unduh Sekarang
              </button>
            </div>

            {/* Footer Metadata */}
            <div className="text-[9px] font-label font-bold tracking-widest text-secondary/40 text-center uppercase border-t border-[#eeeeec] pt-4">
              WAKTU PEMBUATAN: 12 OKT 2023, 14:20 WIB
            </div>
          </div>
        </div>
      )}
    </div>
  )
}