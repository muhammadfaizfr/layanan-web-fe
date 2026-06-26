import api from '../api/axios'

const pembayaranService = {
  /**
   * Ambil semua data pembayaran
   */
  getAll: async () => {
    const response = await api.get('/pembayaran')
    return response.data
  },

  /**
   * Ambil data pembayaran berdasarkan ID
   */
  getById: async (id) => {
    const response = await api.get(`/pembayaran/${id}`)
    return response.data
  },

  /**
   * Tambah pembayaran baru
   */
  create: async (data) => {
    const response = await api.post('/pembayaran', data)
    return response.data
  },

  /**
   * Update data pembayaran
   */
  update: async (id, data) => {
    const response = await api.put(`/pembayaran/${id}`, data)
    return response.data
  },

  /**
   * Hapus pembayaran
   */
  delete: async (id) => {
    const response = await api.delete(`/pembayaran/${id}`)
    return response.data
  },
}

export default pembayaranService
