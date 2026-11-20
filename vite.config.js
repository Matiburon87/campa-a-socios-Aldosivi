import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load all vars (no VITE_ prefix filter) from .env, .env.local, etc.
  // These are only read here and are never exposed to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');

  // Machine-specific dev hosts (e.g. an ngrok tunnel), comma-separated.
  // Set DEV_ALLOWED_HOSTS in your shell or in a gitignored .env.local.
  const allowedHosts = (env.DEV_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  return {
    plugins: [react()],
    base: './',
    build: {
      rollupOptions: {
        output: {
          // React rarely changes: keep it in its own long-cacheable chunk.
          manualChunks: { react: ['react', 'react-dom'] },
        },
      },
    },
    server: {
      allowedHosts,
    },
  };
});
