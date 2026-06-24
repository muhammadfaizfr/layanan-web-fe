import React, { useState, useEffect } from 'react'

export default function ScanTiketAdmin({ navigate }) {
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Simulation of successful scan after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('admin-tiket-berhasil', {
        id: 'GAL-2023-8841',
        name: 'Aditya Surya',
        type: 'Pendakian Puncak',
        time: '08:42 AM'
      })
    }, 4000)

    return () => clearTimeout(timer)
  }, [navigate])

  // Close scanner on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('admin-manajemen-tiket')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <div className="bg-surface font-body overflow-hidden min-h-screen relative">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .scanner-frame-clip {
          clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 90% 10%, 90% 90%, 10% 90%, 10% 100%, 100% 100%, 100% 0%);
        }
        .scan-line {
          animation: scan 2s ease-in-out infinite;
        }
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
        .blur-overlay {
          backdrop-filter: blur(12px) brightness(0.4);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 1rem) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(150);
          }
        }
      `}</style>

      {/* Mock Background: Manajemen Tiket Table */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <div className="p-8 w-full h-full opacity-60">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-on-surface">Manajemen Tiket</h1>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-container-highest">
                  <th className="py-4 px-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">ID Tiket</th>
                  <th className="py-4 px-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Pendaki</th>
                  <th className="py-4 px-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="py-4 px-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-container-low">
                  <td className="py-4 px-2">#GAL-9921</td>
                  <td className="py-4 px-2 font-medium">Budi Santoso</td>
                  <td className="py-4 px-2"><span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs">Aktif</span></td>
                  <td className="py-4 px-2">12 Okt 2023</td>
                </tr>
                <tr className="border-b border-surface-container-low">
                  <td className="py-4 px-2">#GAL-9922</td>
                  <td className="py-4 px-2 font-medium">Ani Wijaya</td>
                  <td className="py-4 px-2"><span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-xs">Selesai</span></td>
                  <td className="py-4 px-2">12 Okt 2023</td>
                </tr>
                <tr className="border-b border-surface-container-low">
                  <td className="py-4 px-2">#GAL-9923</td>
                  <td className="py-4 px-2 font-medium">Rahmat Hidayat</td>
                  <td className="py-4 px-2"><span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs">Aktif</span></td>
                  <td className="py-4 px-2">13 Okt 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MAIN SCANNER OVERLAY */}
      <div className="fixed inset-0 z-50 flex items-center justify-center blur-overlay">
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-8 z-[60]">
          <div className="flex items-center gap-4">
            <button 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95" 
              onClick={() => navigate('admin-manajemen-tiket')}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex flex-col text-left">
              <span className="text-white font-display font-bold text-xl tracking-tight">Validasi Tiket</span>
              <span className="text-white/60 text-xs font-label uppercase tracking-widest">Scanner Mode: Check-in</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 ${
                isFlashOn 
                  ? 'bg-[#c8ebd0] text-[#163422]' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`} 
              onClick={() => setIsFlashOn(!isFlashOn)}
            >
              <span className="material-symbols-outlined">{isFlashOn ? 'flashlight_off' : 'flashlight_on'}</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>

        {/* Scanning Interface Container */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center px-8">
          {/* Real-time camera simulation (Video Placeholder) */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black/40">
            <img 
              alt="Scanner Viewport" 
              className="w-full h-full object-cover opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANKb1r_ZzUKgpzCXzEN5DXLKMjEy5-yrWn-eIzz9-74xESGCEXUrPwOGubCSUmjctH-PJd-vC17ueXtNLpHLykcTVLHp45Cpl5sKiPH4hL2tBSaTkSnhg9k4nhqaD0eOzhTEDRF_ghh__WLBihXTFA-OjTMAdJMCC1rqI_s3Dq1vXSZ-T6HAhsNrVMxPV1DgpZZbrTgdIH58qHqy6yTB33diqceMsbNd7-al6N4pnVB8SXV--nsoe_jeqbgJLmImD-RFOEIdTlMw"
            />
          </div>
          {/* The Finder Frame */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 z-20">
            {/* Corner Borders */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#adcfb4] rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#adcfb4] rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#adcfb4] rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#adcfb4] rounded-br-2xl"></div>
            {/* Scanning Animation Line */}
            <div className="scan-line absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#adcfb4] to-transparent shadow-[0_0_15px_rgba(173,207,180,0.8)] z-30"></div>
            {/* Decorative Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #adcfb4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          {/* Interaction Label */}
          <div className="absolute bottom-[-80px] text-center w-full">
            <p className="text-white font-display text-lg mb-2">Posisikan Kode QR di dalam bingkai</p>
            <p className="text-white/40 text-sm font-body">Proses validasi akan berjalan otomatis</p>
          </div>
        </div>

        {/* Bottom Actions (Footer) */}
        <div className="absolute bottom-12 flex flex-col items-center gap-6 z-[60]">
          {/* Mode Switcher */}
          <div className="bg-[#2d4b37]/40 backdrop-blur-md rounded-full p-1.5 flex gap-1">
            <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm transition-all shadow-sm">Scan Tiket</button>
            <button className="px-6 py-2 rounded-full text-white/60 hover:text-white font-medium text-sm transition-all">Input Manual</button>
          </div>
          {/* Cancel Button */}
          <button 
            className="px-10 py-4 bg-white text-primary rounded-full font-display font-bold hover:scale-95 transition-transform active:scale-90 shadow-lg" 
            onClick={() => navigate('admin-manajemen-tiket')}
          >
            Tutup Scanner
          </button>
        </div>

        {/* Atmospheric Elements */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-8 opacity-20 hidden lg:flex">
          <div className="flex flex-col gap-1 text-left">
            <span className="text-white text-[10px] uppercase tracking-widest font-label">Lat</span>
            <span className="text-white font-mono text-sm">7.1833° S</span>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-white text-[10px] uppercase tracking-widest font-label">Long</span>
            <span className="text-white font-mono text-sm">108.0667° E</span>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-white text-[10px] uppercase tracking-widest font-label">Alt</span>
            <span className="text-white font-mono text-sm">2,168m</span>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 bg-[#2d4b37] text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl animate-bounce">
          <div className="w-10 h-10 rounded-full bg-[#163422] flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="text-left">
            <p className="font-bold">Tiket Tervalidasi</p>
            <p className="text-sm opacity-80">Budi Santoso - #GAL-9921</p>
          </div>
        </div>
      )}
    </div>
  )
}