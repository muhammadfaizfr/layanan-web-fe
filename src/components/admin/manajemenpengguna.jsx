import React, { useState, useEffect } from 'react'
import bookingService from '../../services/bookingService'
import authService from '../../services/authService'

export default function ManajemenPenggunaAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('manajemen-pengguna')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') {
      navigate('admin-ringkasan')
    } else if (page === 'manajemen-tiket') {
      navigate('admin-manajemen-tiket')
    } else if (page === 'manajemen-galeri') {
      navigate('admin-manajemen-galeri')
    } else if (page === 'kotak-masuk') {
      navigate('admin-kotak-masuk')
    } else if (page === 'jadwal-pendakian') {
      navigate('admin-jadwal-pendakian')
    } else if (page === 'manajemen-pengguna') {
      // Stay here
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

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPelanggan = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await bookingService.getAll()
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      // Filter booking yang merupakan jadwal pendakian:
      // - dari jadwal.jsx langsung (ada field route)
      // - dari PembayaranPendakian (jenis_tiket berisi nama rute)
      const RUTE_KEYWORDS = ['tangga', 'hutan', 'rute', 'cipanas']
      const isPendakian = (b) => {
        if (b.route) return true
        const jt = (b.jenis_tiket || '').toLowerCase()
        return RUTE_KEYWORDS.some(k => jt.includes(k))
      }
      setUsers(list.filter(isPendakian))
    } catch (err) {
      setError(err.userMessage || 'Gagal memuat data pendaki.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPelanggan()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data pendaki ini?')) return
    try {
      await bookingService.delete(id)
      setUsers(prev => prev.filter(u => (u.id_booking || u.id) !== id))
    } catch (err) {
      setError(err.userMessage || 'Gagal menghapus data pendaki.')
    }
  }

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const pelanggan = user.pelanggan || {}
      const name = pelanggan.nama_lengkap || pelanggan.nama || user.name || user.nama || ''
      const email = pelanggan.email || user.email || ''
      const rute = user.rute || user.jenis_tiket || user.route || ''
      const userId = String(user.id_booking || user.id || '')
      return (
        name.toLowerCase().includes(term) ||
        userId.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        rute.toLowerCase().includes(term)
      )
    }
    return true
  })

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
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
              <input 
                className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant outline-none" 
                placeholder="Cari analitik, jadwal, atau pendaki..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer active:scale-95 duration-200">
              <div className="text-right hidden xl:block">
                <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
                <p className="text-[10px] text-secondary mt-1">{localStorage.getItem('admin_jabatan') || 'Super Administrator'}</p>
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
              <span className="text-xs font-bold tracking-[0.2em] text-[#695d47] uppercase">Portal Manajemen</span>
              <h2 className="text-4xl font-display font-extrabold text-primary tracking-tight mt-1">Data Pendaki Terdaftar</h2>
            </div>
            <div className="flex gap-4">
              {/* Total Pendaki Card */}
              <div className="bg-surface-container-lowest shadow-sm rounded-3xl px-6 py-4 flex flex-col items-center justify-center min-w-[130px] border border-outline-variant/10">
                <span className="text-[9px] text-[#695d47] font-bold uppercase tracking-widest">Total Pendaki</span>
                <span className="text-3xl font-display font-extrabold text-primary mt-1">{users.length}</span>
              </div>
            </div>
          </section>

          {/* Filter Tab Row - hanya Semua */}
          <div className="flex items-center gap-4 mb-6">
            <button
              className="px-6 py-2.5 rounded-full text-xs font-bold transition-all bg-primary text-on-primary shadow-md"
            >
              Semua Pendaki
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{error}</p>
            </div>
          )}

          {/* Data Table */}
          <div className="space-y-4">
            {/* Header Columns */}
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr] gap-4 px-6 py-3 text-[10px] font-bold text-secondary uppercase tracking-[0.15em]">
              <div>Profil Pendaki</div>
              <div>Rute & Tanggal</div>
              <div>Kontak</div>
              <div className="text-right">Aksi</div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="text-center py-12 text-secondary text-sm font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Memuat data pelanggan...
              </div>
            )}

            {/* List Hiker Cards */}
            {!loading && filteredUsers.map((user) => {
              // Dari PembayaranPendakian (API): pelanggan.nama_lengkap, jenis_tiket, jml_tiket, tanggal_kunjungan
              // Dari jadwal.jsx langsung (state): teamName, route, teamCount, date, contact
              const pelanggan = user.pelanggan || {}
              const name = user.teamName || pelanggan.nama_lengkap || pelanggan.nama || user.nama || '-'
              const phone = user.contact || pelanggan.no_hp || user.no_hp || '-'
              const rawRute = user.route === 'tangga' ? 'Tangga 620'
                : user.route === 'hutan' ? 'Hutan Cipanas'
                : user.jenis_tiket || user.route || 'Pendakian'
              const date = user.date || (user.tanggal_kunjungan || user.created_at || '').substring(0, 10) || '-'
              const jumlah = user.teamCount || user.jml_tiket || user.qty || 1
              const idVal = user.id_booking || user.id
              const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

              return (
                <div
                  key={idVal}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all grid grid-cols-[2fr_1.5fr_1.5fr_1fr] gap-4 items-center"
                >
                  {/* Profil Column */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-headline font-extrabold text-sm">
                      {initials}
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface leading-tight">{name}</p>
                      <p className="text-[11px] text-secondary font-medium mt-0.5">BOOK-{String(idVal).padStart(4, '0')}</p>
                    </div>
                  </div>

                  {/* Rute & Tanggal Column */}
                  <div>
                    <p className="text-xs text-on-surface font-medium">{rawRute}</p>
                    <p className="text-[11px] text-secondary mt-0.5">{date}</p>
                    <p className="text-[11px] text-secondary mt-0.5">{jumlah} orang</p>
                  </div>

                  {/* Kontak Column */}
                  <div>
                    <p className="text-xs text-on-surface font-medium">WhatsApp</p>
                    <p className="text-[11px] text-secondary mt-0.5">{phone || '-'}</p>
                  </div>

                  {/* Actions Column */}
                  <div className="flex justify-end gap-3.5">
                    <button
                      onClick={() => handleDelete(idVal)}
                      className="material-symbols-outlined text-red-600 hover:text-red-800 transition-colors"
                      title="Hapus Data Pendaki"
                    >
                      delete
                    </button>
                  </div>
                </div>
              )
            })}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 text-secondary text-sm font-medium">
                Tidak ada pendaki ditemukan
              </div>
            )}
          </div>

          {/* Pagination Row */}
          <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
            <p className="text-xs text-secondary font-medium">
              Menampilkan <span className="text-on-surface font-bold">1 - {filteredUsers.length}</span> dari {users.length} pendaki
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#163422] text-[#f9f9f7] font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-secondary font-bold text-xs hover:bg-surface-container-low transition-all">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-secondary font-bold text-xs hover:bg-surface-container-low transition-all">
                3
              </button>
              <span className="text-secondary px-1 text-xs font-bold">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-secondary font-bold text-xs hover:bg-surface-container-low transition-all">
                321
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
