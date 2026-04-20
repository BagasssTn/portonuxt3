// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    public: {
      apiBase: 'http://localhost:8080'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-phosphor-icons',
    '@nuxt/fonts'
  ],
  colorMode: {
    classSuffix:''
  },
  fonts:{
    families: [
      {name: 'Yatra One', provider: 'google'}
    ]
  }
})