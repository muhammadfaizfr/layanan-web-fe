import React, { useState } from 'react'

export default function JadwalPendakianAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('jadwal-pendakian')

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
      // Stay here
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

  const [days, setDays] = useState([
    { dayNum: 1, currentCount: 142, maxCount: 200 },
    { dayNum: 2, currentCount: 110, maxCount: 200 },
    { dayNum: 3, currentCount: 198, maxCount: 200 },
    { dayNum: 4, currentCount: 94, maxCount: 200 },
    { dayNum: 5, currentCount: 94, maxCount: 200 },
    { dayNum: 6, currentCount: 200, maxCount: 200 },
    { dayNum: 7, currentCount: 55, maxCount: 200 },
    { dayNum: 8, currentCount: 128, maxCount: 200 },
    { dayNum: 9, currentCount: 160, maxCount: 200 },
    { dayNum: 10, currentCount: 88, maxCount: 200 },
    { dayNum: 11, currentCount: 145, maxCount: 200 },
    { dayNum: 12, currentCount: 200, maxCount: 200 },
    { dayNum: 13, currentCount: 200, maxCount: 200 },
    { dayNum: 14, currentCount: 200, maxCount: 200 },
    { dayNum: 15, currentCount: 200, maxCount: 200 },
    { dayNum: 16, currentCount: 200, maxCount: 200 },
    { dayNum: 17, currentCount: 200, maxCount: 200 },
    { dayNum: 18, currentCount: 200, maxCount: 200 },
    { dayNum: 19, currentCount: 200, maxCount: 200 },
    { dayNum: 20, currentCount: 200, maxCount: 200 },
    { dayNum: 21, currentCount: 200, maxCount: 200 },
    { dayNum: 22, currentCount: 200, maxCount: 200 },
    { dayNum: 23, currentCount: 200, maxCount: 200 },
    { dayNum: 24, currentCount: 200, maxCount: 200 },
    { dayNum: 25, currentCount: 200, maxCount: 200 },
    { dayNum: 26, currentCount: 200, maxCount: 200 },
    { dayNum: 27, currentCount: 200, maxCount: 200 },
    { dayNum: 28, currentCount: 200, maxCount: 200 },
    { dayNum: 29, currentCount: 200, maxCount: 200 },
    { dayNum: 30, currentCount: 200, maxCount: 200 },
  ])

  const [selectedDayNum, setSelectedDayNum] = useState(3)
  const [maxCountInput, setMaxCountInput] = useState(200)

  const handleSelectDay = (day) => {
    setSelectedDayNum(day.dayNum)
    setMaxCountInput(day.maxCount)
  }

  const handleUpdateSchedule = (e) => {
    e.preventDefault()
    setDays(prevDays => prevDays.map(d => {
      if (d.dayNum === selectedDayNum) {
        return { ...d, maxCount: Number(maxCountInput) }
      }
      return d
    }))
  }

  // May 1st starts on Tuesday (SEL) in this layout.
  // Tuesday (1) -> (1 + 1) % 7 = 2
  // Saturday (5) -> (5 + 1) % 7 = 6
  // Sunday (6) -> (6 + 1) % 7 = 0
  const isWeekend = (dayNum) => {
    const val = (dayNum + 1) % 7
    return val === 6 || val === 0
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
                } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98`}
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
          <div className="flex items-center gap-8 w-1/3">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant outline-none" placeholder="Cari tanggal atau acara..." type="text"/>
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
                <img alt="Profil Administrator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"/>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 grid grid-cols-12 gap-8">
          {/* Calendar Grid Container */}
          <div className="col-span-9 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-display font-extrabold text-primary tracking-tight">Mei 2026</h2>
                <p className="text-secondary text-sm font-medium mt-1">Ketersediaan jalur bulanan dan ringkasan kapasitas</p>
              </div>
              {/* View Toggle */}
              <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl">
                <button className="px-5 py-2 bg-surface-container-lowest shadow-sm rounded-lg text-xs font-bold text-primary">Bulanan</button>
                <button className="px-5 py-2 hover:bg-surface-container-high rounded-lg text-xs font-bold text-secondary transition-all">Mingguan</button>
                <button className="px-5 py-2 hover:bg-surface-container-high rounded-lg text-xs font-bold text-secondary transition-all">Harian</button>
              </div>
            </div>

            {/* Calendar Weekday Headers */}
            <div className="grid grid-cols-7 mb-4">
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase">Sen</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase">Sel</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase">Rab</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase">Kam</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase">Jum</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase text-error">Sab</div>
              <div className="text-center py-2 text-[10px] font-bold text-secondary tracking-widest uppercase text-error">Min</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden border border-outline-variant/20">
              {/* Empty Cell: May 2026 starts on Tuesday in this mock, so 1 empty cell on Monday */}
              <div className="bg-surface-container-low/30 h-32 p-4"></div>

              {days.map((day) => {
                const isSelected = day.dayNum === selectedDayNum
                const isFull = day.currentCount >= day.maxCount
                const isWarning = !isFull && (day.maxCount - day.currentCount <= 10)
                const dayWeekend = isWeekend(day.dayNum)

                let cardClasses = "h-32 p-4 flex flex-col justify-between transition-all cursor-pointer relative select-none "
                if (isSelected) {
                  cardClasses += "bg-surface-container-lowest border-2 border-primary/30"
                } else {
                  cardClasses += "bg-surface-container-lowest hover:bg-surface-container-low/50"
                }

                // Days 6, 12, 13, and 14 to 30 are red text & max count, matching the image.
                const isRedText = isFull || day.dayNum === 6 || day.dayNum === 12 || day.dayNum === 13 || day.dayNum >= 14
                
                const dayNumColor = isRedText || dayWeekend
                  ? "text-error font-extrabold" 
                  : (isSelected ? "text-primary font-extrabold underline underline-offset-4" : "text-[#695d47]")
                
                const countColor = isRedText ? "text-error font-extrabold" : "text-[#163422] font-semibold"

                return (
                  <div
                    key={day.dayNum}
                    onClick={() => handleSelectDay(day)}
                    className={cardClasses}
                  >
                    {/* Top part: Day Number and Selected Day Dot */}
                    <div className="flex justify-between items-start w-full">
                      <span className={`text-sm ${dayNumColor}`}>{day.dayNum}</span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-error block"></span>
                      )}
                    </div>

                    {/* Bottom part: Capacity Indicator and Count */}
                    <div className="flex items-center gap-1.5 mt-auto">
                      <span className={`w-1.5 h-1.5 rounded-full ${isRedText ? 'bg-error' : 'bg-[#466550]'}`}></span>
                      <span className={`text-[10px] ${countColor}`}>{day.currentCount}/{day.maxCount}</span>
                    </div>
                  </div>
                )
              })}

              {/* Empty cells at the end to make it a perfect 5x7 rectangle */}
              <div className="bg-surface-container-low/30 h-32 p-4"></div>
              <div className="bg-surface-container-low/30 h-32 p-4"></div>
              <div className="bg-surface-container-low/30 h-32 p-4"></div>
              <div className="bg-surface-container-low/30 h-32 p-4"></div>
            </div>
          </div>

          {/* Right Sidebar editor */}
          <div className="col-span-3">
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">edit_calendar</span>
                Kapasitas Harian
              </h3>
              <form onSubmit={handleUpdateSchedule} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#695d47] block mb-2">Tanggal Terpilih</label>
                  <div className="bg-surface-container-low px-4 py-3.5 rounded-xl font-bold text-primary text-sm text-center">
                    {selectedDayNum} Mei 2026
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#695d47] block mb-2">Batas Maksimum</label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-sm outline-none text-[#1a1c1b] font-medium"
                    type="number"
                    value={maxCountInput}
                    onChange={(e) => setMaxCountInput(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#163422] hover:bg-[#0f2418] text-[#f9f9f7] rounded-full font-bold text-sm transition-all active:scale-98 shadow-md"
                >
                  Perbarui Jadwal
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}