import api from '../api/axios'

const bookingService = {
  /**
   * Ambil semua data booking
   */
  getAll: async () => {
    const response = await api.get('/booking')
    return response.data
  },

  /**
   * Ambil data booking berdasarkan ID
   */
  getById: async (id) => {
    const response = await api.get(`/booking/${id}`)
    return response.data
  },

  /**
   * Tambah booking baru
   */
  create: async (data) => {
    const response = await api.post('/booking', data)
    return response.data
  },

  /**
   * Update data booking
   */
  update: async (id, data) => {
    const response = await api.put(`/booking/${id}`, data)
    return response.data
  },

  /**
   * Hapus booking
   */
  delete: async (id) => {
    const response = await api.delete(`/booking/${id}`)
    return response.data
  },
}

export default bookingService
