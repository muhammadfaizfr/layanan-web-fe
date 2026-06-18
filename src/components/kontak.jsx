// src/components/Kontak.jsx
function Kontak({ openModal }) {
  return (
    <>
      {/* Hero Section with Asymmetric Bleed */}
      <section className="relative px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 z-10">
          <p className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-4 font-bold">Mari Berdiskusi</p>
          <h1 className="headline-font text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6">
            Sampaikan Pesan <br/>Ke Keajaiban Alam.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
            Punya pertanyaan tentang jalur pendakian atau pemandian air panas? Tim kami siap membantu perjalanan Anda menjadi tak terlupakan.
          </p>
        </div>
        <div className="md:col-span-6 relative">
          <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
            <img 
              className="w-full h-full object-cover" 
              alt="dramatic wide angle shot of a misty green mountain crater with a turquoise lake and rocky ridges under soft overcast sky" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgew_Gyif5pkXS-7zqgTaRBB7jaf7o6AA1RFmm2isrI3VmHc4elLUT5uTmmhXn-XaAykxMT23rZeCJ7BPvP8wLvDQEOhv4yGGUI8p95so6FZDP2Eu6jxbLFYZEy9OL2-opt7Kl5XfdwDnsIsFx3dxL_qk0RpiYOmWRIE9aJng6LP6fX12IkToLO7HN_BQ7OAWyD9MasclKqRmK0Rc20-DzJ0-w5x92EiUoP9UMu6gr84azm59Sv5NlwL46rimmgDNBD6SQPRoOw" 
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-primary-container p-8 rounded-xl hidden lg:block shadow-xl max-w-[240px]">
            <span className="material-symbols-outlined text-on-primary-container text-4xl mb-4">explore</span>
            <p className="text-on-primary-container font-medium text-sm">Lokasi kami berada di kaki Gunung Galunggung, Tasikmalaya.</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left Column: Form */}
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_40px_80px_-20px_rgba(22,52,34,0.08)]">
              <h2 className="headline-font text-3xl font-bold text-primary mb-8 tracking-tight">Kirim Pesan</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold">Nama Lengkap</label>
                    <input 
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary-container focus:bg-surface-bright transition-all text-on-surface" 
                      placeholder="Andi Wijaya" 
                      type="text" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold">Alamat Email</label>
                    <input 
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary-container focus:bg-surface-bright transition-all text-on-surface" 
                      placeholder="andi@example.com" 
                      type="email" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold">Subjek</label>
                  <select className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary-container focus:bg-surface-bright transition-all text-on-surface">
                    <option>Informasi Tiket</option>
                    <option>Reservasi Hotel</option>
                    <option>Kerja Sama</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold">Pesan Anda</label>
                  <textarea 
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary-container focus:bg-surface-bright transition-all text-on-surface resize-none" 
                    placeholder="Tuliskan detail pertanyaan Anda di sini..." 
                    rows="5"
                  ></textarea>
                </div>
                <button 
                  className="group relative w-full bg-primary text-on-primary py-5 rounded-full font-bold overflow-hidden transition-all hover:shadow-lg" 
                  type="submit"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Kirim Pesan Sekarang
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                  <div className="absolute inset-0 bg-primary-container transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </form>
            </div>

            {/* Right Column: Info & Details */}
            <div className="flex flex-col justify-center space-y-16">
              <div>
                <h3 className="font-label text-[10px] tracking-widest uppercase text-secondary mb-8 font-bold">Detail Kontak</h3>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    </div>
                    <div>
                      <h4 className="headline-font font-bold text-primary mb-1">Alamat Utama</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">Jl. Raya Galunggung, Linggajati, Sukaratu, <br/>Tasikmalaya, Jawa Barat 46415</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    </div>
                    <div>
                      <h4 className="headline-font font-bold text-primary mb-1">Email Layanan</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">info@galunggung.com<br/>support@galunggung.com</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                    </div>
                    <div>
                      <h4 className="headline-font font-bold text-primary mb-1">Telepon &amp; WhatsApp</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">+62 (265) 1234 5678<br/>+62 812 9876 5432</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-label text-[10px] tracking-widest uppercase text-secondary mb-8 font-bold">Ikuti Jejak Kami</h3>
                <div className="flex gap-4">
                  <a className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">public</span>
                  </a>
                  <a className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">share</span>
                  </a>
                  <a className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </a>
                  <a className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined">videocam</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Asymmetric) */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 pointer-events-none z-10"></div>
        <img 
          className="w-full h-full object-cover grayscale opacity-50 contrast-125" 
          alt="minimalist satellite view of a lush volcanic mountain area with winding roads and dense forest coverage" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvHNYq2tQcyy_BXsCE9Ot4adgZcYAybcYFX4EubHzcldh6kOQotnBV-q1Wyc5Qshc8K4m0kFKDEqQ5McvEcrTiHabImxQrw46-XbfxuGbH4O6qkRyQgu3_1CbApwByrLqBq1v7ZLHojUUfWsAo2RioR9mh0g6xzt4a2Ca8pQ-059Gnm8OMVmDKk2zHTrqoXC-_bj9ZD2jFU_jaUP2R_5yrTtLjhThOzVtuMbyiXy9QTX9UjbaZi47_APre35C9yinHYMcJKgpybA" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-surface p-6 rounded-full shadow-2xl flex items-center gap-4 border-4 border-primary">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            </div>
            <span className="headline-font font-bold text-primary pr-4">Gunung Galunggung</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Kontak;