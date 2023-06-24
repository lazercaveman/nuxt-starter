import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  plugins: [svgLoader()],
  test: {
    include: ['tests/*.test.ts'],
  },
});
