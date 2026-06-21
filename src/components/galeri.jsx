// src/components/Galeri.jsx
import galImg1 from '../assets/images/dinding-gunung-galunggung-longsor-timbun-danau-kawah-begini-penampakannya-vgt.webp'
import galImg2 from '../assets/images/2484196804.webp'
import galImg3 from '../assets/images/44302-gunung-galunggung.jpg'
import galImg4 from '../assets/images/Galunggung.jpg'
import galImg5 from '../assets/images/Tugu Galunggung 2.jpg'
import galImg6 from '../assets/images/20230802_080122-4196504109.webp'
import galImg7 from '../assets/images/gunung-galunggung.jpg'
import galImg8 from '../assets/images/images.jpg'
import galImg9 from '../assets/images/para-pesepeda-downhill-menjajal-trek-galunggung-bike-park-di-j9zx.webp'
import galImg10 from '../assets/images/tenda.jpg'

function Galeri() {
  return (
    <>
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary label-md tracking-[0.2em] uppercase text-[11px] font-bold mb-4 block">Archive Visual</span>
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-primary tracking-tighter leading-[0.95] mb-6">
              Simfoni <br/>Dalam Lensa
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Menelusuri keheningan kawah, kabut pagi yang menyelimuti puncak, hingga detail terkecil dari flora endemik yang tumbuh di tanah vulkanik Galunggung.
            </p>
          </div>
          <div className="flex gap-4 pb-2">
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
      </header>

      {/* Atmo-Gallery: Asymmetrical Masonry */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large Vertical Bleed */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] aspect-[16/10]">
            <img 
              alt="Dinding Kawah Galunggung" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
              src={galImg1} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-surface/80 text-[10px] tracking-widest uppercase mb-1">07° 15' 0" S, 108° 4' 0" E</span>
              <h3 className="text-surface text-2xl font-headline font-bold">Dinding Kawah Galunggung</h3>
            </div>
          </div>

          {/* Vertical Offset */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-tr-[3rem] rounded-bl-[1.5rem] aspect-[3/4] md:mt-12">
            <img 
              alt="Tangga Kuning Galunggung" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
              src={galImg2} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-surface text-xl font-headline font-bold">Tangga Kuning</h3>
            </div>
          </div>

          {/* Horizontal Secondary */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square">
            <img 
              alt="Trek Masuk Kawah" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src={galImg3} 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-surface font-headline font-medium tracking-tight">Trek Kawah Galunggung</p>
            </div>
          </div>

          {/* Large Landscape */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] aspect-[21/9]">
            <img 
              alt="Kawah Hijau Zamrud" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src={galImg4} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-surface text-2xl font-headline font-bold">Kawah Hijau Zamrud</h3>
            </div>
          </div>

          {/* Third Row Layout */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-3xl aspect-[4/3]">
            <img 
              alt="Tugu Galunggung" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src={galImg5} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-surface text-xl font-headline font-bold">Tugu Galunggung</h3>
            </div>
          </div>
          <div className="md:col-span-7 group relative overflow-hidden rounded-tl-[1.5rem] rounded-br-[4rem] aspect-[16/9]">
            <img 
              alt="Keindahan Kaldera" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src={galImg6} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-surface text-xl font-headline font-bold">Keindahan Kaldera</h3>
            </div>
            <div className="absolute top-8 right-8 z-10">
              <span className="bg-surface/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Editorial Pick</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Quote/Intermission */}
      <section className="max-w-4xl mx-auto px-8 py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 tracking-tight">
          "Setiap sudut Galunggung menyimpan rahasia purba yang hanya bisa dipahami oleh mereka yang mau berhenti sejenak dan melihat."
        </h2>
        <div className="w-12 h-px bg-primary/20 mx-auto"></div>
      </section>

      {/* Additional Grid */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square overflow-hidden rounded-2xl group relative">
            <img 
              alt="Sunrise Galunggung" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={galImg7} 
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
              <span className="text-surface font-headline font-bold text-sm">Sunrise Galunggung</span>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group relative">
            <img 
              alt="Danau Kawah" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={galImg8} 
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
              <span className="text-surface font-headline font-bold text-sm">Danau Kawah</span>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group relative">
            <img 
              alt="Galunggung Bike Park" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={galImg9} 
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
              <span className="text-surface font-headline font-bold text-sm">Galunggung Bike Park</span>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group relative">
            <img 
              alt="Camping Ground" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={galImg10} 
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
              <span className="text-surface font-headline font-bold text-sm">Camping Ground</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Galeri