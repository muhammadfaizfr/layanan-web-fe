import api from '../api/axios'

const pelangganService = {
  /**
   * Ambil semua data pelanggan
   */
  getAll: async () => {
    const response = await api.get('/pelanggan')
    return response.data
  },

  /**
   * Ambil data pelanggan berdasarkan ID
   */
  getById: async (id) => {
    const response = await api.get(`/pelanggan/${id}`)
    return response.data
  },

  /**
   * Tambah pelanggan baru
   */
  create: async (data) => {
    const response = await api.post('/pelanggan', data)
    return response.data
  },

  /**
   * Update data pelanggan
   */
  update: async (id, data) => {
    const response = await api.put(`/pelanggan/${id}`, data)
    return response.data
  },

  /**
   * Hapus pelanggan
   */
  delete: async (id) => {
    const response = await api.delete(`/pelanggan/${id}`)
    return response.data
  },
}

export default pelangganService
