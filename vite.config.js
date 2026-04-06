import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 1. We add tailwindcss() to the plugins list
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})