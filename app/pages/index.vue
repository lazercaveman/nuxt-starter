<template>
  <div class="flex justify-center items-center p-10 w-screen h-screen thousand-generated-frames-animation">
    <div class="flex flex-col gap-12 items-center p-12 rounded-4xl drop-shadow-2xl bg-gray-900">
      <!-- // TODO: instead of having a single module add the content of the readme.md and extend it by adding interactive components that do stuff, to explain what is happening and why.  -->
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
  // NOTE: now that Nuxt 4 uses an app directory import routes for Nitro need to be configured specifically, in the current configuration one should use '~' to refer to the server directory, and '@' to refer to the app directory.
  import NuxtStarter from '@/app/components/nuxt-starter/NuxtStarter.vue';
  import StarterButton from '@/app/components/start-button/StarterButton.vue';

  definePageMeta({
    middleware: ['demo'],
  });

  const config = useRuntimeConfig()
</script>
