<template>
  <nav class="flex gap-12">
    <NuxtLink
      :to="$route.name === 'demo' ? '/' : '/demo'"
      class="w-fit cursor-pointer rounded-sm bg-nuxt-green px-6 py-3 transition-all hover:scale-up-transition"
    >
      🧭 Route: {{ $route.name }}
    </NuxtLink>
    <button
      class="w-fit cursor-pointer rounded-sm bg-nuxt-green px-6 py-3 transition-all hover:scale-up-transition"
      @click="changeSampleStoreData(`🥳 So let's go - create some epic stuff that will change the world!`)"
    >
      🍍 Pinia State
    </button>
    <button
      class="w-fit cursor-pointer rounded-sm bg-nuxt-green px-6 py-3 transition-all hover:scale-up-transition"
      @click="callTestApi()"
    >
      ☎️ Call Api
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { useSampleStore } from '@/store/sample';

const Store = useSampleStore();

function changeSampleStoreData(testString: string) {
  Store.setSampleData(testString);
}

async function callTestApi() {
  await Store.callTestApi();
}
</script>
