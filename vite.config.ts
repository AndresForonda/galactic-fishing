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
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        globPatterns: ['assets/**/*.{js,css}', '**/*.{html,ico,png,svg,avif}'],
      },
      manifest: {
        name: 'Galactic Fishing',
        short_name: 'GF',
        description: 'Reel in legendary fish and dominate the galaxy!',
        start_url: '/',
        display: 'standalone',
        display_override: ['standalone', 'browser'],
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }) as PluginOption,
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
})
