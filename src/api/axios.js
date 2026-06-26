import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

// Request interceptor — sisipkan Bearer Token dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor — tangani error secara global
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Network error — API tidak terhubung
    if (!error.response) {
      error.userMessage = 'Tidak dapat terhubung ke server. Periksa koneksi Anda.'
      return Promise.reject(error)
    }

    const status = error.response.status

    // 401 Unauthorized — token expired atau tidak valid
    if (status === 401) {
      localStorage.removeItem('token')
      error.userMessage = 'Sesi Anda telah berakhir. Silakan login kembali.'
      // Redirect ke halaman login
      window.location.href = '/admin'
      return Promise.reject(error)
    }

    // 422 Validation Error
    if (status === 422) {
      const errors = error.response.data?.errors
      if (errors) {
        // Gabungkan semua pesan validasi menjadi satu string
        const messages = Object.values(errors).flat()
        error.userMessage = messages.join(', ')
      } else {
        error.userMessage = error.response.data?.message || 'Data yang dikirim tidak valid.'
      }
      return Promise.reject(error)
    }

    // 500 Server Error
    if (status >= 500) {
      error.userMessage = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
      return Promise.reject(error)
    }

    // Error lainnya
    error.userMessage = error.response.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    return Promise.reject(error)
  }
)

export default api
