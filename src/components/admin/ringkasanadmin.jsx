import React, { useState } from 'react'

export default function RingkasanAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('ringkasan')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') {
      // Stay on current page
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
      `}</style>
      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-[60] border-r border-outline-variant/10">
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${
                activeTab === item.id
                  ? 'bg-[#163422] text-[#f9f9f7] rounded-xl shadow-lg shadow-[#163422]/10'
                  : 'text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl'
              } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98`}
            >
              <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
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
      {/* Main Content Canvas */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10">
          <div className="flex items-center gap-8 w-1/3">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant outline-none" placeholder="Cari analitik, jadwal, atau pendaki..." type="text"/>
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
                <p className="font-bold text-primary leading-none">Admin Galunggung</p>
                <p className="text-[10px] text-secondary mt-1">Administrator Super</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                <img alt="Profil Administrator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP9kHefTuNYQnLdctRKENaSisXtamaIBxslPvK0m4yNQn31vIg34PQcZnSnY4PYnyrpptNh_2oNZuDiMXVDzcUseE6sHhuxfwgublcdO3lgYfPUAkD0eas6mMJBociC8Wp4s2J_v4jcVWlXw10p9-ovOlY6lp2CDjjivJDzQz8zOST_Qo9Z_qYjYSn3xA_wKyJBzMnMu8nnLzz_wQNXK-Pt6T4jr3oHYwHcfs_RWNrKMU8s2QqHJHFgm1IkA_HvzaJyZz6Dnur7g"/>
              </div>
            </div>
          </div>
        </header>
        {/* Content Area */}
        <div className="p-10 space-y-10">
          {/* Header Section */}
          <section className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-primary tracking-tight">Ringkasan Dasbor</h2>
              <p className="text-secondary body-lg mt-2 font-medium">Memantau kabut di atas Gunung Galunggung hari ini.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-container-highest transition-colors">Ekspor Laporan</button>
              <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:opacity-95 transition-opacity flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                24 Agt 2024
              </button>
            </div>
          </section>

          {/* KPI Cards Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Visitors */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Total Pengunjung</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">12.482</h3>
                <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +14%
                </span>
              </div>
              <p className="text-xs text-outline mt-6">vs. 30 hari sebelumnya</p>
            </div>

            {/* Tickets Sold */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Tiket Terjual</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">8.920</h3>
                <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +8,2%
                </span>
              </div>
              <p className="text-xs text-outline mt-6">Pemesanan aktif hari ini</p>
            </div>

            {/* Active Hikers */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>hiking</span>
              </div>
              <p className="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Pendaki Aktif</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-primary leading-none">154</h3>
                <span className="text-xs font-bold text-on-error-container bg-error-container px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">warning</span> Puncak
                </span>
              </div>
              <p className="text-xs text-outline mt-6">Saat ini di jalur</p>
            </div>

            {/* Revenue */}
            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-container/30 rounded-full blur-3xl"></div>
              <p className="text-label-md uppercase tracking-widest text-primary-fixed/60 font-bold mb-4">Pendapatan (USD)</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-display font-extrabold text-white leading-none">$42.1rb</h3>
                <span className="text-xs font-bold text-on-primary bg-primary-container px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">bolt</span> Tinggi
                </span>
              </div>
              <p className="text-xs text-primary-fixed/40 mt-6">Pertumbuhan bulanan +22%</p>
            </div>
          </section>

          {/* Main Layout: Table and Featured Item */}
          <section className="flex flex-col xl:flex-row gap-10">
            {/* Recent Activity Table */}
            <div className="flex-[2] bg-surface-container-low p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-headline font-bold text-primary">Log Pengunjung Terbaru</h4>
                <button className="text-primary text-sm font-semibold hover:underline">Lihat Semua Entri</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-label-md text-secondary uppercase tracking-widest">
                      <th className="pb-4 font-bold pl-4">Nama Pendaki</th>
                      <th className="pb-4 font-bold">ID Tiket</th>
                      <th className="pb-4 font-bold">Status Jalur</th>
                      <th className="pb-4 font-bold text-right pr-4">Waktu Masuk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                      <td className="py-4 pl-4 rounded-l-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary text-xs">AS</div>
                          <span className="font-semibold text-primary">Andi Saputra</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-secondary">#GNG-2024-001</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-tight">Di Jalur</span>
                      </td>
                      <td className="py-4 text-right pr-4 text-outline text-sm tabular-nums">06:45 AM</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                      <td className="py-4 pl-4 rounded-l-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-tertiary text-xs">ML</div>
                          <span className="font-semibold text-primary">Maria L.</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-secondary">#GNG-2024-002</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary text-[10px] font-extrabold uppercase tracking-tight">Selesai</span>
                      </td>
                      <td className="py-4 text-right pr-4 text-outline text-sm tabular-nums">07:12 AM</td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                      <td className="py-4 pl-4 rounded-l-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">RK</div>
                          <span className="font-semibold text-primary">Rizky Kurniawan</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-secondary">#GNG-2024-003</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-[10px] font-extrabold uppercase tracking-tight">Terdaftar</span>
                      </td>
                      <td className="py-4 text-right pr-4 text-outline text-sm tabular-nums">08:00 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Atmo-Gallery Featured Content */}
            <div className="flex-1 space-y-6">
              <div className="bg-surface-container-high rounded-2xl overflow-hidden relative min-h-[400px] flex items-end p-8 group">
                <img alt="Lanskap vulkanik" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD65VD0702nrAEhkieeaPJe7S5p5wYuW27KfrWkDG8MDWifuJjhyOOiBHQ0PIxdYSWResh5eUPlnh7KwECua2-GmDSAch7b7_ypulMh0-RS5ZQXB45OkuriAg_mJ5Bof-7y3O7uAZQJq2WdTQpKDAZTf6_KSjFZDOcIhRiWrV4-CUOMRMAvv2X0RUGFow1OxbPDR_lkXIujlkCayo0zdK969C-Z9BzUfuH3yQ9k6KEnu3jWtkU4yryt8qoUxlgdaboZOauz3yxYKg"/>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                <div className="relative z-10 text-on-primary">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Tampilan Langsung Kawah</span>
                  <h4 className="text-2xl font-display font-extrabold mt-2 leading-tight">Kondisi Atmosfer: Optimal</h4>
                  <p className="text-sm mt-4 text-primary-fixed/80 line-height-relaxed">Puncak saat ini mengalami jarak pandang yang jelas dengan kabut pagi yang lembut. Kondisi ideal untuk grup pendakian terpandu jam 10:00 pagi.</p>
                  <button className="mt-6 flex items-center gap-2 font-bold text-sm bg-surface text-primary px-6 py-2.5 rounded-full hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-sm">videocam</span> Lihat Siaran Langsung
                  </button>
                </div>
              </div>

              {/* Small Technical Field Note Card */}
              <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-secondary">thermostat</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Cuaca Puncak</p>
                  <p className="text-xl font-bold text-primary">18°C · Kelembapan 82%</p>
                  <p className="text-xs text-outline mt-1">Diperbarui 5 menit yang lalu</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Background Decorative Element (Asymmetric Bleed) */}
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      </main>
    </div>
  )
}