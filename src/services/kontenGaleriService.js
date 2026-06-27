import api from '../api/axios'

const kontenGaleriService = {
  /**
   * Ambil semua data konten galeri
   */
  getAll: async () => {
    const response = await api.get('/konten-galeri')
    return response.data
  },

  /**
   * Tambah konten galeri baru
   */
  create: async (data) => {
    // Karena ini upload file (FormData), kita set Content-Type header ke multipart/form-data
    const response = await api.post('/konten-galeri', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  /**
   * Update konten galeri
   */
  update: async (id, data) => {
    const response = await api.put(`/konten-galeri/${id}`, data)
    return response.data
  },

  /**
   * Hapus konten galeri
   */
  delete: async (id) => {
    const response = await api.delete(`/konten-galeri/${id}`)
    return response.data
  },
}

export default kontenGaleriService
