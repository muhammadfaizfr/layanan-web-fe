import React, { useState, useRef } from 'react'
import pembayaranService from '../services/pembayaranService'

export default function KonfirmasiPembayaran({ order, formatRupiah, navigate, isTiket }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const qty = order?.qty ?? 1
  const price = order?.price ?? order?.unitPrice ?? 25000
  const total = order?.total ?? (qty * price)
  const method = order?.selectedMethod ?? 'Virtual Account'
  const fmt = formatRupiah ?? ((n) => `Rp ${n.toLocaleString('id-ID')}`)

  const getMethodDetails = () => {
    const m = String(method).toLowerCase()
    if (m.includes('bca')) {
      return { name: 'BCA Virtual Account', number: '8012 0812 3456 7890', logo: 'BCA' }
    } else if (m.includes('mandiri')) {
      return { name: 'Mandiri Virtual Account', number: '132 000 1234 567', logo: 'Mandiri' }
    } else if (m.includes('bni')) {
      return { name: 'BNI Virtual Account', number: '8274 0812 3456 789', logo: 'BNI' }
    } else if (m.includes('bri')) {
      return { name: 'BRI Virtual Account', number: '1234 01 000123 50 2', logo: 'BRI' }
    } else if (m.includes('gopay')) {
      return { name: 'GoPay', number: '0812 3456 7890 (a.n. Galunggung Pariwisata)', logo: 'GoPay' }
    } else if (m.includes('ovo')) {
      return { name: 'OVO', number: '0812 3456 7890 (a.n. Galunggung Pariwisata)', logo: 'OVO' }
    } else if (m.includes('dana')) {
      return { name: 'DANA', number: '0812 3456 7890 (a.n. Galunggung Pariwisata)', logo: 'DANA' }
    }
    return { name: 'Transfer Bank / E-Wallet', number: '0812 3456 7890 (a.n. Galunggung Pariwisata)', logo: 'Payment' }
  }

  const details = getMethodDetails()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const fileType = selectedFile.type
      const fileName = selectedFile.name.toLowerCase()
      
      const isValidMime = ['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)
      const isValidExt = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')
      
      if (isValidMime || isValidExt) {
        setFile(selectedFile)
        setError('')
      } else {
        setError('Format file tidak valid. Harap pilih gambar dengan format JPG, JPEG, atau PNG.')
        setFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Harap pilih file bukti transfer terlebih dahulu.')
      return
    }

    if (!order?.id_pembayaran) {
      setError('ID Pembayaran tidak ditemukan. Terjadi masalah saat membuat pemesanan.')
      return
    }

    setUploading(true)
    setError('')

    try {
      await pembayaranService.uploadBukti(order.id_pembayaran, file)
      // Navigate to success page
      navigate(isTiket ? 'berhasil-tiket' : 'berhasil-jadwal')
    } catch (err) {
      console.error(err)
      setError(err.userMessage || err.response?.data?.message || err.message || 'Gagal mengupload bukti pembayaran.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f7]/80 backdrop-blur-md shadow-[0_4px_40px_0_rgba(22,52,34,0.04)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <button
            type="button"
            onClick={() => navigate?.('home')}
            className="text-xl font-bold tracking-tighter text-[#163422]"
          >
            Gunung Galunggung
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="bg-surface-container-lowest border border-outline-variant/70 shadow-[0_40px_80px_-40px_rgba(22,52,34,0.18)] rounded-[2rem] overflow-hidden p-8 sm:p-12">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
              <span className="material-symbols-outlined text-3xl">payments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary tracking-tight mb-3">Konfirmasi Pembayaran</h1>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Silakan lakukan pembayaran sesuai detail di bawah ini, kemudian unggah bukti transfer untuk verifikasi.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column: Payment Details */}
            <div className="space-y-6 bg-surface-container-low p-6 sm:p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm">
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary font-bold">Metode Pembayaran</p>
                <h3 className="text-xl font-headline font-bold text-primary">{details.name}</h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-5 border border-outline-variant/10 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-1 font-bold">Nomor Rekening / VA</p>
                  <p className="font-mono text-lg font-bold text-primary select-all">{details.number}</p>
                </div>
                
                <div className="rounded-2xl bg-white p-5 border border-outline-variant/10 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-1 font-bold">Total Pembayaran</p>
                  <p className="text-2xl font-extrabold text-primary">{fmt(total)}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5 border border-amber-200/50">
                <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                  <strong>Penting:</strong> Pastikan nominal transfer sama persis hingga digit terakhir. Bukti pembayaran harus terlihat jelas tanpa adanya sensor pada detail transaksi utama.
                </p>
              </div>
            </div>

            {/* Right Column: Upload Proof */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3">Upload Bukti Transfer</p>
                
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-[2rem] p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] ${file ? 'border-primary bg-primary/5' : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined text-4xl mb-3 text-primary">{file ? 'image' : 'add_photo_alternate'}</span>
                  {file ? (
                    <div>
                      <p className="text-sm font-bold text-on-surface line-clamp-1">{file.name}</p>
                      <p className="text-xs text-on-surface-variant mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Pilih Foto Bukti Transfer</p>
                      <p className="text-xs text-on-surface-variant mt-1">Format: JPG, JPEG, PNG (Maks. 5MB)</p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <p>{error}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-6">
                <button 
                  onClick={handleUpload}
                  disabled={uploading || !file}
                  className="w-full bg-[#163422] text-white py-4 rounded-full font-headline font-bold text-base shadow-lg shadow-[#163422]/10 hover:bg-[#1f4a31] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Memverifikasi...
                    </>
                  ) : (
                    'Unggah & Konfirmasi'
                  )}
                </button>

                <button 
                  onClick={() => navigate?.('home')} 
                  disabled={uploading}
                  className="w-full bg-surface-container-high text-on-surface-variant py-4 rounded-full font-headline font-bold text-base hover:bg-surface-container-highest transition-colors disabled:opacity-50"
                >
                  Unggah Nanti / Kembali
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
