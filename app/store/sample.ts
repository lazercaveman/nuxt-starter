import { defineStore } from 'pinia';

export const useSampleStore = defineStore('sampleStore', {
  state: (): {
    sampleData: string,
    stateUpdatedAnimation: string,
    apiGreeting: string,
  } => ({
    sampleData: '🏗️ ESLint, 🧪 Vitest, 🐶 Husky, 💅 Tailwind CSS, 👩‍🎤 Sass, 🍍 Pinia, 🤌 TypeScript',
    stateUpdatedAnimation: '',
    apiGreeting: '',
  }),

  getters: {
    getSampleData: state => state.sampleData,
  },

  actions: {
    setSampleData (testString: string) {
      this.sampleData = testString;
      this.stateUpdatedAnimation = 'state-update-animation';
    },
    async callTestApi () {
      const { data: greeting } = await useAsyncData(async () => {
        return await $fetch(`/api/test`)
      })

      this.apiGreeting = greeting;
    }
  },
});
