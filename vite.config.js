import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'manifest.json', dest: '.' },]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        panel: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.js'),
      },
      output: {
        entryFileNames: chunk => {
          // This outputs background.js directly in dist/
          return chunk.name === 'background' ? 'background.js' : 'assets/[name].js'
        }
      }
    }
  }
})