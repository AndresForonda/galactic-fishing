import { defineConfig, type PluginOption } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  server: {
    https: {
      key: './cert/localhost-key.pem',
      cert: './cert/localhost.pem',
    },
    host: true,
    port: 5173,
    open: true,
  },
  plugins: [
    preact(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest', // ⬅️ USAMOS injectManifest
      srcDir: 'src', // ⬅️ directorio donde pondremos el nuevo sw.ts
      filename: 'sw.ts', // ⬅️ el nombre del Service Worker
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Qué pre-cachear
      },
      manifest: {
        name: 'Galactic Fishing',
        short_name: 'GF',
        description: 'Reel in legendary fish and dominate the galaxy!',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
})
