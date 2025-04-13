import path from 'path';
import PluginVue from '@vitejs/plugin-vue';

export default {
  stories: [
    '../stories/**/*.mdx',
    '../components/**/**/*.mdx',
    '../components/**/**/*.stories.@(js|jsx|ts|tsx|vue)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/vue3-vite',
  },

  async viteFinal(config) {
    config.base = '/';
    config.plugins = config.plugins ?? [];
    config.plugins.push(PluginVue());
    config.css = {
      modules: {
        localsConvention: 'camelCase',
      },
    };

    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          '~': path.resolve(__dirname, '../'),
          '#app': path.resolve(__dirname, '../app'),
          '#imports': path.resolve(__dirname, '../.nuxt/imports.d.ts'),
        },
      },
    };
  },

  docs: {
    autodocs: true
  },
};
