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
    { id: 'pengaturan-tampilan', label: 'Atur Tampilan', icon: 'web' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // State untuk popup konfirmasi hapus
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [deleteTargetName, setDeleteTargetName] = useState('')
  const [deleting, setDeleting] = useState(false)

  // State untuk toast notifikasi
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

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

  // Buka popup konfirmasi hapus
  const handleDeleteClick = (msg) => {
    const name = msg.name || msg.nama || msg.pengirim || 'Anonim'
    setDeleteTargetId(msg.id_kontak || msg.id)
    setDeleteTargetName(name)
    setShowDeletePopup(true)
  }

  // Eksekusi hapus setelah konfirmasi
  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return
    setDeleting(true)
    try {
      await kontakService.delete(deleteTargetId)
      setMessages(prev => prev.filter(m => (m.id_kontak || m.id) !== deleteTargetId))
      setShowDeletePopup(false)
      showToast('Pesan berhasil dihapus')
    } catch (err) {
      setError(err.userMessage || 'Gagal menghapus pesan.')
      setShowDeletePopup(false)
    } finally {
      setDeleting(false)
      setDeleteTargetId(null)
      setDeleteTargetName('')
    }
  }

  const handleCancelDelete = () => {
    setShowDeletePopup(false)
    setDeleteTargetId(null)
    setDeleteTargetName('')
  }

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
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
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-primary text-sm leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
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
                key={msg.id_kontak || msg.id}
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
                    onClick={() => handleDeleteClick(msg)}
                    className="material-symbols-outlined text-red-400 hover:text-red-600 transition-colors text-xl"
                    title="Hapus pesan"
                  >
                    delete
                  </button>
                </div>

                {/* Subject Header */}
                {subjek && (
                  <div className="px-6 pb-2">
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-primary text-sm">{subjek}</h4>
                  </div>
                )}

                {/* Message Body */}
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

      {/* Popup Konfirmasi Hapus */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(22,52,34,0.15)] overflow-hidden w-full max-w-sm p-8 text-left relative mx-4 animate-fade-in-up border border-[#e2e3e1]">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            </div>

            {/* Headline */}
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[#163422] text-xl tracking-tight mb-2">
              Hapus Pesan?
            </h3>

            {/* Description */}
            <p className="text-[#695d47] font-['Inter'] text-sm leading-relaxed mb-6 font-medium">
              Pesan dari <span className="font-bold text-[#163422]">{deleteTargetName}</span> akan dihapus secara permanen dan tidak dapat dikembalikan.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={handleCancelDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-[#eeeeec] hover:bg-[#e2e3e1] text-[#1a1c1b] font-['Plus_Jakarta_Sans'] font-bold rounded-full transition-all duration-300 active:scale-95 text-sm shadow-sm disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-[#ba1a1a] text-white font-['Plus_Jakarta_Sans'] font-bold rounded-full transition-all duration-300 active:scale-95 shadow-md hover:opacity-90 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Menghapus...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Hapus Pesan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-[110] animate-slide-in-right">
          <div className={`px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-[#163422] text-white' 
              : 'bg-[#ba1a1a] text-white'
          }`}>
            <span className="material-symbols-outlined text-emerald-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-['Inter'] font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
