export default defineNuxtRouteMiddleware(() => {
  // NOTE: Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.
  console.log('👋 hello from app middleware');
})
