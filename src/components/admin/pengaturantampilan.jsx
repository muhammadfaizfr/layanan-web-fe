import React, { useState, useRef } from 'react'
import uiService from '../../services/uiService'
import authService from '../../services/authService'

import mtGalunggungImg from '../../assets/images/Mt_galunggung_volcanic_crater.jpg'
import mountainStaircaseImg from '../../assets/images/mountain-staircase.jpg'
import pemandianAirPanasImg from '../../assets/images/pemandian air panas.jpeg'
import bukitNangreuImg from '../../assets/images/Bukit-Nangreu-Galunggung.jpeg'
import spotImg from '../../assets/images/spot.jpg'

import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'
import img6 from '../../assets/images/6.webp'
import img7 from '../../assets/images/7.jpg'

const fallbackImages = {
  home_hero: mtGalunggungImg,
  home_kawah: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWPZnH_HhfO5fVRsqrtEt_SGTe-pVC4AZi5PZlS2EYzSK1t4OJptEC_TNGaDF44TxVQCr1offxD74Oct9KQic6T2l7dHxI90vA4e1KiPKref9ekAHQKUBbXVTrwS8kOqUdTa_e3riXGX_d9RIC6Lgj0pzxGx6Yk408WVcNx-8r_WKWbTBhM6vtjXo-f1lCj9SYY3D1nTtmy8oPyLAoE4a3lbo38BjMC-97Q9KPGKE2_vOVJigKyvqcs_UsWONRjHAtHmf1KyKIAA",
  home_pemandian: pemandianAirPanasImg,
  home_bukit: bukitNangreuImg,
  home_spot: spotImg,
  home_staircase: mountainStaircaseImg,
  tentang_hero: img1,
  tentang_sejarah_1: img2,
  tentang_sejarah_2: img3,
  tentang_galeri_1: img4,
  tentang_galeri_2: img5,
  tentang_galeri_3: img6,
  tentang_galeri_4: img7
}

