<template>
  <nav class="flex gap-12">
    <NuxtLink
      :to="$route.name === 'demo' ? '/' : '/demo'"
      class="px-6 py-3 w-fit rounded-sm bg-nuxt-green cursor-pointer transition-all hover:scale-up-transition"
    >
      🧭 Route: {{ $route.name }}
    </NuxtLink>
    <button
      class="px-6 py-3 w-fit rounded-sm bg-nuxt-green cursor-pointer transition-all hover:scale-up-transition"
      @click="changeSampleStoreData(`🥳 So let's go - create some epic stuff that will change the world!`)"
    >
      🍍 Pinia State
    </button>
    <button
      class="px-6 py-3 w-fit rounded-sm bg-nuxt-green cursor-pointer transition-all hover:scale-up-transition"
      @click="callTestApi(`🥳 So let's go - create some epic stuff that will change the world!`)"
    >
      ☎️ Call Api
    </button>
  </nav>
</template>


<script setup>
import { useSampleStore } from '~/app/store/sample';

const Store = useSampleStore();

function changeSampleStoreData(testString) {
  Store.setSampleData(testString);
}

function callTestApi() {
  Store.callTestApi();
}
</script>
