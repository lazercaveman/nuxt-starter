<template>
  <div class="flex justify-center items-center p-10 w-screen h-screen bg-gray-900">
    <div class="flex flex-col gap-12 items-center p-12 rounded-4xl glowUp">
      <NuxtStarter />
      <StarterButton class="transition-all hover:interactiveAnimation" />
    </div>
  </div>
</template>


<script setup>
  import NuxtStarter from '~/components/NuxtStarter.vue';
  import StarterButton from '~/components/StarterButton.vue';
</script>
