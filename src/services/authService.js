import api from '../api/axios'

const authService = {
  /**
   * Login admin
   * @param {string} email
   * @param {string} password
   * @returns {Promise} response dengan token
   */
  login: async (email, password) => {
    const response = await api.post('/login', { email, password })
    return response.data
  },

  /**
   * Logout — hapus token dari localStorage
   */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin_nama')
    localStorage.removeItem('admin_email')
  },

  /**
   * Cek apakah user sudah login
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  /**
   * Ambil token dari localStorage
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem('token')
  },

  /**
   * Ambil profil admin yang sedang login dari backend
   * @returns {Promise} response profil admin
   */
  getProfile: async () => {
    const response = await api.get('/admin/profile')
    return response.data
  },

  /**
   * Perbarui profil admin
   * @param {Object} data - { nama_admin, email, kata_sandi }
   * @returns {Promise} response
   */
  updateProfile: async (data) => {
    const response = await api.put('/admin/profile', data)
    return response.data
  },
}

export default authService

