import { useState, useEffect } from 'react'
import Galeri from './components/Galeri.jsx'
import Informasi from './components/Informasi.jsx'
import Kontak from './components/Kontak.jsx'
import Jadwal from './components/Jadwal.jsx'
import Lokasi from './components/Lokasi.jsx'
import Tentang from './components/Tentang.jsx'
import PesanTiket from './components/pesanantiket.jsx'
import PembayaranPendakian from './components/PembayaranPendakian.jsx'
import BerhasilPembayaran from './components/berhasilpembayaran.jsx'

function App() {
  // ===== LOGIKA MODAL (TIDAK BERUBAH) =====
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)
  const pricePerTicket = 25000

  const totalPrice = ticketCount * pricePerTicket

  const incrementTicket = () => {
    if (ticketCount < 10) setTicketCount(ticketCount + 1)
  }

  const decrementTicket = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1)
  }

  const openModal = () => {
    setTicketCount(1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)
  }

  // ===== STATE UNTUK NAVIGASI =====
  const [currentPage, setCurrentPage] = useState('home')
  const [order, setOrder] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [scheduleInfo, setScheduleInfo] = useState(null)

  const handleSaveSchedule = (schedule) => {
    setScheduleInfo(schedule)
  }

  const handleProceedToPayment = (orderData) => {
    setOrder({ ...scheduleInfo, ...orderData })
    setPaymentMethod(null)
    setScheduleInfo(null)
    setIsModalOpen(false)
    setCurrentPage('pembayaran')
  }

  const handleCompletePayment = (method) => {
    setPaymentMethod(method)
    setCurrentPage('berhasil')
  }

  // Scroll to top when page changes (so new page appears at top)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage])

  // ===== FUNGSI RENDER KONTEN PER HALAMAN =====
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            {/* Hero Section Home */}
            <section className="relative h-screen flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt="cinematic wide shot of Gunung Galunggung crater lake with morning mist, lush green slopes, and soft sunlight filtering through clouds" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA42XsE07zyyGw-IbxxFucWw5gQnfKjrX9pAMFZ3iX1wyiE7ysSfTSKfaN18re9YNx1kZ79j1BJAxJCxRHS40OEyPdMG-GjJCvNIQNiCxfp2mOuw79ULADt2t_qmeGpInyzeH7C8Sbo9O3o1Ung0aFdumIjkxOJbY1HWjWIgL61CFKucwOUtWD9kBp15vc33Qa9EHpbhJiVzHTzqGA0uHrvswg_iwHxUXUL9ih3RnrWd77xxivpaPe3-lpMQhlN3_qqDuXA-EGHGA" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl">
                  <span className="inline-block label-md text-surface-container-lowest font-semibold tracking-[0.2em] mb-6 uppercase">Explorasi Alam Jawa Barat</span>
                  <h1 className="text-6xl md:text-8xl font-extrabold text-surface leading-[0.9] tracking-tighter mb-8">
                    Eksplorasi<br/>Gunung<br/>Galunggung
                  </h1>
                  <p className="text-xl text-surface/90 font-body leading-relaxed mb-10 max-w-lg">
                    Temukan keindahan alam dan kawah yang menakjubkan di Jawa Barat. Perjalanan spiritual dan petualangan menanti di puncak tertinggi Tasikmalaya.
                  </p>
                  <div className="flex items-center gap-6">
                    <button className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all active:scale-95">
                      Jelajahi Sekarang
                    </button>
                    <button className="text-surface flex items-center gap-2 group font-medium">
                      <span className="w-12 h-12 rounded-full border border-surface/30 flex items-center justify-center group-hover:bg-surface/10 transition-colors">
                        <span className="material-symbols-outlined">play_arrow</span>
                      </span>
                      Lihat Video
                    </button>
                  </div>
                </div>
              </div>
              {/* Stats overlay */}
              <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-8 text-surface text-right border-r border-surface/20 pr-8">
                <div>
                  <p className="text-[10px] tracking-widest uppercase opacity-60">Ketinggian</p>
                  <p className="text-3xl font-bold">2,168<span className="text-sm ml-1 font-normal opacity-70">MDPL</span></p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase opacity-60">Suhu Rata-rata</p>
                  <p className="text-3xl font-bold">18°C</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase opacity-60">Tangga Ikonik</p>
                  <p className="text-3xl font-bold">620<span className="text-sm ml-1 font-normal opacity-70">Anak Tangga</span></p>
                </div>
              </div>
            </section>

            {/* Bento Grid */}
            <section className="py-32 px-8 bg-surface">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 bg-surface-container-low p-12 rounded-xl relative overflow-hidden group">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <h2 className="text-4xl font-bold text-primary mb-6">Keajaiban Kawah Hijau</h2>
                        <p className="text-on-surface-variant max-w-md leading-relaxed">
                          Nikmati panorama kawah gunung berapi dengan danau berwarna hijau zamrud yang menakjubkan. Dikelilingi dinding tebing yang megah, menciptakan suasana magis.
                        </p>
                      </div>
                      <button onClick={() => setCurrentPage('lokasi')} className="mt-8 text-primary font-bold flex items-center gap-2 underline underline-offset-8">
                        Lihat Detail Kawah
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                    <img 
                      className="absolute right-0 bottom-0 w-1/2 h-full object-cover rounded-l-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-700" 
                      alt="close-up of volcanic crater landscape" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWPZnH_HhfO5fVRsqrtEt_SGTe-pVC4AZi5PZlS2EYzSK1t4OJptEC_TNGaDF44TxVQCr1offxD74Oct9KQic6T2l7dHxI90vA4e1KiPKref9ekAHQKUBbXVTrwS8kOqUdTa_e3riXGX_d9RIC6Lgj0pzxGx6Yk408WVcNx-8r_WKWbTBhM6vtjXo-f1lCj9SYY3D1nTtmy8oPyLAoE4a3lbo38BjMC-97Q9KPGKE2_vOVJigKyvqcs_UsWONRjHAtHmf1KyKIAA" 
                    />
                  </div>
                  <div className="md:col-span-4 bg-primary text-on-primary p-12 rounded-xl flex flex-col justify-center text-center">
                    <span className="material-symbols-outlined text-5xl mb-6">hot_tub</span>
                    <h3 className="text-2xl font-bold mb-4">Pemandian Air Panas</h3>
                    <p className="text-on-primary-container text-sm leading-relaxed mb-6">
                      Relaksasi tubuh Anda setelah mendaki di sumber air panas alami yang kaya akan mineral vulkanik.
                    </p>
                    <button className="bg-surface-container-lowest text-primary py-3 rounded-full font-bold text-sm">Lihat Lokasi</button>
                  </div>
                  <div className="md:col-span-4 bg-secondary-container p-8 rounded-xl flex flex-col justify-between">
                    <p className="text-on-secondary-container font-medium italic">"Pengalaman yang tak terlupakan. Tangga 620 memang menantang, tapi pemandangan di atas membayar semuanya."</p>
                    <div className="flex items-center gap-3 mt-6">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed-dim"></div>
                      <div>
                        <p className="text-sm font-bold text-on-secondary-container">Andini Putri</p>
                        <p className="text-[10px] tracking-widest uppercase text-on-secondary-fixed-variant">Solo Traveler</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-2 gap-6">
                    <div className="bg-surface-container-high rounded-xl p-8 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-primary text-4xl mb-2">camping</span>
                      <h4 className="font-bold text-primary">Area Camping</h4>
                      <p className="text-xs text-on-surface-variant mt-2">Tersedia area camping luas dengan fasilitas memadai.</p>
                    </div>
                    <div className="bg-surface-container-high rounded-xl p-8 flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-primary text-4xl mb-2">camera</span>
                      <h4 className="font-bold text-primary">Spot Foto</h4>
                      <p className="text-xs text-on-surface-variant mt-2">Dapatkan foto landscape terbaik dari Gardu Pandang.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Asymmetric Experience Section */}
            <section className="py-24 bg-surface-container-low overflow-hidden">
              <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                  <img 
                    className="rounded-[3rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" 
                    alt="dramatic mountain staircase" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB62f5fYAYI0GZTGrd_Humv31MIVKyzZDJGGakf1W1BQoGcu5a39_PUQp6yjqhvQ1ptGFOimh7k4qWanP1uVrSc1CMRJNHg3ZNqfgBwa3gnd2fOBTLtT_hMAUxYAS29Yj0uExVMrTQ-N4RLHuNpS1MwZ1A_KehOR0G44Ie1BhCuNBE89Wd847jXlT7I_fnyXFyml0CYAoz4KdVt3AVq9U0FC0zIzdaXSLdU1_-2ITinP4MrHOo2PSVAd8LjGMC_Bsh5wE59j-XMyg" 
                  />
                  <div className="absolute -bottom-8 -right-8 bg-surface p-6 rounded-2xl shadow-xl z-20 max-w-xs">
                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Highlight Hari Ini</p>
                    <p className="text-sm text-on-surface-variant">Langit cerah diperkirakan hingga sore hari. Waktu terbaik untuk mengunjungi kawah.</p>
                  </div>
                </div>
                <div className="lg:pl-12">
                  <h2 className="text-5xl font-bold text-primary mb-8 leading-tight tracking-tight">Kenyamanan &amp; Keamanan Prioritas Kami</h2>
                  <ul className="space-y-8">
                    <li className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-primary-container/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">verified_user</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg">Pemandu Profesional</h4>
                        <p className="text-on-surface-variant leading-relaxed">Tim pemandu lokal berlisensi siap menemani perjalanan trekking Anda dengan aman.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-primary-container/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">medical_services</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg">Fasilitas Kesehatan</h4>
                        <p className="text-on-surface-variant leading-relaxed">Pos kesehatan tersedia di area parkir utama dan area wisata air panas.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-primary-container/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">qr_code_2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg">E-Ticketing</h4>
                        <p className="text-on-surface-variant leading-relaxed">Pesan tiket secara online untuk menghindari antrean panjang di loket masuk.</p>
                      </div>
                    </li>
                  </ul>
                  <button 
                    onClick={openModal}
                    className="mt-12 bg-primary text-on-primary px-10 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Pesan Tiket Anda Sekarang
                  </button>
                </div>
              </div>
            </section>
          </>
        )

      case 'pembayaran':
        return (
          <PembayaranPendakian order={order} formatRupiah={formatRupiah} navigate={setCurrentPage} onComplete={handleCompletePayment} />
        )

      case 'berhasil':
        return (
          <BerhasilPembayaran order={order} formatRupiah={formatRupiah} navigate={setCurrentPage} paymentMethod={paymentMethod} />
        )

      case 'tentang':
        return (
          <Tentang navigate={setCurrentPage} />
        )
      case 'informasi':
        return (
          <Informasi openModal={openModal} />
        )
      case 'galeri':
        return (
          <Galeri />
        )
      case 'lokasi':
        return (
          <Lokasi openModal={openModal} />
        )
      case 'kontak':
        return (
          <Kontak openModal={openModal} />
        )
      case 'jadwal':
        return (
          <Jadwal openModal={openModal} onSaveSchedule={handleSaveSchedule} />
        )
      default:
        return null
    }
  }

  // ===== RENDER UTAMA =====
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f7]/80 backdrop-blur-md shadow-[0_4px_40px_0_rgba(22,52,34,0.04)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <a className="text-xl font-bold tracking-tighter text-[#163422]" href="#">Gunung Galunggung</a>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentPage('home')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'home' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Home</button>
            <button onClick={() => setCurrentPage('tentang')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'tentang' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Tentang</button>
            <button onClick={() => setCurrentPage('informasi')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'informasi' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Informasi</button>
            <button onClick={() => setCurrentPage('galeri')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'galeri' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Galeri</button>
            <button onClick={() => setCurrentPage('lokasi')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'lokasi' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Lokasi</button>
          </div>
          <button 
            onClick={openModal}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95 opacity-90 shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]"
          >
            Pesan Tiket
          </button>
        </div>
      </nav>

      <main className="pt-24 overflow-hidden">
        {renderPage()}
      </main>

      {/* Footer – same for all pages */}
      <footer className="w-full border-t border-[#163422]/5 bg-[#f4f4f2]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-[#163422]">Gunung Galunggung</span>
            <p className="text-[10px] tracking-widest uppercase text-[#695d47] font-medium">Destinasi Alam Premium</p>
          </div>
          <div className="flex gap-8">
            <button onClick={() => setCurrentPage('tentang')} className="text-sm font-semibold text-[#163422] hover:underline transition-all">Tentang</button>
            <button onClick={() => setCurrentPage('kontak')} className="text-sm text-[#695d47] hover:text-[#163422] hover:underline transition-all">Kontak</button>
            <button onClick={() => setCurrentPage('informasi')} className="text-sm text-[#695d47] hover:text-[#163422] hover:underline transition-all">Informasi</button>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-[#695d47] opacity-80">© 2024 Gunung Galunggung. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Booking (komponen terpisah) */}
      <PesanTiket
        isOpen={isModalOpen}
        onClose={closeModal}
        ticketCount={ticketCount}
        incrementTicket={incrementTicket}
        decrementTicket={decrementTicket}
        totalPrice={totalPrice}
        formatRupiah={formatRupiah}
        onProceed={handleProceedToPayment}
      />
    </>
  )
}

export default App
