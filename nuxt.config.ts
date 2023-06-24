import { fileURLToPath, URL } from 'url';
import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 3 starter',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    plugins: [svgLoader()],
    test: {
      include: ['tests/*.test.ts'],
    },
  },
  css: [
    '~/assets/styles/css/tailwind.css',
    '~/assets/styles/scss/main.scss',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
