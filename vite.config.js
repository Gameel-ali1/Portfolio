// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Disable minification temporarily
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
})