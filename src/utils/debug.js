// This file provides debugging utilities to help troubleshoot application issues

/**
 * Global error handler to catch uncaught JavaScript errors
 * Prevents blank screens by logging errors to console
 */
export function setupGlobalErrorHandling() {
  const originalConsoleError = console.error;
  
  // Override console.error to get more detailed errors
  console.error = function(...args) {
    // Call original console.error first
    originalConsoleError.apply(console, args);
    
    // Log additional info for debugging
    const errorInfo = args.join(' ');
    document.body.insertAdjacentHTML(
      'beforeend', 
      `<div style="position: fixed; bottom: 10px; right: 10px; background: rgba(255,0,0,0.8); color: white; padding: 10px; border-radius: 4px; max-width: 80%; z-index: 9999; font-family: monospace; word-break: break-all;">
        Error: ${errorInfo.substring(0, 500)}...
      </div>`
    );
  };

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
  });

  // Catch general JS errors
  window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.message, 'at', event.filename, 'line', event.lineno);
  });
}

/**
 * Check if the app has mounted correctly
 * Prevents blank screens by detecting if Vue is not mounting properly
 */
export function checkAppMount() {
  // Wait a reasonable time for Vue to mount
  setTimeout(() => {
    const appEl = document.getElementById('app');
    if (appEl && (!appEl.childNodes || appEl.childNodes.length === 0)) {
      console.error('App failed to mount - Vue app is not rendering content');
      
      // Create a fallback UI to show the user something instead of a blank page
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2>Oops, something went wrong</h2>
          <p>The application is having trouble loading. This might be due to:</p>
          <ul style="text-align: left;">
            <li>A JavaScript error in the application</li>
            <li>Problems connecting to the API server</li>
            <li>CSRF protection issues</li>
          </ul>
          <p>Please try refreshing the page or check the console for errors.</p>
          <button onclick="location.reload()" style="padding: 10px 20px; background: #0099FF; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }, 5000); // Check after 5 seconds
}
