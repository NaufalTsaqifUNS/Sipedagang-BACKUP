import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const apiBaseURL = baseURL.replace('/api', ''); // Get base URL without /api

/**
 * Service to handle CSRF token management
 */
export const CsrfService = {  /**
   * Fetch CSRF token from Laravel's /sanctum/csrf-cookie endpoint
   * This route will set the XSRF-TOKEN cookie that we need
   */
  async getCsrfToken() {
    try {
      // Check if we already have a token
      const existingToken = this.getXsrfToken();
      if (existingToken) {
        console.log('CSRF token already exists, reusing it');
        return true;
      }
      
      // Hitting the endpoint will set the XSRF-TOKEN cookie automatically
      await axios.get(`${apiBaseURL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        // Add a timeout to prevent hanging
        timeout: 5000
      });
      
      console.log('CSRF cookie retrieved successfully');
      return true;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      // Don't fail the application if CSRF fetch fails
      return false;
    }
  },
    /**
   * Extract the XSRF-TOKEN value from cookies
   */  getXsrfToken() {
    const cookies = document.cookie.split(';');
    console.log('All cookies:', document.cookie);
    
    const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
    
    if (csrfCookie) {
      // The cookie value is URL encoded, so decode it
      const token = decodeURIComponent(csrfCookie.split('=')[1]);
      console.log('CSRF token found:', token.substring(0, 10) + '...');
      return token;
    }
    
    // If we're in development mode, create a fallback token for testing
    if (import.meta.env.DEV) {
      console.warn('XSRF-TOKEN cookie not found, creating fallback token');
      const fallbackToken = 'dev-fallback-csrf-' + Math.random().toString(36).substring(2);
      document.cookie = `XSRF-TOKEN=${encodeURIComponent(fallbackToken)}`;
      return fallbackToken;
    }
    
    console.warn('XSRF-TOKEN cookie not found');
    return null;
  }
};
