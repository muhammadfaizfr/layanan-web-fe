import api from '../api/axios'

const slotPendakianService = {
  /**
   * Ambil semua data slot pendakian
   */
  getAll: async () => {
    const response = await api.get('/slot-pendakian')
    return response.data
  },

  /**
   * Ambil data slot pendakian berdasarkan ID
   */
  getById: async (id) => {
    const response = await api.get(`/slot-pendakian/${id}`)
    return response.data
  },

  /**
   * Tambah slot pendakian baru
   */
  create: async (data) => {
    const response = await api.post('/slot-pendakian', data)
    return response.data
  },

  /**
   * Update data slot pendakian
   */
  update: async (id, data) => {
    const response = await api.put(`/slot-pendakian/${id}`, data)
    return response.data
  },

  /**
   * Hapus slot pendakian
   */
  delete: async (id) => {
    const response = await api.delete(`/slot-pendakian/${id}`)
    return response.data
  },
}

export default slotPendakianService
