import React, { useState, useRef, useCallback } from 'react'

export default function ManajemenGaleriAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('manajemen-galeri')
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') navigate('admin-jadwal-pendakian')
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'laporan') navigate('admin-laporan')
    else if (page === 'pengaturan') navigate('admin-pengaturan')
  }

  const handleLogout = () => navigate('admin-login')

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

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === 'image/jpeg' || f.type === 'image/png'
    )
    if (files.length > 0) {
      const previews = files.map((f) => ({
        name: f.name,
        url: URL.createObjectURL(f),
        size: (f.size / 1024 / 1024).toFixed(2),
      }))
      setUploadedFiles((prev) => [...prev, ...previews])
    }
  }, [])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => f.type === 'image/jpeg' || f.type === 'image/png'
    )
    if (files.length > 0) {
      const previews = files.map((f) => ({
        name: f.name,
        url: URL.createObjectURL(f),
        size: (f.size / 1024 / 1024).toFixed(2),
      }))
      setUploadedFiles((prev) => [...prev, ...previews])
    }
  }

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
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
              <p className="font-bold text-primary leading-none">Admin Galunggung</p>
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
        <div className="flex-1 bg-[#f4f4f2] p-10 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm max-w-5xl">
            {/* Page Header Section inside card */}
            <div className="flex justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-display font-extrabold text-[#1a1c1b] tracking-tight">Manajemen Galeri</h2>
                <p className="text-secondary font-['Inter'] text-sm font-medium mt-2 leading-relaxed max-w-2xl">
                  Kurasi visual terbaik untuk merepresentasikan keindahan abadi Gunung Galunggung kepada dunia.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#163422] text-[#f9f9f7] px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all flex-shrink-0 active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Unggah Foto Baru
              </button>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center py-16 px-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-[#163422] bg-[#163422]/5'
                  : 'border-[#c8c8c6] hover:border-[#163422] bg-transparent'
              }`}
            >
              {/* Folder/Upload Icon Container */}
              <div className="w-16 h-16 rounded-full bg-[#f4f4f2] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: '32px' }}>upload_file</span>
              </div>

              <h3 className="font-display font-bold text-[#1a1c1b] text-lg mb-2">Unggah Cepat</h3>
              <p className="text-secondary text-sm font-['Inter'] text-center leading-relaxed mb-6">
                Tarik &amp; lepas foto Anda<br />ke sini atau klik untuk<br />menelusuri file.
              </p>

              {/* Badges info */}
              <div className="flex gap-2">
                {['JPG', 'PNG', 'MAX 10MB'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#c8c8c6] bg-white rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-secondary font-['Inter']"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hidden Input File */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Uploaded Previews */}
            {uploadedFiles.length > 0 && (
              <div className="mt-8 pt-8 border-t border-outline-variant/20">
                <h4 className="font-display font-bold text-primary text-base mb-4">File yang Diunggah</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm bg-white group"
                    >
                      <img src={file.url} alt={file.name} className="w-full h-32 object-cover block" />
                      <div className="p-3 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-primary truncate leading-tight">{file.name}</p>
                          <p className="text-[10px] text-secondary mt-1">{file.size} MB</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFile(idx)
                          }}
                          className="text-[#ba1a1a] hover:bg-red-50 p-1.5 rounded-full transition-colors flex-shrink-0"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
