<template>
  <div class="thousand-generated-frames-animation flex h-screen w-screen items-center justify-center p-10">
    <div class="flex flex-col items-center gap-12 rounded-4xl bg-gray-900 p-12 drop-shadow-2xl">
      <NuxtStarter />
      <StarterButton />
      <p class="hidden">This is a secret env - it won't get exposed to the client: {{ config.apiSecret }}</p>
      <p class="hidden">And this is a public variable - it can be found within the DOM: {{ config.public.apiBase }}</p>
    </div>
  </div>
</template>

<script setup>
import NuxtStarter from '@/components/nuxt-starter/NuxtStarter.vue';
import StarterButton from '@/components/start-button/StarterButton.vue';

const config = useRuntimeConfig();
</script>
