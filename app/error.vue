<template>
  😱 ERROR!
  <p>{{ error }}</p>
</template>

<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app';

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({} as NuxtError),
  },
});

onMounted (() => {
  console.error(props.error)
})

</script>
