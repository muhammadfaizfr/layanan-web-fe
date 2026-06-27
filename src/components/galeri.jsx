// src/components/Galeri.jsx
import React, { useState, useEffect } from 'react'
import kontenGaleriService from '../services/kontenGaleriService'

function Galeri() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lightbox, setLightbox] = useState(null)

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

  const getImageUrl = (item) => {
    const fileUrl = item.file || item.gambar || item.url || item.file_path
    if (!fileUrl) return null
    return fileUrl.startsWith('http') ? fileUrl : `http://127.0.0.1:8000/storage/${fileUrl}`
  }

  const getCaption = (item, idx) => item.judul_konten || item.judul || item.caption || `Foto ${idx + 1}`

  // Pair images into rows of 2
  const pairs = []
  for (let i = 0; i < images.length; i += 2) {
    pairs.push(images.slice(i, i + 2))
  }

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-white/80 mt-4 text-center font-medium text-sm px-8">{lightbox.caption}</p>
          </div>
        </div>
      )}

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
          {!loading && images.length > 0 && (
            <div className="flex items-center gap-2 bg-surface-container rounded-2xl px-5 py-3 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary">photo_library</span>
              <span className="font-bold text-primary">{images.length}</span>
              <span className="text-secondary text-sm">Foto</span>
            </div>
          )}
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

      {/* Gallery: 2-column aesthetic rows */}
      {!loading && images.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 mb-20">
          <div className="space-y-6">
            {pairs.map((pair, rowIdx) => {
              const isOdd = rowIdx % 2 === 0
              return (
                <div key={rowIdx} className={`grid gap-6 ${pair.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {pair.map((item, colIdx) => {
                    const imgUrl = getImageUrl(item)
                    const caption = getCaption(item, rowIdx * 2 + colIdx)
                    const itemId = item.id_konten || item.id
                    // Alternate aspect ratios for visual rhythm
                    const isTall = (isOdd && colIdx === 0) || (!isOdd && colIdx === 1)
                    const aspectClass = pair.length === 1
                      ? 'aspect-[21/9]'
                      : isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'

                    return (
                      <div
                        key={itemId || colIdx}
                        className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${aspectClass}`}
                        onClick={() => imgUrl && setLightbox({ url: imgUrl, caption })}
                      >
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-5xl text-secondary/30">image</span>
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Caption badge at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                          <p className="text-white font-headline font-bold text-lg leading-tight drop-shadow-lg">{caption}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="material-symbols-outlined text-white/70 text-sm">location_on</span>
                            <span className="text-white/70 text-xs tracking-wide">Gunung Galunggung</span>
                          </div>
                        </div>

                        {/* Zoom icon top-right */}
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                          <span className="material-symbols-outlined text-white text-[18px]">open_in_full</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Gallery Quote */}
      {!loading && images.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 py-20 text-center">
          <div className="w-12 h-px bg-primary/20 mx-auto mb-10"></div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 tracking-tight">
            "Setiap sudut Galunggung menyimpan rahasia purba yang hanya bisa dipahami oleh mereka yang mau berhenti sejenak dan melihat."
          </h2>
          <div className="w-12 h-px bg-primary/20 mx-auto"></div>
        </section>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-24 max-w-xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-secondary/40">photo_library</span>
          </div>
          <p className="text-on-surface-variant font-medium text-lg">Belum ada foto di galeri</p>
          <p className="text-secondary text-sm mt-2">Administrator sedang menyiapkan koleksi foto terbaik untuk Anda.</p>
        </div>
      )}
    </>
  )
}

export default Galeri