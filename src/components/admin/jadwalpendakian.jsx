import React, { useState, useEffect } from 'react'
import slotPendakianService from '../../services/slotPendakianService'
import authService from '../../services/authService'

export default function JadwalPendakianAdmin({ navigate }) {
  const [activeTab, setActiveTab] = useState('jadwal-pendakian')

  const handleNavClick = (page) => {
    setActiveTab(page)
    if (page === 'ringkasan') navigate('admin-ringkasan')
    else if (page === 'manajemen-tiket') navigate('admin-manajemen-tiket')
    else if (page === 'jadwal-pendakian') { /* Stay here */ }
    else if (page === 'manajemen-pengguna') navigate('admin-manajemen-pengguna')
    else if (page === 'manajemen-galeri') navigate('admin-manajemen-galeri')
    else if (page === 'kotak-masuk') navigate('admin-kotak-masuk')
    else if (page === 'laporan') navigate('admin-laporan')
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
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Current Calendar View State
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
    setSelectedDayNum(null)
  }
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
    setSelectedDayNum(null)
  }

  const fetchSlot = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await slotPendakianService.getAll()
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      
      const normalized = list.map((item) => {
        let mDateStr = item.tanggal_pendakian || item.tanggal
        let d = new Date(mDateStr)
        if(isNaN(d.getTime())) d = new Date()
        
        return {
          id: item.id,
          dateStr: mDateStr,
          dayNum: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
          maxCount: item.kuota_maksimal ?? item.max_count ?? item.kapasitas ?? 200,
          currentCount: (item.kuota_maksimal !== undefined && item.kuota_tersedia !== undefined) 
                        ? item.kuota_maksimal - item.kuota_tersedia 
                        : (item.current_count ?? item.jumlah_peserta ?? 0),
          rawData: item
        }
      })
      setSlots(normalized)
    } catch (err) {
      setError(err.userMessage || 'Gagal memuat data slot pendakian.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlot()
  }, [])

  const [selectedDayNum, setSelectedDayNum] = useState(null)
  const [maxCountInput, setMaxCountInput] = useState(200)

  const handleSelectDay = (dayNum, existingSlot) => {
    setSelectedDayNum(dayNum)
    setMaxCountInput(existingSlot ? existingSlot.maxCount : 200)
    setSaveSuccess(false)
  }

  const handleUpdateSchedule = async (e) => {
    e.preventDefault()
    if (!selectedDayNum) return

    setSaving(true)
    setError('')
    setSaveSuccess(false)
    
    try {
      const existingSlot = slots.find(s => s.dayNum === selectedDayNum && s.month === currentMonth && s.year === currentYear)
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDayNum).padStart(2, '0')}`
      
      const payload = {
        tanggal_pendakian: dateStr,
        kuota_maksimal: Number(maxCountInput),
        id_admin: 1 // fallback
      }
      
      // Try to get actual admin ID from localStorage
      const adminStr = localStorage.getItem('admin_data') || localStorage.getItem('user_data')
      if (adminStr) {
          try {
              const adminData = JSON.parse(adminStr)
              if (adminData.id_admin || adminData.id) payload.id_admin = adminData.id_admin || adminData.id
          } catch(e){}
      }

      if (existingSlot && existingSlot.id) {
        let diff = Number(maxCountInput) - existingSlot.maxCount
        let currentTersedia = existingSlot.rawData.kuota_tersedia !== undefined 
            ? existingSlot.rawData.kuota_tersedia 
            : existingSlot.maxCount - existingSlot.currentCount
            
        payload.kuota_tersedia = Math.max(0, currentTersedia + diff)
        await slotPendakianService.update(existingSlot.id, payload)
      } else {
        payload.kuota_tersedia = Number(maxCountInput)
        await slotPendakianService.create(payload)
      }
      
      await fetchSlot()
      setSaveSuccess(true)
    } catch (err) {
      setError(err.userMessage || 'Gagal menyimpan jadwal.')
    } finally {
      setSaving(false)
    }
  }

  // Calendar Calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const isWeekend = (dayNum) => {
    const d = new Date(currentYear, currentMonth, dayNum).getDay()
    return d === 0 || d === 6
  }

  const gridCells = []
  for (let i = 0; i < startDay; i++) {
    gridCells.push(<div key={`empty-start-${i}`} className="bg-surface-container-low/30 h-32 p-4 border-r border-b border-outline-variant/20"></div>)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const existingSlot = slots.find(s => s.dayNum === d && s.month === currentMonth && s.year === currentYear)
    const isSelected = selectedDayNum === d
    
    let maxC = existingSlot ? existingSlot.maxCount : 200
    let curC = existingSlot ? existingSlot.currentCount : 0
    let isFull = curC >= maxC && maxC > 0
    let dayWknd = isWeekend(d)
    
    let cardClasses = "h-32 p-4 flex flex-col justify-between transition-all cursor-pointer relative select-none border-r border-b border-outline-variant/20 "
    if (isSelected) {
      cardClasses += "bg-surface-container-lowest shadow-[inset_0_0_0_2px_#163422] z-10"
    } else {
      cardClasses += "bg-surface-container-lowest hover:bg-surface-container-low/50"
    }

    const isRedText = isFull || dayWknd
    const dayNumColor = isRedText ? "text-error font-extrabold" : (isSelected ? "text-primary font-extrabold" : "text-[#695d47] font-semibold")
    const countColor = isFull ? "text-error font-extrabold" : "text-[#163422] font-semibold"

    gridCells.push(
      <div key={`day-${d}`} onClick={() => handleSelectDay(d, existingSlot)} className={cardClasses}>
        <div className="flex justify-between items-start w-full">
          <span className={`text-sm ${dayNumColor}`}>{d}</span>
          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-primary block"></span>}
        </div>
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`w-1.5 h-1.5 rounded-full ${isFull ? 'bg-error' : 'bg-[#466550]'}`}></span>
          <span className={`text-[10px] ${countColor}`}>{curC}/{maxC}</span>
        </div>
      </div>
    )
  }

  const totalCells = gridCells.length
  const remaining = (7 - (totalCells % 7)) % 7
  for (let i = 0; i < remaining; i++) {
    gridCells.push(<div key={`empty-end-${i}`} className="bg-surface-container-low/30 h-32 p-4 border-r border-b border-outline-variant/20"></div>)
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
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-none">Galunggung</h1>
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
                    : 'text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl'
                } flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98 w-full`}
              >
                <span className="material-symbols-outlined" data-icon={item.icon} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

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

      {/* Main Content */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-end items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10 gap-6">
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
              <p className="font-bold text-primary leading-none">{localStorage.getItem('admin_nama') || 'Admin Galunggung'}</p>
              <p className="text-[10px] text-secondary mt-1">Administrator Super</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
              <img alt="Profil Administrator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"/>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 grid grid-cols-12 gap-8 bg-[#f9f9f7] min-h-screen">
          {/* Calendar Grid Container */}
          <div className="col-span-12 xl:col-span-9 bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-display font-extrabold text-[#163422] tracking-tight">{monthNames[currentMonth]} {currentYear}</h2>
                <p className="text-secondary text-sm font-medium mt-1">Ketersediaan jalur bulanan dan ringkasan kapasitas</p>
              </div>
              {/* Month Controls */}
              <div className="flex gap-2 items-center bg-[#f4f4f2] p-1.5 rounded-full">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-white rounded-full transition-colors flex items-center justify-center text-[#163422]">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <span className="px-4 text-sm font-bold text-[#163422]">Pilih Bulan</span>
                <button onClick={handleNextMonth} className="p-2 hover:bg-white rounded-full transition-colors flex items-center justify-center text-[#163422]">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Loading Overlay or Error */}
            {loading ? (
                <div className="py-20 text-center text-secondary">
                    <span className="material-symbols-outlined animate-spin text-3xl mb-2">progress_activity</span>
                    <p>Memuat kalender...</p>
                </div>
            ) : (
                <>
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
                    <div className="grid grid-cols-7 gap-0 border-l border-t border-outline-variant/20 rounded-xl overflow-hidden">
                        {gridCells}
                    </div>
                </>
            )}
          </div>

          {/* Right Sidebar editor */}
          <div className="col-span-12 xl:col-span-3">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/10 sticky top-24">
              <h3 className="font-display font-extrabold text-[#163422] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">edit_calendar</span>
                Kapasitas Harian
              </h3>
              {error && (
                <div className="flex items-center gap-2 px-3 py-2 bg-error-container rounded-xl mb-4">
                  <span className="material-symbols-outlined text-error text-sm">error</span>
                  <p className="text-xs text-on-error-container">{error}</p>
                </div>
              )}
              {saveSuccess && (
                <div className="flex items-center gap-2 px-3 py-2 bg-[#dcf5e1] rounded-xl mb-4">
                  <span className="material-symbols-outlined text-[#163422] text-sm">check_circle</span>
                  <p className="text-xs text-[#163422] font-semibold">Jadwal diperbarui!</p>
                </div>
              )}
              <form onSubmit={handleUpdateSchedule} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#695d47] block mb-2">Tanggal Terpilih</label>
                  <div className="bg-[#f4f4f2] px-4 py-3.5 rounded-xl font-bold text-[#163422] text-sm text-center">
                    {selectedDayNum ? `${selectedDayNum} ${monthNames[currentMonth]} ${currentYear}` : 'Pilih tanggal di kalender'}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#695d47] block mb-2">Batas Maksimum</label>
                  <input
                    className="w-full bg-[#f9f9f7] border border-[#e2e3e1] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#163422] text-sm outline-none text-[#1a1c1b] font-medium"
                    type="number"
                    value={maxCountInput}
                    onChange={(e) => setMaxCountInput(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving || !selectedDayNum}
                  className="w-full py-3.5 bg-[#163422] hover:bg-[#0f2418] text-[#f9f9f7] rounded-full font-bold text-sm transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> Menyimpan...</>
                  ) : 'Perbarui Jadwal'}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}