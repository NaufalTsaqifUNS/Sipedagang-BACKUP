import axios from 'axios';
import router from '../router';
import { CsrfService } from './csrfService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Penting untuk autentikasi berbasis cookie dan CSRF
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to add authorization token and CSRF token
api.interceptors.request.use(
  config => {
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem('token');
      
      // If auth token exists, add it to the request headers
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Get CSRF token from cookies
      const xsrfToken = CsrfService.getXsrfToken();
      if (xsrfToken) {
        // Laravel expects the CSRF token in X-XSRF-TOKEN header
        config.headers['X-XSRF-TOKEN'] = xsrfToken;
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
      // Don't block the request if there's an error in the interceptor
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk menangani error
api.interceptors.response.use(
  response => {
    // Log successful requests for debugging
    console.log(`API Success [${response.config.method.toUpperCase()}] ${response.config.url}:`, response.status);
    return response;
  },
  error => {
    // Log detailed error information for debugging
    console.error('API Error:', error);
    
    if (error.response) {
      console.error(`API Error [${error.config?.method?.toUpperCase()}] ${error.config?.url}: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('API Request Error (No Response):', error.request);
      console.error('Request URL:', error.config?.url);
      console.error('Request Method:', error.config?.method);
    } else {
      console.error('API Error Setup:', error.message);
    }
    
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (optional)
      console.log('Unauthorized, redirecting to login');
      // Clear token if it exists
      localStorage.removeItem('token');
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default api;