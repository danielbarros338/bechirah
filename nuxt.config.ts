// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/bechirah/'
  },
  runtimeConfig: {
    // Variáveis privadas (apenas no servidor)
    // webhookSecret: process.env.WEBHOOK_SECRET,
    
    // Variáveis públicas (expostas ao cliente)
    public: {
      webhookBaseUrl: process.env.WEBHOOK_BASE_URL || 'http://localhost:5678/webhook'
    }
  }
})