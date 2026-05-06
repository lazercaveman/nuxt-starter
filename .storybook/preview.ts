import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { NuxtLink, useRoute } from './nuxt-stubs';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../app/assets/style/tailwind.css';
import '../app/assets/style/animations.scss';
import './storybook-custom.css';

// Global Vue app setup — runs once before any story is rendered
setup((app) => {
  app.use(createPinia());
  app.component('NuxtLink', NuxtLink);
  // Provide $route as a template global so components using $route.name etc. don't throw.
  app.config.globalProperties.$route = useRoute();
});

// Device resolutions can be found here: https://www.webmobilefirst.com/en/devices/
// Related statistics can be found here: https://gs.statcounter.com/screen-resolution-stats/all/germany
const viewportOptions = {
  iPhone16: {
    name: 'iPhone 16',
    styles: {
      width: '393px',
      height: '852px',
    },
  },
  sm: {
    name: 'Small',
    styles: {
      width: '480px',
      height: '900px',
    },
  },
  md: {
    name: 'Medium',
    styles: {
      width: '768px',
      height: '900px',
    },
  },
  lg: {
    name: 'Large',
    styles: {
      width: '1024px',
      height: '900px',
    },
  },
  iPadAir: {
    name: 'iPadAir',
    styles: {
      width: '1180px',
      height: '820px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1344px',
      height: '960px',
    },
  },
  macbookPro: {
    name: 'macbookPro',
    styles: {
      width: '1728px',
      height: '1117px',
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    viewport: { viewports: viewportOptions },
    chromatic: { viewports: [480, 1344], globals: { theme: 'dark' } },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Intro', 'Default', '*', ['*', 'README']],
        locales: 'en-US',
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
