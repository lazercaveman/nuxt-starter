import { computed, defineAsyncComponent, defineComponent, h } from 'vue';
import type { Component } from 'vue';

// Drop-in for <NuxtLink>. Renders a plain <a> tag so link-based components work in Storybook without needing a Vue Router instance.
export const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    to: {
      type: [String, Object],
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      default: undefined,
    },
    rel: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const resolvedHref = computed(() => (typeof props.to === 'string' ? props.to : props.href) ?? '#');

    return () =>
      h(
        'a',
        {
          href: resolvedHref.value,
          target: props.target,
          rel: props.rel,
          ...attrs,
        },
        slots.default?.(),
      );
  },
});

// Drop-in for Nuxt's `defineLazyHydrationComponent`. In Storybook there is no SSR hydration, so we just use defineAsyncComponent.
export function defineLazyHydrationComponent<T extends Component>(_strategy: string, loader: () => Promise<{ default: T }>) {
  return defineAsyncComponent(loader);
}

// Drop-in for Nuxt's `useRuntimeConfig`. Returns the minimal shape components rely on.
export function useRuntimeConfig() {
  return { public: {} as Record<string, unknown> };
}

// Drop-in for Nuxt's $fetch global. Delegates to the native fetch API so components that call $fetch work in Storybook without a Nitro server.
export async function $fetch<T = unknown>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`$fetch: ${res.status} ${res.statusText} — ${url}`);
  return res.json() as Promise<T>;
}

// Drop-in for Vue Router's `useRoute`. Returns a static route object — enough for components that read the current path without needing real navigation.
export function useRoute() {
  return {
    path: '/',
    name: undefined,
    params: {} as Record<string, string>,
    query: {} as Record<string, string>,
    hash: '',
    matched: [],
    meta: {},
    fullPath: '/',
  };
}
