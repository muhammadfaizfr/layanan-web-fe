import React, { useState, useEffect, useRef, useCallback } from 'react'
import kontenGaleriService from '../../services/kontenGaleriService'
import authService from '../../services/authService'

export default function ManajemenGaleriAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('manajemen-galeri')
  const [galeriData, setGaleriData] = useState([])
  const [loadingGaleri, setLoadingGaleri] = useState(true)
  const [errorGaleri, setErrorGaleri] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [captionInput, setCaptionInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editCaption, setEditCaption] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const data = await kontenGaleriService.getAll()
        const list = Array.isArray(data) ? data : (data?.data ?? [])
        setGaleriData(list)
      } catch (err) {
        setErrorGaleri(err.userMessage || 'Gagal memuat data galeri.')
      } finally {
        setLoadingGaleri(false)
      }
    }
    fetchGaleri()
  }, [])

  const triggerSuccessPopup = () => {
    setShowSuccessPopup(true)
    setTimeout(() => {
      setShowSuccessPopup(false)
    }, 3500)
  }

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') navigate('admin-jadwal-pendakian')
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'laporan') navigate('admin-laporan')
    else if (page === 'pengaturan-tampilan') navigate('admin-pengaturan-tampilan')
    else if (page === 'pengaturan') navigate('admin-pengaturan')
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
      setSelectedFile(files[0])
    }
  }, [])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => f.type === 'image/jpeg' || f.type === 'image/png'
    )
    if (files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleUploadToServer = async (e) => {
    e.preventDefault()
    if (!selectedFile) return setErrorGaleri('Pilih foto terlebih dahulu.')
    if (!captionInput.trim()) return setErrorGaleri('Caption foto wajib diisi.')

    setIsUploading(true)
    setErrorGaleri('')
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('judul_konten', captionInput)
      formData.append('id_admin', localStorage.getItem('admin_id') || 1)
      
      await kontenGaleriService.create(formData)
      
      // refresh galeri
      const data = await kontenGaleriService.getAll()
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      setGaleriData(list)
      
      // reset form
      setSelectedFile(null)
      setCaptionInput('')
      triggerSuccessPopup()
    } catch (err) {
      setErrorGaleri(err.userMessage || 'Gagal mengunggah foto.')
    } finally {
      setIsUploading(false)
    }
  }

  const [editFile, setEditFile] = useState(null)
  const editFileRef = React.useRef(null)

  const handleSaveEdit = async (id) => {
    try {
      setErrorGaleri('')
      const formData = new FormData()
      formData.append('judul_konten', editCaption)
      if (editFile) {
        formData.append('file', editFile)
      }
      await kontenGaleriService.update(id, formData)
      // Refresh data dari server
      const data = await kontenGaleriService.getAll()
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      setGaleriData(list)
      setEditingId(null)
      setEditFile(null)
      triggerSuccessPopup()
    } catch (err) {
      setErrorGaleri(err?.response?.data?.message || err.userMessage || 'Gagal menyimpan perubahan.')
    }
  }

  const handleDeleteGaleri = async (id) => {
    if (!window.confirm('Hapus foto ini dari galeri?')) return
    try {
      setErrorGaleri('')
      await kontenGaleriService.delete(id)
      setGaleriData(prev => prev.filter(g => (g.id_konten || g.id) !== id))
    } catch (err) {
      setErrorGaleri(err?.response?.data?.message || err.userMessage || 'Gagal menghapus foto.')
    }
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
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUploadToServer} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 mb-10 shadow-sm flex flex-col md:flex-row gap-8">
              {/* Left: Drag and Drop */}
              <div className="md:w-1/3 flex-shrink-0">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-full h-48 md:h-full min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : selectedFile
                      ? 'border-primary/30 bg-surface'
                      : 'border-outline-variant/50 hover:border-primary bg-surface-container-low/30'
                  }`}
                >
                  {selectedFile ? (
                    <>
                      <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white text-3xl mb-2">swap_horiz</span>
                        <p className="text-white text-xs font-bold">Ganti Foto</p>
                      </div>
                      <div className="relative z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-white/50 flex items-center gap-2 max-w-[80%] mt-auto mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[16px]">image</span>
                        <p className="text-xs font-bold text-primary truncate">{selectedFile.name}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-outline-variant/10">
                        <span className="material-symbols-outlined text-primary text-2xl">add_photo_alternate</span>
                      </div>
                      <h3 className="font-display font-bold text-on-surface text-sm mb-1">Unggah Foto</h3>
                      <p className="text-secondary text-[11px] text-center px-4">Tarik & lepas foto ke sini atau klik untuk menelusuri</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {/* Right: Caption & Submit */}
              <div className="md:w-2/3 flex flex-col">
                <div className="mb-6 flex-1">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">Caption Foto</label>
                  <textarea
                    placeholder="Ceritakan kisah di balik foto ini..."
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    className="w-full h-32 md:h-[130px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-on-surface resize-none transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile || !captionInput.trim()}
                  className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Mengunggah...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[18px]">cloud_upload</span> Simpan ke Galeri</>
                  )}
                </button>
              </div>
            </form>

            {/* Galeri dari Database */}
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <h4 className="font-display font-bold text-primary text-base mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">cloud_done</span>
                Galeri dari Database
              </h4>
              {errorGaleri && (
                <div className="flex items-center gap-2 px-3 py-2 bg-error-container rounded-xl mb-4">
                  <span className="material-symbols-outlined text-error text-sm">error</span>
                  <p className="text-xs text-on-error-container">{errorGaleri}</p>
                </div>
              )}
              {loadingGaleri ? (
                <div className="text-center py-8 text-secondary text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Memuat galeri...
                </div>
              ) : galeriData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {galeriData.map((item) => {
                    const itemId = item.id_konten || item.id
                    const imageUrl = item.file || item.url || item.gambar || item.file_path || item.foto
                    const caption = item.judul_konten || item.judul || item.caption || `Foto ${itemId}`
                    const isEditing = editingId === itemId
                    const fullUrl = imageUrl
                      ? (imageUrl.startsWith('http') ? imageUrl : `http://127.0.0.1:8000/storage/${imageUrl}`)
                      : null
                    
                    // Preview: jika sedang edit dan sudah pilih file baru, tampilkan preview file baru
                    const previewUrl = isEditing && editFile ? URL.createObjectURL(editFile) : fullUrl
                    
                    return (
                      <div key={itemId} className="relative rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm bg-white group flex flex-col justify-between">
                        <div>
                          {/* Image area — clickable to change photo when editing */}
                          <div className="relative">
                            {previewUrl ? (
                              <img
                                src={previewUrl}
                                alt={caption}
                                className="w-full h-36 object-cover block"
                              />
                            ) : (
                              <div className="w-full h-36 bg-surface-container-low flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary opacity-40 text-3xl">image</span>
                              </div>
                            )}
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => editFileRef.current?.click()}
                                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-white text-2xl mb-1">swap_horiz</span>
                                <span className="text-white text-[10px] font-bold">Ganti Foto</span>
                              </button>
                            )}
                          </div>
                          
                          {/* Caption area */}
                          <div className="p-3">
                            {isEditing ? (
                              <>
                                <input
                                  ref={editFileRef}
                                  type="file"
                                  accept="image/jpeg,image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0]
                                    if (f) setEditFile(f)
                                  }}
                                />
                                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1 block">Caption</label>
                                <input
                                  type="text"
                                  value={editCaption}
                                  onChange={(e) => setEditCaption(e.target.value)}
                                  className="w-full border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                {editFile && (
                                  <p className="text-[10px] text-primary mt-1 truncate flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">image</span>
                                    {editFile.name}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-xs font-bold text-primary line-clamp-2 leading-tight">{caption}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-3 pt-0 flex gap-2 justify-end border-t border-outline-variant/10">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(itemId)}
                                className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-lg hover:opacity-90 font-bold flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[13px]">save</span>Simpan
                              </button>
                              <button
                                onClick={() => { setEditingId(null); setEditFile(null) }}
                                className="text-xs bg-surface-variant text-on-surface-variant px-3 py-1.5 rounded-lg hover:bg-outline/20"
                              >
                                Batal
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => { setEditingId(itemId); setEditCaption(caption); setEditFile(null) }}
                                className="text-secondary hover:text-primary hover:bg-primary/5 transition-colors p-1.5 rounded-lg"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteGaleri(itemId)}
                                className="text-error hover:text-error hover:bg-error/5 transition-colors p-1.5 rounded-lg"
                                title="Hapus Foto"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-secondary text-center py-6">Belum ada gambar di database.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(22,52,34,0.15)] overflow-hidden w-full max-w-sm border-t-[8px] border-[#163422] p-8 text-center relative mx-4 animate-fade-in-up">
            {/* Double-layered Success Checkmark Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#eeeeec] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#163422] flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-3xl font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                </div>
              </div>
            </div>
            {/* Headline */}
            <h3 className="font-display font-extrabold text-[#163422] text-xl tracking-tight mb-3">
              Foto Berhasil Diunggah
            </h3>
            {/* Description */}
            <p className="text-[#695d47] font-['Inter'] text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
              Foto Anda telah berhasil ditambahkan ke Galeri Galunggung dan kini dapat dilihat oleh publik.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
