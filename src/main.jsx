import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginAdmin from './components/admin/LoginAdmin.jsx'
import RingkasanAdmin from './components/admin/RingkasanAdmin.jsx'

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
    } else {
      nav('/')
    }
  }
  return <RingkasanAdmin navigate={navigate} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/ringkasan" element={<AdminRingkasanPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

