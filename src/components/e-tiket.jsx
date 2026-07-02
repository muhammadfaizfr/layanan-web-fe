import React from 'react'

export default function ETiket({ order, navigate }) {
  const qty = order?.qty ?? 1
  const route = order?.route ?? 'Tangga 620'
  const date = order?.date ?? 'Sabtu, 5 Okt 2024'
  const reference = order?.reference ?? 'GG-REG-99120'

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    const element = document.getElementById('ticket-print-area')
    if (!element) return

    const opt = {
      margin:       0.2,
      filename:     `e-tiket-${reference}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      script.onload = () => {
        window.html2pdf().set(opt).from(element).save()
      }
      document.body.appendChild(script)
    }
  }

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-20 selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Action Bar */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md shadow-sm border-b border-stone-200/50 print:hidden">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-4xl mx-auto">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate?.('home')}
          >
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
            <span className="text-xl font-bold text-primary tracking-tighter font-headline uppercase">Galunggung</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-primary hover:bg-surface-container transition-colors duration-200 font-medium"
            >
              <span className="material-symbols-outlined text-lg">print</span>
              <span>Cetak Tiket</span>
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-on-primary hover:opacity-90 transition-opacity duration-200 shadow-sm font-medium"
            >
              <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
              <span>Simpan PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto print:pt-4">
        {/* E-Ticket Container */}
        <div id="ticket-print-area" className="relative bg-surface-container-lowest rounded-xl shadow-[0_40px_100px_rgba(22,52,34,0.06)] overflow-hidden border border-outline-variant/30 print:shadow-none print:border print:rounded-none">
          {/* Ticket Header */}
          <div className="relative h-32 bg-primary flex flex-col justify-center px-10 text-on-primary overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                alt="" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApx79U7WIn-If-bRRqhldGhKc0Y34-XMhsokOMU4DKDWAciX_Rcm55-h8z-MSY1r0XbtnwSVkeYuAV30oBMSSmgQ-m39A7UwKZDhplYn_oli_7n3Yp8BMpVdKuTCR38wDY-HtaAf9RA7Glu6IwUN8o8e1NjkD8ckyxZO4nID89jjSWypKz_u5DrN4mOIAPSXA8gpBpZOaqCI3yztjYxWLh-JqFYjG3rKvcO0ad75VIOUlrYeUn_Ujb-cSndhKEDuwIYfqvYpVqFg"
              />
            </div>
            <div className="relative z-10">
              <h1 className="font-headline font-extrabold text-lg tracking-tight leading-tight max-w-xs">Galunggung Tourism Authority &amp; Preservation</h1>
              <p className="text-on-primary-container text-xs mt-1 uppercase tracking-[0.2em] font-label font-bold">Resmi / E-Ticket Kedatangan</p>
            </div>
            {/* Status Badge */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-primary-fixed-dim/20 backdrop-blur-sm border border-primary-fixed-dim/30 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-sm font-bold uppercase tracking-wider">Terverifikasi</span>
            </div>
          </div>

          {/* Main Ticket Body */}
          <div className="p-10 flex flex-col md:flex-row gap-12">
            {/* QR and Primary Info */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="bg-white p-2 rounded-lg">
                  <img 
                    alt="QR Check-in" 
                    className="w-40 h-40" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvTqwVLI1W8d3doXJdn2hX3BWzTT20pmVJ0rRwr_s9RUui-8MxgsoRRRZiuN2gAwHxRVBRX0pbhrTRtEtf8gsIUkH9Mmg2hMmg1M-wFtrx6VeKso7LDXvfFguyVQvO1MHgbccTc8dp5Sl27mXBvDQ-z94WKThxFTJumKbLFQOEfBNHtbR0aCxEgWSm7A96fd5azNrHv_TmlqBLEwDpwZvWK7c-pukHHugQc47gNlwtygUQpsptG03l3CBLGtc6qQE7wcx_mqEDWQ"
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-label font-bold">Booking ID</span>
                <span className="text-xl font-headline font-extrabold text-primary tracking-widest">{reference}</span>
              </div>
            </div>

            {/* Expedition Details */}
            {(() => {
              const isTicket = String(reference).includes('TIK')
              const typeLabel = isTicket ? 'Jenis Tiket' : 'Rute Pendakian'
              const typeIcon = isTicket ? 'confirmation_number' : 'stairs'
              const typeValue = isTicket ? (order?.jenisTiket || order?.item || 'Tiket Wisatawan Domestik') : route
              const dateLabel = isTicket ? 'Tanggal Kunjungan' : 'Tanggal Pendakian'

              return (
                <div className="flex-grow grid grid-cols-2 gap-y-8 gap-x-4">
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-label font-bold mb-1">{typeLabel}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                        <span className="material-symbols-outlined text-lg">{typeIcon}</span>
                      </div>
                      <span className="text-lg font-bold font-headline">{typeValue}</span>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-label font-bold mb-1">{dateLabel}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                      </div>
                      <span className="text-lg font-bold font-headline">{date}</span>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-label font-bold mb-1">Peserta</span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                        <span className="material-symbols-outlined text-lg">group</span>
                      </div>
                      <span className="text-lg font-bold font-headline">{qty} Orang</span>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-label font-bold mb-1">Lokasi</span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                      </div>
                      <span className="text-lg font-bold font-headline">Tasikmalaya, Jabar</span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Visual Separation */}
          <div className="relative h-6 flex items-center">
            <div className="absolute left-0 -translate-x-1/2 w-6 h-6 bg-surface rounded-full"></div>
            <div className="w-full border-t-2 border-dashed border-surface-container-high mx-4"></div>
            <div className="absolute right-0 translate-x-1/2 w-6 h-6 bg-surface rounded-full"></div>
          </div>

          {/* Guidelines Section */}
          <div className="p-10 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <h2 className="font-headline font-bold text-lg">Panduan Pendakian</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-md shrink-0">01</span>
                <p className="text-sm leading-relaxed text-on-surface-variant">Tunjukkan QR code ini di pos pendakian kepada petugas untuk validasi masuk.</p>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-md shrink-0">02</span>
                <p className="text-sm leading-relaxed text-on-surface-variant">Gunakan perlengkapan mendaki yang lengkap dan aman untuk medan vulkanik.</p>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-md shrink-0">03</span>
                <p className="text-sm leading-relaxed text-on-surface-variant">Jaga kelestarian alam dan wajib membawa pulang sampah Anda kembali ke bawah.</p>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-md shrink-0">04</span>
                <p className="text-sm leading-relaxed text-on-surface-variant">Patuhi instruksi ranger di lapangan demi keselamatan dan keamanan bersama.</p>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-surface-container-low px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-4 opacity-70">
              <span className="material-symbols-outlined text-3xl">nature_people</span>
              <p className="text-[10px] font-label font-medium max-w-[200px] leading-tight">
                MEMELIHARA ALAM ADALAH TANGGUNG JAWAB BERSAMA. NIKMATI KEINDAHANNYA DENGAN BIJAK.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Diterbitkan pada</p>
              <p className="text-xs font-bold">
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}, {new Date().toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} WIB
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Map Background Card */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
          <div className="md:col-span-2 relative h-48 rounded-xl overflow-hidden shadow-sm group">
            <img 
              alt="Map Location" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCO5ZJsCjBfkQHEQtDFWKY2w0aKqB8sU-9vnxLHtZ395so8Nc3UNTyqf1Dx2fg55qfyfUUpsti53L2lg2DTfjV6QadcoihkLYOJtshom1SLD8T5NwWxquxxRIamAX6BZCCf28yVBjZPboJzthTVENUP7aO9liy1tCK2MYze7iLKPvB0qf-XDJDoGIrlhcMEI2xTBs0tHMVUqmXjgN-f_MwnaL94QU9U9bwx2sC2RS9qYwCF7GpXo3YFwBO9LxiFEEspdLwHAPyoA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-on-primary text-[10px] font-label font-bold uppercase tracking-[0.3em]">Titik Kumpul</span>
              <h3 className="text-on-primary font-headline font-bold">Pos Gerbang Utama Galunggung</h3>
            </div>
          </div>
          <div className="bg-primary-container rounded-xl p-6 flex flex-col justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-4xl mb-4">tsunami</span>
            <p className="font-headline font-bold text-lg mb-2 leading-tight">Keamanan Wisata</p>
            <p className="text-sm opacity-80 leading-relaxed">Status kawah saat ini NORMAL. Pastikan fisik dalam kondisi prima sebelum menaiki 620 anak tangga.</p>
          </div>
        </div>
      </main>

      {/* Bottom Mobile Nav Cluster (Invisible on Desktop) */}
      <div className="md:hidden print:hidden">
        <div className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50 dark:bg-emerald-950 rounded-t-3xl shadow-[0_-4px_20px_rgba(22,52,34,0.04)] border-t border-stone-200">
          <div 
            onClick={() => navigate?.('home')}
            className="flex flex-col items-center justify-center text-stone-400 px-5 py-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Explore</span>
          </div>
          <div 
            onClick={() => navigate?.('e-tiket')}
            className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full px-5 py-2 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Tickets</span>
          </div>
          <div 
            onClick={() => navigate?.('informasi')}
            className="flex flex-col items-center justify-center text-stone-400 px-5 py-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">cloudy_snowing</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Weather</span>
          </div>
          <div 
            onClick={() => navigate?.('kontak')}
            className="flex flex-col items-center justify-center text-stone-400 px-5 py-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Profile</span>
          </div>
        </div>
      </div>
    </div>
  )
}
