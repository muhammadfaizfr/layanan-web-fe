import React from 'react'

export default function RiwayatTiket({ navigate }) {
  const tickets = [
    {
      id: 'GLG-2024-0891',
      status: 'AKTIF',
      title: 'Tiket Pendakian Puncak',
      date: '12 Okt 2024'
    },
    {
      id: 'GLG-2024-0542',
      status: 'SELESAI',
      title: 'Tiket Kawah Galunggung',
      date: '15 Agu 2024'
    },
    {
      id: 'GLG-2024-0310',
      status: 'SELESAI',
      title: 'Pemandian Air Panas',
      date: '02 Jul 2024'
    },
    {
      id: 'GLG-2023-1120',
      status: 'KADALUARSA',
      title: 'Tiket Area Camping',
      date: '24 Des 2023'
    }
  ]

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

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {tickets.map((ticket, index) => {
          const isAktif = ticket.status === 'AKTIF'
          const isSelesai = ticket.status === 'SELESAI'
          const isKadaluarsa = ticket.status === 'KADALUARSA'

          return (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border border-stone-200/60 shadow-[0_10px_30px_rgba(22,52,34,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    {ticket.id}
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
                    {ticket.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary font-headline tracking-tight mb-8">
                  {ticket.title}
                </h3>
              </div>
              
              <div className="border-t border-dashed border-stone-100 pt-6">
                <span className="block text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">
                  TANGGAL
                </span>
                <span className="text-base font-bold text-[#1a1c1b]">
                  {ticket.date}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
