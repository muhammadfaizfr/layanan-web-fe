import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginAdmin from './components/admin/loginadmin.jsx'
import RingkasanAdmin from './components/admin/ringkasanadmin.jsx'
import ManajemenTiketAdmin from './components/admin/manajementiket.jsx'
import AturTiketAdmin from './components/admin/aturtiket.jsx'
import ScanTiketAdmin from './components/admin/scantiket.jsx'
import TiketBerhasilAdmin from './components/admin/tiketberhasil.jsx'
import JadwalPendakianAdmin from './components/admin/jadwalpendakian.jsx'
import ManajemenPenggunaAdmin from './components/admin/manajemenpengguna.jsx'
import KotakMasukAdmin from './components/admin/kotakmasuk.jsx'
import ManajemenGaleriAdmin from './components/admin/manajemengaleri.jsx'
import LaporanAdmin from './components/admin/laporanadmin.jsx'
import PengaturanAdmin from './components/admin/pengaturanadmin.jsx'

// Wrapper agar LoginAdmin bisa navigate via React Router
function AdminLoginPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else {
      nav('/')
    }
  }
  return <LoginAdmin navigate={navigate} />
}

// Wrapper agar RingkasanAdmin bisa navigate via React Router
function AdminRingkasanPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <RingkasanAdmin navigate={navigate} />
}

// Wrapper agar ManajemenTiketAdmin bisa navigate via React Router
function AdminManajemenTiketPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-atur-tiket') {
      nav('/admin/atur-tiket')
    } else if (page === 'admin-scan-tiket') {
      nav('/admin/scan-tiket')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <ManajemenTiketAdmin navigate={navigate} />
}

// Wrapper agar AturTiketAdmin bisa navigate via React Router
function AdminAturTiketPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <AturTiketAdmin navigate={navigate} />
}

// Wrapper agar ScanTiketAdmin bisa navigate via React Router
function AdminScanTiketPage() {
  const nav = useNavigate()
  const navigate = (page, state) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-tiket-berhasil') {
      nav('/admin/tiket-berhasil', { state })
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <ScanTiketAdmin navigate={navigate} />
}

// Wrapper agar TiketBerhasilAdmin bisa navigate via React Router
function AdminTiketBerhasilPage() {
  const nav = useNavigate()
  const location = useLocation()
  const navigate = (page) => {
    if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else {
      nav('/')
    }
  }
  return <TiketBerhasilAdmin navigate={navigate} ticketData={location.state} />
}

// Wrapper agar JadwalPendakianAdmin bisa navigate via React Router
function AdminJadwalPendakianPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <JadwalPendakianAdmin navigate={navigate} />
}

// Wrapper agar ManajemenPenggunaAdmin bisa navigate via React Router
function AdminManajemenPenggunaPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <ManajemenPenggunaAdmin navigate={navigate} />
}

// Wrapper agar KotakMasukAdmin bisa navigate via React Router
function AdminKotakMasukPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <KotakMasukAdmin navigate={navigate} />
}

// Wrapper agar ManajemenGaleriAdmin bisa navigate via React Router
function AdminManajemenGaleriPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <ManajemenGaleriAdmin navigate={navigate} />
}

// Wrapper agar LaporanAdmin bisa navigate via React Router
function AdminLaporanPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <LaporanAdmin navigate={navigate} />
}

// Wrapper agar PengaturanAdmin bisa navigate via React Router
function AdminPengaturanPage() {
  const nav = useNavigate()
  const navigate = (page) => {
    if (page === 'admin-login') {
      nav('/admin')
    } else if (page === 'admin-ringkasan') {
      nav('/admin/ringkasan')
    } else if (page === 'admin-manajemen-tiket') {
      nav('/admin/manajemen-tiket')
    } else if (page === 'admin-kotak-masuk') {
      nav('/admin/kotak-masuk')
    } else if (page === 'admin-jadwal-pendakian') {
      nav('/admin/jadwal-pendakian')
    } else if (page === 'admin-manajemen-pengguna') {
      nav('/admin/manajemen-pengguna')
    } else if (page === 'admin-manajemen-galeri') {
      nav('/admin/manajemen-galeri')
    } else if (page === 'admin-laporan') {
      nav('/admin/laporan')
    } else if (page === 'admin-pengaturan') {
      nav('/admin/pengaturan')
    } else {
      nav('/')
    }
  }
  return <PengaturanAdmin navigate={navigate} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/ringkasan" element={<AdminRingkasanPage />} />
        <Route path="/admin/manajemen-tiket" element={<AdminManajemenTiketPage />} />
        <Route path="/admin/atur-tiket" element={<AdminAturTiketPage />} />
        <Route path="/admin/scan-tiket" element={<AdminScanTiketPage />} />
        <Route path="/admin/tiket-berhasil" element={<AdminTiketBerhasilPage />} />
        <Route path="/admin/jadwal-pendakian" element={<AdminJadwalPendakianPage />} />
        <Route path="/admin/jadwal_pendakian" element={<AdminJadwalPendakianPage />} />
        <Route path="/admin/manajemen-pengguna" element={<AdminManajemenPenggunaPage />} />
        <Route path="/admin/manajemen_pengguna" element={<AdminManajemenPenggunaPage />} />
        <Route path="/admin/kotak-masuk" element={<AdminKotakMasukPage />} />
        <Route path="/admin/manajemen-galeri" element={<AdminManajemenGaleriPage />} />
        <Route path="/admin/laporan" element={<AdminLaporanPage />} />
        <Route path="/admin/pengaturan" element={<AdminPengaturanPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

