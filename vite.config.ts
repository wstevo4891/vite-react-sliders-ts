import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components/index'),
      '@contexts': path.resolve(__dirname, './src/contexts/index'),
      '@screens': path.resolve(__dirname, './src/screens/index'),
      '@services': path.resolve(__dirname, './src/services/index'),
      '@types': path.resolve(__dirname, './src/types.ts'),
    },
  },
})
