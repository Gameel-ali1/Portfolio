// Configuration file for environment variables
const config = {
  // API URL - use environment variable or fallback to localhost for development
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Other configuration variables can be added here
  APP_NAME: 'Portfolio',
  VERSION: '1.0.0'
};

export default config; 