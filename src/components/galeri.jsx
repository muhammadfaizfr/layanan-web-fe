// src/components/Galeri.jsx
import React, { useState, useEffect } from 'react'
import kontenGaleriService from '../services/kontenGaleriService'

function Galeri() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await kontenGaleriService.getAll()
        const list = Array.isArray(data) ? data : (data?.data ?? [])
        setImages(list)
      } catch (err) {
        setError(err.userMessage || 'Gagal memuat galeri.')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const firstConfigs = [
    {
      container: "md:col-span-8 group relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] aspect-[16/10]",
      img: "w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out",
      overlay: (title) => (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <span className="text-surface/80 text-[10px] tracking-widest uppercase mb-1">07° 15' 0" S, 108° 4' 0" E</span>
          <h3 className="text-surface text-2xl font-headline font-bold">{title}</h3>
        </div>
      )
    },
    {
      container: "md:col-span-4 group relative overflow-hidden rounded-tr-[3rem] rounded-bl-[1.5rem] aspect-[3/4] md:mt-12",
      img: "w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out",
      overlay: (title) => (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <h3 className="text-surface text-xl font-headline font-bold">{title}</h3>
        </div>
      )
    },
    {
      container: "md:col-span-4 group relative overflow-hidden rounded-xl aspect-square",
      img: "w-full h-full object-cover group-hover:scale-105 transition-all duration-700",
      overlay: (title) => (
        <>
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-6 left-6">
            <p className="text-surface font-headline font-medium tracking-tight">{title}</p>
          </div>
        </>
      )
    },
    {
      container: "md:col-span-8 group relative overflow-hidden rounded-[2.5rem] aspect-[21/9]",
      img: "w-full h-full object-cover group-hover:scale-105 transition-all duration-700",
      overlay: (title) => (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <h3 className="text-surface text-2xl font-headline font-bold">{title}</h3>
        </div>
      )
    },
    {
      container: "md:col-span-5 group relative overflow-hidden rounded-3xl aspect-[4/3]",
      img: "w-full h-full object-cover group-hover:scale-105 transition-all duration-700",
      overlay: (title) => (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <h3 className="text-surface text-xl font-headline font-bold">{title}</h3>
        </div>
      )
    },
    {
      container: "md:col-span-7 group relative overflow-hidden rounded-tl-[1.5rem] rounded-br-[4rem] aspect-[16/9]",
      img: "w-full h-full object-cover group-hover:scale-105 transition-all duration-700",
      overlay: (title) => (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <h3 className="text-surface text-xl font-headline font-bold">{title}</h3>
          </div>
          <div className="absolute top-8 right-8 z-10">
            <span className="bg-surface/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Editorial Pick</span>
          </div>
        </>
      )
    }
  ]

  const firstSectionImages = images.slice(0, 6)
  const secondSectionImages = images.slice(6)

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

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-16 text-secondary font-medium flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
          <span>Memuat galeri foto...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-lg">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Atmo-Gallery: Asymmetrical Masonry */}
      {!loading && images.length > 0 && (
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {firstSectionImages.map((item, idx) => {
              const config = firstConfigs[idx % firstConfigs.length]
              const fileUrl = item.file || item.gambar || item.url
              const fullUrl = fileUrl.startsWith('http') ? fileUrl : `http://127.0.0.1:8000/storage/${fileUrl}`
              const caption = item.judul_konten || item.judul || item.caption || `Foto ${item.id}`
              
              return (
                <div key={item.id || idx} className={config.container}>
                  <img 
                    alt={caption} 
                    className={config.img} 
                    src={fullUrl} 
                  />
                  {config.overlay(caption)}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Gallery Quote/Intermission */}
      {!loading && images.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 tracking-tight">
            "Setiap sudut Galunggung menyimpan rahasia purba yang hanya bisa dipahami oleh mereka yang mau berhenti sejenak dan melihat."
          </h2>
          <div className="w-12 h-px bg-primary/20 mx-auto"></div>
        </section>
      )}

      {/* Additional Grid */}
      {!loading && secondSectionImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {secondSectionImages.map((item, idx) => {
              const fileUrl = item.file || item.gambar || item.url
              const fullUrl = fileUrl.startsWith('http') ? fileUrl : `http://127.0.0.1:8000/storage/${fileUrl}`
              const caption = item.judul_konten || item.judul || item.caption || `Foto ${item.id}`

              return (
                <div key={item.id || idx} className="aspect-square overflow-hidden rounded-2xl group relative">
                  <img 
                    alt={caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={fullUrl} 
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                    <span className="text-surface font-headline font-bold text-sm">{caption}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-20 max-w-xl mx-auto bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <span className="material-symbols-outlined text-5xl text-stone-300 mb-4">photo_library</span>
          <p className="text-stone-500 font-medium text-lg">Belum ada konten galeri</p>
        </div>
      )}
    </>
  )
}

export default Galeri