import { defineStore } from 'pinia';

export const useSampleStore = defineStore('sampleStore', {
  state: (): {
    searchParameter: string | number,
    pageContentData: any
  } => ({
    searchParameter: 'Hello from sample store!',
    pageContentData: [],
  }),
  getters: {
    getSearchParameter: state => state.searchParameter,
  },
  actions: {
    setSearchParameter (searchArgument: string | number) {
      this.searchParameter = searchArgument;
    },
  },
});
