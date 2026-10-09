import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const vercelHosted = env.VERCEL === '1'

  return {
    plugins: [react()],
    base: vercelHosted ? '/' : '/MatthewLi-UW/',
    define: {
      'import.meta.env.VITE_VERCEL_HOSTED': JSON.stringify(vercelHosted),
    },
  }
})
