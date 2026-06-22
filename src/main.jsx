import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginAdmin from './components/admin/LoginAdmin.jsx'
import RingkasanAdmin from './components/admin/RingkasanAdmin.jsx'
import ManajemenTiketAdmin from './components/admin/ManajemenTiketAdmin.jsx'

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
    } else {
      nav('/')
    }
  }
  return <ManajemenTiketAdmin navigate={navigate} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/ringkasan" element={<AdminRingkasanPage />} />
        <Route path="/admin/manajemen-tiket" element={<AdminManajemenTiketPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

