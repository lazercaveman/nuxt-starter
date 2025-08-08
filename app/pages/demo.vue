<template>
  <div class="flex justify-center items-center p-10 w-screen h-screen thousand-generated-frames-animation">
    <div class="flex flex-col gap-12 items-center p-12 rounded-4xl drop-shadow-2xl bg-gray-900">
      <NuxtStarter />
      <StarterButton />
      <p class="hidden">
        This is a secret env - it won't get exposed to the client: {{ config.apiSecret }}
      </p>
      <p class="hidden">
        And this is a public variable - it can be found within the DOM: {{ config.public.apiBase }}
      </p>
    </div>
  </div>
</template>


<script setup>
  import NuxtStarter from '@/app/components/nuxt-starter/NuxtStarter.vue';
  import StarterButton from '@/app/components/start-button/StarterButton.vue';

  const config = useRuntimeConfig()
</script>
