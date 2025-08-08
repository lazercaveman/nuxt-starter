// ~/app/store/sample.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useSampleStore = defineStore('sampleStore', () => {
  const sampleData = ref<string>('🏗️ ESLint, 🧪 Vitest, 🐶 Husky, 💅 Tailwind CSS, 👩‍🎤 Sass, 🍍 Pinia, 🤌 TypeScript')
  const stateUpdatedAnimation = ref<string>('')
  const apiGreeting = ref<string>('')

  const getSampleData = computed(() => sampleData.value)

  function setSampleData(testString: string) {
    sampleData.value = testString
    stateUpdatedAnimation.value = 'state-update-animation'
  }

  async function callTestApi() {
    try {
      const data = await $fetch<string>('/api/test')

      console.log('😅', data)

      apiGreeting.value = data ?? ''
    } catch (err: unknown) {
      if (err instanceof Error) {
        apiGreeting.value = err.message
      } else {
        apiGreeting.value = String(err)
      }
    }
  }

  return {
    sampleData,
    stateUpdatedAnimation,
    apiGreeting,
    getSampleData,
    setSampleData,
    callTestApi,
  }
})
