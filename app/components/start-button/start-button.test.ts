import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import StarterButton from './StarterButton.vue';


describe('StartButton unit test', () => {
  it('renders with required properties', () => {
    const wrapper = mount(StarterButton, {
      props: {},
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.exists()).toBe(true)
  });
});
