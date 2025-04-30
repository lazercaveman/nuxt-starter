// <reference types="vitest" />
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    include: [
      'app/components/**/*.test.ts',
      'app/tests/**/*.test.ts',
    ],
    setupFiles: ['app/tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '#imports': resolve(__dirname, './.nuxt/imports.d.ts'),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.mdx'],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern',
      },
      scss: {
        api: 'modern',
      },
    },
  },
});
