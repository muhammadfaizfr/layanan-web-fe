import React, { useState } from 'react'

export default function AturTiketAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('manajemen-tiket')

  // Input states
  const [priceDomestik, setPriceDomestik] = useState('15.000')
  const [priceMancanegara, setPriceMancanegara] = useState('35.000')
  const [priceCamping, setPriceCamping] = useState('25.000')
  const [openTime, setOpenTime] = useState('07:00')
  const [closeTime, setCloseTime] = useState('17:00')
  const [quota, setQuota] = useState(2500)
  const [cancelPolicyActive, setCancelPolicyActive] = useState(true)
  const [policyText, setPolicyText] = useState(
    'Pengembalian dana (refund) dapat dilakukan maksimal 24 jam sebelum jadwal kunjungan. \n\nDana akan dikembalikan sebesar 80% dari total harga tiket setelah dipotong biaya administrasi platform sebesar Rp 2.500 per transaksi.\n\nKebijakan ini tidak berlaku untuk tiket promo atau event khusus tertentu.'
  )
  const [showToast, setShowToast] = useState(false)

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
      navigate('admin-manajemen-pengguna')
    } else if (page === 'laporan') {
      navigate('admin-laporan')
    } else if (page === 'pengaturan') {
      navigate('admin-pengaturan')
    }
  }

  const handleLogout = () => {
    navigate('admin-login')
  }

  const handleSave = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      navigate('admin-manajemen-tiket')
    }, 1500)
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
        <nav className="flex-grow space-y-1">
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
                } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98 w-full`}
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
          <div className="flex items-center gap-4">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-primary dark:text-[#f9f9f7]">Management Dashboard</h2>
            <div className="h-6 w-px bg-outline-variant/20"></div>
            <p className="text-secondary text-sm font-medium">Pengaturan Tiket</p>
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
                <p className="font-bold text-primary leading-none">Admin Galunggung</p>
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
              <h3 className="text-4xl font-display font-extrabold text-primary tracking-tight">Atur Tiket</h3>
              <p className="text-secondary mt-1 max-w-lg">Kelola harga, kuota harian, dan kebijakan operasional tiket masuk untuk pengalaman pengunjung yang optimal.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('admin-manajemen-tiket')}
                className="px-6 py-2.5 rounded-full text-on-secondary-container bg-surface-container-high hover:bg-surface-container-highest transition-all font-semibold border border-outline-variant/10 text-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 rounded-full bg-primary text-on-primary font-semibold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 600" }}>save</span>
                Simpan Perubahan
              </button>
            </div>
          </section>

          {/* Settings Grid */}
          <div className="grid grid-cols-12 gap-8 pb-10">
            {/* Left Column: Pricing & Hours */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
              {/* Pricing Card */}
              <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <h4 className="text-xl font-display font-bold">Harga Tiket</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Domestik */}
                  <div className="space-y-2">
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-[#695d47]">Reguler (Domestik)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-on-surface" 
                        type="text" 
                        value={priceDomestik}
                        onChange={(e) => setPriceDomestik(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Mancanegara */}
                  <div className="space-y-2">
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-[#695d47]">Mancanegara</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-on-surface" 
                        type="text" 
                        value={priceMancanegara}
                        onChange={(e) => setPriceMancanegara(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Camping */}
                  <div className="space-y-2">
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-[#695d47]">Camping</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-on-surface" 
                        type="text" 
                        value={priceCamping}
                        onChange={(e) => setPriceCamping(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Operational Hours & Quota */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hours */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <h4 className="text-xl font-display font-bold">Jam Operasional</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-label font-bold uppercase tracking-widest text-[#695d47]">Buka</label>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-container/20 transition-all font-medium text-sm" 
                        type="time" 
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                      />
                    </div>
                    <span className="mt-6 text-outline-variant font-bold">—</span>
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-label font-bold uppercase tracking-widest text-[#695d47]">Tutup</label>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-container/20 transition-all font-medium text-sm" 
                        type="time" 
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                {/* Daily Quota */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    <h4 className="text-xl font-display font-bold">Kuota Harian</h4>
                  </div>
                  <p className="text-xs text-secondary mb-6">Batas maksimum pengunjung harian</p>
                  <div className="space-y-4">
                    <input 
                      className="w-full h-2 bg-[#e8e8e6] rounded-full appearance-none cursor-pointer accent-[#163422]" 
                      max="5000" 
                      min="100" 
                      type="range" 
                      value={quota}
                      onChange={(e) => setQuota(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between items-center bg-[#f4f4f2] px-4 py-2 rounded-lg">
                      <span className="text-xs font-bold text-secondary">Batas Saat Ini</span>
                      <span className="text-lg font-display font-extrabold text-primary">
                        {quota.toLocaleString('id-ID')} <span className="text-xs font-medium text-secondary">Orang</span>
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column: Cancellation Policy & Decorative */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
              {/* Cancellation Policy */}
              <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">event_busy</span>
                    <h4 className="text-xl font-display font-bold">Kebijakan Pembatalan</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      className="sr-only peer"
                      checked={cancelPolicyActive}
                      onChange={(e) => setCancelPolicyActive(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-[#eeeeec] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex-grow space-y-4">
                  <label className="text-xs font-label font-bold uppercase tracking-widest text-secondary">Ketentuan Pengembalian Dana</label>
                  <textarea 
                    className="w-full bg-[#f4f4f2] border-none rounded-2xl p-6 focus:ring-2 focus:ring-primary-container/20 transition-all text-sm leading-relaxed text-[#424843]" 
                    rows="6"
                    value={policyText}
                    onChange={(e) => setPolicyText(e.target.value)}
                  />
                  <div className="p-4 bg-[#c8ebd0]/30 rounded-xl flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">info</span>
                    <p className="text-xs text-primary-fixed-variant leading-tight">Pastikan kebijakan ini selaras dengan regulasi pemerintah daerah setempat dan aturan pengelolaan wisata Jawa Barat.</p>
                  </div>
                </div>
              </section>

              {/* Status Summary (Visual Ornament) */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/6] bg-primary group shadow-sm">
                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-primary-container to-transparent"></div>
                <img 
                  alt="Galunggung Landscape" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzzfB6jawNel-Fjzqzh01CrhL3gGmED6VxJaYHabsmX_vXLPGtn1sRg2xcTY1WjjyxP18asslmRITdquz7GgaP3a7bk1TBdd1g7EmITOBeoXWml_CG-I9S51WSrfNYEu_1ldYVpHnq0eep70tbu1n5Zhu3qe0fyLPSguTm09XjLN9fHtc2FQDtyS1Uz0SmBPWCL_lJbjyl7LC9omyejCDOPm3Q8tWqSzozycfLwCM-O7rQPf67N5WT1pH1Cl0fkpJ4fgaVU0Yk2Q"
                />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-[#c8ebd0] rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Live Preview</span>
                  </div>
                  <h5 className="text-white font-display font-bold">Ketersediaan Tiket: Tinggi</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-primary text-on-primary px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-fade-in-up">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="font-medium text-sm">Perubahan berhasil disimpan!</span>
        </div>
      )}
    </div>
  )
}