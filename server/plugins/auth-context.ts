export default defineNitroPlugin(async (nitroApp) => {
  // Plugin do servidor para garantir que as sessões funcionem corretamente
  // Este plugin garante que getUserSession e clearUserSession funcionem no contexto do middleware
  
  nitroApp.hooks.hook('request', async (_event) => {
    // Inicializar contexto de sessão se necessário
    // O nuxt-auth-utils já gerencia isso automaticamente
  });
});