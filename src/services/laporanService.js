import api from '../api/axios'

const laporanService = {
  /**
   * Ambil data laporan/dashboard
   * Endpoint ini membutuhkan Bearer Token (Laravel Sanctum)
   */
  getAll: async () => {
    const response = await api.get('/laporan')
    return response.data
  },
}

export default laporanService
