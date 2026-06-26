import api from '../api/axios'

const kontakService = {
  /**
   * Ambil semua data kontak/pesan masuk
   */
  getAll: async () => {
    const response = await api.get('/kontak')
    return response.data
  },

  /**
   * Kirim pesan kontak baru
   */
  create: async (data) => {
    const response = await api.post('/kontak', data)
    return response.data
  },

  /**
   * Hapus pesan kontak
   */
  delete: async (id) => {
    const response = await api.delete(`/kontak/${id}`)
    return response.data
  },
}

export default kontakService
