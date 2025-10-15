import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Uključi devtools samo u DEV okruženju
const isProd = process.env.NODE_ENV === 'production'
let vueDevTools
try {
  vueDevTools = isProd ? null : (await import('vite-plugin-vue-devtools')).default
} catch {
  vueDevTools = null
}

export default defineConfig({
  plugins: [
    vue(),
    // samo u dev-u; filter(Boolean) uklanja null/false
    !isProd && vueDevTools && vueDevTools()
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // (opciono) čistiji production build
  build: {
    sourcemap: false,
    target: 'es2020',
    outDir: 'dist'
  },

  // (opciono) isključi prod devtools flag u Vue
  define: {
    __VUE_PROD_DEVTOOLS__: false
 
::contentReference[oaicite:0]{index=0}
