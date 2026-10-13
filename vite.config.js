import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const vercelHosted = env.VERCEL === '1'
  const vercelDomain = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL
  const siteUrl = env.VITE_SITE_URL || (
    vercelHosted && vercelDomain
      ? `https://${vercelDomain}/`
      : 'https://matthewli-uw.github.io/MatthewLi-UW/'
  )
  const previewImageUrl = new URL(
    'images/observatory/observatory-handpainted-v1.png',
    `${siteUrl.replace(/\/$/, '')}/`,
  ).href

  return {
    plugins: [react(), {
      name: 'social-preview-metadata',
      transformIndexHtml(html) {
        return html.replaceAll('__SOCIAL_PREVIEW_IMAGE_URL__', previewImageUrl)
      },
    }],
    base: vercelHosted ? '/' : '/MatthewLi-UW/',
    define: {
      'import.meta.env.VITE_VERCEL_HOSTED': JSON.stringify(vercelHosted),
    },
  }
})
