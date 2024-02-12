import { fileURLToPath, URL } from 'url';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL,
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

  css: [
    '~/assets/styles/css/tailwind.css',
    '~/assets/styles/scss/main.scss',
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],

  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    plugins: [svgLoader()],
    assetsInclude: ['**/*.mdx'],
  },
});
