import React, { useState, useEffect } from 'react'
import laporanService from '../../services/laporanService'
import authService from '../../services/authService'
import pelangganService from '../../services/pelangganService'
import bookingService from '../../services/bookingService'
import pembayaranService from '../../services/pembayaranService'

export default function RingkasanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('ringkasan')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') {
      // Stay on current page
    } else if (page === 'manajemen-tiket') {
      navigate('admin-manajemen-tiket')
    } else if (page === 'manajemen-galeri') {
      navigate('admin-manajemen-galeri')
    } else if (page === 'kotak-masuk') {
      navigate('admin-kotak-masuk')
    } else if (page === 'jadwal-pendakian') {
      navigate('admin-jadwal-pendakian')
    } else if (page === 'manajemen-pengguna') {
      navigate('admin-manajemen-pengguna')
    } else if (page === 'laporan') {
      navigate('admin-laporan')
    } else if (page === 'pengaturan') {
      navigate('admin-pengaturan')
    }
  }

  const [laporanData, setLaporanData] = useState(null)
  const [loadingLaporan, setLoadingLaporan] = useState(true)
  const [errorLaporan, setErrorLaporan] = useState('')
  const [totalPelanggan, setTotalPelanggan] = useState(0)
  const [totalBooking, setTotalBooking] = useState(0)
  const [totalPembayaran, setTotalPembayaran] = useState(0)
  const [totalPendapatan, setTotalPendapatan] = useState(0)
  const [recentBookings, setRecentBookings] = useState([])
  const [allBookings, setAllBookings] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingLaporan(true)
      setErrorLaporan('')
      try {
        const [laporan, pelanggan, booking, pembayaran] = await Promise.all([
          laporanService.getAll().catch(() => null),
          pelangganService.getAll().catch(() => []),
          bookingService.getAll().catch(() => []),
          pembayaranService.getAll().catch(() => [])
        ])

        if (laporan) {
          setLaporanData(laporan?.data || laporan)
        }

        const pelangganList = Array.isArray(pelanggan) ? pelanggan : (pelanggan?.data ?? [])
        const bookingList = Array.isArray(booking) ? booking : (booking?.data ?? [])
        const pembayaranList = Array.isArray(pembayaran) ? pembayaran : (pembayaran?.data ?? [])

        const uNames = new Set(bookingList.map(b => b.pelanggan?.nama_lengkap || b.pelanggan?.nama || b.nama || b.name || b.pelanggan?.email || b.email).filter(Boolean))
        setTotalPelanggan(uNames.size > 0 ? uNames.size : bookingList.length)
        setTotalBooking(bookingList.reduce((sum, b) => sum + Number(b.jumlah_orang || b.qty || 1), 0))
        setTotalPembayaran(bookingList.filter(b => b.status_booking !== 'Batal' && b.status_booking !== 'Dibatalkan').length)
        
        const calcPendapatan = bookingList.reduce((sum, b) => {
          const st = (b.status_booking || '').toLowerCase()
          if (!st.includes('batal')) {
            return sum + Number(b.total_payar || b.total_bayar || 0)
          }
          return sum
        }, 0)
        setTotalPendapatan(calcPendapatan)

        // Sort bookings by id descending and take top 3
        const sorted = [...bookingList].sort((a, b) => {
          const idA = a.id_booking || a.id || 0
          const idB = b.id_booking || b.id || 0
          return idB - idA
        })
        setAllBookings(sorted)
        setRecentBookings(sorted.slice(0, 3))

      } catch (err) {
        setErrorLaporan(err.userMessage || 'Gagal memuat data dashboard.')
      } finally {
        setLoadingLaporan(false)
      }
    }
    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

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

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-[60] border-r border-outline-variant/10">
        {/* Logo Header */}
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-none">Galunggung</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mt-1">Otoritas Pariwisata</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${
                activeTab === item.id
                  ? 'bg-[#163422] text-[#f9f9f7] rounded-xl shadow-lg shadow-[#163422]/10'
                  : 'text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl'
              } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98`}
            >
              <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
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
      {/* Main Content Canvas */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10">
          <div className="flex items-center gap-8 w-1/3">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant outline-none"
                placeholder="Cari nama pendaki atau ID tiket..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer active:scale-95 duration-200">
              <div className="text-right hidden xl:block">
                <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
                <p className="text-[10px] text-secondary mt-1">{localStorage.getItem('admin_jabatan') || 'Administrator Super'}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                <img alt="Profil Administrator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP9kHefTuNYQnLdctRKENaSisXtamaIBxslPvK0m4yNQn31vIg34PQcZnSnY4PYnyrpptNh_2oNZuDiMXVDzcUseE6sHhuxfwgublcdO3lgYfPUAkD0eas6mMJBociC8Wp4s2J_v4jcVWlXw10p9-ovOlY6lp2CDjjivJDzQz8zOST_Qo9Z_qYjYSn3xA_wKyJBzMnMu8nnLzz_wQNXK-Pt6T4jr3oHYwHcfs_RWNrKMU8s2QqHJHFgm1IkA_HvzaJyZz6Dnur7g"/>
              </div>
            </div>
          </div>
        </header>
        {/* Content Area */}
        <div className="p-10 space-y-10">
          {/* Header Section */}
          <section className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-primary tracking-tight">Ringkasan Dasbor</h2>
              <p className="text-secondary body-lg mt-2 font-medium">Memantau kabut di atas Gunung Galunggung hari ini.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:opacity-95 transition-opacity flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </button>
            </div>
          </section>

          {/* KPI Cards Bento Grid */}
          {errorLaporan && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl mb-4">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{errorLaporan}</p>
            </div>
          )}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Pelanggan */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Total Pelanggan</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">
                  {loadingLaporan ? '...' : totalPelanggan}
                </h3>
              </div>
              <p className="text-xs text-outline mt-6">Total terdaftar</p>
            </div>

            {/* Total Booking */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Total Booking</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">
                  {loadingLaporan ? '...' : totalBooking}
                </h3>
              </div>
              <p className="text-xs text-outline mt-6">Semua pemesanan</p>
            </div>

            {/* Total Pembayaran */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Total Pembayaran</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">
                  {loadingLaporan ? '...' : totalPembayaran}
                </h3>
              </div>
              <p className="text-xs text-outline mt-6">Semua transaksi</p>
            </div>

            {/* Total Pendapatan */}
            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-container/30 rounded-full blur-3xl"></div>
              <p className="text-label-md uppercase tracking-widest text-primary-fixed/60 font-bold mb-4">Total Pendapatan</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-white leading-none">
                  {loadingLaporan ? '...' : (
                    `Rp ${Number(totalPendapatan || 0).toLocaleString('id-ID')}`
                  )}
                </h3>
              </div>
              <p className="text-xs text-primary-fixed/40 mt-6">Akumulasi pembayaran lunas</p>
            </div>
          </section>

          {/* Main Layout: Table and Featured Item */}
          <section className="flex flex-col xl:flex-row gap-10">
            {/* Recent Activity Table */}
            <div className="flex-[2] bg-surface-container-low p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-headline font-bold text-primary">Log Pengunjung Terbaru</h4>
                <button onClick={() => navigate('admin-manajemen-tiket')} className="text-primary text-sm font-semibold hover:underline">Lihat Semua Entri</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-label-md text-secondary uppercase tracking-widest">
                      <th className="pb-4 font-bold pl-4">Nama Pendaki</th>
                      <th className="pb-4 font-bold">ID Tiket</th>
                      <th className="pb-4 font-bold">Status Jalur</th>
                      <th className="pb-4 font-bold text-right pr-4">Waktu Masuk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery.trim()
                      ? allBookings.filter(b => {
                          const pelangganObj = b.pelanggan || {}
                          const nm = (pelangganObj.nama_lengkap || pelangganObj.nama || b.name || b.nama || b.nama_lengkap || '').toLowerCase()
                          const idTicket = 'BOOK-' + String(b.id_booking || b.id || '').padStart(4, '0')
                          const q = searchQuery.toLowerCase()
                          return nm.includes(q) || idTicket.toLowerCase().includes(q)
                        })
                      : recentBookings
                    ).map((booking, idx) => {
                      // Ambil nama dari relasi pelanggan
                      const pelanggan = booking.pelanggan || {}
                      const name = pelanggan.nama_lengkap || pelanggan.nama || booking.name || booking.nama || booking.nama_lengkap || 'Pengunjung'
                      const idVal = booking.id_booking || booking.id || '-'
                      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                      
                      const statusRaw = booking.status_booking || booking.status || 'Menunggu Pembayaran'
                      let badgeBg = 'bg-error-container text-on-error-container'
                      let statusText = 'Terdaftar'

                      if (statusRaw === 'Selesai' || statusRaw === 'Lunas') {
                        badgeBg = 'bg-secondary-container text-secondary'
                        statusText = 'Selesai'
                      } else if (statusRaw === 'Dikonfirmasi' || statusRaw === 'Diproses') {
                        badgeBg = 'bg-primary/10 text-primary'
                        statusText = 'Di Jalur'
                      } else if (statusRaw === 'Menunggu Pembayaran') {
                        badgeBg = 'bg-amber-100 text-amber-800'
                        statusText = 'Menunggu'
                      }

                      const dateRaw = booking.created_at || booking.tanggal || ''
                      let timeString = '08:00 AM'
                      if (dateRaw) {
                        try {
                          const d = new Date(dateRaw)
                          if (!isNaN(d.getTime())) {
                            timeString = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
                          }
                        } catch (e) {}
                      }

                      return (
                        <tr key={idVal || idx} className="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                          <td className="py-4 pl-4 rounded-l-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary text-xs">{initials}</div>
                              <span className="font-semibold text-primary">{name}</span>
                            </div>
                          </td>
                          <td className="py-4 font-medium text-secondary">BOOK-{String(idVal).padStart(4, '0')}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-tight ${badgeBg}`}>{statusText}</span>
                          </td>
                          <td className="py-4 text-right pr-4 text-outline text-sm tabular-nums">{timeString}</td>
                        </tr>
                      )
                    })}

                    {recentBookings.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-secondary text-sm">
                          Belum ada data pengunjung terbaru.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        </div>

        {/* Background Decorative Element (Asymmetric Bleed) */}
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      </main>
    </div>
  )
}