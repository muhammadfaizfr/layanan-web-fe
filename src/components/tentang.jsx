// src/components/Tentang.jsx
import img1 from '../assets/images/1.jpg'
import img2 from '../assets/images/2.jpg'
import img3 from '../assets/images/3.jpg'
import img4 from '../assets/images/4.jpg'
import img5 from '../assets/images/5.jpg'
import img6 from '../assets/images/6.webp'
import img7 from '../assets/images/7.jpg'

function Tentang({ navigate }) {
  return (
    <section className="pt-24 overflow-hidden">
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
                  src={img1} 
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
                <img className="w-full h-96 object-cover rounded-xl shadow-sm" alt="Volcanic rock textures" src={img2} />
                <div className="bg-surface p-12 rounded-xl shadow-[0_40px_80px_-20px_rgba(22,52,34,0.08)]">
                  <h3 className="text-xl font-bold text-primary mb-4 italic">"Alam tidak terburu-buru, namun segalanya tercapai."</h3>
                  <p className="text-sm text-on-surface-variant">Lanskap Galunggung mengajarkan kita tentang ketahanan. Setiap lapisan tanah bercerita tentang kehancuran yang bertransformasi menjadi keindahan yang megah.</p>
                </div>
                <img className="w-full h-[500px] object-cover rounded-xl shadow-sm" alt="Steep stairs to crater" src={img3} />
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
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Crater sunset" src={img4} />
              </div>
              <div className="md:col-span-4 overflow-hidden rounded-tl-xl rounded-br-xl group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pine forest" src={img5} />
              </div>
              <div className="md:col-span-4 overflow-hidden rounded-xl group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hot springs" src={img6} />
              </div>
              <div className="md:col-span-8 overflow-hidden rounded-tr-[5rem] rounded-bl-xl group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Night stars" src={img7} />
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
                <button onClick={() => navigate?.('panduan-pendakian')} className="border border-on-primary/20 text-on-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-on-primary/10 transition-all">Panduan Pendakian</button>
              </div>
            </div>
          </div>
        </section>
      </section>
  );
}

export default Tentang;