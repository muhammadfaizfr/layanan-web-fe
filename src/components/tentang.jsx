// src/components/Tentang.jsx
function Tentang({ navigate }) {
  return (
    <main className="pt-24 overflow-hidden">
        {/* Hero Section */}
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
                <img className="w-full h-96 object-cover rounded-xl shadow-sm" alt="Volcanic rock textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUXA0OiAf2OkdlTyuz_VEMPpleo_Dd9avbMz8MPcHD4xhOO3x-5VO_bec4_1ZYqWqDRj5IIUmR-EaVfE_wE8cYDAqh5SX_Wtk29rE3LptuN9mw7TMzERSEcaPsipnnbUeFWojJ1fNy9-4CSqqkRzS9heVv4lmkrmqsvc9oS9AbzM08-909xNUC4ABH-OooGirTE9eHevmnEuaRWA1420_-aufo2x74F8hwx75bbtNUvNwmTkI0hxWjJ9bhB8ayS0pcZLgaJAyaPw" />
                <div className="bg-surface p-12 rounded-xl shadow-[0_40px_80px_-20px_rgba(22,52,34,0.08)]">
                  <h3 className="text-xl font-bold text-primary mb-4 italic">"Alam tidak terburu-buru, namun segalanya tercapai."</h3>
                  <p className="text-sm text-on-surface-variant">Lanskap Galunggung mengajarkan kita tentang ketahanan. Setiap lapisan tanah bercerita tentang kehancuran yang bertransformasi menjadi keindahan yang megah.</p>
                </div>
                <img className="w-full h-[500px] object-cover rounded-xl shadow-sm" alt="Steep stairs to crater" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACk_J6pdQmgO9ENaNyAzhbw5qYS42Y7OHR3q0Zr-mHfo5LrtoTvGRzYEHpwJ1WEVrUUSZaAhnp3Zah-WqvdsURLYUfb1-d8TbjSqcYL72t1ru58-zPny32Z-A_1KvzUDtpsKhyogV_KbWNxBNA9hgQDVlEKjpwf4ct5__y5lZeehT5KS7BqFjz2VoZo7qsbwSWJIU5EttbEXPiyPmzl01jrfyBuDlieR3SGQpQEoF7kkLJ3YQx2inRnukU3nOCG0aoXEVR5GJL6Q" />
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
                <button onClick={() => navigate?.('jadwal')} className="bg-surface text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-surface-bright transition-all">Jadwalkan Kunjungan</button>
                <button onClick={() => navigate?.('informasi')} className="border border-on-primary/20 text-on-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-on-primary/10 transition-all">Panduan Pendakian</button>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

export default Tentang;