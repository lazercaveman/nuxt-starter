<template>
  <div class="flex flex-col gap-3 p-10 fadeIn">
    <h1 class="scss-style-option text-3xl font-bold">
      Nuxt 3 starter
    </h1>
    <p>
      {{ Store.sampleData }}
    </p>
    <button
      class="px-3 py-2 w-fit bg-custom-900 text-white cursor-pointer"
      @click="changeSampleStoreData('🥳 State has changed!')"
    >
      Change state
    </button>
  </div>
</template>


<script setup>
  import { useSampleStore } from '~/store/sample';

  const Store = useSampleStore();

  function changeSampleStoreData(testString) {
    Store.setSampleData(testString);
  }
</script>


<style lang="scss" scoped>

.scss-style-option:before {
  /*
  // Tailwind 4 should not be used with SASS, therefor SASS definitions should not use @apply:
  // https://tailwindcss.com/docs/compatibility#sass-less-and-stylus
  // SCSS can be use full to create complex animations (or often also instead of tailwind)
  */
  content: '👋 Sass @';
}

</style>
