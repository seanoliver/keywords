import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import eslint from "vite-plugin-eslint";
import { fileURLToPath } from "url";
import path from "path";
import { resolve } from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Docs: https://vite.dev/config/
// Initial Setup: https://medium.com/@5tigerjelly/creating-a-chrome-extension-with-react-and-vite-boilerplate-provided-db3d14473bf6
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: '[name]/index.js',
      },
    },
  },
});
