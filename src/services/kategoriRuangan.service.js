import apiClient from './api/client'

export const kategoriRuanganService = {
  async getAll({ page = 1, perPage = 10, search = '' } = {}) {
    const params = new URLSearchParams()
    params.append('page', page)
    params.append('perPage', perPage)
    if (search) params.append('search', search)
    const { data } = await apiClient.get(`/kategori-ruangan?${params.toString()}`)
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/kategori-ruangan/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/kategori-ruangan', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/kategori-ruangan/${id}`, payload)
    return data
  },

  async getKelasRuangan() {
    const { data } = await apiClient.get('/kategori-ruangan/kelas-ruangan')
    return data
  },

  async toggleStatus(id) {
    const { data } = await apiClient.patch(`/kategori-ruangan/${id}/status`)
    return data
  },
}
