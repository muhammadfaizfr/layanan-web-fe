import React, { useState } from 'react'
import authService from '../../services/authService'

export default function LoginAdmin({ navigate }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      // Simpan token ke localStorage
      const token = data.token || data.access_token || data.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }
      if (data.admin) {
        localStorage.setItem('admin_data', JSON.stringify(data.admin))
        localStorage.setItem('admin_nama', data.admin.nama_admin)
      }
      navigate('admin-ringkasan')
    } catch (err) {
      setError(err.userMessage || 'Email atau kata sandi salah!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background font-body text-on-surface min-h-screen selection:bg-primary/10 selection:text-primary">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .inner-glow {
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <main className="flex min-h-screen overflow-hidden">
        {/* Left Section: Atmospheric Visual */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
          <img
            alt="Gunung Galunggung"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVemIpoKC5NpztVvzMgQheRcXItUW_-yLhJa-UkT2YZxE00PPCaYOyFPMEFfULZmX5OA-IPGzQ7tszt78FUxUb7YkH8M4p653xsS_mSzgoTjtCG-aCEBF50_utSeBcP-TjLbVilGz9hYOq5ZHRQPvVzFhp5-T2mQOZTNXOokNagxXsiFpeREr5VKV8jFdF9uB3i6Hdu-aCInYHbDkiQu9pnvWGaRhXtYYkzgKTCyKfE7pQbzLPSAVWleMhPIsaJTEv-CrXRqAwEg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-end p-20 w-full">
            <div className="max-w-md">
              <span className="font-label text-primary-fixed text-xs uppercase tracking-[0.2em] mb-4 block">
                Koordinat 7.2583° S, 108.0583° E
              </span>
              <h1 className="font-display text-surface-bright text-5xl font-bold leading-tight tracking-tight mb-6">
                Menjaga Keaslian <br/>Alam Galunggung.
              </h1>
              <p className="text-on-primary-container text-lg leading-relaxed font-light opacity-90">
                Masuk ke sistem manajemen pusat untuk mengelola ekosistem pariwisata yang berkelanjutan dan terkurasi.
              </p>
            </div>
          </div>
          {/* Asymmetric Accent */}
          <div className="absolute top-12 left-12 w-24 h-24 rounded-full border border-primary-fixed/20 blur-xl"></div>
        </section>

        {/* Right Section: Login Area */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 bg-surface relative">
          <div className="w-full max-w-sm space-y-10">
            {/* Brand Anchor */}
            <header className="flex flex-col items-center lg:items-start space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-surface-bright"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    landscape
                  </span>
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-primary">
                  Gunung Galunggung Admin
                </span>
              </div>
              <div className="text-center lg:text-left">
                <h2 className="font-display text-2xl font-semibold text-on-surface">Selamat Datang Kembali</h2>
                <p className="text-on-surface-variant font-light mt-1">Sistem Manajemen Pariwisata Terintegrasi</p>
              </div>
            </header>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-3 px-4 py-3 bg-error-container rounded-xl">
                  <span className="material-symbols-outlined text-error text-lg">error</span>
                  <p className="text-sm text-on-error-container font-medium">{error}</p>
                </div>
              )}
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1"
                    htmlFor="email"
                  >
                    Alamat Email
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full px-5 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary-container/20 focus:bg-surface-bright transition-all text-on-surface placeholder:text-outline/40 shadow-sm outline-none"
                      id="email"
                      placeholder="nama@galunggung.id"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 group-focus-within:text-primary transition-colors">
                      mail
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end px-1">
                    <label
                      className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                      htmlFor="password"
                    >
                      Kata Sandi
                    </label>
                    <button type="button" className="text-xs font-medium text-primary hover:underline underline-offset-4 transition-all">
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="relative group">
                    <input
                      className="w-full px-5 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary-container/20 focus:bg-surface-bright transition-all text-on-surface placeholder:text-outline/40 shadow-sm outline-none"
                      id="password"
                      placeholder="••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-primary transition-colors flex items-center gap-1"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full bg-primary text-on-primary font-headline font-semibold py-4 rounded-full inner-glow flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-primary/95 shadow-lg shadow-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Panel Kontrol</span>
                    <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Footer */}
            <footer className="pt-8 border-t border-outline-variant/10 flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center space-x-2 text-on-surface-variant/60">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <p className="text-[11px] font-label uppercase tracking-widest">Hanya untuk personil resmi</p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-[10px] text-outline font-medium uppercase tracking-tighter">
                <button type="button" className="hover:text-primary transition-colors">Kebijakan Privasi</button>
                <button type="button" className="hover:text-primary transition-colors">Syarat Penggunaan</button>
                <button type="button" className="hover:text-primary transition-colors">Pusat Bantuan</button>
              </div>
            </footer>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-surface-container-low rounded-tl-[100px] -z-10 opacity-50"></div>
        </section>
      </main>

      {/* Global Layout Shell Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-10 px-12 py-8 pointer-events-none hidden lg:block">
        <div className="flex justify-between items-center opacity-30 text-on-surface text-[10px] font-label uppercase tracking-widest">
          <div>© 2024 Gunung Galunggung Tourism Management.</div>
          <div className="pointer-events-auto">The Curated Descent.</div>
        </div>
      </footer>
    </div>
  )
}