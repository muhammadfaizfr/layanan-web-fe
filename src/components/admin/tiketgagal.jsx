import React from 'react'

export default function TiketGagalAdmin({ navigate, errorData }) {
  const defaultError = {
    time: '12 Okt 2023, 14:45 WIB',
    message: 'INVALID_OR_EXPIRED_TOKEN'
  }

  const error = errorData || defaultError

  return (
    <div className="font-body bg-[#f9f9f7] text-[#1a1c1b] m-0 p-0 overflow-hidden min-h-screen relative flex items-center justify-center">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
        }
        .glass-effect {
          background: rgba(249, 249, 247, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .fail-bg {
          background: radial-gradient(circle at 50% 50%, rgb(238, 241, 230) 0%, rgb(150, 185, 166) 100%);
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

      {/* Background Layer with gradient */}
      <div className="fixed inset-0 fail-bg z-0 scale-105 select-none pointer-events-none"></div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex items-center justify-center p-6 w-full animate-fade-in-up">
        {/* Modal Container */}
        <div className="relative w-full max-w-md glass-effect rounded-[2.5rem] shadow-[0_45px_100px_rgba(22,52,34,0.12)] overflow-hidden border border-[#e2e3e1]">
          {/* Atmospheric Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#163422 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative p-10 flex flex-col items-center text-center">
            {/* Red Close/Error Icon Container */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-[#ba1a1a]/10 rounded-full scale-150 blur-xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-[6px] border-[#ffdad6]/80 float-anim">
                <span className="material-symbols-outlined text-5xl font-extrabold text-[#ba1a1a]" style={{ fontVariationSettings: "'wght' 700" }}>close</span>
              </div>
            </div>
            {/* Headline */}
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#1a1c1b] mb-4 max-w-xs leading-tight">
              Tiket Tidak Valid<br />atau Kadaluarsa
            </h1>
            <p className="text-[#695d47] font-medium text-sm leading-relaxed mb-8 max-w-xs mx-auto">
              Maaf, tiket ini tidak dapat digunakan. ID Tiket tidak ditemukan dalam sistem atau status tiket sudah terpakai pada pendakian sebelumnya.
            </p>
            {/* Details Summary Block */}
            <div className="w-full bg-[#eeeeec]/50 rounded-2xl p-5 mb-8 text-left space-y-3.5 border border-[#eeeeec]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-[#695d47]">Waktu Scan</span>
                <span className="text-xs font-bold text-[#1a1c1b]">{error.time}</span>
              </div>
              <div className="h-px bg-outline-variant/10 w-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-[#695d47]">Pesan Sistem</span>
                <span className="text-xs font-bold text-[#ba1a1a] tracking-tight">{error.message}</span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <button 
                className="flex-1 py-4 bg-[#eeeeec] hover:bg-[#e2e3e1] text-[#1a1c1b] font-headline font-bold rounded-full transition-all duration-300 active:scale-95 text-sm border border-[#e2e3e1] shadow-sm"
                onClick={() => navigate('admin-scan-tiket')}
              >
                Coba Lagi
              </button>
              <button 
                className="flex-1 py-4 bg-[#163422] text-[#f9f9f7] font-headline font-bold rounded-full transition-all duration-300 active:scale-95 shadow-md hover:opacity-90 text-sm"
                onClick={() => navigate('admin-manajemen-tiket')}
              >
                Tutup
              </button>
            </div>
            {/* Footer Logo squares decoration */}
            <div className="mt-8 flex gap-1 opacity-25 select-none">
              <div className="w-3 h-3 bg-[#695d47] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#695d47] rounded-sm"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
