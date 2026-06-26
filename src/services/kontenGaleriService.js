import api from '../api/axios'

const kontenGaleriService = {
  /**
   * Ambil semua data konten galeri
   */
  getAll: async () => {
    const response = await api.get('/konten-galeri')
    return response.data
  },
}

export default kontenGaleriService
