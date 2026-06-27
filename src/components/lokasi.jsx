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
                  href="https://maps.google.com/?q=Gunung+Galunggung"
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1d63292.05206687002!2d108.02685794711674!3d-7.269438012678663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f54316d3f23db%3A0xc3f3458bfb15b6d!2sGn.%20Galunggung!5e0!3m2!1sid!2sid!4v1689240000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Gunung Galunggung"
            ></iframe>
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
