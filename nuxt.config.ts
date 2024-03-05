// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    'nuxt-tiptap-editor',
    'nuxt-icon',
    '@nuxtjs/eslint-module',
  ],
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  },
  css: [
    '~/assets/css/main.scss',
  ],
})
