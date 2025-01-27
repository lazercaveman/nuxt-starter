<template>
  <div class=" flex flex-col gap-3 p-10">
    <h1 class="scss-style-option text-3xl font-bold">
      Nuxt 3 starter
    </h1>
    <p>
      {{ Store.sampleData }}
    </p>
    <button
      class="px-3 py-2 w-fit bg-gray-800 text-white"
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
  //
  // Also it looks like Tailwind 4 seems having issues with usage of @apply in general:
  // https://github.com/tailwindlabs/tailwindcss/discussions/13336#discussioncomment-8921057
  //
  // Anyways using SASS is an option for things like animations or other things that are not solvable convenient using Tailwind.
  */
  content: '👋 Sass @';
}

</style>
