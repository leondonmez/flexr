// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// flexr.dev — static, zero-server, fully client-side layout laboratory.
export default defineConfig({
  site: 'https://flexr.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
