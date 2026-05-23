import apiClient from './api/client'

export const authService = {
  async login({ kodeAuth, username, password, recaptchaToken }) {
    const { data } = await apiClient.post('/auth/login', {
      kodeAuth,
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
