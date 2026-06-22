import React, { useState } from 'react'

export default function ManajemenTiketAdmin({ navigate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPageNum, setCurrentPageNum] = useState(1)

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
    if (id === 'ringkasan') {
      navigate('admin-ringkasan')
    } else if (id === 'manajemen-tiket') {
      // Stay here
    } else {
      // Navigate to ringkasan but we pass custom local tab if needed, 
      // or we can just redirect to ringkasan page
      navigate('admin-ringkasan')
    }
  }

  // Initial tickets list from the design image
  const [tickets, setTickets] = useState([
    {
      id: 'GAL-2023-8841',
      name: 'Aditya Surya',
      initials: 'AS',
      avatarBg: 'bg-[#adcfb4]',
      avatarText: 'text-[#022110]',
      type: 'Pendakian Puncak',
      date: '28 Okt 2023',
      status: 'Lunas',
    },
    {
      id: 'GAL-2023-8842',
      name: 'Elena Novak',
      initials: 'EN',
      avatarBg: 'bg-[#f1e1c4]',
      avatarText: 'text-[#221a09]',
      type: 'Penjelajah Kawah',
      date: '28 Okt 2023',
      status: 'Lunas',
    },
    {
      id: 'GAL-2023-8843',
      name: 'Rizky Mahendra',
      initials: 'RM',
      avatarBg: 'bg-[#dce4de]',
      avatarText: 'text-[#161d19]',
      type: 'Tiket Standar',
      date: '29 Okt 2023',
      status: 'Menunggu',
    },
    {
      id: 'GAL-2023-8844',
      name: 'James Dalton',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      type: 'Pendakian Puncak',
      date: '30 Okt 2023',
      status: 'Lunas',
    },
    {
      id: 'GAL-2023-8845',
      name: 'Linh Hoang',
      initials: 'LH',
      avatarBg: 'bg-[#28302b]',
      avatarText: 'text-[#dce4de]',
      type: 'Penjelajah Kawah',
      date: '31 Okt 2023',
      status: 'Lunas',
    },
  ])

  // Delete ticket action
  const handleDelete = (id) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tiket ${id}?`)) {
      setTickets(tickets.filter(t => t.id !== id))
    }
  }

  // Confirm/Verify pending ticket action
  const handleVerify = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Lunas' } : t))
  }

  const filteredTickets = tickets.filter(ticket => 
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] min-h-screen font-body flex">
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
            <span className="text-lg font-black text-[#163422] font-['Plus_Jakarta_Sans'] leading-tight">
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
                style={
                  item.id === 'manajemen-tiket'
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

      {/* Content wrapper to shift past fixed sidebar */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-8 w-full h-16 bg-[#f9f9f7]/90 backdrop-blur-md shadow-sm shadow-[#163422]/5">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-[#163422] font-['Plus_Jakarta_Sans'] tracking-tight">
              Gunung Galunggung Admin
            </span>
            <div className="hidden md:flex items-center bg-[#eeeeec] px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[#727972] text-sm mr-2">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-64 font-body outline-none"
                placeholder="Cari data..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
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

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {/* Header Section */}
          <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#163422] tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                Manajemen Tiket
              </h1>
              <p className="text-[#424843] max-w-2xl text-sm leading-relaxed">
                Pantau akses ke kawah dan jalur pendakian Gunung Galunggung. Pantau pembaruan status waktu nyata dan dokumentasi pengunjung.
              </p>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button className="px-5 py-2.5 rounded-full bg-[#ebdcb9] text-[#221a09] text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm font-['Plus_Jakarta_Sans']">
                <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                Pindai Tiket
              </button>
              <button className="px-5 py-2.5 rounded-full bg-[#163422] text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-2 shadow-sm font-['Plus_Jakarta_Sans']">
                <span className="material-symbols-outlined text-sm">tune</span>
                Atur Tiket
              </button>
            </div>
          </section>

          {/* Date Filter Card */}
          <div className="flex items-center gap-4 bg-[#eeeeec]/50 border border-stone-200/10 p-4 rounded-2xl w-fit mb-8">
            <div className="p-2 bg-white rounded-xl shadow-sm text-[#163422] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#727972] uppercase tracking-wider mb-0.5">Rentang Tanggal</p>
              <p className="text-xs font-bold text-[#163422]">24 mei 2026 - 31 mei 2026</p>
            </div>
          </div>

          {/* Main Table Card */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/20 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-extrabold text-[#727972] uppercase tracking-wider border-b border-[#eeeeec] pb-3">
                    <th className="pb-4 font-bold">ID Tiket</th>
                    <th className="pb-4 font-bold">Nama Pengunjung</th>
                    <th className="pb-4 font-bold">Jenis Tiket</th>
                    <th className="pb-4 font-bold">Tanggal</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeeeec]/60">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="group hover:bg-[#f4f4f2]/20 transition-colors">
                      <td className="py-4 text-xs font-bold text-[#1a1c1b]">{ticket.id}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {ticket.avatar ? (
                            <img
                              src={ticket.avatar}
                              alt={ticket.name}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-200"
                            />
                          ) : (
                            <div className={`w-7 h-7 rounded-full ${ticket.avatarBg} ${ticket.avatarText} flex items-center justify-center text-[10px] font-bold`}>
                              {ticket.initials}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-[#1a1c1b]">{ticket.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-[#424843]">{ticket.type}</td>
                      <td className="py-4 text-xs text-[#424843]">{ticket.date}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                            ticket.status === 'Lunas'
                              ? 'bg-[#c8ebd0]/50 text-[#022110]'
                              : 'bg-[#f1e1c4] text-[#504531]'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            ticket.status === 'Lunas' ? 'bg-[#466550]' : 'bg-[#6f634c]'
                          }`}></span>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          {ticket.status === 'Menunggu' && (
                            <button 
                              onClick={() => handleVerify(ticket.id)}
                              className="w-7 h-7 rounded-full bg-[#c8ebd0]/30 hover:bg-[#c8ebd0]/60 text-[#022110] flex items-center justify-center transition-colors"
                              title="Konfirmasi Pembayaran"
                            >
                              <span className="material-symbols-outlined text-base">check_circle</span>
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(ticket.id)}
                            className="w-7 h-7 rounded-full bg-[#ffdad6]/40 hover:bg-[#ffdad6]/80 text-[#ba1a1a] flex items-center justify-center transition-colors"
                            title="Hapus Tiket"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <span className="material-symbols-outlined text-5xl text-outline/25">confirmation_number</span>
                          <p className="text-sm text-outline/50 font-medium">Data tiket tidak ditemukan.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Footer */}
            <div className="mt-6 pt-4 border-t border-[#eeeeec] flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-[#727972]">
                Menampilkan 1 sampai {filteredTickets.length} dari {tickets.length} hasil
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPageNum(1)}
                  className="w-8 h-8 rounded-full border border-stone-200 text-stone-500 hover:bg-[#f4f4f2] flex items-center justify-center text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#163422] text-white flex items-center justify-center text-xs font-bold">
                  1
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[#f4f4f2] text-stone-700 flex items-center justify-center text-xs">
                  2
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-[#f4f4f2] text-stone-700 flex items-center justify-center text-xs">
                  3
                </button>
                <button 
                  onClick={() => setCurrentPageNum(2)}
                  className="w-8 h-8 rounded-full border border-stone-200 text-stone-500 hover:bg-[#f4f4f2] flex items-center justify-center text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Bento Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Card 1: Pendapatan Harian */}
            <div className="bg-[#163422] text-white p-6 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform cursor-default">
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-2">Pendapatan Harian</p>
              <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight mb-2">Rp4,280.00</h2>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#adcfb4]">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span>12% dari kemarin</span>
              </div>
            </div>

            {/* Stats Card 2: Tiket Check-in */}
            <div className="bg-[#615545] text-white p-6 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform cursor-default">
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-2">Tiket Check-In</p>
              <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight mb-2">342</h2>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-200">
                <span className="material-symbols-outlined text-xs">groups</span>
                <span>85% kapasitas tercapai</span>
              </div>
            </div>

            {/* Stats Card 3: Permintaan Menunggu */}
            <div className="bg-[#eeeeec] text-[#1a1c1b] p-6 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform cursor-default border border-stone-200/20">
              <p className="text-[#727972] text-[9px] font-bold uppercase tracking-widest mb-2">Permintaan Menunggu</p>
              <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight mb-2">1</h2>
              <div className="flex items-center gap-1.5 text-[10px] text-[#ba1a1a] font-bold">
                <span className="material-symbols-outlined text-xs">warning_amber</span>
                <span>Membutuhkan perhatian</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