export default function PengaturanTampilanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('pengaturan-tampilan')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '', label: '' })
  
  const [selectedImages, setSelectedImages] = useState({
    home_hero: null,
    home_kawah: null,
    home_pemandian: null,
    home_bukit: null,
    home_spot: null,
    home_staircase: null,
    tentang_hero: null,
    tentang_sejarah_1: null,
    tentang_sejarah_2: null,
    tentang_galeri_1: null,
    tentang_galeri_2: null,
    tentang_galeri_3: null,
    tentang_galeri_4: null
  })

  const [previewUrls, setPreviewUrls] = useState({
    home_hero: `http://127.0.0.1:8000/storage/ui/home_hero.jpg?t=${Date.now()}`,
    home_kawah: `http://127.0.0.1:8000/storage/ui/home_kawah.jpg?t=${Date.now()}`,
    home_pemandian: `http://127.0.0.1:8000/storage/ui/home_pemandian.jpg?t=${Date.now()}`,
    home_bukit: `http://127.0.0.1:8000/storage/ui/home_bukit.jpg?t=${Date.now()}`,
    home_spot: `http://127.0.0.1:8000/storage/ui/home_spot.jpg?t=${Date.now()}`,
    home_staircase: `http://127.0.0.1:8000/storage/ui/home_staircase.jpg?t=${Date.now()}`,
    tentang_hero: `http://127.0.0.1:8000/storage/ui/tentang_hero.jpg?t=${Date.now()}`,
    tentang_sejarah_1: `http://127.0.0.1:8000/storage/ui/tentang_sejarah_1.jpg?t=${Date.now()}`,
    tentang_sejarah_2: `http://127.0.0.1:8000/storage/ui/tentang_sejarah_2.jpg?t=${Date.now()}`,
    tentang_galeri_1: `http://127.0.0.1:8000/storage/ui/tentang_galeri_1.jpg?t=${Date.now()}`,
    tentang_galeri_2: `http://127.0.0.1:8000/storage/ui/tentang_galeri_2.jpg?t=${Date.now()}`,
    tentang_galeri_3: `http://127.0.0.1:8000/storage/ui/tentang_galeri_3.jpg?t=${Date.now()}`,
    tentang_galeri_4: `http://127.0.0.1:8000/storage/ui/tentang_galeri_4.jpg?t=${Date.now()}`
  })

  const fileInputRefs = {
    home_hero: useRef(null),
    home_kawah: useRef(null),
    home_pemandian: useRef(null),
    home_bukit: useRef(null),
    home_spot: useRef(null),
    home_staircase: useRef(null),
    tentang_hero: useRef(null),
    tentang_sejarah_1: useRef(null),
    tentang_sejarah_2: useRef(null),
    tentang_galeri_1: useRef(null),
    tentang_galeri_2: useRef(null),
    tentang_galeri_3: useRef(null),
    tentang_galeri_4: useRef(null)
  }

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') navigate('admin-jadwal-pendakian')
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'manajemen-galeri') navigate('admin-manajemen-galeri')
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

  const handleFileChange = (key, e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImages(prev => ({ ...prev, [key]: file }))
      setPreviewUrls(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  const handleUpload = async (key) => {
    const file = selectedImages[key]
    if (!file) return

    setLoading(true)
    setMessage({ text: '', type: '', label: '' })
    
    try {
      const result = await uiService.uploadImage(key, file)
      
      // Ambil URL dari response server, atau bangun ulang dengan cache buster
      const serverUrl = result?.data?.url || `http://127.0.0.1:8000/storage/ui/${result?.data?.filename || key + '.jpg'}?t=${Date.now()}`
      
      // Update preview dengan URL dari server (bukan object URL lokal)
      setPreviewUrls(prev => ({ ...prev, [key]: serverUrl }))
      
      // Reset selected image state
      setSelectedImages(prev => ({ ...prev, [key]: null }))
      
      // Cari label nama foto dari navItems/renderUploadBox
      const labelMap = {
        home_hero: 'Hero Section', home_kawah: 'Kawah Hijau', home_pemandian: 'Pemandian',
        home_bukit: 'Area Camping', home_spot: 'Spot Foto', home_staircase: 'Tangga Pegunungan',
        tentang_hero: 'Hero Tentang', tentang_sejarah_1: 'Sejarah 1', tentang_sejarah_2: 'Sejarah 2',
        tentang_galeri_1: 'Galeri 1', tentang_galeri_2: 'Galeri 2',
        tentang_galeri_3: 'Galeri 3', tentang_galeri_4: 'Galeri 4',
      }

      setMessage({ 
        text: `Foto berhasil diperbarui dan akan langsung tampil di website pengunjung.`, 
        type: 'success',
        label: labelMap[key] || key,
        previewUrl: serverUrl
      })
      
    } catch (err) {
      setMessage({ text: err.message || 'Gagal memperbarui foto. Coba lagi.', type: 'error', label: '' })
    } finally {
      setLoading(false)
    }
  }

  const renderUploadBox = (key, label, description) => {
    const hasUnsavedChanges = !!selectedImages[key]
    
    return (
      <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4 group">
        <div>
          <h4 className="font-bold text-[#163422]">{label}</h4>
          <p className="text-xs text-secondary mt-1">{description}</p>
        </div>
        
        <div 
          className="relative w-full h-40 bg-surface-container-low rounded-xl overflow-hidden border-2 border-dashed border-outline-variant/30 group-hover:border-primary/50 cursor-pointer flex items-center justify-center transition-all"
          onClick={() => fileInputRefs[key].current?.click()}
        >
          <img 
            src={previewUrls[key]} 
            alt={label} 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { 
              e.target.onerror = null;
              e.target.src = fallbackImages[key];
            }}
          />
          
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white text-3xl">edit</span>
          </div>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRefs[key]} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handleFileChange(key, e)}
        />
        
        <button
          onClick={() => handleUpload(key)}
          disabled={!hasUnsavedChanges || loading}
          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
            hasUnsavedChanges 
              ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
              : 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed'
          }`}
        >
          {loading && hasUnsavedChanges ? (
            <><span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span> Menyimpan...</>
          ) : (
            <><span className="material-symbols-outlined text-[16px]">save</span> Simpan Foto</>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        @keyframes slideUp {
          0%  { transform: translateY(40px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        @keyframes drawCheck {
          0%   { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-40 border-r border-outline-variant/10">
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] text-xl leading-none">Galunggung</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mt-1">Otoritas Pariwisata</p>
          </div>
        </div>

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
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <button onClick={handleLogout} className="w-full bg-[#ba1a1a] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">logout</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        <header className="w-full h-16 bg-[#f9f9f7] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-end items-center px-8 border-b border-outline-variant/10 gap-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
              <p className="text-[10px] text-secondary mt-1">{localStorage.getItem('admin_jabatan') || 'Super Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
              <img alt="Profil Admin" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg" />
            </div>
          </div>
        </header>

        <div className="flex-1 bg-[#f4f4f2] p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="text-4xl font-display font-extrabold text-[#163422] tracking-tight">Pengaturan Tampilan</h2>
              <p className="text-secondary text-sm font-medium mt-2 max-w-2xl leading-relaxed">
                Sesuaikan foto-foto utama yang akan dilihat pengunjung pada halaman utama (Home) dan halaman Tentang.
              </p>
            </div>

            {/* Error Message Inline */}
            {message.text && message.type === 'error' && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6 bg-red-50 border border-red-200 text-red-800 shadow-sm">
                <span className="material-symbols-outlined text-red-500 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                <div>
                  <p className="font-bold text-sm">Gagal Menyimpan</p>
                  <p className="text-xs mt-0.5 opacity-80">{message.text}</p>
                </div>
                <button onClick={() => setMessage({ text: '', type: '', label: '' })} className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            )}

            {/* Professional Success Popup */}
            {message.text && message.type === 'success' && (
              <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
                onClick={(e) => e.target === e.currentTarget && setMessage({ text: '', type: '', label: '' })}
              >
                <div 
                  className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                  style={{ animation: 'slideUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards' }}
                >
                  {/* Top green banner */}
                  <div className="bg-gradient-to-br from-[#163422] to-[#2d6a4f] px-8 pt-10 pb-16 flex flex-col items-center relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5"></div>
                    <div className="absolute bottom-0 left-0 w-56 h-32 rounded-full bg-white/5 -translate-x-1/4 translate-y-1/2"></div>
                    
                    {/* Check circle */}
                    <div className="relative w-20 h-20 mb-5">
                      <div className="absolute inset-0 rounded-full bg-white/20" style={{ animation: 'ripple 1.5s ease-out infinite' }}></div>
                      <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-5xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    </div>

                    <h3 className="text-white text-2xl font-extrabold tracking-tight">Foto Berhasil Disimpan!</h3>
                    <p className="text-white/70 text-xs mt-1 font-medium">
                      {message.label && <span className="text-white/90 font-bold">{message.label}</span>} · {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Preview + info */}
                  <div className="px-8 py-6 -mt-8">
                    <div className="bg-[#f4f4f2] rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-[#e2e3e1]">
                      {message.previewUrl && (
                        <img 
                          src={message.previewUrl} 
                          alt="preview" 
                          className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm flex-shrink-0"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-[#163422] text-sm truncate">{message.label || 'Foto UI'}</p>
                        <p className="text-xs text-secondary mt-0.5">{message.text}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button 
                        onClick={() => setMessage({ text: '', type: '', label: '' })}
                        className="flex-1 bg-[#163422] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#163422]/90 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">done_all</span>
                        Oke, Lanjutkan
                      </button>
                      <button 
                        onClick={() => { setMessage({ text: '', type: '', label: '' }); window.open('http://localhost:5173/', '_blank') }}
                        className="flex-1 bg-[#f4f4f2] border border-[#e2e3e1] text-[#163422] py-3 rounded-xl font-bold text-sm hover:bg-[#e8e8e6] transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        Lihat Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Halaman Home */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary bg-primary/10 p-2 rounded-xl">home</span>
                <h3 className="text-2xl font-bold text-[#163422]">Halaman Home</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderUploadBox('home_hero', 'Hero Section', 'Gambar latar besar pertama saat web dibuka.')}
                {renderUploadBox('home_kawah', 'Kawah Hijau', 'Gambar kawah hijau (Bento Grid)')}
                {renderUploadBox('home_pemandian', 'Pemandian', 'Gambar kolam pemandian air panas (Bento Grid)')}
                {renderUploadBox('home_bukit', 'Area Camping', 'Gambar untuk area bukit/camping (Bento Grid)')}
                {renderUploadBox('home_spot', 'Spot Foto', 'Gambar tambahan untuk spot foto (Bento Grid)')}
                {renderUploadBox('home_staircase', 'Tangga Pegunungan', 'Gambar asimetris tangga ikonik.')}
              </div>
            </div>

            {/* Section Halaman Tentang */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary bg-primary/10 p-2 rounded-xl">info</span>
                <h3 className="text-2xl font-bold text-[#163422]">Halaman Tentang</h3>
              </div>
              
              <h4 className="text-lg font-bold text-secondary mb-4 border-b border-outline-variant/20 pb-2">Area Atas & Sejarah</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {renderUploadBox('tentang_hero', 'Hero Tentang', 'Gambar gunung utama di samping judul.')}
                {renderUploadBox('tentang_sejarah_1', 'Sejarah 1 (Atas)', 'Gambar pertama di bagian sejarah.')}
                {renderUploadBox('tentang_sejarah_2', 'Sejarah 2 (Bawah)', 'Gambar tangga menjulang ke atas.')}
              </div>

              <h4 className="text-lg font-bold text-secondary mb-4 border-b border-outline-variant/20 pb-2">Galeri Simfoni Alam</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {renderUploadBox('tentang_galeri_1', 'Kiri Atas Besar', 'Gambar panorama luas/crater sunset.')}
                {renderUploadBox('tentang_galeri_2', 'Kanan Atas', 'Gambar hutan pinus atau pohon.')}
                {renderUploadBox('tentang_galeri_3', 'Tengah Bawah', 'Gambar sumber air panas kawah.')}
                {renderUploadBox('tentang_galeri_4', 'Bawah Lebar', 'Gambar pemandangan malam/bintang.')}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
