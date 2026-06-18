// src/components/Jadwal.jsx
function Jadwal({ openModal }) {
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
              {/* Route Card 1 - Selected */}
              <div className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border-2 border-primary">
                <div className="h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="dramatic stone staircase leading into mist on a green mountain side with volcanic rock textures" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH8SpkvELynxvVRRI4fcMuxcJBozR4S1yFEQ6cON0ESN5B1yNLcG7oq-mibVURM20gVFCCXG0YYAgqSYzGvrZfIqRbb86zFXR6J1CUjrDSVeBLAkoaGdlzC8x2z-7IfGQ29VbNNsMEaQePMAJNwiy23EdtLzxyJNcgmn8IyIQPPNLA58NfMnGWoM1YEX1TksYMqMcHiGmbSRM5u7pNs3teogx6KnxayJKcnIDq25JVx3Cd2Cxin6Rdmu1UxHUv2xu80WzxBOpVJw" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-primary">Rute Tangga 620</h3>
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">MODERAT</span>
                  </div>
                  <div className="flex gap-4 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 45-60 Menit
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">landscape</span> 620 Anak Tangga
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>Rute Terpilih</span>
                  </div>
                </div>
              </div>

              {/* Route Card 2 */}
              <div className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="dense tropical forest trail with atmospheric morning sunlight filtering through tall trees and mist" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCezAdxjeSRRDCOtxHquFlE1oZCUIedRCeHCovkRG6ViG_hAT9ACkYcSIbakbl48FY13yx3FFN5d0W-Tg4m0ZFxyEko-We8Mp76BU7BFghHDa3Degjtk_bwtGSnK4hnbhQaMTRhpDnsBLno5VEH4BUqOOcNCNHQWWnPckfOPWo1WcN8-RnBr7a0t0_6IvDY932YYGN4NVEB_6w9CN8LGJDVoonzljON2z4ZUNjDPAqkhqjK_B2yqCTkSpwlOA7ADYkRZxXzgj-gtg" 
                  />
                </div>
                <div className="p-6 opacity-80 group-hover:opacity-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-primary">Rute Hutan Cipanas</h3>
                    <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-full">MENANTANG</span>
                  </div>
                  <div className="flex gap-4 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 2-3 Jam
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">nature_people</span> Jalur Alami
                    </span>
                  </div>
                </div>
              </div>
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
                  <h4 className="font-bold text-primary">Oktober 2024</h4>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant mb-4">
                  <div>S</div><div>S</div><div>R</div><div>K</div><div>J</div><div>S</div><div>M</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Calendar Days */}
                  <div className="h-10 flex items-center justify-center text-outline text-sm">28</div>
                  <div className="h-10 flex items-center justify-center text-outline text-sm">29</div>
                  <div className="h-10 flex items-center justify-center text-outline text-sm">30</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">1</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">2</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">3</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">4</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md shadow-primary/20">5</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">6</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">7</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">8</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">9</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">10</div>
                  <div className="h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-sm font-medium">11</div>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-outline-variant/30 pl-8 hidden md:flex">
                <p className="text-sm text-on-surface-variant italic mb-4">"Waktu terbaik untuk mendaki adalah dini hari untuk mengejar matahari terbit di bibir kawah."</p>
                <div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20">
                  <div className="flex items-center gap-3 text-primary font-bold mb-1">
                    <span className="material-symbols-outlined">wb_sunny</span>
                    Terpilih
                  </div>
                  <div className="text-2xl font-display font-black text-primary">Sabtu, 5 Okt</div>
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
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-1">Jumlah Anggota</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-lowest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                    min="1" 
                    type="number" 
                    defaultValue="1" 
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
                  <span className="font-bold text-right">Rute Tangga 620</span>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-sm">Tanggal</span>
                  <span className="font-bold text-right">05 Oktober 2024</span>
                </div>
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <span className="text-on-primary-container text-sm">Anggota Tim</span>
                  <span className="font-bold text-right">1 Orang</span>
                </div>
                <div className="pt-4">
                  <div className="text-sm text-on-primary-container mb-1">Estimasi Biaya Retribusi</div>
                  <div className="text-3xl font-black">IDR 25.000</div>
                </div>
                <button 
                  onClick={openModal}
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