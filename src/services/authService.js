import api from './api';
import { CsrfService } from './csrfService';

export const AuthService = {
  async login(credentials) {
    // First get CSRF token from Laravel
    await CsrfService.getCsrfToken();
    
    // Then proceed with login request
    return api.post('/login', credentials);
  },
  
  logout() {
    return api.post('/logout');
  },
  
  getUser() {
    return api.get('/user');
  },

  resetPassword(email) {
    return api.post('/password/reset', { email });
  },

  changePassword(data) {
    return api.post('/password/change', data);
  },

  // Token management
  setToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};

export default AuthService;
