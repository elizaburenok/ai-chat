import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * GitHub Pages project URL is https://<user>.github.io/<repo>/ — asset paths must use `/<repo>/`.
 * In GitHub Actions, `GITHUB_REPOSITORY` is set to `owner/repo` so CI builds always match the repo name.
 * Override locally: `VITE_BASE=/my-repo/ npm run build`
 */
function viteBase(): string {
  const fromEnv = process.env.VITE_BASE?.trim();
  if (fromEnv) return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`;
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (repo) return `/${repo}/`;
  return '/ai-chat/';
}

export default defineConfig({
  base: viteBase(),
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
