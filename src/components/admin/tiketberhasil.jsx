import React from 'react'

export default function TiketBerhasilAdmin({ navigate, ticketData }) {
  const defaultTicket = {
    id: 'GAL-2023-8841',
    name: 'Aditya Surya',
    type: 'Pendakian Puncak',
    time: '08:42 AM'
  }

  const ticket = ticketData || defaultTicket

  return (
    <div className="font-body bg-background text-on-background m-0 p-0 overflow-hidden min-h-screen relative flex items-center justify-center">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
        }
        .glass-effect {
          background: rgba(249, 249, 247, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .success-bg {
          background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAew5wDZLyiyRkplXfIBuFc-RXnwFQBnj64LZfvsezwuDA5ijLM2ndMlrRiXd5fo46PmysCnJwLqgLtIkPLC6JpNI-e10JoFBHgBKfeZmIeIu1t0NHYV9YcD4ajUPLdb5pRWHFRWDpGw67DAn6Znx4BeXNTuaZMHvM_KV0gezw5pavLoXTElP9IZ4j9WYtcu0FfPyGJ3JpTQdt7FixWQhmNxQMsxktZbLdYBoSYzUiYL0SXZ3CUWNYfccWpSbcgqHvwzYLxieeXpQ);
          background-size: cover;
          background-position: center;
        }
        @keyframes subtle-float {
          0% {
            transform: translateY(0px);
          } 
          50% {
            transform: translateY(-10px);
          } 
          100% {
            transform: translateY(0px);
          }
        }
        .float-anim {
          animation: subtle-float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Layer (Blurred SCREEN_18) */}
      <div className="fixed inset-0 success-bg z-0 scale-105 blur-md brightness-75 select-none pointer-events-none"></div>

      {/* Main Content Canvas (Focused Transactional Journey) */}
      <main className="relative z-10 flex items-center justify-center p-6 w-full">
        {/* Modal Container */}
        <div className="relative w-full max-w-lg glass-effect rounded-xl shadow-[0_40px_100px_rgba(22,52,34,0.15)] overflow-hidden transition-all duration-500 transform scale-100 opacity-100 border border-outline-variant/10">
          {/* Atmospheric Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#163422 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative p-10 flex flex-col items-center text-center">
            {/* Success Icon Container */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-[#c8ebd0] text-[#022110] rounded-full flex items-center justify-center shadow-lg float-anim">
                <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>check_circle</span>
              </div>
            </div>
            {/* Headline */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary mb-2">
              Tiket Berhasil Dipindai
            </h1>
            <p className="text-on-surface-variant font-medium opacity-80 mb-10 max-w-xs mx-auto text-sm leading-relaxed">
              Akses pendakian telah divalidasi. Pengunjung dipersilakan memulai perjalanan.
            </p>
            {/* Ticket Details Summary (Layered Surface) */}
            <div className="w-full bg-[#f4f4f2] rounded-xl p-6 mb-10 text-left space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label uppercase tracking-widest text-[#695d47] font-bold">ID Tiket</span>
                <span className="text-sm font-bold text-on-surface">{ticket.id}</span>
              </div>
              {/* Separation without lines - Tonal shift */}
              <div className="h-px bg-outline-variant/10 w-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-label uppercase tracking-widest text-[#695d47] font-bold">Pengunjung</span>
                <span className="text-sm font-bold text-on-surface">{ticket.name}</span>
              </div>
              <div className="h-px bg-outline-variant/10 w-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-label uppercase tracking-widest text-[#695d47] font-bold">Tipe Layanan</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">hiking</span>
                  <span className="text-sm font-bold text-on-surface">{ticket.type}</span>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <button 
              className="group relative w-full overflow-hidden rounded-full bg-[#f1e1c4] text-[#6f634c] py-4 font-headline font-bold transition-all duration-300 active:scale-95 hover:shadow-xl hover:shadow-primary/20 text-sm"
              onClick={() => navigate('admin-manajemen-tiket')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                Tutup
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </span>
            </button>
            {/* Footer Metadata */}
            <div className="mt-8 flex items-center gap-2 text-xs font-label text-on-surface-variant/60 uppercase tracking-widest">
              <span className="material-symbols-outlined text-xs">verified</span>
              Verified at {ticket.time} • Galunggung POS 1
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
