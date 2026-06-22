import React, { useState } from 'react'

export default function RingkasanAdmin({ navigate }) {
  const [activeNav, setActiveNav] = useState('ringkasan')

  const handleLogout = () => {
    navigate('admin-login')
  }

  const navItems = [
    { id: 'ringkasan', label: 'Ringkasan', icon: 'dashboard' },
    { id: 'manajemen-tiket', label: 'Manajemen Tiket', icon: 'confirmation_number' },
    { id: 'jadwal-pendakian', label: 'Jadwal Pendakian', icon: 'explore' },
    { id: 'manajemen-pengguna', label: 'Manajemen Pengguna', icon: 'group' },
    { id: 'laporan', label: 'Laporan', icon: 'analytics' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  // Stat cards - data kosong, siap dihubungkan ke backend
  const statCards = [
    {
      label: 'Total Pengunjung',
      value: '—',
      badge: null,
      iconBg: 'bg-primary-container',
      icon: 'groups',
      iconColor: 'text-primary',
    },
    {
      label: 'Tiket Terjual',
      value: '—',
      badge: null,
      iconBg: 'bg-secondary-container',
      icon: 'confirmation_number',
      iconColor: 'text-on-secondary-container',
    },
    {
      label: 'Pendaki Aktif',
      value: '—',
      badge: null,
      iconBg: 'bg-tertiary-container',
      icon: 'hiking',
      iconColor: 'text-tertiary-fixed',
      dark: false,
    },
    {
      label: 'Pendapatan',
      value: '—',
      badge: 'Bulan Ini',
      iconBg: 'bg-white/10',
      icon: 'payments',
      iconColor: 'text-white',
      dark: true,
    },
  ]

  // Bar chart data kosong (7 hari)
  const chartBars = [
    { day: 'SEN', heightClass: 'h-0', value: '—' },
    { day: 'SEL', heightClass: 'h-0', value: '—' },
    { day: 'RAB', heightClass: 'h-0', value: '—' },
    { day: 'KAM', heightClass: 'h-0', value: '—' },
    { day: 'JUM', heightClass: 'h-0', value: '—' },
    { day: 'SAB', heightClass: 'h-0', value: '—' },
    { day: 'MIN', heightClass: 'h-0', value: '—' },
  ]

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .filled-icon {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .nav-active {
          border-right: 3px solid #163422;
          background-color: #f4f4f2;
          color: #163422;
          font-weight: 700;
        }
        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Top App Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-8 w-full h-16 bg-[#f9f9f7]/90 backdrop-blur-md shadow-sm shadow-[#163422]/5">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-[#163422] font-['Plus_Jakarta_Sans'] tracking-tight">
            Gunung Galunggung Admin
          </span>
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-outline text-sm mr-2">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-64 font-body outline-none"
              placeholder="Cari data..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-300 relative">
            <span className="material-symbols-outlined text-[#163422]">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-300">
            <span className="material-symbols-outlined text-[#163422]">help_outline</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center ml-2 ring-2 ring-primary-container">
            <span className="material-symbols-outlined text-primary text-base filled-icon">admin_panel_settings</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-4 w-64 bg-[#f9f9f7] border-r border-stone-200/30 z-50">
          <div className="mb-10 px-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-on-primary text-xl filled-icon"
                >
                  terrain
                </span>
              </div>
              <span className="text-base font-black text-[#163422] font-['Plus_Jakarta_Sans'] leading-tight">
                Galunggung Admin
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold pl-11">
              Management Portal
            </p>
          </div>

          <nav className="flex-1 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left ${
                  activeNav === item.id
                    ? 'nav-active'
                    : 'text-stone-500 hover:text-[#163422] hover:bg-[#f4f4f2]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={
                    activeNav === item.id
                      ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
                      : {}
                  }
                >
                  {item.icon}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.1em] text-xs">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-stone-200/30 space-y-0.5">
            <button className="w-full bg-primary text-on-primary rounded-full py-3 px-6 mb-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Entri Baru
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-[#163422] transition-all duration-200">
              <span className="material-symbols-outlined">contact_support</span>
              <span className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.1em] text-xs">Bantuan</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-error transition-all duration-200"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.1em] text-xs">Keluar</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 min-h-screen">
          {/* Page Header */}
          <section className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                Ringkasan Dashboard
              </h1>
              <p className="text-on-surface-variant max-w-lg text-sm">
                Selamat datang kembali, Administrator. Berikut status terkini ekosistem pendakian Gunung Galunggung.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 rounded-full border border-outline-variant text-primary text-sm font-semibold hover:bg-surface-container-low transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-base">download</span>
                Unduh Laporan
              </button>
              <button className="px-6 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-base">refresh</span>
                Perbarui Data
              </button>
            </div>
          </section>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Card 1 - Total Pengunjung */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm shadow-primary/5 hover:scale-[1.02] transition-transform cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary-container rounded-xl">
                  <span className="material-symbols-outlined text-primary">groups</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-1">Total Pengunjung</p>
              <h2 className="text-2xl font-bold text-primary font-['Plus_Jakarta_Sans']">—</h2>
              <p className="text-[10px] text-outline mt-1">Data akan tersedia setelah terhubung backend</p>
            </div>

            {/* Card 2 - Tiket Terjual */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm shadow-primary/5 hover:scale-[1.02] transition-transform cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary-container rounded-xl">
                  <span className="material-symbols-outlined text-on-secondary-container">confirmation_number</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-1">Tiket Terjual</p>
              <h2 className="text-2xl font-bold text-primary font-['Plus_Jakarta_Sans']">—</h2>
              <p className="text-[10px] text-outline mt-1">Data akan tersedia setelah terhubung backend</p>
            </div>

            {/* Card 3 - Pendaki Aktif */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm shadow-primary/5 hover:scale-[1.02] transition-transform cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary-container rounded-xl">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">hiking</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-1">Pendaki Aktif</p>
              <h2 className="text-2xl font-bold text-primary font-['Plus_Jakarta_Sans']">—</h2>
              <p className="text-[10px] text-outline mt-1">Data akan tersedia setelah terhubung backend</p>
            </div>

            {/* Card 4 - Pendapatan (dark) */}
            <div className="bg-primary p-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <span className="material-symbols-outlined text-white">payments</span>
                </div>
                <span className="text-xs font-bold text-white px-2 py-1 bg-white/20 rounded-full">Bulan Ini</span>
              </div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">Pendapatan</p>
              <h2 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">—</h2>
              <p className="text-white/40 text-[10px] mt-1">Data akan tersedia setelah terhubung backend</p>
            </div>
          </div>

          {/* Charts & Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Activity Chart */}
            <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-primary font-['Plus_Jakarta_Sans']">Aktivitas Mingguan</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-bold bg-surface-container-highest rounded-full text-primary">
                    Pengunjung
                  </button>
                  <button className="px-3 py-1 text-xs font-bold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">
                    Tiket
                  </button>
                </div>
              </div>

              {/* Empty state chart */}
              <div className="relative h-64 w-full flex items-end justify-between px-4 pb-4 border-b border-outline-variant/20">
                {chartBars.map((bar) => (
                  <div key={bar.day} className="flex flex-col items-center gap-2 w-12">
                    <div className="w-full h-1 bg-primary/10 rounded-t-lg" />
                  </div>
                ))}
                {/* Empty state overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline/30 mb-2">bar_chart</span>
                  <p className="text-xs text-outline/50 font-medium">Data grafik akan muncul setelah terhubung backend</p>
                </div>
              </div>
              <div className="flex justify-between px-4 mt-3 text-[10px] font-bold text-outline tracking-widest">
                {chartBars.map((bar) => (
                  <span key={bar.day}>{bar.day}</span>
                ))}
              </div>
            </div>

            {/* Sidebar: Recent Activity + Status */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Recent Activity */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm shadow-primary/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Aktivitas Terkini</h3>
                  <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
                    more_vert
                  </span>
                </div>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <span className="material-symbols-outlined text-4xl text-outline/30">history</span>
                  <p className="text-xs text-outline/50 text-center font-medium">
                    Belum ada aktivitas terkini.<br/>Data akan muncul setelah terhubung backend.
                  </p>
                </div>

                <button className="w-full mt-4 py-2 text-xs font-bold text-primary border-t border-outline-variant hover:text-primary/70 transition-colors">
                  Lihat Semua Log
                </button>
              </div>

              {/* Status Kawasan Card */}
              <div className="bg-primary rounded-xl overflow-hidden relative min-h-[140px]">
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Status Kawasan</p>
                    <h4 className="text-white text-lg font-bold font-['Plus_Jakarta_Sans']">Memuat data...</h4>
                    <p className="text-white/50 text-[10px] mt-1">Status akan tersedia setelah terhubung backend</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></div>
                    <span className="text-white/80 text-[10px] font-medium">Sistem Monitoring Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jadwal Pendakian Table */}
          <section className="mt-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-primary font-['Plus_Jakarta_Sans']">Jadwal Pendakian Mendatang</h3>
              <div className="flex gap-2">
                <select className="bg-surface-container-low border-none rounded-full text-xs font-bold text-primary px-4 py-2 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                  <option>Semua Jalur</option>
                  <option>Cipanas</option>
                  <option>Guntur</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-outline-variant/30">
                  <tr className="text-[10px] font-bold text-outline uppercase tracking-widest">
                    <th className="pb-4 font-bold">ID Grup</th>
                    <th className="pb-4 font-bold">Pemimpin</th>
                    <th className="pb-4 font-bold">Jalur</th>
                    <th className="pb-4 font-bold">Anggota</th>
                    <th className="pb-4 font-bold">Tanggal</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state row */}
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <span className="material-symbols-outlined text-5xl text-outline/25">explore</span>
                        <p className="text-sm text-outline/50 font-medium">
                          Belum ada jadwal pendakian.
                        </p>
                        <p className="text-xs text-outline/40">
                          Data akan muncul setelah dihubungkan dengan backend Anda.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 group hover:gap-3 transition-all">
                Lihat Seluruh Jadwal
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
