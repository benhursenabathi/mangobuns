import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // For GitHub Pages deployment, set base to your repo name
  // e.g., base: '/switchy-landing-page/'
  // Or leave as '/' for custom domain
  base: '/',
})
