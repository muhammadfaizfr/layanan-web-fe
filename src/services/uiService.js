import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'
const STORAGE_URL = 'http://127.0.0.1:8000/storage/ui'

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const uiService = {
  /**
   * Upload gambar UI baru ke server.
   * Mengembalikan URL lengkap file yang baru disimpan.
   */
  uploadImage: async (key, file) => {
    const formData = new FormData()
    formData.append('key', key)
    formData.append('file', file)

    try {
      const response = await axios.post(`${API_URL}/ui/upload`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      const errData = error.response?.data
      const errMsg = errData?.errors 
        ? Object.values(errData.errors).flat().join(', ')
        : errData?.message || error.message || 'Upload gagal'
      throw new Error(errMsg)
    }
  },

  /**
   * Ambil daftar semua gambar UI yang sudah diupload dari server.
   * Mengembalikan object { key: url, ... }
   */
  getImages: async () => {
    try {
      const response = await axios.get(`${API_URL}/ui/images`)
      return response.data?.data || {}
    } catch {
      return {}
    }
  },

  /**
   * Bangun URL gambar dengan cache buster supaya browser tidak tampilkan versi lama.
   * Coba ekstensi .jpg, server akan redirect ke ekstensi yang benar.
   */
  getImageUrl: (key, ext = 'jpg') => {
    return `${STORAGE_URL}/${key}.${ext}?t=${Date.now()}`
  }
}

export default uiService
