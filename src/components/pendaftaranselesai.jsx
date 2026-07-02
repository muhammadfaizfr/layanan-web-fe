import React, { useMemo } from 'react'

export default function PendaftaranSelesai({ order, navigate }) {
  const qty = order?.qty ?? 1
  const route = order?.route ?? 'Tangga 620'
  const date = order?.date ?? 'Sabtu, 5 Oktober 2024'

  const reference = useMemo(() => {
    return order?.reference ?? `GG-REG-${Math.floor(10000 + Math.random() * 90000)}`
  }, [order])

  const handleDownload = () => {
    if (order && !order.reference) {
      order.reference = reference
    }
    navigate?.('e-tiket')
  }



  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl dark:bg-emerald-950/70 shadow-[0_4px_30px_rgba(22,52,34,0.04)]">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <button 
            type="button"
            onClick={() => navigate?.('home')} 
            className="text-2xl font-bold tracking-tighter text-[#163422] font-display hover:opacity-85 transition-opacity"
          >
            Galunggung
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button type="button" onClick={() => navigate?.('home')} className="text-[#163422]/60 font-medium hover:text-[#163422] transition-colors font-display"></button>
            <button type="button" onClick={() => navigate?.('tentang')} className="text-[#163422]/60 font-medium hover:text-[#163422] transition-colors font-display"></button>
            <button type="button" onClick={() => navigate?.('informasi')} className="text-[#163422]/60 font-medium hover:text-[#163422] transition-colors font-display"></button>
            <button type="button" onClick={() => navigate?.('lokasi')} className="text-[#163422]/60 font-medium hover:text-[#163422] transition-colors font-display"></button>
          </div>
          <button 
            type="button"
            onClick={() => navigate?.('jadwal')} 
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold hover:opacity-80 transition-all duration-300 scale-95 active:scale-90"
          >
            Book Now
          </button>
        </nav>
      </header>

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-20 hidden lg:block">
          <img 
            alt="vibrant tropical volcanic landscape with lush greenery and morning mist rising from a crater valley" 
            className="h-full w-full object-cover [clip-path:polygon(0_0,100%_0,100%_85%,0%_100%)]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC62whQNmi9G9k2b1QQQUvbvzhINrYLrkIkpabpoAThWkqA_huIxXRtQzFu7jOfouDFHCL-RPTzmM6g0kRQsQpsVm1YBfJNuREwaDSwmAFOyQieFiN1wv0qpXjyqKcwkVJPb6gte0ifpHVF0aDlOwiM0gBSei61Z9eQfRoIk56OJxXbygJA1rVJRloBM5MN_JXBIwmJ-nrdoCxpPsRWPKt1E_tn2Insh93sbv-biA5N0z_MQfb3Vsu_K9m1iH5BcAlC34pZVs7TKA"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 items-center gap-16">
          {/* Content Left */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-25"></div>
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-4">
              Pendaftaran Pendakian Berhasil!
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              ID Pendaftaran Anda: <span className="font-bold text-primary">{reference}</span>. <br className="hidden md:block"/>
              Harap simpan nomor ini untuk verifikasi di pos pendakian.
            </p>
            {/* Registration Summary Card */}
            <div className="w-full max-w-md bg-surface-container-low p-8 rounded-xl mb-12 shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)]">
              <h3 className="font-display font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">description</span>
                Ringkasan Pendaftaran
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3">
                  <span className="text-on-surface-variant font-medium">Rute</span>
                  <span className="text-primary font-bold">{route}</span>
                </div>
                <div className="w-full h-px bg-outline-variant opacity-15"></div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-on-surface-variant font-medium">Tanggal</span>
                  <span className="text-primary font-bold">{date}</span>
                </div>
                <div className="w-full h-px bg-outline-variant opacity-15"></div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-on-surface-variant font-medium">Jumlah Anggota</span>
                  <span className="text-primary font-bold">{qty} Orang</span>
                </div>
              </div>
            </div>


            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                type="button"
                onClick={handleDownload}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/10 hover:opacity-90 transition-all active:scale-95 group"
              >
                <span className="material-symbols-outlined">download</span>
                Unduh E-Tiket Pendakian
              </button>
              <button 
                type="button"
                onClick={() => navigate?.('home')}
                className="bg-surface-container-highest text-on-secondary-container px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-surface-container-high transition-all active:scale-95"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
          {/* Content Right (Visual Anchor) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl -z-10"></div>
              <div className="relative bg-surface-container-lowest p-4 rounded-xl shadow-2xl rotate-3 scale-105">
                <img 
                  alt="close up of morning dew on forest leaves in Gunung Galunggung area with soft sunlight" 
                  className="rounded-lg object-cover w-full h-[500px]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArjHyPMCpyz6-RwcPfzGvjfz8zwZds-YP1HbepAu7JyN7zZFlhHcOY3ujcWlN16rbai113j7mBEL9JAt0ZWcZ4UmDWSA9zfXJqEOdRFwj-CPqC_IuUn_EF7eibIT7OQ_ZKd1l521VwmFsxZabHHuzLSc-TPxvB0R2jZq0raDmdzDvkUqCXDJSgd_DN5vl6Pj-Js4eZvQ_OWVZU7YIEAMgJCu_2Gdowvcil-q-0fb1WAnw6nsK-RJHUdi_f1y8vpKm7hv7jYYkENw"
                />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white">
                  <p className="font-display font-bold text-xl mb-1 text-white">Persiapkan Dirimu</p>
                  <p className="text-sm opacity-90 leading-snug text-white">Pastikan fisik dalam kondisi prima dan perlengkapan mendaki lengkap sebelum hari keberangkatan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-[#f4f4f2] dark:bg-emerald-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 max-w-7xl mx-auto w-full font-body text-sm tracking-wide text-[#163422] dark:text-emerald-50">
          <div className="flex flex-col items-center md:items-start gap-4">
            <button 
              type="button"
              onClick={() => navigate?.('home')}
              className="font-display font-bold text-lg text-[#163422] dark:text-emerald-50 hover:underline"
            >
              Gunung Galunggung
            </button>
            <p className="text-[#163422]/50 dark:text-emerald-50/50">© 2024 Gunung Galunggung. A Curated Descent.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <button type="button" onClick={() => navigate?.('home')} className="text-[#163422]/50 dark:text-emerald-50/50 hover:text-[#163422] transition-colors">Privacy Policy</button>
            <button type="button" onClick={() => navigate?.('home')} className="text-[#163422]/50 dark:text-emerald-50/50 hover:text-[#163422] transition-colors">Terms of Service</button>
            <button type="button" onClick={() => navigate?.('lokasi')} className="text-[#163422]/50 dark:text-emerald-50/50 hover:text-[#163422] transition-colors">Local Guides</button>
            <button type="button" onClick={() => navigate?.('informasi')} className="text-[#163422]/50 dark:text-emerald-50/50 hover:text-[#163422] transition-colors">Sustainability Report</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
