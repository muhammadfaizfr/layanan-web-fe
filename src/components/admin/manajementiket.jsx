import React, { useState, useEffect } from 'react'
import bookingService from '../../services/bookingService'
import pembayaranService from '../../services/pembayaranService'
import authService from '../../services/authService'

export default function ManajemenTiketAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('manajemen-tiket')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') {
      navigate('admin-ringkasan')
    } else if (page === 'manajemen-tiket') {
      // Stay here
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

  const [ticketList, setTicketList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pembayaranList, setPembayaranList] = useState([])

  const fetchBooking = async () => {
    setLoading(true)
    setError('')
    try {
      const [bookingData, pembayaranData] = await Promise.all([
        bookingService.getAll(),
        pembayaranService.getAll(),
      ])
      const bookingList = Array.isArray(bookingData) ? bookingData : (bookingData?.data ?? [])
      const payList = Array.isArray(pembayaranData) ? pembayaranData : (pembayaranData?.data ?? [])
      setTicketList(bookingList)
      setPembayaranList(payList)
    } catch (err) {
      setError(err.userMessage || 'Gagal memuat data booking.')
    } finally {
      setLoading(false)
    }
  }

  // Hitung pendapatan & tiket dari data real
  const today = new Date().toISOString().split('T')[0]
  const todayPayments = pembayaranList.filter(p => {
    const tgl = p.tanggal_bayar || p.created_at || ''
    return tgl.startsWith(today)
  })
  const pendapatanHarian = todayPayments.reduce((sum, p) => sum + Number(p.total_payar || p.jumlah_bayar || p.total_bayar || 0), 0)
  const tiketCheckin = ticketList.filter(t => t.status_booking === 'Dikonfirmasi' || t.status_booking === 'Lunas' || t.status === 'Lunas').length

  useEffect(() => {
    fetchBooking()
  }, [])

  const handleApprove = async (id) => {
    try {
      await bookingService.update(id, { status: 'Lunas' })
      setTicketList(prev => prev.map(t => t.id === id ? { ...t, status: 'Lunas', statusColor: 'blue' } : t))
    } catch (err) {
      setError(err.userMessage || 'Gagal menyetujui booking.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus tiket ini?')) return
    try {
      await bookingService.delete(id)
      setTicketList(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err.userMessage || 'Gagal menghapus tiket.')
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* SideNavBar Shell */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-40 border-r border-outline-variant/10">
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
                } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98`}
              >
                <span className="material-symbols-outlined" data-icon={item.icon} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
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
      {/* Main Content Area */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10">
          <div className="flex items-center gap-8 w-1/3">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant outline-none" placeholder="Cari ID tiket atau pengunjung..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
              <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
                <span className="material-symbols-outlined text-primary">notifications</span>
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-primary">settings</span>
              </button>
            </div>
            <div className="flex items-center gap-3 cursor-pointer active:scale-95 duration-200">
              <div className="text-right hidden xl:block">
                <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
                <p className="text-[10px] text-secondary mt-1">Administrator Super</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                <img alt="Profil Administrator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"/>
              </div>
            </div>
          </div>
        </header>
        {/* Content Area */}
        <div className="p-10 space-y-10">
          {/* Header Section */}
          <section className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-primary tracking-tight">Manajemen Tiket</h2>
              <p className="text-secondary body-lg mt-2 font-medium">Pantau akses ke kawah dan jalur pendakian Gunung Galunggung. Pantau pembaruan status waktu nyata dan dokumentasi pengunjung.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('admin-scan-tiket')}
                className="px-6 py-2.5 rounded-full bg-[#f1e1c4] text-[#163422] font-bold text-sm hover:bg-[#e6d3af] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
                Pindai Tiket
              </button>
              <button 
                onClick={() => navigate('admin-atur-tiket')}
                className="px-6 py-2.5 rounded-full bg-[#163422] text-[#f9f9f7] font-bold text-sm hover:opacity-95 transition-opacity flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
                Atur Tiket
              </button>
            </div>
          </section>

          {/* Rentang Tanggal Card */}
          <div className="w-fit bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <label className="block text-[9px] font-bold tracking-widest uppercase text-[#695d47] mb-0.5">Rentang Tanggal</label>
              <div className="text-sm font-bold text-[#1a1c1b]">24 mei 2026 - 31 mei 2026</div>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl mb-4">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{error}</p>
            </div>
          )}

          {/* Enhanced Data Table */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">ID Tiket</th>
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Nama Pengunjung</th>
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Jenis Tiket</th>
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Tanggal</th>
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Status</th>
                  <th className="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {/* Loading state */}
                {loading && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary text-sm">
                      <span className="material-symbols-outlined animate-spin block mx-auto mb-2">progress_activity</span>
                      Memuat data tiket...
                    </td>
                  </tr>
                )}

                {!loading && ticketList.map((ticket) => {
                  const name = ticket.name || ticket.nama || ticket.pelanggan?.nama || '-'
                  const type = ticket.type || ticket.jenis_tiket || ticket.jenis || 'Tiket Standar'
                  const date = ticket.date || ticket.tanggal || ticket.tanggal_kunjungan || ticket.created_at?.split('T')[0] || '-'
                  const status = ticket.status || 'Menunggu'
                  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                  const isLunas = status === 'Lunas' || status === 'lunas'
                  const statusColor = isLunas ? 'blue' : 'amber'

                  return (
                    <tr key={ticket.id} className="hover:bg-surface-container-low/30 transition-colors group">
                      <td className="px-6 py-4 font-label text-sm text-primary font-semibold">BOOK-{String(ticket.id_booking || ticket.id).padStart(4, '0')}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">{initials}</div>
                          <span className="text-sm font-medium text-on-surface">{name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">{type}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColor === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            statusColor === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                          }`}></span>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {!isLunas && (
                            <button
                              onClick={() => handleApprove(ticket.id)}
                              className="material-symbols-outlined text-emerald-600 hover:text-emerald-800 transition-colors"
                              title="Setujui Pembayaran"
                            >
                              check_circle
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(ticket.id)}
                            className="material-symbols-outlined text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all"
                            title="Hapus Tiket"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {!loading && ticketList.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary text-sm">
                      Tidak ada data tiket
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-5 bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant/10">
              <span className="text-sm text-on-surface-variant font-body">Menampilkan 1 sampai 5 dari 128 hasil</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-medium text-sm">1</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-sm">2</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-sm">3</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Stats Overlap Layout */}
          <div className="mt-12 flex gap-8">
            <div className="flex-1 bg-primary p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                <h3 className="text-on-primary/60 font-label font-bold tracking-widest uppercase text-xs mb-4">Pendapatan Hari Ini</h3>
                <p className="text-on-primary text-3xl font-display font-extrabold mb-2">
                  {loading ? '...' : `Rp ${pendapatanHarian.toLocaleString('id-ID')}`}
                </p>
                <div className="flex items-center gap-2 text-on-primary/80 text-sm">
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  <span>{todayPayments.length} transaksi hari ini</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-secondary p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                <h3 className="text-on-secondary/60 font-label font-bold tracking-widest uppercase text-xs mb-4">Tiket Dikonfirmasi</h3>
                <p className="text-on-secondary text-3xl font-display font-extrabold mb-2">
                  {loading ? '...' : tiketCheckin}
                </p>
                <div className="flex items-center gap-2 text-on-secondary/80 text-sm">
                  <span className="material-symbols-outlined text-sm">group</span>
                  <span>Dari total {ticketList.length} booking</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-high p-8 rounded-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-on-surface-variant font-label font-bold tracking-widest uppercase text-xs mb-4">Permintaan Menunggu</h3>
                <p className="text-primary text-3xl font-display font-extrabold mb-2">
                  {loading ? '...' : ticketList.filter(t => t.status_booking === 'Menunggu' || t.status === 'Menunggu').length}
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-sm">assignment</span>
                  <span>Membutuhkan perhatian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}