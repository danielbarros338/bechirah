export default defineNuxtPlugin({
  name: 'auth-sync',
  async setup() {
    // Plugin de sincronização executado apenas no cliente após hydratação
    if (import.meta.client) {
      const { useAuth } = await import('../composable/useAuth');
      const { syncWithServerSession } = useAuth();
      
      // Aguardar próximo tick para garantir que a hidratação completou
      await nextTick();
      
      // Sincronizar estado do cliente com sessão do servidor
      try {
        await syncWithServerSession();
      } catch {
        // Se falhar a sincronização, deixar o middleware lidar com isso
      }
    }
  }
});