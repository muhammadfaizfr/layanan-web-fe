import React, { useState } from 'react'

export default function AturTiketAdmin({ navigate }) {
  // State untuk form input
  const [hargaReguler, setHargaReguler] = useState('15.000')
  const [hargaMancanegara, setHargaMancanegara] = useState('35.000')
  const [hargaCamping, setHargaCamping] = useState('25.000')
  const [jamBuka, setJamBuka] = useState('07:00')
  const [jamTutup, setJamTutup] = useState('17:00')
  const [kuota, setKuota] = useState(2500)
  const [isRefundable, setIsRefundable] = useState(true)
  const [refundPolicy, setRefundPolicy] = useState(
    'Pengembalian dana (refund) dapat dilakukan maksimal 24 jam sebelum jadwal kunjungan.\n\nDana akan dikembalikan sebesar 80% dari total harga tiket setelah dipotong biaya administrasi platform sebesar Rp 2.500 per transaksi.\n\nKebijakan ini tidak berlaku untuk tiket promo atau event khusus tertentu.'
  )

  const handleLogout = () => {
    navigate('admin-login')
  }

  const navItems = [
    { id: 'ringkasan', label: 'Ringkasan', icon: 'dashboard' },
    { id: 'manajemen-tiket', label: 'Manajemen Tiket', icon: 'confirmation_number' },
    { id: 'jadwal-pendakian', label: 'Jadwal Pendakian', icon: 'explore' },
    { id: 'manajemen-pengguna', label: 'Manajemen Pengguna', icon: 'group' },
    { id: 'kotak-masuk', label: 'Kotak Masuk', icon: 'inbox' },
    { id: 'manajemen-galeri', label: 'Manajemen Galeri', icon: 'photo_library' },
    { id: 'laporan', label: 'Laporan', icon: 'analytics' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  const handleNavClick = (id) => {
    if (id === 'ringkasan') navigate('admin-ringkasan')
    else if (id === 'manajemen-tiket') navigate('admin-manajemen-tiket')
  }

  const handleSave = () => {
    // Logika untuk menyimpan data ke API/Backend bisa ditaruh di sini
    alert('Peraturan tiket berhasil disimpan!')
    navigate('admin-manajemen-tiket')
  }

  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] min-h-screen font-body flex overflow-hidden">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .filled-icon {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-5 w-64 bg-[#f9f9f7] border-r border-[#163422]/10 z-50">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#163422] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl filled-icon">terrain</span>
            </div>
            <span className="text-base font-black text-[#163422] font-['Plus_Jakarta_Sans'] leading-tight">
              Galunggung
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#727972] font-bold pl-11">
            Otoritas Pariwisata
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 text-left ${
                item.id === 'manajemen-tiket'
                  ? 'bg-[#163422] text-white font-semibold'
                  : 'text-stone-500 hover:text-[#163422] hover:bg-[#f4f4f2]'
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={item.id === 'manajemen-tiket' ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.1em] text-xs">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-[#ba1a1a] text-white rounded-full py-3 px-6 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#ba1a1a]/90 transition-all active:scale-[0.98] shadow-sm font-['Plus_Jakarta_Sans']"
          >
            logout
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        
        {/* Top Navbar */}
        <header className="flex-none flex items-center justify-between px-10 h-20 bg-[#f9f9f7] border-b border-[#e2e3e1]/50 z-40">
          <div className="flex items-center gap-4">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#163422]">Management Dashboard</h2>
            <div className="h-6 w-px bg-[#c2c8c0] opacity-40"></div>
            <p className="text-[#424843] text-sm font-medium">Ticket Settings</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="material-symbols-outlined text-[#424843] hover:bg-[#f4f4f2] rounded-full p-2 transition-all cursor-pointer">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            </div>
            <span className="material-symbols-outlined text-[#424843] hover:bg-[#f4f4f2] rounded-full p-2 transition-all cursor-pointer">settings</span>
            <div className="h-8 w-px bg-[#c2c8c0] opacity-40"></div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-[#1a1c1b]">Admin Galunggung</span>
                <span className="text-[10px] uppercase tracking-wider text-[#163422] font-bold">Verified</span>
              </div>
              <img alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#163422]/10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEy3ZMPHYxyyhwS7DR5qkNP1ejh99n8ppgmWxaO1NYqUL9qlVJ3yHZ6DGb2l_e3sNvvZQpk-cLdamEdAhqDAqwnmRE3o6lpg4tQNZO1nstr38wZJCRhOD6r4Qg8xyOGf3OEC8k6EUYXxX1mAG_2ibm9_H2Qvvbk2vdNKZUy2kYWJiTu7FCCvSzmwcHOoidlRu6pu_9XgARG11DqjnxyFk1qYuoEnk3DFOxkw7U71jQ2rrhUohmWk3QEHDm_vxlZitm9terkPMw2w" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-10 flex flex-col gap-8 pb-24">
          
          {/* Header & Actions */}
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#163422] tracking-tight">Atur Tiket</h3>
              <p className="text-[#424843] mt-2 max-w-lg text-sm leading-relaxed">
                Kelola harga, kuota harian, dan kebijakan operasional tiket masuk untuk pengalaman pengunjung yang optimal.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('admin-manajemen-tiket')}
                className="px-6 py-2.5 rounded-full text-[#1a1c1b] bg-[#e2e3e1] hover:bg-[#dce4de] transition-all font-semibold text-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 rounded-full bg-[#163422] text-white font-semibold shadow-xl shadow-[#163422]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm font-bold">save</span>
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Pricing & Hours */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Pricing Card */}
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/40">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#163422]">payments</span>
                  <h4 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#1a1c1b]">Harga Tiket</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#727972]">Reguler (Domestik)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727972] font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#adcfb4] transition-all font-bold text-[#1a1c1b] outline-none" 
                        type="text" 
                        value={hargaReguler}
                        onChange={(e) => setHargaReguler(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#727972]">Mancanegara</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727972] font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#adcfb4] transition-all font-bold text-[#1a1c1b] outline-none" 
                        type="text" 
                        value={hargaMancanegara}
                        onChange={(e) => setHargaMancanegara(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#727972]">Camping</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727972] font-medium">Rp</span>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#adcfb4] transition-all font-bold text-[#1a1c1b] outline-none" 
                        type="text" 
                        value={hargaCamping}
                        onChange={(e) => setHargaCamping(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Operational Hours & Quota */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hours */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/40">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-[#163422]">schedule</span>
                    <h4 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#1a1c1b]">Jam Operasional</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#727972]">Buka</label>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#adcfb4] transition-all font-medium outline-none text-[#1a1c1b]" 
                        type="time" 
                        value={jamBuka}
                        onChange={(e) => setJamBuka(e.target.value)}
                      />
                    </div>
                    <span className="mt-6 text-[#c2c8c0] font-bold">—</span>
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#727972]">Tutup</label>
                      <input 
                        className="w-full bg-[#f4f4f2] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#adcfb4] transition-all font-medium outline-none text-[#1a1c1b]" 
                        type="time" 
                        value={jamTutup}
                        onChange={(e) => setJamTutup(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                {/* Daily Quota */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/40">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#163422]">groups</span>
                    <h4 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#1a1c1b]">Kuota Harian</h4>
                  </div>
                  <p className="text-xs text-[#727972] mb-6">Batas maksimum pengunjung harian</p>
                  <div className="space-y-4">
                    <input 
                      className="w-full h-2 bg-[#e8e8e6] rounded-full appearance-none cursor-pointer accent-[#163422]" 
                      max="5000" 
                      min="100" 
                      type="range" 
                      value={kuota}
                      onChange={(e) => setKuota(e.target.value)}
                    />
                    <div className="flex justify-between items-center bg-[#f4f4f2] px-4 py-2 rounded-lg">
                      <span className="text-xs font-bold text-[#424843]">Batas Saat Ini</span>
                      <span className="text-lg font-['Plus_Jakarta_Sans'] font-extrabold text-[#163422]">
                        {Number(kuota).toLocaleString('id-ID')} <span className="text-xs font-medium text-[#727972]">Orang</span>
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column: Cancellation Policy & Decorative */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Cancellation Policy */}
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/40 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#163422]">event_busy</span>
                    <h4 className="text-xl font-['Plus_Jakarta_Sans'] font-bold text-[#1a1c1b]">Kebijakan Pembatalan</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isRefundable}
                      onChange={() => setIsRefundable(!isRefundable)}
                    />
                    <div className="w-11 h-6 bg-[#e2e3e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#163422]"></div>
                  </label>
                </div>
                <div className="flex-grow space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#727972]">Ketentuan Pengembalian Dana</label>
                  <textarea 
                    className="w-full bg-[#f4f4f2] border-none rounded-2xl p-6 focus:ring-2 focus:ring-[#adcfb4] transition-all text-sm leading-relaxed text-[#424843] outline-none resize-none" 
                    rows="6"
                    value={refundPolicy}
                    onChange={(e) => setRefundPolicy(e.target.value)}
                    disabled={!isRefundable}
                  />
                  <div className="p-4 bg-[#c8ebd0]/30 rounded-xl flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#163422] text-sm mt-1">info</span>
                    <p className="text-xs text-[#2f4d39] leading-tight">
                      Pastikan kebijakan ini selaras dengan regulasi pemerintah daerah setempat dan aturan pengelolaan wisata Jawa Barat.
                    </p>
                  </div>
                </div>
              </section>

              {/* Status Summary (Visual Ornament) */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/6] bg-[#163422] group">
                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-[#2d4b37] to-transparent"></div>
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
                  <h5 className="text-white font-['Plus_Jakarta_Sans'] font-bold">Ticket Availability: High</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FAB for mobile saves */}
      <button 
        onClick={handleSave}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#163422] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 md:hidden"
      >
        <span className="material-symbols-outlined filled-icon text-2xl">save</span>
      </button>
    </div>
  )
}