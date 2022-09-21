<template>
  <div class="flex flex-col gap-3 p-10">
    <h1 class="text-3xl font-bold">
      👋 Hello Nuxt 3 starter
    </h1>
    <p>
      {{Store.sampleData}}
    </p>
    <button
      @click="changeSampleStoreData('✅ Hello from changed store!')"
      class="px-3 py-2 w-fit bg-gray-800 text-white"
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
