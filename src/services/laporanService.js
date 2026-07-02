import api from '../api/axios'

const laporanService = {
  /**
   * Ambil data laporan/dashboard (default: 30 hari terakhir dari backend)
   * Endpoint ini membutuhkan Bearer Token (Laravel Sanctum)
   */
  getAll: async () => {
    const response = await api.get('/laporan')
    return response.data
  },

  /**
   * Ambil data laporan per-bulan tertentu
   * @param {number} year - Tahun (e.g. 2026)
   * @param {number} month - Bulan 1-12 (e.g. 7 untuk Juli)
   */
  getByMonth: async (year, month) => {
    const m = String(month).padStart(2, '0')
    const lastDay = new Date(year, month, 0).getDate()
    const startDate = `${year}-${m}-01`
    const endDate = `${year}-${m}-${String(lastDay).padStart(2, '0')}`
    const response = await api.get(`/laporan?start_date=${startDate}&end_date=${endDate}`)
    return response.data
  },
}

export default laporanService
