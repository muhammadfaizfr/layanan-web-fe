import React, { useState, useEffect } from 'react'
import authService from '../../services/authService'

export default function PengaturanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('pengaturan')
  const [namaLengkap, setNamaLengkap] = useState('')
  const [alamatEmail, setAlamatEmail] = useState('')
  const [nomorTelepon, setNomorTelepon] = useState('+62 812 3456 7890')
  const [jabatan, setJabatan] = useState('Super Administrator')
  const [kataSandi, setKataSandi] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile()
        setNamaLengkap(data.nama_admin || '')
        setAlamatEmail(data.email || '')
        localStorage.setItem('admin_nama', data.nama_admin)
        localStorage.setItem('admin_email', data.email)
      } catch (err) {
        console.error('Gagal memuat profil', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') navigate('admin-jadwal-pendakian')
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'manajemen-galeri') navigate('admin-manajemen-galeri')
    else if (page === 'laporan') navigate('admin-laporan')
    else if (page === 'pengaturan') {
      // Stay on page
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { nama_admin: namaLengkap, email: alamatEmail }
      if (kataSandi) payload.kata_sandi = kataSandi
      const res = await authService.updateProfile(payload)
      localStorage.setItem('admin_nama', res.admin.nama_admin)
      localStorage.setItem('admin_email', res.admin.email)
      localStorage.setItem('admin_jabatan', jabatan)
      setKataSandi('')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      alert('Gagal menyimpan profil: ' + (err.userMessage || err.message))
    }
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
    <div className="bg-[#f9f9f7] text-[#1a1c1b] font-body antialiased flex min-h-screen">
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
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-40 border-r border-[#e8e8e6]">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#163422] flex items-center justify-center shadow-lg shadow-[#163422]/20">
            <span className="material-symbols-outlined text-[#f9f9f7]" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-none">Galunggung</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#695d47] mt-1">Otoritas Pariwisata</p>
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
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden bg-[#f9f9f7]">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-end items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-[#e8e8e6] gap-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-bold text-[#163422] leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
              <p className="text-[10px] text-[#695d47] mt-1">{localStorage.getItem('admin_jabatan') || 'Administrator Super'}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#163422]/20 overflow-hidden">
              <img
                alt="Profil Administrator"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"
              />
            </div>
          </div>
        </header>

        {/* Content canvas container */}
        <div className="flex-1 bg-[#f9f9f7] p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Page Header Section */}
            <div className="mb-10">
              <h2 className="text-3xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#163422] tracking-tight">Pengaturan Sistem</h2>
              <p className="text-[#695d47] font-['Inter'] text-sm font-medium mt-2 leading-relaxed">
                Kelola preferensi akun, keamanan, dan operasional kawasan wisata Galunggung.
              </p>
            </div>

            {/* Profile Settings Card */}
            <form onSubmit={handleSubmit} className="bg-[#f4f4f2] rounded-[2rem] p-10 shadow-sm border border-[#e8e8e6]/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#163422]">Profil Admin</h3>
                  <p className="text-[#695d47] text-xs font-['Inter'] mt-1">Perbarui informasi dasar dan identitas Anda.</p>
                </div>
                <button
                  type="submit"
                  className="bg-[#163422] hover:bg-[#1a3d28] text-[#f9f9f7] px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#163422]/10 active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-[#695d47]">
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    className="w-full bg-white text-[#1a1c1b] rounded-xl py-3.5 px-5 font-['Inter'] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#163422] shadow-sm transition-all"
                  />
                </div>

                {/* Alamat Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-[#695d47]">
                    ALAMAT EMAIL
                  </label>
                  <input
                    type="email"
                    value={alamatEmail}
                    onChange={(e) => setAlamatEmail(e.target.value)}
                    className="w-full bg-white text-[#1a1c1b] rounded-xl py-3.5 px-5 font-['Inter'] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#163422] shadow-sm transition-all"
                  />
                </div>

                {/* Nomor Telepon */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-[#695d47]">
                    NOMOR TELEPON
                  </label>
                  <input
                    type="text"
                    value={nomorTelepon}
                    onChange={(e) => setNomorTelepon(e.target.value)}
                    className="w-full bg-white text-[#1a1c1b] rounded-xl py-3.5 px-5 font-['Inter'] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#163422] shadow-sm transition-all"
                  />
                </div>

                {/* Jabatan */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-[#695d47]">
                    JABATAN
                  </label>
                  <input
                    type="text"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    className="w-full bg-white text-[#1a1c1b] rounded-xl py-3.5 px-5 font-['Inter'] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#163422] shadow-sm transition-all"
                  />
                </div>

                {/* Kata Sandi Baru */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-[#695d47]">
                    KATA SANDI BARU (OPSIONAL)
                  </label>
                  <input
                    type="password"
                    value={kataSandi}
                    onChange={(e) => setKataSandi(e.target.value)}
                    placeholder="Kosongkan jika tidak ingin mengubah kata sandi"
                    className="w-full bg-white text-[#1a1c1b] rounded-xl py-3.5 px-5 font-['Inter'] text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#163422] shadow-sm transition-all"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Notification Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#163422] text-[#f9f9f7] py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in-up font-['Inter']">
          <span className="material-symbols-outlined text-[#f9f9f7]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="text-sm font-semibold">Pengaturan berhasil diperbarui!</span>
        </div>
      )}
    </div>
  )
}
