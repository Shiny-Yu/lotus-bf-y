// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Served under /lotus-bf/ on the course server; build with VITE_BASE=/ for a root-hosted site (e.g. Render).
  base: process.env.VITE_BASE || '/lotus-bf/',

  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    allowedHosts: ['hpc.psy.ntu.edu.tw'],
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      '/terms': 'http://hpc.psy.ntu.edu.tw:5000',
      '/query': 'http://hpc.psy.ntu.edu.tw:5000',
      '/help': 'http://hpc.psy.ntu.edu.tw:5000',
    }
  }
})

