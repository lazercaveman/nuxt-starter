import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import NuxtStarter from '~/components/nuxt-starter/NuxtStarter.vue';


describe('NuxtStarter unit test', () => {
  it('renders with required properties', () => {
    const wrapper = mount(NuxtStarter, {
      props: {},
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.exists()).toBe(true)
  });
});
