import React, { useState, useEffect } from 'react'
import kontakService from '../../services/kontakService'
import authService from '../../services/authService'

export default function KotakMasukAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('kotak-masuk')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') {
      navigate('admin-ringkasan')
    } else if (page === 'manajemen-tiket') {
      navigate('admin-manajemen-tiket')
    } else if (page === 'jadwal-pendakian') {
      navigate('admin-jadwal-pendakian')
    } else if (page === 'manajemen-pengguna') {
      navigate('admin-manajemen-pengguna')
    } else if (page === 'kotak-masuk') {
      // Stay here
    } else if (page === 'manajemen-galeri') {
      navigate('admin-manajemen-galeri')
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

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchKontak = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await kontakService.getAll()
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      setMessages(list)
    } catch (err) {
      setError(err.userMessage || 'Gagal memuat pesan masuk.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKontak()
  }, [])

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return
    try {
      await kontakService.delete(id)
      setMessages(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err.userMessage || 'Gagal menghapus pesan.')
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] text-xl leading-none">Galunggung</h1>
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
                    : 'text-[#695d47] hover:bg-[#e8e8e6] rounded-xl'
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

      {/* Main */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] shadow-sm sticky top-0 z-50 flex justify-end items-center px-8 border-b border-outline-variant/10 gap-6">
          <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-primary">settings</span>
            </button>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-primary text-sm leading-none">Admin Galunggung</p>
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

        {/* Content */}
        <div className="flex-1 bg-[#f4f4f2] p-10">
          <h2 className="text-3xl font-['Plus_Jakarta_Sans'] font-extrabold text-primary tracking-tight mb-6">Kotak Masuk</h2>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl mb-4 max-w-2xl">
              <span className="material-symbols-outlined text-error text-lg">error</span>
              <p className="text-sm text-on-error-container font-medium">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12 text-secondary text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Memuat pesan masuk...
            </div>
          )}

          {!loading && messages.map((msg) => {
            const name = msg.name || msg.nama || msg.pengirim || 'Anonim'
            const email = msg.email || '-'
            const pesan = msg.text || msg.pesan || msg.message || msg.isi || ''
            const subjek = msg.subjek || msg.subject || ''
            const role = msg.role || 'Pengunjung'
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

            return (
              <div
                key={msg.id}
                className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden max-w-2xl mb-4"
              >
                {/* Message Header */}
                <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                  <div className="w-11 h-11 rounded-full bg-[#d4c5a9] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#504531] font-['Plus_Jakarta_Sans'] font-extrabold text-sm">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[#163422] text-base leading-none">{name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="material-symbols-outlined text-secondary" style={{ fontSize: '13px' }}>mail</span>
                      <span className="text-xs text-secondary font-medium">{email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="material-symbols-outlined text-red-400 hover:text-red-600 transition-colors text-xl"
                    title="Hapus pesan"
                  >
                    delete
                  </button>
                </div>

                {/* Subject */}
                {subjek && (
                  <div className="px-6 pb-2">
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest">{subjek}</p>
                  </div>
                )}

                {/* Message Bubble */}
                <div className="px-6 pb-4">
                  <div className="bg-[#f4f4f2] rounded-2xl rounded-tl-sm px-5 py-4 inline-block max-w-full">
                    <p className="text-sm text-[#1a1c1b] font-['Inter'] leading-relaxed">{pesan}</p>
                  </div>
                </div>

                {/* Role Label */}
                <div className="px-6 pb-6">
                  <span className="text-[10px] font-['Inter'] font-bold tracking-widest uppercase text-secondary">
                    {role}
                  </span>
                </div>
              </div>
            )
          })}

          {!loading && messages.length === 0 && (
            <div className="text-center py-16 text-secondary text-sm font-medium bg-surface-container-lowest rounded-2xl max-w-2xl">
              <span className="material-symbols-outlined text-4xl block mb-3 opacity-40">inbox</span>
              Tidak ada pesan masuk
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
