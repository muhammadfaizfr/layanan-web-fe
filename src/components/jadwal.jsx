// src/components/Jadwal.jsx
import React, { useState } from 'react'

function Jadwal({ onSaveSchedule, onProceedToPayment }) {
  const [selectedRoute, setSelectedRoute] = useState('tangga')
  const today = new Date()
  const [calendarMonth, setCalendarMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(today)
  const [teamName, setTeamName] = useState('')
  const [teamCount, setTeamCount] = useState(1)
  const [contact, setContact] = useState('')

  const routeOptions = [
    {
      key: 'tangga',
      title: 'Rute Tangga 620',
      badge: 'MODERAT',
      duration: '45-60 Menit',
      details: '620 Anak Tangga',
      selectedLabel: 'Rute Terpilih',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH8SpkvELynxvVRRI4fcMuxcJBozR4S1yFEQ6cON0ESN5B1yNLcG7oq-mibVURM20gVFCCXG0YYAgqSYzGvrZfIqRbb86zFXR6J1CUjrDSVeBLAkoaGdlzC8x2z-7IfGQ29VbNNsMEaQePMAJNwiy23EdtLzxyJNcgmn8IyIQPPNLA58NfMnGWoM1YEX1TksYMqMcHiGmbSRM5u7pNs3teogx6KnxayJKcnIDq25JVx3Cd2Cxin6Rdmu1UxHUv2xu80WzxBOpVJw',
    },
    {
      key: 'hutan',
      title: 'Rute Hutan Cipanas',
      badge: 'MENANTANG',
      duration: '2-3 Jam',
      details: 'Jalur Alami',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCezAdxjeSRRDCOtxHquFlE1oZCUIedRCeHCovkRG6ViG_hAT9ACkYcSIbakbl48FY13yx3FFN5d0W-Tg4m0ZFxyEko-We8Mp76BU7BFghHDa3Degjtk_bwtGSnK4hnbhQaMTRhpDnsBLno5VEH4BUqOOcNCNHQWWnPckfOPWo1WcN8-RnBr7a0t0_6IvDY932YYGN4NVEB_6w9CN8LGJDVoonzljON2z4ZUNjDPAqkhqjK_B2yqCTkSpwlOA7ADYkRZxXzgj-gtg',
    },
  ]

  const dayNames = ['S', 'S', 'R', 'K', 'J', 'S', 'M']
  const selectedYear = calendarMonth.getFullYear()
  const selectedMonth = calendarMonth.getMonth()
  const monthLabel = calendarMonth.toLocaleDateString('id-ID', { month: 'long' })
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay()
  const estimatedCost = 25000 * teamCount

  const changeMonth = (offset) => {
    setCalendarMonth((current) => {
      const next = new Date(current)
      next.setMonth(current.getMonth() + offset)
      return next
    })
  }

  return (
    <>
      {/* Hero Section */}
      <header className="mb-16 text-center md:text-left">
        <span className="text-secondary font-label tracking-[0.2em] uppercase text-sm mb-4 block">Persiapan Ekspedisi</span>
        <h1 className="text-5xl md:text-6xl font-display font-black text-primary tracking-tight leading-tight">
          Jadwalkan Pendakian Anda
        </h1>
        <p className="mt-6 text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Rencanakan perjalanan Anda menuju kawah mistis Galunggung. Pilih rute yang sesuai dengan jiwa petualang Anda dan pastikan keselamatan tim terjaga.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Selection Area (Left/Main Column) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Route Selection */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">01</span>
              <h2 className="text-2xl font-display font-bold text-primary">Pilihan Rute Pendakian</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routeOptions.map((route) => {
                  const selected = selectedRoute === route.key
                  return (
                    <button
                      key={route.key}
                      type="button"
                      onClick={() => setSelectedRoute(route.key)}
                      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer text-left ${selected ? 'border-2 border-primary shadow-xl bg-white' : 'border border-outline-variant/10 shadow-sm bg-surface-container-lowest hover:shadow-xl'}`}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt={route.title}
                          src={route.image}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-primary">{route.title}</h3>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${selected ? 'bg-primary text-on-primary' : 'bg-tertiary-container text-on-tertiary-container'}`}>{route.badge}</span>
                        </div>
                        <div className="flex gap-4 text-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span> {route.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">landscape</span> {route.details}
                          </span>
                        </div>
                        {selected && (
                          <div className="mt-6 flex items-center gap-2 text-primary font-bold">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            <span>{route.selectedLabel}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

          {/* Date Selection */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">02</span>
              <h2 className="text-2xl font-display font-bold text-primary">Pilih Tanggal Pendakian</h2>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-primary">{monthLabel} {selectedYear}</h4>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button type="button" onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant mb-4">
                  {dayNames.map((label) => (
                    <div key={label}>{label}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div key={`blank-${index}`} className="h-10"></div>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const dayNumber = index + 1
                    const isSelected = selectedDate.getDate() === dayNumber && selectedDate.getMonth() === selectedMonth && selectedDate.getFullYear() === selectedYear
                    return (
                      <button
                        key={dayNumber}
                        type="button"
                        onClick={() => setSelectedDate(new Date(selectedYear, selectedMonth, dayNumber))}
                        className={`h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${isSelected ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary'}`}
                      >
                        {dayNumber}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-outline-variant/30 pl-8 hidden md:flex">
                <p className="text-sm text-on-surface-variant italic mb-4">"Waktu terbaik untuk mendaki adalah dini hari untuk mengejar matahari terbit di bibir kawah."</p>
                <div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20">
                  <div className="flex items-center gap-3 text-primary font-bold mb-1">
                    <span className="material-symbols-outlined">wb_sunny</span>
                    Terpilih
                  </div>
                  <div className="text-2xl font-display font-black text-primary">{selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Form */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">03</span>
              <h2 className="text-2xl font-display font-bold text-primary">Informasi Tim Pendaki</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-1">Nama Ketua Tim</label>
                <input 
                  className="w-full bg-surface-container-lowest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                  placeholder="Masukkan nama lengkap" 
                  type="text" 
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-1">Jumlah Anggota</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-lowest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                    min="1" 
                    type="number" 
                    value={teamCount}
                    onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-medium">Orang</span>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-bold text-primary ml-1">Kontak Darurat (WhatsApp)</label>
                <input 
                  className="w-full bg-surface-container-lowest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                  placeholder="+62 8xx xxxx xxxx" 
                  type="tel" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-2xl shadow-primary/20 overflow-hidden relative">
              {/* Decorative Texture */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-display font-bold mb-6 relative z-10">Ringkasan Pendakian</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-sm">Rute Terpilih</span>
                  <span className="font-bold text-right">{routeOptions.find((route) => route.key === selectedRoute)?.title ?? 'Rute Tangga 620'}</span>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-sm">Tanggal</span>
                  <span className="font-bold text-right">{selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-sm">Anggota Tim</span>
                  <span className="font-bold text-right">{teamCount} Orang</span>
                </div>
                <div className="pt-4">
                  <div className="text-sm text-on-primary-container mb-1">Estimasi Biaya Retribusi</div>
                  <div className="text-3xl font-black">IDR {estimatedCost.toLocaleString('id-ID')}</div>
                </div>
                <button 
                  onClick={() => {
                    if (!teamName.trim()) {
                      alert('Mohon masukkan nama ketua tim.');
                      return;
                    }
                    if (!contact.trim()) {
                      alert('Mohon masukkan kontak darurat (WhatsApp).');
                      return;
                    }

                    const scheduleData = {
                      route: selectedRoute,
                      date: selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                      teamName,
                      teamCount,
                      contact,
                    };

                    if (typeof onSaveSchedule === 'function') {
                      onSaveSchedule(scheduleData);
                    }
                    if (typeof onProceedToPayment === 'function') {
                      onProceedToPayment(scheduleData);
                    }
                  }}
                  className="w-full bg-surface-bright text-primary py-5 rounded-full font-bold text-lg hover:bg-white active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                  Lanjutkan Pendaftaran
                </button>
              </div>
            </div>
            <div className="bg-surface-container p-6 rounded-2xl flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary">info</span>
              <div>
                <h4 className="font-bold text-primary mb-1">Protokol Keamanan</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Pastikan membawa jas hujan, air minum yang cukup, dan sepatu pendakian yang nyaman. Patuhi instruksi petugas di pos jaga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jadwal;