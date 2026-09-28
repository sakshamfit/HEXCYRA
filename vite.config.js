import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // shadcn/ui convention: "@" points at ./src
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // Allow the e2b live-preview proxy host (and any other host).
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
})
