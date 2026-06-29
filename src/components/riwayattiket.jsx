import React, { useState, useEffect } from 'react'
import bookingService from '../services/bookingService'

export default function RiwayatTiket({ navigate }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await bookingService.getAll()
        const list = Array.isArray(data) ? data : (data?.data ?? [])
        setTickets(list)
      } catch (err) {
        setError(err.userMessage || 'Gagal memuat riwayat tiket.')
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 w-full min-h-[60vh]">
      <div className="mb-12">
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-secondary opacity-75">
          KELOLA PERJALANAN ANDA
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mt-2">
          Riwayat Tiket
        </h1>
      </div>

      {loading && (
        <div className="text-center py-12 text-secondary font-medium flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
          <span>Memuat riwayat tiket...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-lg">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Tickets Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tickets.map((ticket, index) => {
            const ticketId = ticket.id_booking || ticket.id
            const statusRaw = ticket.status_booking || ticket.status || 'Menunggu Pembayaran'
            
            let displayStatus = 'MENUNGGU'
            let isAktif = false
            let isSelesai = false
            let isKadaluarsa = false

            if (statusRaw === 'Dikonfirmasi' || statusRaw === 'Diproses' || statusRaw === 'AKTIF') {
              displayStatus = 'AKTIF'
              isAktif = true
            } else if (statusRaw === 'Selesai' || statusRaw === 'SELESAI' || statusRaw === 'Lunas' || statusRaw === 'lunas') {
              displayStatus = 'SELESAI'
              isSelesai = true
            } else if (statusRaw === 'Batal' || statusRaw === 'KADALUARSA') {
              displayStatus = 'KADALUARSA'
              isKadaluarsa = true
            }

            const title = ticket.jenis_tiket || ticket.jenis || 'Tiket Pendakian'
            const dateRaw = ticket.tanggal || ticket.date || ticket.slot_pendakian?.tanggal_pendakian || ticket.created_at?.split('T')[0] || ''
            let displayDate = dateRaw
            if (dateRaw && dateRaw.includes('-')) {
              try {
                const d = new Date(dateRaw)
                if (!isNaN(d.getTime())) {
                  displayDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                }
              } catch (e) {}
            }

            return (
              <div 
                key={ticketId || index}
                className="bg-white rounded-xl p-8 border border-stone-200/60 shadow-[0_10px_30px_rgba(22,52,34,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                      GG-REG-{ticketId}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isAktif 
                        ? 'text-primary' 
                        : isKadaluarsa 
                        ? 'text-red-500' 
                        : 'text-stone-400'
                    }`}>
                      {isAktif && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      )}
                      {displayStatus}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary font-headline tracking-tight mb-8">
                    {title}
                  </h3>
                </div>
                
                <div className="border-t border-dashed border-stone-100 pt-6">
                  <span className="block text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">
                    TANGGAL
                  </span>
                  <span className="text-base font-bold text-[#1a1c1b]">
                    {displayDate}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && tickets.length === 0 && (
        <div className="text-center py-16 bg-stone-50 rounded-2xl max-w-xl mx-auto border border-dashed border-stone-200">
          <span className="material-symbols-outlined text-5xl text-stone-300 mb-4">confirmation_number</span>
          <p className="text-stone-500 font-medium">Belum ada riwayat tiket pendakian.</p>
        </div>
      )}
    </div>
  )
}

