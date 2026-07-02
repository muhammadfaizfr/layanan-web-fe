import React, { useMemo } from 'react'

export default function BerhasilPembayaran({ order, navigate, formatRupiah }) {
  const qty = order?.qty ?? 1
  const price = order?.price ?? order?.unitPrice ?? 25000
  const item = order?.item ?? (order?.jenisTiket ? `Tiket ${order.jenisTiket} (x${qty})` : `Tiket Wisatawan Domestik (x${qty})`)
  const location = order?.location ?? 'Kawah Galunggung, Tasikmalaya'
  const name = order?.name ?? 'Pengunjung'
  const date = order?.date ?? '24 April 2026'
  const total = qty * price
  const fmt = formatRupiah ?? ((n) => `Rp ${n.toLocaleString('id-ID')}`)

  const reference = useMemo(() => {
    return order?.reference ?? `GG-${Math.floor(100000 + Math.random() * 900000)}`
  }, [order])



  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="pt-32 pb-24 px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto">
        <div className="bg-surface-container-lowest border border-outline-variant/70 shadow-[0_40px_80px_-40px_rgba(22,52,34,0.18)] rounded-[2rem] overflow-hidden">
          <div className="bg-white/90 px-8 py-14 text-center sm:px-14">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
              <span className="material-symbols-outlined text-5xl">check</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-headline font-extrabold text-primary tracking-tight mb-4">Pembayaran Berhasil</h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-on-surface-variant leading-relaxed">Petualangan Anda ke jantung vulkanik Jawa Barat telah dikonfirmasi. Kami telah mengirimkan salinan tiket ke email Anda.</p>
            <div className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-surface-container-high py-3 px-6 bg-surface-container-lowest text-sm font-semibold text-primary shadow-sm">
              <span className="uppercase tracking-[0.3em] text-[10px] text-on-surface-variant">Referensi Pemesanan</span>
              <span>{reference}</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] px-6 pb-10 pt-8 sm:px-10 sm:pb-12">
            <div className="space-y-6 rounded-[2rem] bg-surface-container-high p-8 shadow-sm border border-outline-variant/30">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary">Ringkasan Pemesanan</p>
                <h2 className="text-3xl font-headline font-bold text-primary">Detail Tiket Anda</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-5 border border-outline-variant/10 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">Tanggal Kunjungan</p>
                  <p className="font-semibold text-primary">{date}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 border border-outline-variant/10 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">Jumlah</p>
                  <p className="font-semibold text-primary">{qty} Orang</p>
                </div>
                <div className="rounded-3xl bg-white p-5 border border-outline-variant/10 shadow-sm sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">Jenis Tiket</p>
                  <p className="font-semibold text-primary">{item}</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between text-sm text-on-surface-variant mb-3">
                  <span>Subtotal</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center">
                  <span className="font-semibold text-primary">Total Pembayaran</span>
                  <span className="text-xl font-extrabold text-primary">{fmt(total)}</span>
                </div>
              </div>



              <button 
                onClick={() => navigate?.('e-tiket')} 
                className="mt-6 w-full rounded-full bg-[#163422] text-white px-8 py-4 font-headline font-bold text-base shadow-lg hover:bg-[#1f4a31] transition duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Unduh E-Tiket
              </button>

              <button 
                onClick={() => navigate?.('home')} 
                className="mt-3 w-full rounded-full bg-primary/10 text-primary px-8 py-4 font-headline font-bold text-base hover:bg-primary/20 transition duration-200"
              >
                Kembali ke Beranda
              </button>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-white shadow-sm">
              <img className="h-80 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV7Oyed1-5LDd_Jx9U5T9gYiG2IxPqJY5HveSwoFPBdZtaHPef6u_FBBI9-68cpbhJ-XKiANioMGcXF22e2C4nOIhjL_mOkEeYG9ynz-mSJhFj9xwx7TluUedPWnQ3-FgWEns62cVFMEQzDBY0wUnq_HjSe0PUESwSTd0F6RmUrQvwyRwqEixkcvoxeKRfem1hpiv9AHVKvai1_p3Mp3Ff8_N36wAzq3Q8mPov4V9uDOE46mZRoO1kiMg2_oQE9UIOLhg3zrPFkw" alt="Kawah Galunggung" />
              <div className="p-8 bg-surface-container-lowest">
                <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-3">Destinasi</p>
                <h3 className="text-2xl font-bold text-primary">Kawah Galunggung</h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">Nikmati pengalaman trekking eksklusif menuju salah satu kawah terindah di Jawa Barat.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
