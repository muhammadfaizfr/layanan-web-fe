import React, { useState } from 'react'

export default function PembayaranPendakian({ order, formatRupiah, navigate, onComplete }) {
  const [selectedMethod, setSelectedMethod] = useState(null)

  const bankLogos = {
    bca: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfOAnG3HAqVOlNidbi0XdybamHpCxv5vm7Y0kpQsYUg9Jg-vaDFEqau-NVE5fBiC6YQGXEuyZS87AN8uySExNnTKxr9TmndZ2SiVvOpqSIic0bWq1gD4LdNgsd-Ni1qQ62fg1mHpff4rRNatST1whu7mv7sha8t33WCdYMsQmTTEg0zTqpiPOJgTHcne9TUKOlOnIBLQU6w_lQ2n6ROzgQD_R-L6P7CPDIwXwTWY6T25FzTDS8XATPCeBRrQPcEP-srypP6L4RPw",
    mandiri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC181rpVr77M7bvrkGfoeAB2Z0c2kZEYng-vFK4A-y3DjgIKaoiLX0z_iKW2VqVnFkJGKfJX5acZuIXHwOsaAz4iZsCTsm-iBIfuDX0UWocUaEwU13JJipbDGD84mv15g6DFD23saPq50PlzyODhsuzTp8cc8VgRcR4t6SwHSOSfV5sdzHkXMvIRdDe4B4yZVrE9laNlx769gRSdvbbC6IparRXqEwT8SZqaY1FQ8XU26LL1ifBXo-7nxOkJZ8HL2bsEr3XnfY7NA",
    bni: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQzN1DQEYunvqgpXUSuKG300mDN8rsmSJgxvRDmPn1SIPjV14MvW0DBGs43d8D0CDIisgPVENMrxzbhAqIDr6KDHlCP83c0RZZBT3Ew0ejzCpnYw6cqAmJZIFPWr6lcjTgWXmN1ljOw4jKqE7g1gfLlaNI7JbjRY-Q3YEF0zT4prsTNGY4UJuvM_2H-laxMGrDBCo1bzfQFHtiEKmwcm8m90jxc8yPOeeUzDeARWsrPaGUifipUtRc2gFNrakqDicPDu8L5sPITg",
    bri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTaIQaxXpcUAaPmrnH7PR-C8E8NARomPQZZcEaPvj2rGoHtKuj1JZrDhAhj9TEpDnDS0Vzhf9yTmnhhornTQdn7W-2cwuXAMG4NB8FEK2n8J3VfIDsywkvzQCLt7e1TKP0G8VlhHTHs1sFkyKr7yUa8lP6J9u0-jjrrTyxEY0kWeOJenFlv9FWVfkcwEGA43iyZKzuhOUBt6kUXh7vA9w_44qXTz8_gRJRuPF-6k4CPR0eJNogEXX0Udu4Jqx9yjXz43bPpCjbKA"
  };

  const activeCategory = !selectedMethod || ['bca', 'mandiri', 'bni', 'bri'].includes(selectedMethod)
    ? 'va'
    : ['gopay', 'ovo', 'dana'].includes(selectedMethod)
    ? 'ewallet'
    : selectedMethod === 'cc'
    ? 'cc'
    : null;
  const qty = order?.qty ?? 1
  const route = order?.route ?? 'Tangga 620'
  const date = order?.date ?? 'Sabtu, 5 Okt'
  const total = order?.total ?? 25000 * qty
  const fmt = formatRupiah ?? ((n) => `IDR ${n.toLocaleString('id-ID')}`)

  const availableMethods = [
    { key: 'mandiri', label: 'Mandiri' },
    { key: 'bca', label: 'BCA' },
    { key: 'bni', label: 'BNI' },
    { key: 'gopay', label: 'GoPay' },
    { key: 'ovo', label: 'OVO' },
    { key: 'dana', label: 'DANA' },
  ]

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Pilih metode pembayaran terlebih dahulu.')
      return
    }
    if (typeof onComplete === 'function') {
      onComplete(selectedMethod)
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_20px_40px_rgba(22,52,34,0.04)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <button
            type="button"
            onClick={() => navigate?.('home')}
            className="text-2xl font-extrabold tracking-tighter text-[#163422]"
          >
            Galunggung
          </button>
          <div className="hidden md:flex items-center space-x-8">
            <button type="button" onClick={() => navigate?.('home')} className="text-[#695d47] hover:text-[#163422] transition-colors duration-300 font-jakarta font-semibold text-sm">Home</button>
            <button type="button" onClick={() => navigate?.('tentang')} className="text-[#695d47] hover:text-[#163422] transition-colors duration-300 font-jakarta font-semibold text-sm">Tentang</button>
            <button type="button" onClick={() => navigate?.('informasi')} className="text-[#695d47] hover:text-[#163422] transition-colors duration-300 font-jakarta font-semibold text-sm">Informasi</button>
            <button type="button" onClick={() => navigate?.('galeri')} className="text-[#695d47] hover:text-[#163422] transition-colors duration-300 font-jakarta font-semibold text-sm">Galeri</button>
            <button type="button" onClick={() => navigate?.('lokasi')} className="text-[#695d47] hover:text-[#163422] transition-colors duration-300 font-jakarta font-semibold text-sm">Lokasi</button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="material-symbols-outlined text-primary cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-primary cursor-pointer">account_circle</span>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-8">Pembayaran Pendaftaran Pendakian</h1>

          <div className="flex items-center space-x-4 mb-12 overflow-x-auto pb-2">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="text-sm font-jakarta font-bold text-primary">Rute & Jadwal</span>
            </div>
            <div className="w-12 h-[2px] bg-primary/20"></div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">2</div>
              <span className="text-sm font-jakarta font-bold text-primary">Pembayaran</span>
            </div>
            <div className="w-12 h-[2px] bg-surface-container-high"></div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">3</div>
              <span className="text-sm font-jakarta font-bold text-on-surface-variant">Selesai</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Metode Pembayaran
              </h2>

              <div className="space-y-4">
                {/* Virtual Account */}
                <div 
                  onClick={() => {
                    if (activeCategory !== 'va') {
                      setSelectedMethod('bca'); // Default to bca when clicking the category
                    }
                  }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeCategory === 'va'
                      ? 'bg-surface-container-lowest border-2 border-primary shadow-[0_10px_30px_rgba(22,52,34,0.03)]'
                      : 'bg-surface-container-low border border-outline-variant/20 hover:border-primary/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-jakarta font-bold transition-colors ${activeCategory === 'va' ? 'text-primary' : 'text-on-surface-variant'}`}>Virtual Account</h3>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      activeCategory === 'va' 
                        ? 'border-4 border-primary bg-on-primary' 
                        : 'border-outline-variant'
                    }`}></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" onClick={(e) => e.stopPropagation()}>
                    {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => {
                      const bankKey = bank.toLowerCase();
                      const isSelected = selectedMethod === bankKey;
                      return (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedMethod(bankKey)}
                          className={`bg-surface-container-low p-4 rounded-xl flex items-center justify-center border transition-all ${
                            isSelected 
                              ? 'border-primary bg-white shadow-sm ring-1 ring-primary' 
                              : 'border-outline-variant/30 hover:border-primary/50'
                          }`}
                        >
                          <img 
                            alt={bank} 
                            className={`h-6 object-contain transition-all ${isSelected ? 'grayscale-0 opacity-100' : 'grayscale opacity-70'}`} 
                            src={bankLogos[bankKey]} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* E-Wallet */}
                <div 
                  onClick={() => {
                    if (activeCategory !== 'ewallet') {
                      setSelectedMethod('gopay'); // Default to gopay when clicking the category
                    }
                  }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeCategory === 'ewallet'
                      ? 'bg-surface-container-lowest border-2 border-primary shadow-[0_10px_30px_rgba(22,52,34,0.03)]'
                      : 'bg-surface-container-low border border-outline-variant/20 hover:border-primary/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-jakarta font-bold transition-colors ${activeCategory === 'ewallet' ? 'text-primary' : 'text-on-surface-variant'}`}>E-Wallet</h3>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      activeCategory === 'ewallet' 
                        ? 'border-4 border-primary bg-on-primary' 
                        : 'border-outline-variant'
                    }`}></div>
                  </div>
                  <div className="flex gap-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
                    {['GoPay', 'OVO', 'DANA'].map((wallet) => {
                      const walletKey = wallet.toLowerCase();
                      const isSelected = selectedMethod === walletKey;
                      return (
                        <button
                          key={wallet}
                          type="button"
                          onClick={() => setSelectedMethod(walletKey)}
                          className={`bg-surface-container-lowest px-6 py-3 rounded-xl border transition-all text-sm font-bold tracking-widest ${
                            isSelected 
                              ? 'border-primary bg-white shadow-sm ring-1 ring-primary' 
                              : 'border-outline-variant/10 hover:border-primary/50'
                          } ${wallet === 'GoPay' ? 'text-[#00BAF2]' : wallet === 'OVO' ? 'text-[#391584]' : 'text-[#118EEA]'}`}
                        >
                          {wallet}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Credit Card */}
                <div 
                  onClick={() => setSelectedMethod('cc')}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeCategory === 'cc'
                      ? 'bg-surface-container-lowest border-2 border-primary shadow-[0_10px_30px_rgba(22,52,34,0.03)]'
                      : 'bg-surface-container-low border border-outline-variant/20 hover:border-primary/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-jakarta font-bold transition-colors ${activeCategory === 'cc' ? 'text-primary' : 'text-on-surface-variant'}`}>Kartu Kredit</h3>
                      <div className="flex gap-1">
                        <span className={`material-symbols-outlined text-sm transition-colors ${activeCategory === 'cc' ? 'text-primary opacity-100' : 'opacity-50'}`}>credit_card</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      activeCategory === 'cc' 
                        ? 'border-4 border-primary bg-on-primary' 
                        : 'border-outline-variant'
                    }`}></div>
                  </div>
                </div>
              </div>
            </section>

            <div className="p-6 rounded-3xl bg-primary-container/10 border border-primary/10">
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary">info</span>
                <div>
                  <p className="text-sm font-jakarta font-semibold text-primary mb-1">Penting</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Pembayaran harus diselesaikan dalam waktu 15 menit setelah tombol bayar ditekan. Pastikan data pendaftaran Anda sudah benar.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 sticky top-32">
            <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(22,52,34,0.06)] border border-outline-variant/10">
              <h2 className="text-xl font-bold text-primary mb-8 font-jakarta">Ringkasan Pendakian</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">hiking</span>
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-secondary font-bold mb-1">Rute Terpilih</p>
                    <p className="text-base font-jakarta font-bold text-on-surface">{route}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-secondary font-bold mb-1">Tanggal</p>
                    <p className="text-base font-jakarta font-bold text-on-surface">{date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">group</span>
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-secondary font-bold mb-1">Jumlah Anggota</p>
                    <p className="text-base font-jakarta font-bold text-on-surface">{qty} Orang</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-dashed border-outline-variant/30 mb-8">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-jakarta font-bold text-secondary">Total Retribusi</p>
                  <p className="text-2xl font-extrabold text-primary font-jakarta">{fmt(total)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-primary text-on-primary py-5 rounded-full font-jakarta font-bold text-base shadow-[0_15px_30px_rgba(22,52,34,0.2)] hover:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Bayar & Daftar Sekarang
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <p className="mt-6 text-center text-xs text-on-surface-variant">Dengan melanjutkan, Anda menyetujui <a className="underline font-bold" href="#">Syarat & Ketentuan</a> pendakian Galunggung.</p>
            </div>

            <div className="mt-8 rounded-[2rem] overflow-hidden relative group">
              <img className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" alt="Breathtaking wide view of Mount Galunggung crater lake surrounded by lush green volcanic landscape and mist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1fuaqhl1-sD-Jex7nx8UftpsRG8q87fwlnRVyVSSdXAL_lCX3_E5R4ddbzNY68bPfMY6cjPzbnB1H2XMw4HRSalwIEgI1y89Jv5PEQ2rkjGD8Z0VbFPD5U959z-hObHlS4bbIVyV9WWtTT077OgzFkBbjHWoYhWoU2NpunSzrTJlJK5Vdom_5wwsmt2tGwk1lkASTZUxs0ZbJI41P1wHiuSLKMruzylCKvY4xOWNauaen1kNFpcdpnHDYsVpPu4ST62YNiIWHvg" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                <p className="text-on-primary font-jakarta font-bold text-sm">Persiapkan fisik Anda untuk pendakian yang luar biasa.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f9f9f7]/90 backdrop-blur-xl shadow-[0_-10px_30px_rgba(22,52,34,0.05)] rounded-t-[2rem]">
        {['Home', 'Explore', 'Bookings', 'Profile'].map((item) => (
          <div key={item} className={`flex flex-col items-center justify-center ${item === 'Bookings' ? 'bg-[#163422] text-[#f9f9f7] rounded-full px-6 py-2 active:scale-90 duration-200' : 'text-[#695d47] px-4 py-2 hover:bg-[#f4f4f2] transition-all'}`}>
            <span className="material-symbols-outlined">{item === 'Home' ? 'home_max' : item === 'Explore' ? 'mountain_flag' : item === 'Bookings' ? 'confirmation_number' : 'person_pin'}</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-[0.1em] font-bold mt-1">{item}</span>
          </div>
        ))}
      </nav>

      <footer className="bg-surface-container-low pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto border-t border-outline-variant/30 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-extrabold text-primary tracking-tighter mb-6">Galunggung</h3>
              <p className="text-on-surface-variant leading-relaxed max-w-sm">Menjelajahi keindahan vulkanik dan warisan alam Tasikmalaya. Komitmen kami adalah memberikan pengalaman pendakian yang aman, teratur, dan berkesan bagi setiap petualang.</p>
            </div>
            <div>
              <h4 className="font-jakarta font-bold text-primary mb-6">Navigasi</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><button type="button" onClick={() => navigate?.('tentang')} className="hover:text-primary transition-colors">Tentang Kami</button></li>
                <li><button type="button" onClick={() => navigate?.('informasi')} className="hover:text-primary transition-colors">Panduan Pendakian</button></li>
                <li><button type="button" onClick={() => navigate?.('home')} className="hover:text-primary transition-colors">Kebijakan Privasi</button></li>
                <li><button type="button" onClick={() => navigate?.('kontak')} className="hover:text-primary transition-colors">Kontak Darurat</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-jakarta font-bold text-primary mb-6">Kontak</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span>info@galunggung.id</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span>+62 812 3456 7890</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span>Linggajati, Tasikmalaya</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-outline-variant/10 text-xs text-on-surface-variant uppercase tracking-widest font-bold">
            <p>© 2024 Galunggung Management. All rights reserved.</p>
            <div className="flex gap-8">
              <button type="button" onClick={() => window.open('#', '_blank')} className="hover:text-primary">Instagram</button>
              <button type="button" onClick={() => window.open('#', '_blank')} className="hover:text-primary">Twitter</button>
              <button type="button" onClick={() => window.open('#', '_blank')} className="hover:text-primary">Facebook</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
