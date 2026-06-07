import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/municipal_dashboard/pro/',
  plugins: [react()],
})
