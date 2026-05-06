import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  viteFinal: (config) => {
    const nuxtStubs = fileURLToPath(new URL('./nuxt-stubs', import.meta.url));

    return mergeConfig(config, {
      plugins: [
        vue(),
        AutoImport({
          // Replicate Nuxt's auto-imports: all Vue reactivity APIs + custom Nuxt stubs
          imports: ['vue', { [nuxtStubs]: ['$fetch', 'defineLazyHydrationComponent', 'useRuntimeConfig', 'useRoute'] }],
          include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
          dts: false,
        }),
        svgLoader(),
        tailwindcss(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../app', import.meta.url)),
          // Resolve Nuxt virtual modules to our stubs
          '#components': nuxtStubs,
          '#imports': nuxtStubs,
        },
      },
    });
  },

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest', '@storybook/addon-themes'],

  stories: ['../app/components/**/*.mdx', '../app/components/**/*.stories.ts'],

  core: { disableTelemetry: true },
};

export default config;
