import { URL, fileURLToPath } from 'url';
import svgLoader from 'vite-svg-loader';
import tailwindcss from "@tailwindcss/vite";

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
  ],

  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY
    }
  },

  css: [
    '~/assets/style/tailwind.css',
    '~/assets/style/main.scss',
  ],

  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    plugins: [
      svgLoader(),
      tailwindcss(),
    ],
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
