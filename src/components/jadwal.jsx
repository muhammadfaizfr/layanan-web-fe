// src/components/Jadwal.jsx
import React, { useState, useEffect } from 'react'
import pengaturanService from '../services/pengaturanService'
import slotPendakianService from '../services/slotPendakianService'
import bookingService from '../services/bookingService'

function Jadwal({ onSaveSchedule, onProceedToPayment, initialData }) {
  const [selectedRoute, setSelectedRoute] = useState(initialData?.route?.includes('Hutan') ? 'hutan' : 'tangga')
  const today = new Date()
  const [calendarMonth, setCalendarMonth] = useState(initialData?.dateObj ? new Date(initialData.dateObj.getFullYear(), initialData.dateObj.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(initialData?.dateObj ?? today)
  const [teamName, setTeamName] = useState(initialData?.teamName ?? '')
  const [teamCount, setTeamCount] = useState(initialData?.qty ?? 1)
  const [contact, setContact] = useState(initialData?.contact ?? '')
  const [hargaCamping, setHargaCamping] = useState(25000)
  const [slots, setSlots] = useState([])
  const [allBookings, setAllBookings] = useState([])

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const res = await pengaturanService.get();
        if (res.data && res.data.harga_camping) {
          setHargaCamping(res.data.harga_camping);
        }
      } catch (err) {
        console.error("Gagal memuat harga camping", err);
      }
    };
    const fetchData = async () => {
      try {
        const [sData, bData] = await Promise.all([
          slotPendakianService.getAll(),
          bookingService.getAll()
        ]);
        setSlots(Array.isArray(sData) ? sData : (sData?.data ?? []));
        setAllBookings(Array.isArray(bData) ? bData : (bData?.data ?? []));
      } catch (err) {
        console.error("Gagal memuat data jadwal", err);
      }
    };
    fetchHarga();
    fetchData();
  }, []);

  const getAvailableQuota = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const slot = slots.find(s => {
      const sTgl = (s.tanggal_pendakian || s.tanggal || '').substring(0, 10);
      return sTgl === dateStr;
    });
    const maxCount = slot ? (slot.kuota_maksimal ?? 200) : 200;

    const bookedCount = allBookings.reduce((sum, b) => {
      let tgl = '';
      if (b.slotPendakian?.tanggal_pendakian) {
        tgl = b.slotPendakian.tanggal_pendakian;
      } else if (b.slot_pendakian?.tanggal_pendakian) {
        tgl = b.slot_pendakian.tanggal_pendakian;
      } else {
        tgl = b.tanggal_kunjungan || b.tanggal || b.created_at || '';
      }
      tgl = tgl.substring(0, 10);

      const jenis = (b.jenis_tiket || b.route || '').toLowerCase();
      const isPendakian = jenis.includes('rute') || jenis.includes('tangga') || jenis.includes('hutan') || jenis.includes('cipanas') || jenis.includes('pendakian');

      const qty = isPendakian ? Number(b.jml_tiket || b.jumlah_orang || b.qty || b.team_count || b.teamCount || 1) : 0;
      return tgl === dateStr ? sum + qty : sum;
    }, 0);

    return Math.max(0, maxCount - bookedCount);
  };

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
      selectedLabel: 'Rute Terpilih',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCezAdxjeSRRDCOtxHquFlE1oZCUIedRCeHCovkRG6ViG_hAT9ACkYcSIbakbl48FY13yx3FFN5d0W-Tg4m0ZFxyEko-We8Mp76BU7BFghHDa3Degjtk_bwtGSnK4hnbhQaMTRhpDnsBLno5VEH4BUqOOcNCNHQWWnPckfOPWo1WcN8-RnBr7a0t0_6IvDY932YYGN4NVEB_6w9CN8LGJDVoonzljON2z4ZUNjDPAqkhqjK_B2yqCTkSpwlOA7ADYkRZxXzgj-gtg',
    },
  ]

  const dayNames = ['S', 'S', 'R', 'K', 'J', 'S', 'M']
  const selectedYear = calendarMonth.getFullYear()
  const selectedMonth = calendarMonth.getMonth()
  const monthLabel = calendarMonth.toLocaleDateString('id-ID', { month: 'long' })
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay()
  const estimatedCost = hargaCamping * teamCount

  const changeMonth = (offset) => {
    setCalendarMonth((current) => {
      const next = new Date(current)
      next.setMonth(current.getMonth() + offset)
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8 lg:py-20">
      {/* Hero Section */}
      <header className="mb-16 text-center md:text-left border-b border-outline-variant/20 pb-10">
        <span className="text-secondary font-label tracking-[0.2em] uppercase text-sm mb-4 block font-bold">Persiapan Ekspedisi</span>
        <h1 className="text-5xl md:text-6xl font-display font-black text-primary tracking-tight leading-tight mb-6">
          Jadwalkan <span className="text-secondary">Pendakian</span> Anda
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed mx-auto md:mx-0">
          Rencanakan perjalanan Anda menuju kawah mistis Galunggung. Pilih rute yang sesuai dengan jiwa petualang Anda dan pastikan keselamatan tim terjaga.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Selection Area (Left/Main Column) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Route Selection */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-black text-xl shadow-md">1</span>
              <h2 className="text-3xl font-display font-black text-primary">Pilihan Rute Pendakian</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routeOptions.map((route) => {
                  const selected = selectedRoute === route.key
                  return (
                    <button
                      key={route.key}
                      type="button"
                      onClick={() => setSelectedRoute(route.key)}
                      className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer text-left ${selected ? 'border-2 border-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-surface-container-lowest scale-[1.02]' : 'border border-outline-variant/30 shadow-sm bg-surface-container-lowest hover:shadow-xl hover:scale-[1.01]'}`}
                    >
                      <div className="h-56 relative overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt={route.title}
                          src={route.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-primary tracking-tight">{route.title}</h3>
                          <span className={`px-4 py-1.5 text-xs font-black tracking-wide rounded-full ${selected ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface'}`}>{route.badge}</span>
                        </div>
                        <div className="flex gap-5 text-sm text-on-surface-variant font-medium">
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">schedule</span> {route.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">landscape</span> {route.details}
                          </span>
                        </div>
                        {selected && (
                          <div className="mt-6 flex items-center gap-2 text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/10">
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
              <span className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-black text-xl shadow-md">2</span>
              <h2 className="text-3xl font-display font-black text-primary">Pilih Tanggal Pendakian</h2>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-black text-xl text-primary">{monthLabel} {selectedYear}</h4>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors text-primary">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button type="button" onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors text-primary">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant mb-4">
                  {dayNames.map((label, i) => (
                    <div key={`${label}-${i}`}>{label}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div key={`blank-${index}`} className="h-10"></div>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const dayNumber = index + 1
                    const currD = new Date(selectedYear, selectedMonth, dayNumber)
                    const isSelected = selectedDate.getDate() === dayNumber && selectedDate.getMonth() === selectedMonth && selectedDate.getFullYear() === selectedYear
                    const isPast = currD < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                    return (
                      <button
                        key={dayNumber}
                        type="button"
                        disabled={isPast}
                        onClick={() => {
                          const available = getAvailableQuota(currD);
                          if (available <= 0) {
                            alert(`Mohon maaf, kuota pendakian untuk tanggal ${currD.toLocaleDateString('id-ID')} sudah penuh.`);
                            return;
                          }
                          setSelectedDate(currD);
                        }}
                        className={`h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${isSelected ? 'bg-primary text-on-primary shadow-lg shadow-primary/30 scale-110 z-10' : isPast ? 'text-on-surface-variant/30 cursor-not-allowed' : 'bg-surface hover:bg-primary-container/20 text-on-surface'}`}
                      >
                        {dayNumber}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-center md:border-l md:border-outline-variant/30 md:pl-10 relative">
                <span className="material-symbols-outlined absolute top-0 right-0 text-6xl text-primary/5 rotate-12">event_available</span>
                <p className="text-sm text-on-surface-variant italic mb-6 leading-relaxed">"Waktu terbaik untuk mendaki adalah dini hari untuk mengejar indahnya matahari terbit di bibir kawah."</p>
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                    Tanggal Terpilih
                  </div>
                  <div className="text-2xl font-display font-black text-primary">{selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Form */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-black text-xl shadow-md">3</span>
              <h2 className="text-3xl font-display font-black text-primary">Informasi Tim Pendaki</h2>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-primary ml-1">Nama Ketua Tim <span className="text-error">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50">person</span>
                    <input 
                      className="w-full bg-[#f5f5f5] border border-primary/20 rounded-xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none" 
                      placeholder="Masukkan nama lengkap" 
                      type="text" 
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-primary ml-1">Jumlah Anggota Tim <span className="text-error">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50">groups</span>
                    <input 
                      className="w-full bg-[#f5f5f5] border border-primary/20 rounded-xl pl-12 pr-16 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none" 
                      min="1" 
                      type="number" 
                      value={teamCount}
                      onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-bold">Orang</span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="block text-sm font-bold text-primary ml-1">Kontak Darurat (WhatsApp) <span className="text-error">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50">call</span>
                    <input 
                      className="w-full bg-[#f5f5f5] border border-primary/20 rounded-xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none" 
                      placeholder="+62 8xx xxxx xxxx" 
                      type="tel" 
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant ml-1">Pastikan nomor aktif dan dapat dihubungi melalui WhatsApp.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-primary text-on-primary rounded-3xl p-8 shadow-2xl shadow-primary/30 overflow-hidden relative">
              {/* Decorative Texture */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <span className="material-symbols-outlined text-secondary text-3xl">receipt_long</span>
                <h3 className="text-2xl font-display font-black tracking-tight">Ringkasan</h3>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-xs font-bold uppercase tracking-wider">Rute Terpilih</span>
                  <span className="font-black text-lg">{routeOptions.find((route) => route.key === selectedRoute)?.title ?? 'Rute Tangga 620'}</span>
                </div>
                <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-xs font-bold uppercase tracking-wider">Tanggal</span>
                  <span className="font-black text-lg">{selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-end pb-4 border-b border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-on-primary-container text-xs font-bold uppercase tracking-wider">Anggota Tim</span>
                    <span className="font-black text-lg">{teamCount} Orang</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-on-primary-container">x Rp {hargaCamping.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <div className="pt-4 pb-6">
                  <div className="text-sm text-on-primary-container mb-2 font-bold uppercase tracking-wider">Total Pembayaran</div>
                  <div className="text-4xl font-display font-black text-white">IDR {estimatedCost.toLocaleString('id-ID')}</div>
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
                    
                    const available = getAvailableQuota(selectedDate);
                    if (teamCount > available) {
                      alert(`Kuota tidak mencukupi! Sisa kuota untuk tanggal ${selectedDate.toLocaleDateString('id-ID')} adalah ${available} orang.`);
                      return;
                    }

                    const scheduleData = {
                      route: selectedRoute,
                      date: selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                      dateObj: selectedDate,
                      teamName,
                      teamCount,
                      contact,
                      unitPrice: hargaCamping,
                      total: estimatedCost
                    };

                    if (typeof onSaveSchedule === 'function') {
                      onSaveSchedule(scheduleData);
                    }
                    if (typeof onProceedToPayment === 'function') {
                      onProceedToPayment(scheduleData);
                    }
                  }}
                  className="w-full bg-surface-container-lowest text-primary py-4 rounded-2xl font-black text-lg hover:bg-surface-variant active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan Pembayaran</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-6 rounded-3xl flex items-start gap-4 border border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div>
                <h4 className="font-black text-primary mb-1.5">Protokol Keamanan</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Pastikan membawa perlengkapan standar pendakian dan patuhi instruksi petugas jaga di pos Gunung Galunggung demi keselamatan bersama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jadwal;