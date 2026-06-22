import React from 'react';

const ScanTiket = ({ isOpen, onClose }) => {
  // Jika state isOpen bernilai false, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/20">
        {/* Header Modal */}
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="text-xl font-display font-extrabold text-primary">Pemindai Tiket</h3>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-outline hover:text-error transition-colors p-1 rounded-full hover:bg-error-container/10"
          >
            close
          </button>
        </div>

        {/* Body Modal (Kamera Pemindai) */}
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black">
            <img 
              alt="QR Scanner Interface" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcfKaf0c2HfkNiHilH-tbh5RTmQwCqe_nLCvEX6DDA2A_pJ69wy1CcVkuuDESRnXaSLNBwSLK3Gn6Z3q_qxwQJrSn-zv_mXAvVqCJPQlwmRyDDewofs8CTgn4I3E6cBJMCIxwXTATk3VeDAnmwJisV9f9UW3l22l8Lj0kbSZwsCxFjVgqcS0zZXrCsOftKiRY7GxH0y3AE_47jnc4-Yd4aFZ_18EV8vcb1Fs1zbNIWfs4WXpKQq2W1AomAPwPWjsTXkurho64aIQ"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-primary/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-on-surface font-medium mb-1">Arahkan kamera ke kode QR tiket pengunjung</p>
            <p className="text-on-surface-variant text-sm">Pastikan kode QR berada di dalam bingkai pemindaian</p>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-6 bg-surface-container-low/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanTiket;