import apiClient from './api/client'

export const authService = {
  async login({ username, password, recaptchaToken }) {
    const { data } = await apiClient.post('/auth/login', {
      username,
      password,
      recaptchaToken,
    })
    return data
  },

  async getMe() {
    const { data } = await apiClient.get('/auth/me')
    return data
  },
}
