import { URL, fileURLToPath } from 'url';
import svgLoader from 'vite-svg-loader';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL,
    head: {
      title: 'Nuxt 4 starter',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  // NOTE: this allows the usage of Nuxt v4:
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],

  css: [
    '~/app/assets/style/animations.scss',
    '~/app/assets/style/tailwind.css',
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
        // Use sass
        sass: {
          api: 'modern',
        },
        // Or use scss
        scss: {
          api: 'modern',
        },
      },
    },
  },

	devtools: {
		enabled: true,
	},

  runtimeConfig: {
    // NOTE: runtime-config is for demo purposes - more information about how to handle these can be found within the nuxt docs of course: https://nuxt.com/docs/guide/going-further/runtime-config#example - also pay attention to the naming conventions to take fully profit.
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },

  compatibilityDate: '2024-12-05',
});
