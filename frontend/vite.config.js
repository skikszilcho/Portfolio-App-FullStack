/**
 * vite.config.js — Vite build tool configuration.
 *
 * WHAT TO CHANGE:
 *  - base: set to your deployment sub-path if not serving from root (e.g. '/my-app/').
 *  - server.proxy: maps API calls from the dev server to the backend, avoiding CORS.
 *    Update the target port to match your backend's PORT in .env.
 *  - plugins: add your framework plugin (see options below).
 *
 * FRAMEWORK PLUGINS (install + uncomment one):
 *  - React  : npm install @vitejs/plugin-react  → import react from '@vitejs/plugin-react'
 *  - Vue    : npm install @vitejs/plugin-vue    → import vue   from '@vitejs/plugin-vue'
 *  - Svelte : npm install @sveltejs/vite-plugin-svelte → import { svelte } from '@sveltejs/vite-plugin-svelte'
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import vue   from '@vitejs/plugin-vue';     // CHANGE: uncomment for Vue

export default defineConfig({
  // base: '/',  // CHANGE: set to sub-path if deploying to /my-app/ etc.

  plugins: [
    react(),
    // vue(),    // CHANGE: uncomment for Vue
  ],

  server: {
    port: 3000,               // CHANGE: frontend dev port (keep in sync with CLIENT_URL in backend .env)
    proxy: {
      // Proxy /api/* requests to the backend during development.
      // CHANGE: update target port to match your backend PORT.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',           // CHANGE: update if your host expects a different output folder
    sourcemap: false,         // CHANGE: set true for staging/debugging builds
  },
});
