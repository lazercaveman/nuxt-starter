// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';


export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    include: [
      './app/components/**/*.test.ts',
      './app/testing/**/*.test.ts',
    ],
    setupFiles: ['./app/testing/setup.ts'],
  },
  plugins: [
    vue(),
    svgLoader(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./app', import.meta.url)) } },
  assetsInclude: ['**/*.mdx'],
  css: {},
});
