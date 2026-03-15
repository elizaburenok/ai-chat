import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/ai-simulator-animations/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@tokens': fileURLToPath(new URL('./tokens', import.meta.url)),
      '@components': fileURLToPath(new URL('./components', import.meta.url)),
      '@avatar-icons': fileURLToPath(new URL('./avatar-icons', import.meta.url)),
    },
  },
});
