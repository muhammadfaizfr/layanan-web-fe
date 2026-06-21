function Lokasi({ openModal, navigate }) {
  return (
    <>
      {/* Hero Section & Map Canvas */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-4">
            Navigasi Wisata
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tight mb-6">
            Temukan Jalan Ke <br/><span className="text-secondary italic">Puncak Keajaiban.</span>
          </h1>
          <p className="max-w-2xl text-lg text-on-surface-variant leading-relaxed">
            Terletak di Jawa Barat, Gunung Galunggung menawarkan akses mudah bagi petualang yang mencari ketenangan kawah vulkanik dan hijaunya hutan tropis.
          </p>
        </div>

        {/* Bento Layout for Map & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Address Card */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">Alamat Lengkap</h2>
                <div className="flex gap-4 mb-6">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div className="body-lg text-on-surface-variant">
                    Linggawangi, Kec. Sukaratu, Kabupaten Tasikmalaya, Jawa Barat 46415, Indonesia
                  </div>
                </div>
                <div className="flex gap-4 mb-10">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div className="body-lg text-on-surface-variant">
                    Buka Setiap Hari<br/>
                    <span className="font-semibold text-primary">06:00 — 18:00 WIB</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1 w-full"
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined">map</span>
                  Buka Maps
                </a>
                <button
                  onClick={() => navigate?.('riwayat-tiket')}
                  className="inline-flex items-center justify-center gap-3 bg-surface-container-highest text-primary px-8 py-4 rounded-full font-bold transition-all hover:bg-surface-container-high hover:shadow-md w-full"
                >
                  <span className="material-symbols-outlined">history</span>
                  Lihat Riwayat Tiket
                </button>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-10 rounded-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Akses Jalan</h3>
                <p className="text-on-primary-container text-sm leading-relaxed mb-6">
                  Jalur aspal mulus hingga area parkir bawah. Tersedia angkutan wisata lokal menuju bibir kawah.
                </p>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xs">directions_car</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xs">motorcycle</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xs">directions_bus</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[12rem]">explore</span>
              </div>
            </div>
          </div>

          {/* Styled Map View Container */}
          <div className="lg:col-span-8 bg-surface-container-high rounded-xl overflow-hidden relative min-h-[500px] shadow-[0_20px_50px_rgba(22,52,34,0.1)]">
            <div className="absolute inset-0 bg-[#e5e5e5] grayscale contrast-125">
              <img
                className="w-full h-full object-cover opacity-60"
                alt="a stylized topographical map of a mountain range with intricate contour lines and lush green elevation shading"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeZzIA6pMEuDQmEhjbXmGlMCg8vk7rcz0G_tQU6aPptR84XTQMUuNZCoiebsDQvx7wkAP5VTrbcKpUi5VrqHaGPaK5lUZjRw8BUwsgNaCFRvnbKdbJhAnL34DXgwHfhrh5wqlm2QJKAd0adV25Q8TvknwbwtX8MsiZ--IzRyNx4CZWoiwpt3hN6Hu9SCf4EbkceKGPOYdXhnT0-z1g9qABowRTvnTEgNURPNU_ta1u8SHZCZcdwOJyI3lbF4Hs8Ag9NlWDtnmReg"
              />
            </div>

            {/* Decorative Map Elements */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full animate-pulse border border-primary/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full ring-8 ring-primary/20"></div>
                </div>
              </div>
            </div>

            {/* Floating Map Controls (Visual Only) */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
              <button className="bg-surface-container-lowest w-12 h-12 rounded-lg flex items-center justify-center shadow-md text-primary">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="bg-surface-container-lowest w-12 h-12 rounded-lg flex items-center justify-center shadow-md text-primary">
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>

            {/* Location Label Overlay */}
            <div className="absolute top-8 left-8 bg-surface-container-lowest/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg border-l-4 border-primary">
              <p className="label-md text-[10px] tracking-widest text-secondary font-bold uppercase mb-1">Titik Koordinat</p>
              <p className="text-xl font-bold text-primary tabular-nums tracking-tighter">7.2583° S, 108.0583° E</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distance Info Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-primary/5 pt-16">
          <div>
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">near_me</span>
              Dari Pusat Kota
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Hanya berjarak sekitar 17 KM dari pusat Kota Tasikmalaya. Perjalanan memakan waktu kurang lebih 45-60 menit tergantung kondisi lalu lintas.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">terrain</span>
              Ketinggian
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Berada di ketinggian 2.168 meter di atas permukaan laut. Pastikan kendaraan dalam kondisi prima untuk menanjak.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">eco</span>
              Udara Sekitar
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Suhu rata-rata berkisar antara 18°C hingga 24°C. Disarankan membawa jaket ringan atau pakaian hangat.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Lokasi;
