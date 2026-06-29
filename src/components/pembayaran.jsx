import React, { useState } from 'react'
import pelangganService from '../services/pelangganService'
import bookingService from '../services/bookingService'
import pembayaranService from '../services/pembayaranService'
import slotPendakianService from '../services/slotPendakianService'

export default function Pembayaran({ order, formatRupiah, navigate, onComplete, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMethod, setSelectedMethod] = useState(null)

  const ord = order || {}
  const qty = ord.qty ?? 1
  const price = ord.price ?? ord.unitPrice ?? 15000
  const item = ord.item ?? (ord.jenisTiket ? `Tiket ${ord.jenisTiket} (x${qty})` : `Tiket Wisatawan Domestik (x${qty})`)
  const location = ord.location ?? 'Gunung Galunggung, Tasikmalaya'

  const total = qty * price
  const fmt = formatRupiah ?? ((n) => `Rp ${n.toLocaleString('id-ID')}`)

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Pilih metode pembayaran terlebih dahulu.')
      return
    }
    
    setLoading(true)
    setError('')
    try {
      // 1. Create Pelanggan
      const pelangganData = {
        nama_lengkap: ord.name || 'Pengunjung Galunggung',
        no_hp: ord.contact || '08123456789',
        no_identitas: '',
        email: ''
      }
      const pelangganRes = await pelangganService.create(pelangganData)
      const pelanggan = pelangganRes?.data || pelangganRes
      const idPelanggan = pelanggan?.id_pelanggan || pelanggan?.id

      if (!idPelanggan) throw new Error('Gagal menyimpan data pelanggan.')

      // 1.5 Create or Find Slot for today (because DB requires id_slot)
      const dateString = new Date().toISOString().split('T')[0]
      const slotsData = await slotPendakianService.getAll()
      const slotsList = Array.isArray(slotsData) ? slotsData : (slotsData?.data ?? [])
      let slot = slotsList.find(s => (s.tanggal_pendakian === dateString || s.tanggal === dateString))
      let idSlot = slot?.id_slot || slot?.id

      if (!idSlot) {
        const newSlotData = {
          tanggal_pendakian: dateString,
          kuota_maksimal: 500,
          kuota_tersedia: 500,
          id_admin: 1
        }
        const slotRes = await slotPendakianService.create(newSlotData)
        const newSlot = slotRes?.data || slotRes
        idSlot = newSlot?.id_slot || newSlot?.id
      }

      if (!idSlot) throw new Error('Gagal menentukan slot tiket.')

      // 2. Create Booking
      const bookingData = {
        id_pelanggan: Number(idPelanggan),
        id_slot: Number(idSlot),
        jenis_tiket: ord.jenisTiket || 'Wisatawan Lokal',
        jumlah_tiket: Number(qty),
        harga_tiket: Number(price),
        status_booking: 'Menunggu Pembayaran'
      }
      const bookingRes = await bookingService.create(bookingData)
      const booking = bookingRes?.data || bookingRes
      const idBooking = booking?.id_booking || booking?.id

      if (!idBooking) throw new Error('Gagal menyimpan pesanan tiket.')

      // 3. Create Pembayaran
      const now = new Date()
      const localTimeString = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0')

      const pembayaranData = {
        id_booking: Number(idBooking),
        metode_pembayaran: selectedMethod,
        waktu_pembayaran: localTimeString,
        status_pembayaran: 'Menunggu Verifikasi'
      }
      await pembayaranService.create(pembayaranData)

      if (order) order.reference = `GG-TIK-${idBooking}`
      
      if (typeof onComplete === 'function') {
        onComplete(selectedMethod)
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || 'Gagal memproses pembayaran')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f7]/80 backdrop-blur-md shadow-[0_4px_40px_0_rgba(22,52,34,0.04)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate ? navigate('home') : null} className="text-xl font-bold tracking-tighter text-[#163422]">Gunung Galunggung</button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="bg-[#163422] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#1f4a31] transition-colors shadow-sm"
            >
              Kembali
            </button>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-32 px-8 max-w-7xl mx-auto">

        <div className="flex justify-center items-center mb-16">
          <div className="flex items-center space-x-4 md:space-x-12">
            <div className="flex items-center space-x-2 text-on-surface-variant opacity-60">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span className="font-headline font-semibold text-sm tracking-wide">Detail</span>
            </div>
            <div className="h-px w-8 md:w-16 bg-outline-variant opacity-30"></div>
            <div className="relative flex items-center space-x-2 text-primary">
              <span className="material-symbols-outlined text-lg">payments</span>
              <span className="font-headline font-bold text-sm tracking-wide">Pembayaran</span>
            </div>
            <div className="h-px w-8 md:w-16 bg-outline-variant opacity-30"></div>
            <div className="flex items-center space-x-2 text-on-surface-variant opacity-40">
              <span className="material-symbols-outlined text-lg">task_alt</span>
              <span className="font-headline font-semibold text-sm tracking-wide">Selesai</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <section className="lg:col-span-7 space-y-12">
            <header>
              <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-4">Metode Pembayaran</h1>
              <p className="text-on-surface-variant font-body text-lg leading-relaxed">Pilih cara pembayaran yang paling nyaman untuk Anda.</p>
            </header>
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Virtual Account</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => setSelectedMethod('mandiri')} className={`group flex flex-col p-6 rounded-xl transition-all text-left ${selectedMethod==='mandiri' ? 'border-2 border-primary shadow-md bg-white' : 'bg-surface-container-low border border-transparent hover:border-primary/20'}`}>
                    <div className="mb-4 h-6 flex items-center">
                      <img alt="Mandiri" className="h-4 grayscale group-hover:grayscale-0 transition-all opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4zFdKOO4OpMVD2GQtZYa_brRIWf4JX6a7-N1AlvKKcgAsKkm2l8MkwrMGZfa7F88MRd70e2Ul579Sailk3xsMwfKI3Sy22fOyxDPb4nJmL5gSgVXOze8CfX1YAxfgFokaUIo5bE5JrYgho33KhPDgWwG3PWtdff2e7GdUCBo7Cc2ctnepDVK9nUFxsnv-XsqLxs8zM70MbWaubWiWj0e7EWObaXWxAfUb6GYabdPt3jW3ZNgUe8PGZf2bfPLvzVanK2fPqB1a8g"/>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">Bank Mandiri</span>
                  </button>
                  <button onClick={() => setSelectedMethod('bca')} className={`group flex flex-col p-6 rounded-xl transition-all text-left ${selectedMethod==='bca' ? 'border-2 border-primary shadow-md bg-white' : 'bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20'}`}>
                    <div className="mb-4 h-6 flex items-center">
                      <img alt="BCA" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Ldw_Bg-9AJ9uoBDPpCdIOcTQHPGMUGRdoAvLBiRX38InSa4YNvV7yKJOBCbhDH30l75Ihc3geHw9VGHggIkLk1GZajQ_X7wY3lPrgDt8U_ntLgao5WauN3Kh430SSOdU8t3bIUCr85bTtjUeCegneaD83XhDFWHtM1N1OEiXtXwOuQ0ne1HwbMqIYoyjI_iK_2RU05ZsvtH-Tcg4cAejEDl0FG4aso78XLCTzS0Xd59Lt02vO5yz596zsXDicmflfXNlYJPdKw"/>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">BCA</span>
                  </button>
                  <button onClick={() => setSelectedMethod('bni')} className={`group flex flex-col p-6 rounded-xl transition-all text-left ${selectedMethod==='bni' ? 'border-2 border-primary shadow-md bg-white' : 'bg-surface-container-low border border-transparent hover:border-primary/20'}`}>
                    <div className="mb-4 h-6 flex items-center">
                      <img alt="BNI" className="h-4 grayscale group-hover:grayscale-0 transition-all opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_954RPy6SSBvwn6Oc9sH3kPtncM38Y5_hedK3vFYVVr3R1lfucmzcilpg2O3TuKFyM4aV49AtX6khnTn-GWiQ1chignQ6ZrGyh7m8ATtScjVn812VWA8-taqVlwUK3a-PV80CG-JDwBc84eXq725gEd-XPqqi0aRXak-HdHltJac9VZ0oU_8W5uSmJ38BsgHjkO-TYXT9_RsOyl0L9sAQ9jhZW2sod60JrGM2oq_HocGRCkFn26KZ5hMyQXDpM4LTu9Hj4Y9aw"/>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">BNI</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-label text-xs font-bold uppercase tracking-widest text-secondary">E-Wallet</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => setSelectedMethod('gopay')} className={`group flex items-center space-x-4 p-5 rounded-xl transition-all ${selectedMethod==='gopay' ? 'border-2 border-primary bg-white shadow-md' : 'bg-surface-container-low border border-transparent hover:border-primary/20'}`}>
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">GoPay</span>
                  </button>
                  <button onClick={() => setSelectedMethod('ovo')} className={`group flex items-center space-x-4 p-5 rounded-xl transition-all ${selectedMethod==='ovo' ? 'border-2 border-primary bg-white shadow-md' : 'bg-surface-container-low border border-transparent hover:border-primary/20'}`}>
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">wallet</span>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">OVO</span>
                  </button>
                  <button onClick={() => setSelectedMethod('dana')} className={`group flex items-center space-x-4 p-5 rounded-xl transition-all ${selectedMethod==='dana' ? 'border-2 border-primary bg-white shadow-md' : 'bg-surface-container-low border border-transparent hover:border-primary/20'}`}>
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">payments</span>
                    </div>
                    <span className="text-sm font-headline font-bold text-on-surface">Dana</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5 sticky top-32">
            <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(22,52,34,0.06)]">
              <h2 className="text-2xl font-headline font-bold text-primary mb-8">Ringkasan Pesanan</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 pb-6 border-b border-outline-variant/10">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV7Oyed1-5LDd_Jx9U5T9gYiG2IxPqJY5HveSwoFPBdZtaHPef6u_FBBI9-68cpbhJ-XKiANioMGcXF22e2C4nOIhjL_mOkEeYG9ynz-mSJhFj9xwx7TluUedPWnQ3-FgWEns62cVFMEQzDBY0wUnq_HjSe0PUESwSTd0F6RmUrQvwyRwqEixkcvoxeKRfem1hpiv9AHVKvai1_p3Mp3Ff8_N36wAzq3Q8mPov4V9uDOE46mZRoO1kiMg2_oQE9UIOLhg3zrPFkw" alt="product" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-headline font-bold text-on-surface leading-tight">{item}</p>
                    <p className="text-xs text-on-surface-variant font-body mt-1">{location}</p>
                  </div>
                  <span className="text-sm font-headline font-bold text-primary">{fmt(price)}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-body">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="text-on-surface font-semibold">{fmt(total)}</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-end">
                  <p className="text-lg font-headline font-bold text-primary">Total Pembayaran</p>
                  <p className="text-3xl font-headline font-extrabold text-primary tracking-tighter">{fmt(total)}</p>
                </div>
                <div className="pt-8">
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <button onClick={handlePayment} disabled={loading}
                    className="w-full py-5 bg-primary text-on-primary rounded-full font-headline font-bold text-lg flex items-center justify-center space-x-3 shadow-lg shadow-primary/10 hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-70">
                    {loading ? (
                      <span>Memproses...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">lock</span>
                        <span>Bayar Sekarang</span>
                      </>
                    )}
                  </button>
                  <div className="mt-8 flex items-center justify-center space-x-6 opacity-50">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-xs">verified_user</span>
                      <span className="text-[10px] font-label font-bold uppercase tracking-tighter">SECURE PAYMENT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-xs">eco</span>
                      <span className="text-[10px] font-label font-bold uppercase tracking-tighter">ECO-FRIENDLY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-surface-container-low rounded-xl flex gap-4">
              <span className="material-symbols-outlined text-secondary text-lg">sell</span>
              <div className="space-y-1">
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">KODE PROMO</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">Punya kode voucher? Masukkan di langkah selanjutnya untuk mendapatkan potongan harga.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
