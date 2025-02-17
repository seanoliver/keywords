import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath } from 'url'
import path from 'path'
import { resolve } from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/index.tsx'),
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name]/index.js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        extend: true,
        inlineDynamicImports: false,
      },
      external: ['chrome']
    },
  },
})
