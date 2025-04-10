<template>
  <div class="flex justify-center items-center p-10 w-screen h-screen thousand-generated-frames-animation">
    <div class="flex flex-col gap-12 items-center p-12 rounded-4xl drop-shadow-2xl bg-gray-900">
      <NuxtStarter />
      <StarterButton class="transition-all hover:scale-up-transition" />
    </div>
  </div>
</template>


<script setup>
  import NuxtStarter from '~/components/nuxt-starter/NuxtStarter.vue';
  import StarterButton from '~/components/start-button/StarterButton.vue';
</script>
