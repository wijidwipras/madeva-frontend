import apiClient from './api';

const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data && response.data.data && response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
      return response.data.data;
    } else {
      throw new Error('Format respons login tidak sesuai.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login gagal.';
    throw new Error(errorMessage);
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const authService = {
  login,
  logout,
  isAuthenticated,
};