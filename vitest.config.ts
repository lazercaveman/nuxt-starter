import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./app/**/*.test.ts', './server/**/*.test.ts', './shared/**/*.test.ts'],
  },
  resolve: {
    // Mirrors the Nuxt aliases, so tests can import the same paths as the app code.
    alias: {
      '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
});
