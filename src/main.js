import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { CsrfService } from './services/csrfService'
import { setupGlobalErrorHandling, checkAppMount } from './utils/debug'

// Setup error handling early to catch initialization errors
setupGlobalErrorHandling()

// Create a wrapped version of the app creation that catches errors
function initializeApp() {
  try {
    // Initialize the app
    const app = createApp(App)
    const pinia = createPinia()
    
    // Add global error handler
    app.config.errorHandler = (err, vm, info) => {
      console.error('Vue Error:', err, info)
    }
    
    app.use(pinia)
    app.use(router)
    app.mount('#app')
      // Initialize CSRF token - try to get it when app starts, but don't block rendering
    setTimeout(async () => {
      try {
        const token = await CsrfService.getCsrfToken();
        if (token) {
          console.log('Initial CSRF token fetched successfully');
        } else {
          console.warn('Failed to fetch initial CSRF token');
          // Try fallback endpoint
          await axios.get(`${import.meta.env.VITE_API_URL.replace('/api', '')}/csrf-cookie`, {
            withCredentials: true
          });
          console.log('Tried fallback CSRF endpoint');
        }
      } catch (err) {
        console.warn('Failed to fetch initial CSRF token:', err);
      }
    }, 100)
    
    console.log('App initialized successfully')
    return app
  } catch (error) {
    console.error('Failed to initialize app:', error)
    // Show a basic error message to prevent completely blank page
    document.body.innerHTML = `<div style="padding: 20px; text-align: center;">
      <h2>Application Error</h2>
      <p>There was a problem initializing the application.</p>
      <p>Error: ${error.message}</p>
      <button onclick="location.reload()">Reload</button>
    </div>`
    throw error
  }
}

// Start the application
const app = initializeApp()

// Check if app mounted successfully after a delay
checkAppMount()
