import React from 'react'
import heroPanduan from '../assets/images/Screenshot_2023_0618_2140241.png'

export default function PanduanPendakian({ navigate, openModal }) {
  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#f9f9f7]/80 backdrop-blur-md shadow-[0_4px_40px_0_rgba(22,52,34,0.04)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate?.('home')} className="text-xl font-bold tracking-tighter text-[#163422] cursor-pointer">Gunung Galunggung</button>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate?.('home')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Home</button>
            <button onClick={() => navigate?.('tentang')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Tentang</button>
            <button onClick={() => navigate?.('informasi')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Informasi</button>
            <button onClick={() => navigate?.('galeri')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Galeri</button>
            <button onClick={() => navigate?.('lokasi')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Lokasi</button>
            <button onClick={() => navigate?.('riwayat-tiket')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Tiket Saya</button>
            <button onClick={() => navigate?.('kontak')} className="text-sm tracking-wide font-medium pb-1 text-[#695d47] hover:text-[#163422] transition-colors duration-300">Kontak</button>
            <button onClick={() => navigate?.('panduan-pendakian')} className="text-sm tracking-wide font-medium pb-1 text-[#163422] border-b-2 border-[#163422] transition-colors duration-300">Panduan Pendakian</button>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate?.('jadwal')}
              className="bg-[#163422] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95 opacity-90 shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]"
            >
              Jadwal Pendakian
            </button>
            {openModal && (
              <button 
                onClick={openModal}
                className="bg-[#163422] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95 opacity-90 shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]"
              >
                Pesan Tiket
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center overflow-hidden bg-surface py-20 px-8">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
            <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
              <span className="font-label text-secondary uppercase tracking-[0.2em] text-sm mb-6 block">Manual Pendakian V1.0</span>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tighter mb-8">
                Panduan Keselamatan &amp; Etika Pendakian
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Menjelajahi kawah Galunggung bukan sekadar perjalanan fisik, melainkan sebuah bentuk penghormatan terhadap alam vulkanik yang megah.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 relative mt-12 md:mt-0">
              <div className="rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  alt="Mountain path" 
                  className="w-full h-[500px] object-cover" 
                  src={heroPanduan}
                />
              </div>
            </div>
          </div>
          {/* Decorative Element */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary-fixed/20 blur-[120px] -z-10"></div>
        </section>

        {/* Mandatory Gear: Bento Grid */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-4xl font-bold text-primary tracking-tight mb-4">Perlengkapan Wajib</h2>
                <p className="text-on-surface-variant">Persiapkan diri Anda dengan standar keamanan tertinggi sebelum memulai pendakian ke area kawah dan puncak.</p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-1 bg-primary/10"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl hover:shadow-xl transition-shadow duration-500">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">hiking</span>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Sepatu Mendaki</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Gunakan sepatu dengan grip kuat untuk medan berpasir dan berbatu vulkanik yang licin.</p>
              </div>
              <div className="md:col-span-2 bg-primary p-10 rounded-xl text-surface-bright shadow-lg flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-4xl mb-6 text-surface-bright">water_drop</span>
                  <h3 className="font-display text-xl font-bold mb-3 text-surface-bright">Air Minum</h3>
                </div>
                <p className="text-sm opacity-80 leading-relaxed">Minimal 2 liter per orang. Dehidrasi adalah risiko utama di area kawah yang terbuka.</p>
              </div>
              <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl hover:shadow-xl transition-shadow duration-500">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">rainy</span>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Jas Hujan</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Cuaca di Gunung Galunggung dapat berubah drastis dalam hitungan menit.</p>
              </div>
              <div className="md:col-span-3 bg-surface-container-lowest p-10 rounded-xl hover:shadow-xl transition-shadow duration-500 flex items-center gap-8">
                <div className="bg-primary-container/10 p-6 rounded-full">
                  <span className="material-symbols-outlined text-primary text-4xl">medical_services</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary mb-2">Obat-obatan Pribadi</h3>
                  <p className="text-sm text-on-surface-variant">P3K dasar dan obat khusus bagi yang memiliki riwayat medis tertentu.</p>
                </div>
              </div>
              <div className="md:col-span-3 bg-surface-container-lowest p-10 rounded-xl hover:shadow-xl transition-shadow duration-500 flex items-center gap-8">
                <div className="bg-primary-container/10 p-6 rounded-full">
                  <span className="material-symbols-outlined text-primary text-4xl">flashlight_on</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary mb-2">Lampu Senter</h3>
                  <p className="text-sm text-on-surface-variant">Wajib bagi pendaki yang berencana menikmati sunrise atau trekking saat gelap.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Do's & Don'ts */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <h2 className="font-display text-4xl font-bold text-primary tracking-tight mb-8">Peraturan &amp; Etika</h2>
              <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">Sebagai kawasan konservasi, Galunggung bergantung pada setiap langkah bijak yang Anda ambil selama berada di area gunung.</p>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  alt="Mountain Ethics" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQl3r0bb71TchaYw41IyE95fTDt9m_skBY7vDs86SkXlLG4tpazlXqVhXu-BcThzBQGa9GAvy-eyhvLq4ypK94mYA7K877S7wdWxcA2l3gf6c_Iq4PZKX60nYmN2ljkRP785XOeynTVD6F0lfzF9F4mTp-WSPIDq2xJZiyGSg4oKJtXttAvqyqXcNhC7jrAuQttOZdGm6pOVTrFh-EflbRtUqEBC9J1xTCyK3lq82v-lkJfpRrpJtJX8Q-tkH5rPsTyfdk00q_A"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <div>
                  <h4 className="font-display font-bold text-lg mb-2">Bawa Sampah Kembali</h4>
                  <p className="text-on-surface-variant">Apa pun yang Anda bawa naik, pastikan Anda bawa kembali turun. Tidak ada toleransi untuk sampah.</p>
                </div>
              </div>
              <div className="bg-error-container/20 p-8 rounded-xl flex gap-6 items-start">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                <div>
                  <h4 className="font-display font-bold text-lg mb-2">Dilarang Merusak Tanaman</h4>
                  <p className="text-on-surface-variant">Jangan memetik bunga atau merusak vegetasi vulkanik yang sangat berharga bagi ekosistem.</p>
                </div>
              </div>
              <div className="bg-error-container/20 p-8 rounded-xl flex gap-6 items-start">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <div>
                  <h4 className="font-display font-bold text-lg mb-2">Larangan Api Unggun</h4>
                  <p className="text-on-surface-variant">Dilarang membuat api unggun sembarangan untuk mencegah risiko kebakaran hutan dan lahan.</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>volume_off</span>
                <div>
                  <h4 className="font-display font-bold text-lg mb-2">Hargai Ketenangan</h4>
                  <p className="text-on-surface-variant">Gunakan volume suara yang wajar. Berikan kesempatan bagi pendaki lain dan satwa untuk menikmati kesunyian.</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>signpost</span>
                <div>
                  <h4 className="font-display font-bold text-lg mb-2">Tetap di Jalur Resmi</h4>
                  <p className="text-on-surface-variant">Menyimpang dari jalur bukan hanya merusak alam, tapi juga membahayakan keselamatan Anda.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section className="py-24 px-8 bg-primary">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-surface-bright tracking-tight mb-4">Prosedur Keadaan Darurat</h2>
            <p className="text-primary-fixed-dim max-w-2xl mx-auto">Keselamatan adalah prioritas utama. Jika terjadi kendala atau kecelakaan, ikuti langkah-langkah berikut.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="text-primary-fixed-dim font-display text-3xl font-black opacity-30">01</span>
                <div>
                  <h5 class="text-surface-bright font-bold text-lg mb-2">Tetap Tenang</h5>
                  <p className="text-primary-fixed-dim text-sm">Jangan panik. Amankan posisi Anda dan rekan di tempat yang stabil dan tidak berbahaya.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="text-primary-fixed-dim font-display text-3xl font-black opacity-30">02</span>
                <div>
                  <h5 className="text-surface-bright font-bold text-lg mb-2">Berikan Pertolongan Pertama</h5>
                  <p className="text-primary-fixed-dim text-sm">Gunakan kotak P3K Anda. Hindari memindahkan korban jika diduga ada cedera tulang belakang.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="text-primary-fixed-dim font-display text-3xl font-black opacity-30">03</span>
                <div>
                  <h5 className="text-surface-bright font-bold text-lg mb-2">Hubungi Ranger</h5>
                  <p className="text-primary-fixed-dim text-sm">Gunakan sinyal darurat atau telepon jika tersedia sinyal di titik tersebut.</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-container p-10 rounded-2xl flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-surface-bright text-5xl mb-6">phone_in_talk</span>
              <h4 className="text-primary-fixed-dim font-label uppercase tracking-widest text-xs mb-2">Kontak Darurat Ranger</h4>
              <p className="text-surface-bright text-3xl font-extrabold tracking-tighter mb-6">+62 812-3456-7890</p>
              <p className="text-primary-fixed-dim text-sm">Tersedia 24/7 untuk bantuan evakuasi dan laporan kendala jalur.</p>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-[#f4f4f2] dark:bg-[#1a1c1b] text-[#163422] dark:text-[#f9f9f7] block w-full py-16 px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto font-['Inter'] text-sm tracking-normal leading-relaxed">
          <div>
            <span className="text-[#163422] font-black tracking-tighter text-2xl block mb-6">GUNUNG GALUNGGUNG</span>
            <p className="opacity-70 max-w-sm mb-8">Pusat informasi resmi pendakian dan wisata alam vulkanik Gunung Galunggung, Tasikmalaya.</p>
            <p className="opacity-70 font-bold uppercase tracking-widest text-[10px]">© 2024 GUNUNG GALUNGGUNG. THE CURATED DESCENT.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h6 className="font-bold uppercase tracking-widest text-[10px]">Navigasi</h6>
              <button onClick={() => navigate?.('home')} className="opacity-70 hover:opacity-100 transition-opacity text-left">Tips Keamanan</button>
              <button onClick={() => navigate?.('tentang')} className="opacity-70 hover:opacity-100 transition-opacity text-left">Pusat Bantuan</button>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold uppercase tracking-widest text-[10px]">Legal</h6>
              <button onClick={() => navigate?.('home')} className="opacity-70 hover:opacity-100 transition-opacity text-left">Kebijakan Konservasi</button>
              <button onClick={() => navigate?.('tentang')} className="opacity-70 hover:opacity-100 transition-opacity text-left">Kontak Darurat</button>
            </div>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 md:hidden bg-[#f9f9f7]/95 backdrop-blur-2xl dark:bg-[#1a1c1b]/95 text-[#163422] dark:text-[#f9f9f7] rounded-t-[2rem] shadow-[0_-10px_40px_rgba(22,52,34,0.06)]">
        <button 
          onClick={() => navigate?.('home')} 
          className="flex flex-col items-center justify-center text-[#695d47] dark:text-[#f9f9f7]/40 px-6 py-2 hover:bg-[#f4f4f2] dark:hover:bg-[#2d4b37]/20 rounded-full transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Beranda</span>
        </button>
        <button 
          onClick={() => navigate?.('panduan-pendakian')} 
          className="flex flex-col items-center justify-center bg-[#163422] text-[#f9f9f7] rounded-full px-6 py-2 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Panduan</span>
        </button>
        <button 
          onClick={() => navigate?.('home')} 
          className="flex flex-col items-center justify-center text-[#695d47] dark:text-[#f9f9f7]/40 px-6 py-2 hover:bg-[#f4f4f2] dark:hover:bg-[#2d4b37]/20 rounded-full transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined">map</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Peta</span>
        </button>
        <button 
          onClick={() => navigate?.('tentang')} 
          className="flex flex-col items-center justify-center text-[#695d47] dark:text-[#f9f9f7]/40 px-6 py-2 hover:bg-[#f4f4f2] dark:hover:bg-[#2d4b37]/20 rounded-full transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest font-bold mt-1">Profil</span>
        </button>
      </nav>
    </div>
  )
}
