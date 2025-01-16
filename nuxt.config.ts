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

  modules: [
    '@pinia/nuxt', 
    '@nuxt/devtools', 
    "@nuxtjs/tailwindcss"
  ],

  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY
    }
  },

  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    plugins: [svgLoader()],
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
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-12-05',
});