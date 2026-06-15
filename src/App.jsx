import { useState } from 'react'

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
                      <button className="mt-8 text-primary font-bold flex items-center gap-2 underline underline-offset-8">
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

      case 'tentang':
        return (
          <>
            {/* Hero Section: Editorial Impact */}
            <section className="relative min-h-[819px] flex items-center px-8 py-20 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 z-10">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-secondary mb-6 opacity-80">Warisan Alam Tasikmalaya</span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-primary leading-[0.95] tracking-tighter mb-8">
                    Keajaiban di Balik <br/><span className="text-secondary italic font-light">Kabut Abadi.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                    Lebih dari sekadar puncak vulkanik, Gunung Galunggung adalah monumen bisu transformasi alam yang menawarkan kedamaian dalam setiap langkah pendakian.
                  </p>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="rounded-xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img 
                      alt="Majestic view of green crater lake" 
                      className="w-full h-[600px] object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXnIXJVJZvdhES79o-EspLYkBYfmKKI9kwBFPXnotLrTZAQPTz7FFrhMbmcLuPDkiXTstjmFBf9_-nwsCQVA_mUr8DoleebGOBD7fE5Tfb2CWb34RO_gNl76S-6wJvUkRdslHYf3gZaxwt83hfX1XOJqHb68NOKkb2PSef8JvPB7lz55BOP_rlh4MsjRZ3FcSHRGnMq86LB2hmWlipzXK0IBpwwDISj-dGptOR3sIMd_wWo8F6btAa6oB5HiDZ4X-wSeyDHTc1qQ" 
                    />
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-fixed rounded-xl -z-10 opacity-50"></div>
                </div>
              </div>
            </section>

            {/* History Section */}
            <section className="bg-surface-container-low py-32 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-20 items-start">
                  <div className="w-full md:w-1/2 sticky top-32">
                    <h2 className="text-4xl font-bold text-primary tracking-tight mb-6">Jejak Waktu &amp; <br/>Transformasi</h2>
                    <div className="space-y-6 text-on-surface-variant leading-relaxed">
                      <p>Sejarah Gunung Galunggung mencatat salah satu erupsi paling dahsyat pada tahun 1982. Namun, dari abu vulkanik yang dingin, lahirlah ekosistem baru yang luar biasa subur.</p>
                      <p>Fenomena ini menjadikan Galunggung sebagai laboratorium alam yang memikat para peneliti dan pecinta alam. Gradasi hijau yang Anda lihat hari ini adalah hasil dari restorasi alami selama puluhan tahun.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8">
                      <div><span className="block text-3xl font-bold text-primary">2,168m</span><span className="text-[10px] tracking-widest uppercase text-secondary font-bold">Ketinggian Puncak</span></div>
                      <div><span className="block text-3xl font-bold text-primary">620</span><span className="text-[10px] tracking-widest uppercase text-secondary font-bold">Anak Tangga</span></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-12">
                    <img 
                      className="w-full h-96 object-cover rounded-xl shadow-sm" 
                      alt="Volcanic rock textures" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUXA0OiAf2OkdlTyuz_VEMPpleo_Dd9avbMz8MPcHD4xhOO3x-5VO_bec4_1ZYqWqDRj5IIUmR-EaVfE_wE8cYDAqh5SX_Wtk29rE3LptuN9mw7TMzERSEcaPsipnnbUeFWojJ1fNy9-4CSqqkRzS9heVv4lmkrmqsvc9oS9AbzM08-909xNUC4ABH-OooGirTE9eHevmnEuaRWA1420_-aufo2x74F8hwx75bbtNUvNwmTkI0hxWjJ9bhB8ayS0pcZLgaJAyaPw" 
                    />
                    <div className="bg-surface p-12 rounded-xl shadow-[0_40px_80px_-20px_rgba(22,52,34,0.08)]">
                      <h3 className="text-xl font-bold text-primary mb-4 italic">"Alam tidak terburu-buru, namun segalanya tercapai."</h3>
                      <p className="text-sm text-on-surface-variant">Lanskap Galunggung mengajarkan kita tentang ketahanan. Setiap lapisan tanah bercerita tentang kehancuran yang bertransformasi menjadi keindahan yang megah.</p>
                    </div>
                    <img 
                      className="w-full h-[500px] object-cover rounded-xl shadow-sm" 
                      alt="Steep stairs to crater" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuACk_J6pdQmgO9ENaNyAzhbw5qYS42Y7OHR3q0Zr-mHfo5LrtoTvGRzYEHpwJ1WEVrUUSZaAhnp3Zah-WqvdsURLYUfb1-d8TbjSqcYL72t1ru58-zPny32Z-A_1KvzUDtpsKhyogV_KbWNxBNA9hgQDVlEKjpwf4ct5__y5lZeehT5KS7BqFjz2VoZo7qsbwSWJIU5EttbEXPiyPmzl01jrfyBuDlieR3SGQpQEoF7kkLJ3YQx2inRnukU3nOCG0aoXEVR5GJL6Q" 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="py-32 px-8 bg-surface">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">Simfoni Alam</h2>
                  <p className="text-on-surface-variant">Koleksi momen yang tertangkap di antara tebing-tebing raksasa dan tenangnya air kawah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
                  <div className="md:col-span-8 overflow-hidden rounded-tr-xl rounded-bl-xl group">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Crater sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr9zbRfpupvkZmwh8ru5bicwSDa45bhT7gD6jUzUR2mU13QYYWHRe8tMaCx57CMV1OPHwp0vofvgTpBvegjsnEao4prvAtCRMLoByzDv-M-daCi4ev1HeTnFoGb8fijN82Av_hiFKZCuI81f1qpIuVNPr0bDd6TEDYTXjTuOgIf37nye4mQ_Rg8155-wZBZLYACpswljIX0Bb1dWq-8mODCcjngo0xeu1rdZGifyFcWEspfngYMpcO1bKJM5a1G6Ow4z2wFwAeHA" />
                  </div>
                  <div className="md:col-span-4 overflow-hidden rounded-tl-xl rounded-br-xl group">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pine forest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA2aqhJbaNn-is4VI7tN3uJ_jdEssAvQYcV6FeYtGwjBZMoQi_39h12kHXwGst23BRzo_emRtc2j_HDLyuuL9nnUGpE4S42yvh1B0Z4ZGFBpgxZwXn7aPE0GdFN57GoYVudk-hTr5Deo7wQkQklRBNdUS-I251-NxkH_sViD8iL2p_cmccuX6CzaSrFnGX0YPtxhXPxdVSdW5xz9tuSdf1A6v7q23Hc-iZXhGGnBgZGuA2NpQxMEp-dhx80hdIOmfwvSNbvc7NGA" />
                  </div>
                  <div className="md:col-span-4 overflow-hidden rounded-xl group">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hot springs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZmZf4iQG1j-CYsHdcvvY24xgvPFk0kml778o8xN2wLIC8tYYXK_dzZQLaZyrgMIrtCOBVT775PdAHdtrVnwJBVy5vHzk19oTTSbNJ0Fc8kGHbxJ_T_GMBb2eogCWG4PZoLMa3jsTLX_wl-pgMVYkEmjcU47xDpZct2mKxJeEo7ZkD-zERoxK8rYWp1oZHOOEd8DbpyLOrGhyelkjRwwinWMTxnmvnXMp8SnHy7MQONi67ZPbP7Gs29iXwIrtPUpT1Bv2sZgStWg" />
                  </div>
                  <div className="md:col-span-8 overflow-hidden rounded-tr-[5rem] rounded-bl-xl group">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Night stars" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYqxoEvvN6vz0yop7VvDwrSlRbkc83wO3yP_fu7BwFf3G_Uyanc5alBuUzy33rxZhB2-QG2X8TGAJFaRzSzCyEUWx2wTEHB6rpeAS6h-6XdSxwNPhC-4OTNyH5FtcNxbdKDuyaUzAogDK6_GP_4YYwlse8R2bbRzhIw2WfS9M_mr_H89ci8kXnIBvJ7R8xwdGE-gZfWXf-2hU1Wau9RTCBDqbS58nV50L8A1DlMIknJNzowpj_R5y_dSS36KK8k3Qerwz9ZJr-Eg" />
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8">
              <div className="max-w-5xl mx-auto bg-primary rounded-xl p-12 md:p-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-[100px]"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container rounded-full blur-[100px]"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-on-primary tracking-tight mb-8">Siap Untuk Menjelajah?</h2>
                  <p className="text-on-primary-container text-lg mb-12 max-w-xl mx-auto">Mulailah perjalanan Anda menuju puncak kesegaran raga dan ketenangan jiwa.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={openModal} className="bg-surface text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-surface-bright transition-all">
                      Jadwalkan Kunjungan
                    </button>
                    <button className="border border-on-primary/20 text-on-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-on-primary/10 transition-all">
                      Panduan Pendakian
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )

      case 'informasi':
        return (
          <>
            {/* Hero Header */}
            <header className="max-w-7xl mx-auto px-8 mb-20">
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-4 block">Panduan Pengunjung</span>
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary text-editorial mb-6 max-w-2xl leading-tight">
                Informasi &amp; Kesiapan Perjalanan.
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                Segala hal yang perlu Anda ketahui sebelum menapakkan kaki di keajaiban vulkanik Tasikmalaya. Rencanakan perjalanan Anda dengan tepat.
              </p>
            </header>

            {/* Bento Information Grid */}
            <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* Operating Hours - Vertical Card */}
              <div className="md:row-span-2 bg-surface-container-low p-10 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-8">schedule</span>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-6">Jam Operasional</h2>
                  <ul className="space-y-6">
                    <li className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                      <span className="text-on-surface-variant font-medium">Senin — Jumat</span>
                      <span className="text-primary font-bold">07:00 — 17:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                      <span className="text-on-surface-variant font-medium">Sabtu — Minggu</span>
                      <span className="text-primary font-bold">06:00 — 18:00</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface-variant font-medium">Libur Nasional</span>
                      <span className="text-primary font-bold">Buka</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 p-6 bg-primary-container/10 rounded-xl">
                  <p className="text-sm text-primary leading-relaxed">
                    *Catatan: Area Kawah ditutup sementara jika aktivitas vulkanik meningkat atau cuaca ekstrem.
                  </p>
                </div>
              </div>

              {/* Ticket Prices - Horizontal Large Card */}
              <div className="md:col-span-2 bg-primary text-on-primary p-10 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary-fixed text-4xl mb-6">payments</span>
                  <h2 className="font-headline text-2xl font-bold mb-8">Retribusi Tiket Masuk</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="text-primary-fixed font-label text-xs uppercase tracking-widest">Domestik</h3>
                      <div className="flex justify-between items-end border-b border-primary-container pb-2">
                        <span className="text-lg">Wisatawan Dewasa</span>
                        <span className="text-2xl font-bold">Rp 15.000</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-primary-container pb-2">
                        <span className="text-lg">Anak-anak</span>
                        <span className="text-2xl font-bold">Rp 10.000</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-primary-fixed font-label text-xs uppercase tracking-widest">Mancanegara</h3>
                      <div className="flex justify-between items-end border-b border-primary-container pb-2">
                        <span className="text-lg">International Visitor</span>
                        <span className="text-2xl font-bold">Rp 30.000</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-primary-container pb-2">
                        <span className="text-lg">Parking (Motor/Mobil)</span>
                        <span className="text-2xl font-bold">Rp 5k - 15k</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-l from-on-primary-container to-transparent"></div>
                </div>
              </div>

              {/* Road Access - Content Card */}
              <div className="md:col-span-2 bg-surface-container-highest p-10 rounded-2xl flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/2">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-6">route</span>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-4">Aksesibilitas &amp; Jalan</h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Terletak 17km dari pusat kota Tasikmalaya. Jalan utama sudah teraspal dengan baik namun memiliki tanjakan yang cukup curam. Pastikan kendaraan dalam kondisi prima.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="bg-surface px-4 py-2 rounded-full text-xs font-semibold text-secondary flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">directions_car</span> Akses Mobil
                    </span>
                    <span className="bg-surface px-4 py-2 rounded-full text-xs font-semibold text-secondary flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">two_wheeler</span> Akses Motor
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden shadow-sm">
                  <img 
                    className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" 
                    alt="winding asphalt road through lush tropical mountain landscape with mist and tall trees" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2nwsY_327B-K__jgnsGhaOFil0SfkCbMHCTCV2uCHUKcscg9pUT_N8s8JXpn19T1dhouZ3v5RGobHgXJuUGHWOh7CFsspPB4troCm2N5NYVcFkP4FbJ2aNfid1w08ZRyJErQHle_YTJ4ii3np1IQCkF0HO5YpvaiG7sdAQooYbxkwKNhfQAWd8_OA2HCCDDkyoUHKDPl6f5yZJFk4Z00hPBqRHXft4iK9mmcXNQI8a5Th4xj0POFcq722dYgVRPE6V5ybZaR4gQ" 
                  />
                </div>
              </div>
            </section>

            {/* Facilities Section */}
            <section className="max-w-7xl mx-auto px-8 mb-24">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-xl">
                  <span className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-4 block">Fasilitas Publik</span>
                  <h2 className="font-headline text-4xl font-bold text-primary text-editorial">Kenyamanan Di Atas Ketinggian</h2>
                </div>
                <p className="text-on-surface-variant max-w-sm text-sm">
                  Kami menyediakan fasilitas penunjang untuk memastikan pengalaman wisata Anda tetap nyaman dan aman di tengah alam liar.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden">
                {/* Facility 1 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">local_parking</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Area Parkir</h3>
                  <p className="text-xs text-on-surface-variant">Lahan luas untuk bus, mobil, dan motor di area bawah.</p>
                </div>
                {/* Facility 2 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">mosque</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Mushola</h3>
                  <p className="text-xs text-on-surface-variant">Tempat ibadah yang bersih dan tenang di beberapa titik.</p>
                </div>
                {/* Facility 3 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Warung Wisata</h3>
                  <p className="text-xs text-on-surface-variant">Pusat kuliner lokal yang menyajikan makanan hangat.</p>
                </div>
                {/* Facility 4 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">wc</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Toilet Umum</h3>
                  <p className="text-xs text-on-surface-variant">Fasilitas sanitasi yang tersebar di area parkir dan kawah.</p>
                </div>
                {/* Facility 5 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">hot_tub</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Kolam Air Panas</h3>
                  <p className="text-xs text-on-surface-variant">Area berendam air belerang alami untuk relaksasi.</p>
                </div>
                {/* Facility 6 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">stairs</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">622 Anak Tangga</h3>
                  <p className="text-xs text-on-surface-variant">Tangga ikonik menuju puncak kawah dengan pemandangan epik.</p>
                </div>
                {/* Facility 7 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">camping</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Camping Ground</h3>
                  <p className="text-xs text-on-surface-variant">Area berkemah dengan pemandangan kota Tasikmalaya.</p>
                </div>
                {/* Facility 8 */}
                <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">medical_services</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary mb-2">Pos Kesehatan</h3>
                  <p className="text-xs text-on-surface-variant">Layanan pertolongan pertama untuk keadaan darurat.</p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-7xl mx-auto px-8">
              <div className="bg-secondary-container rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                  <h2 className="font-headline text-3xl font-bold text-on-secondary-container mb-4">Sudah Siap Berpetualang?</h2>
                  <p className="text-on-secondary-fixed-variant leading-relaxed">
                    Dapatkan tiket masuk Anda secara online untuk menghindari antrean panjang di gerbang masuk, terutama saat akhir pekan.
                  </p>
                </div>
                <div className="relative z-10 flex gap-4">
                  <button 
                    onClick={openModal}
                    className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Pesan Tiket Sekarang
                  </button>
                  <button className="bg-surface-container-lowest text-primary px-8 py-4 rounded-full font-bold hover:bg-surface transition-all">
                    Hubungi Kami
                  </button>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
              </div>
            </section>
          </>
        )

      case 'galeri':
        return (
          <div className="py-32 px-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Galeri Foto</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Koleksi foto-foto indah Gunung Galunggung akan segera hadir.</p>
          </div>
        )
      case 'lokasi':
        return (
          <div className="py-32 px-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Lokasi & Akses</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Peta lokasi dan panduan arah menuju Gunung Galunggung akan segera ditampilkan.</p>
          </div>
        )
      case 'hotel':
        return (
          <div className="py-32 px-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Hotel & Penginapan</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Rekomendasi akomodasi di sekitar Tasikmalaya akan segera hadir.</p>
          </div>
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
            <button onClick={() => setCurrentPage('hotel')} className={`text-sm tracking-wide font-medium pb-1 transition-colors duration-300 ${currentPage === 'hotel' ? 'text-[#163422] border-b-2 border-[#163422]' : 'text-[#695d47] hover:text-[#163422]'}`}>Hotel</button>
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
            <a className="text-sm text-[#695d47] hover:text-[#163422] hover:underline transition-all" href="#">Kontak</a>
            <button onClick={() => setCurrentPage('informasi')} className="text-sm text-[#695d47] hover:text-[#163422] hover:underline transition-all">Informasi</button>
            <a className="text-sm text-[#695d47] hover:text-[#163422] hover:underline transition-all" href="#">Kebijakan Privasi</a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-[#695d47] opacity-80">© 2024 Gunung Galunggung. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Booking (sama seperti sebelumnya) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface p-10 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-primary">Pesan Tiket</h3>
              <button onClick={closeModal} className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Tanggal Kunjungan</label>
                <input className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary-container/20 text-on-surface" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Jumlah Tiket</label>
                  <div className="flex items-center gap-4 bg-surface-container-lowest rounded-xl p-2 px-4">
                    <button onClick={decrementTicket} className="text-primary font-bold text-lg hover:bg-surface-container-high w-8 h-8 rounded-full transition">-</button>
                    <span className="flex-1 text-center font-bold text-lg">{ticketCount}</span>
                    <button onClick={incrementTicket} className="text-primary font-bold text-lg hover:bg-surface-container-high w-8 h-8 rounded-full transition">+</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Total Harga</label>
                  <div className="h-14 flex items-center justify-end">
                    <span className="text-xl font-extrabold text-primary">{formatRupiah(totalPrice)}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full bg-primary text-on-primary py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition">
                  Konfirmasi Pembayaran
                </button>
                <p className="text-center text-[10px] text-on-surface-variant mt-4 leading-relaxed px-8">Dengan menekan tombol konfirmasi, Anda menyetujui syarat dan ketentuan kunjungan wisata Gunung Galunggung.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App