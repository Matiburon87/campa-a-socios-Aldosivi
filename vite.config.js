import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
});
