import { vi } from 'vitest';
import { config } from '@vue/test-utils';

config.global.components = {
  NuxtLink: {
    props: ['to'],
    template: '<a style="cursor:pointer;"><slot>NuxtLink</slot></a>',
  },
  ClientOnly: {
    template: '<slot />',
  },
};

vi.stubGlobal('scrollTo', vi.fn((x: number, y: number) => ({
  x,
  y,
})));
