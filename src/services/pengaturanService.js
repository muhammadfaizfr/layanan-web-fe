import api from '../api/axios'

const pengaturanService = {
  /**
   * Ambil data pengaturan (harga tiket)
   */
  get: async () => {
    const response = await api.get('/pengaturan')
    return response.data
  },

  /**
   * Update data pengaturan (harga tiket)
   */
  update: async (data) => {
    const response = await api.put('/pengaturan', data)
    return response.data
  },
}

export default pengaturanService
