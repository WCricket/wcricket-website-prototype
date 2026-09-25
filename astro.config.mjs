import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  publicDir: './assets',
  outDir: './dist',
  build: { format: 'file' }
});
