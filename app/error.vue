<template>
  😱 ERROR!
  <p>{{ error }}</p>
</template>

<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app';

const props = withDefaults(defineProps<{ error?: NuxtError }>(), {
  error: () => ({}) as NuxtError,
});

onMounted (() => {
  console.error(props.error)
})

</script>
