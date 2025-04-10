import { defineStore } from 'pinia';

export const useSampleStore = defineStore('sampleStore', {
  state: (): {
    sampleData: string,
    stateUpdatedAnimation: string,
  } => ({
    sampleData: '🏗️ ESLint, 🧪 Vitest, 🐶 Husky, 💅 Tailwind CSS, 👩‍🎤 Sass, 🍍 Pinia, 🤌 TypeScript',
    stateUpdatedAnimation: '',
  }),

  getters: {
    getSampleData: state => state.sampleData,
  },

  actions: {
    setSampleData (testString: string) {
      this.sampleData = testString;
      this.stateUpdatedAnimation = 'state-update-animation';
    },
  },
});
