import React, { useState } from 'react'

export default function RingkasanAdmin({ navigate }) {
  const [activeNav, setActiveNav] = useState('ringkasan')

  const handleLogout = () => {
    navigate('admin-login')
  }

  const handleNavClick = (id) => {
    if (id === 'manajemen-tiket') {
      navigate('admin-manajemen-tiket')
    } else {
      setActiveNav(id)
    }
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

      {/* Top App Bar - DIPERBAIKI */}
      <header className="sticky top-0 z-40 ml-64 flex items-center justify-between px-8 h-16 bg-[#f9f9f7]/90 backdrop-blur-md shadow-sm shadow-[#163422]/5">
        
        {/* Kiri (Kosong untuk menyeimbangkan flexbox) */}
        <div className="flex-1"></div>

        {/* Tengah (Pencarian Dipusatkan) */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex items-center bg-[#eeeeec] px-4 py-1.5 rounded-full w-full max-w-md">
            <span className="material-symbols-outlined text-[#727972] text-sm mr-2">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-body outline-none"
              placeholder="Cari data..."
              type="text"
            />
          </div>
        </div>

        {/* Kanan (Notifikasi & Profil) */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <button className="p-2 rounded-full hover:bg-[#f4f4f2] transition-colors duration-300 relative">
            <span className="material-symbols-outlined text-[#163422]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#f4f4f2] transition-colors duration-300">
            <span className="material-symbols-outlined text-[#163422]">settings</span>
          </button>
          <div className="flex items-center gap-3 border-l border-stone-200 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#163422]">Admin Galunggung</p>
              <p className="text-[10px] text-[#727972]">Administrator Super</p>
            </div>
            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-[#2d4b37]">
              <img
                alt="Administrator profile photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEy3ZMPHYxyyhwS7DR5qkNP1ejh99n8ppgmWxaO1NYqUL9qlVJ3yHZ6DGb2l_e3sNvvZQpk-cLdamEdAhqDAqwnmRE3o6lpg4tQNZO1nstr38wZJCRhOD6r4Qg8xyOGf3OEC8k6EUYXxX1mAG_2ibm9_H2Qvvbk2vdNKZUy2kYWJiTu7FCCvSzmwcHOoidlRu6pu_9XgARG11DqjnxyFk1qYuoEnk3DFOxkw7U71jQ2rrhUohmWk3QEHDm_vxlZitm9terkPMw2w"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
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
                  activeNav === item.id
                    ? 'bg-[#163422] text-white font-semibold'
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

          <div className="mt-auto pt-4">
            <button
              onClick={handleLogout}
              className="w-full bg-[#ba1a1a] text-white rounded-full py-3 px-6 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#ba1a1a]/90 transition-all active:scale-[0.98] shadow-sm font-['Plus_Jakarta_Sans']"
            >
              logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 min-h-screen">
          {activeNav === 'ringkasan' && (
            <>
              {/* Page Header */}
              <section className="mb-8 flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#163422] tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Ringkasan Dashboard
                  </h1>
                  <p className="text-[#424843] max-w-lg text-sm">
                    Memantau kabut di atas Gunung Galunggung hari ini.
                  </p>
                </div>
                <div>
                  <button className="px-5 py-2.5 rounded-full bg-[#163422] text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-2 shadow-sm font-['Plus_Jakarta_Sans']">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    24 Agt 2024
                  </button>
                </div>
              </section>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Card 1 - Total Pengunjung */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/20 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[#727972] text-[10px] font-bold uppercase tracking-widest mb-2">Total Pengunjung</p>
                      <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-extrabold text-[#163422] font-['Plus_Jakarta_Sans']">12.482</h2>
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#c8ebd0] text-[#022110]">
                          <span className="material-symbols-outlined text-[10px]">trending_up</span>
                          +14%
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#727972]/30 text-3xl">person_add</span>
                  </div>
                </div>

                {/* Card 2 - Tiket Terjual */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/20 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[#727972] text-[10px] font-bold uppercase tracking-widest mb-2">Tiket Terjual</p>
                      <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-extrabold text-[#163422] font-['Plus_Jakarta_Sans']">8.920</h2>
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#c8ebd0] text-[#022110]">
                          <span className="material-symbols-outlined text-[10px]">trending_up</span>
                          +8,2%
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#727972]/30 text-3xl">confirmation_number</span>
                  </div>
                  <p className="text-[10px] text-[#727972]">Pemesanan aktif hari ini</p>
                </div>

                {/* Card 3 - Pendaki Aktif */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/20 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[#727972] text-[10px] font-bold uppercase tracking-widest mb-2">Pendaki Aktif</p>
                      <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-extrabold text-[#163422] font-['Plus_Jakarta_Sans']">154</h2>
                        <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                          <span className="material-symbols-outlined text-[10px] filled-icon">warning</span>
                          Puncak
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#727972]/30 text-3xl">hiking</span>
                  </div>
                  <p className="text-[10px] text-[#727972]">Saat ini di jalur</p>
                </div>

                {/* Card 4 - Pendapatan */}
                <div className="bg-[#163422] p-6 rounded-2xl shadow-lg shadow-[#163422]/20 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Pendapatan</p>
                      <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight">Rp.500.000</h2>
                    </div>
                    <span className="material-symbols-outlined text-white/30 text-3xl">payments</span>
                  </div>
                  <p className="text-[10px] text-white/60">Pertumbuhan bulanan <span className="font-bold text-[#adcfb4]">+22%</span></p>
                </div>
              </div>

              {/* Lower Section (Logs and Crater Live) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Visitor Logs */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/20 shadow-sm">
                  <h3 className="text-lg font-bold text-[#163422] font-['Plus_Jakarta_Sans'] mb-6">Log Pengunjung Terbaru</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] font-extrabold text-[#727972] uppercase tracking-wider border-b border-[#eeeeec] pb-3">
                          <th className="pb-4 font-bold">Nama Pendaki</th>
                          <th className="pb-4 font-bold">ID Tiket</th>
                          <th className="pb-4 font-bold text-center">Status Jalur</th>
                          <th className="pb-4 font-bold text-right">Waktu Masuk</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eeeeec]/50">
                        {/* Row 1 */}
                        <tr className="group hover:bg-[#f4f4f2]/20 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-[#f1e1c4] text-[#221a09] flex items-center justify-center text-[10px] font-bold">
                                AS
                              </div>
                              <span className="text-xs font-semibold text-[#1a1c1b]">Andi Saputra</span>
                            </div>
                          </td>
                          <td className="py-4 text-xs font-semibold text-[#727972]">#GNG-2024-001</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[9px] font-bold bg-[#c8ebd0]/40 text-[#022110]">
                              DI JALUR
                            </span>
                          </td>
                          <td className="py-4 text-xs text-right font-medium text-[#424843]">06:45 AM</td>
                        </tr>

                        {/* Row 2 */}
                        <tr className="group hover:bg-[#f4f4f2]/20 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-[#adcfb4] text-[#022110] flex items-center justify-center text-[10px] font-bold">
                                ML
                              </div>
                              <span className="text-xs font-semibold text-[#1a1c1b]">Maria L.</span>
                            </div>
                          </td>
                          <td className="py-4 text-xs font-semibold text-[#727972]">#GNG-2024-002</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[9px] font-bold bg-[#f1e1c4] text-[#504531]">
                              SELESAI
                            </span>
                          </td>
                          <td className="py-4 text-xs text-right font-medium text-[#424843]">07:12 AM</td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="group hover:bg-[#f4f4f2]/20 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-[#dce4de] text-[#161d19] flex items-center justify-center text-[10px] font-bold">
                                RK
                              </div>
                              <span className="text-xs font-semibold text-[#1a1c1b]">Rizky Kurniawan</span>
                            </div>
                          </td>
                          <td className="py-4 text-xs font-semibold text-[#727972]">#GNG-2024-003</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[9px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                              TERDAFTAR
                            </span>
                          </td>
                          <td className="py-4 text-xs text-right font-medium text-[#424843]">08:00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Crater Live View Widget */}
                <div className="lg:col-span-1 rounded-2xl overflow-hidden relative min-h-[360px] shadow-sm border border-stone-200/10 flex flex-col justify-between p-6 text-white group">
                  <div className="absolute inset-0 z-0">
                    <img 
                      alt="Mount Galunggung landscape live preview" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgrh8UH49VRI7WW78tGrBZF32i1q-64yTdY4MhwL5igTLk84LbpXpAwD3MimIkhXZc57Q-Db464DkSFO-W0nvIfpgqtLTFTzHj_PlcOYctjttujrZU1r-xzjYzThxMXm0kVX17z-y4zRFOL0Pcltv1sJQQKbZDCHprgshIFOgiXU30V94Ekin6zxDk2IhZskfEDQ09ezvNKfIk6z5GAJF0tVsoktKJQHUQctq2zQnNuis5LjCrfd4yLkdvZtklwOfuB8K5qcEHg" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[#adcfb4] text-[9px] font-bold uppercase tracking-widest mb-1">Tampilan Langsung Kawah</p>
                    <h4 className="text-xl font-bold font-['Plus_Jakarta_Sans'] leading-snug">Kondisi Atmosfer: Optimal</h4>
                  </div>

                  <div className="relative z-10 space-y-4">
                    <p className="text-white/80 text-xs leading-relaxed font-light">
                      Puncak saat ini mengalami jarak pandang yang jelas dengan kabut pagi yang lembut. Kondisi ideal untuk grup pendakian terpandu jam 10:00 pagi.
                    </p>
                    <button className="w-full py-3 bg-white text-[#1a1c1b] rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/95 transition-all shadow-md active:scale-[0.98]">
                      <span className="material-symbols-outlined text-sm">videocam</span>
                      Lihat Siaran Langsung
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeNav === 'manajemen-tiket' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Manajemen Tiket
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Kelola tiket masuk pengunjung, status verifikasi, dan pembatalan pesanan.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                  <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-80">
                    <span className="material-symbols-outlined text-outline text-sm mr-2">search</span>
                    <input
                      className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                      placeholder="Cari Tiket (ID, Nama)..."
                      type="text"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="bg-surface-container-low border-none rounded-full text-xs font-bold text-primary px-4 py-2 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                      <option>Semua Status</option>
                      <option>Selesai</option>
                      <option>Menunggu Pembayaran</option>
                      <option>Batal</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/30">
                      <tr className="text-[10px] font-bold text-outline uppercase tracking-widest">
                        <th className="pb-4 font-bold">ID Tiket</th>
                        <th className="pb-4 font-bold">Nama</th>
                        <th className="pb-4 font-bold">Tanggal</th>
                        <th className="pb-4 font-bold">Jumlah</th>
                        <th className="pb-4 font-bold">Total Harga</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined text-5xl text-outline/25">confirmation_number</span>
                            <p className="text-sm text-outline/50 font-medium">Belum ada data tiket.</p>
                            <p className="text-xs text-outline/40">Data tiket akan terisi otomatis setelah terintegrasi database.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'jadwal-pendakian' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Jadwal Pendakian
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Atur kuota, monitoring pendaki naik/turun, dan kelola rute jalur pendakian Gunung Galunggung.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-primary font-['Plus_Jakarta_Sans']">Jadwal Keberangkatan</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/30">
                      <tr className="text-[10px] font-bold text-outline uppercase tracking-widest">
                        <th className="pb-4 font-bold">ID Jadwal</th>
                        <th className="pb-4 font-bold">Jalur</th>
                        <th className="pb-4 font-bold">Ketua Regu</th>
                        <th className="pb-4 font-bold">Jumlah Anggota</th>
                        <th className="pb-4 font-bold">Tanggal Naik</th>
                        <th className="pb-4 font-bold">Tanggal Turun</th>
                        <th className="pb-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined text-5xl text-outline/25">explore</span>
                            <p className="text-sm text-outline/50 font-medium">Belum ada jadwal keberangkatan.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'manajemen-pengguna' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Manajemen Pengguna
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Kelola akun admin, pemandu lokal, dan hak akses portal sistem.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-primary font-['Plus_Jakarta_Sans']">Daftar Pengguna Portal</h3>
                  <button className="px-5 py-2 bg-primary text-on-primary text-xs font-semibold rounded-full hover:shadow-md transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Tambah Pengguna
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/30">
                      <tr className="text-[10px] font-bold text-outline uppercase tracking-widest">
                        <th className="pb-4 font-bold">Nama</th>
                        <th className="pb-4 font-bold">Email</th>
                        <th className="pb-4 font-bold">Role</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4 font-semibold text-sm">Administrator</td>
                        <td className="py-4 text-xs text-on-surface-variant">admin@galunggung.id</td>
                        <td className="py-4 text-xs font-bold text-primary">Super Admin</td>
                        <td className="py-4">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">Aktif</span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-stone-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'kotak-masuk' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Kotak Masuk
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Pertanyaan, keluhan, dan saran yang dikirimkan oleh pengunjung melalui form Kontak.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/30">
                      <tr className="text-[10px] font-bold text-outline uppercase tracking-widest">
                        <th className="pb-4 font-bold">Pengirim</th>
                        <th className="pb-4 font-bold">Subjek</th>
                        <th className="pb-4 font-bold">Pesan</th>
                        <th className="pb-4 font-bold">Tanggal</th>
                        <th className="pb-4 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={5} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined text-5xl text-outline/25">inbox</span>
                            <p className="text-sm text-outline/50 font-medium">Kotak masuk kosong.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'manajemen-galeri' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Manajemen Galeri
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Unggah, edit, dan hapus foto/video promosi keindahan alam Gunung Galunggung.
                  </p>
                </div>
                <button className="px-5 py-2 bg-primary text-on-primary text-xs font-semibold rounded-full hover:shadow-md transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  Unggah Media
                </button>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="material-symbols-outlined text-5xl text-outline/25">photo_library</span>
                  <p className="text-sm text-outline/50 font-medium">Belum ada koleksi foto/video.</p>
                </div>
              </section>
            </>
          )}

          {activeNav === 'laporan' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Laporan
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Analisis data statistik keuangan dan tren jumlah pengunjung Gunung Galunggung.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5">
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="material-symbols-outlined text-5xl text-outline/25">analytics</span>
                  <p className="text-sm text-outline/50 font-medium">Laporan belum tersedia.</p>
                </div>
              </section>
            </>
          )}

          {activeNav === 'pengaturan' && (
            <>
              <section className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                    Pengaturan
                  </h1>
                  <p className="text-on-surface-variant max-w-lg text-sm">
                    Konfigurasi portal, kuota harian, status operasional kawasan, dan harga tiket masuk.
                  </p>
                </div>
              </section>
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm shadow-primary/5 max-w-2xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Kuota Harian Pendaki</label>
                      <input className="w-full px-4 py-3 bg-surface-container-low border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm" type="number" defaultValue={500} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Harga Tiket Masuk (IDR)</label>
                      <input className="w-full px-4 py-3 bg-surface-container-low border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm" type="number" defaultValue={25000} />
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-full hover:shadow-md transition-all">Simpan Konfigurasi</button>
                </form>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}