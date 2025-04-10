<template>
  <button
    class="px-6 py-3 w-fit rounded-sm bg-nuxt-green cursor-pointer"
    @click="changeSampleStoreData(`🥳 So let's go - create some epic stuff that will change the world!`)"
  >
    Klick me!
  </button>
</template>


<script setup>
import { useSampleStore } from '~/store/sample';

const Store = useSampleStore();

function changeSampleStoreData(testString) {
  Store.setSampleData(testString);
}
</script>
