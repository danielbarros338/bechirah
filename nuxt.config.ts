// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/bechirah/'
  },
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000
  // },
  // nitro: {
  //   devProxy: {
  //     '/n8n/': {
  //       target: 'http://localhost:5678/',
  //       changeOrigin: true,
  //       prependPath: false,
  //     }
  //   }
  // },
  components: {
    global: true,
    dirs: ['~/app/components']
  },
  runtimeConfig: {
    // Variáveis privadas (apenas no servidor)
    // webhookSecret: process.env.WEBHOOK_SECRET,
    
    // Variáveis públicas (expostas ao cliente)
    public: {
      webhookBaseUrl: process.env.WEBHOOK_BASE_URL || 'http://localhost:5678/webhook',
      // n8nBase: '/n8n',
    }
  }
})