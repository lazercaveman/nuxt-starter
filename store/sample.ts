import { defineStore } from 'pinia';

export const useSampleStore = defineStore('sampleStore', {
  state: (): {
    sampleData: string,
  } => ({
    sampleData: '🍍 Hello from sample store.',
  }),
  getters: {
    getSampleData: state => state.sampleData,
  },
  actions: {
    setSampleData (testString: string) {
      this.sampleData = testString;
    },
  },
});
