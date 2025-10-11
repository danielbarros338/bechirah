export default defineNuxtRouteMiddleware(async (to) => {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth/login'];
  
  if (import.meta.server) {
    // VALIDAÇÃO COMPLETA NO SERVIDOR - antes de qualquer renderização
    const event = useRequestEvent();
    if (!event) {
      if (!publicRoutes.includes(to.path)) {
        return navigateTo('/auth/login', { replace: true });
      }
      return;
    }

    const [{ getCookie, deleteCookie }, { createHash }] = await Promise.all([
      import('h3'),
      import('crypto'),
    ]);

      const token = getCookie(event, 'auth_token');

    // Rota pública com usuário autenticado -> redirecionar para home
    if (publicRoutes.includes(to.path)) {
      if (token) {
        return navigateTo('/', { replace: true });
      }
      return;
    }

    // Rotas protegidas sem token -> redirecionar
    if (!token) {
      return navigateTo('/auth/login', { replace: true });
    }

    // Cache de validação de token para evitar chamadas redundantes
    const cacheHolder = globalThis as typeof globalThis & {
      __authValidationCache?: Map<string, number>;
    };
    const cache = (cacheHolder.__authValidationCache ??= new Map<string, number>());
    const cacheKey = createHash('sha256').update(token).digest('hex');
    const cached = cache.get(cacheKey);
    const now = Date.now();
    const VALIDATION_INTERVAL = 5 * 60 * 1000; // 5 minutos

    if (!cached || (now - cached) > VALIDATION_INTERVAL) {
      const config = useRuntimeConfig();

      try {
        const validation = await $fetch<{ isValid: boolean }>(`${config.public.webhookBaseUrl}/verify-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!validation.isValid) {
          deleteCookie(event, 'auth_token');
          deleteCookie(event, 'auth_email');
          cache.delete(cacheKey);
          return navigateTo('/auth/login', { replace: true });
        }

        cache.set(cacheKey, now);
      } catch {
        deleteCookie(event, 'auth_token');
        deleteCookie(event, 'auth_email');
        cache.delete(cacheKey);
        return navigateTo('/auth/login', { replace: true });
      }
    }

    return;
  } else {
    // VALIDAÇÃO NO CLIENTE - apenas para transições e estados
    const { useAuth } = await import('../composable/useAuth');
    const { useAuthLoading } = await import('../composable/useAuthLoading');
    
    const { loggedIn, validateToken, syncWithServerSession } = useAuth();
    const { startAuthValidation, finishAuthValidation } = useAuthLoading();
    
    try {
      // Sincronizar com o servidor primeiro (hidratação)
      if (!loggedIn.value) {
        await syncWithServerSession();
      }
      
      // Se a rota é pública
      if (publicRoutes.includes(to.path)) {
        if (loggedIn.value) {
          return navigateTo('/', { replace: true });
        }
        return;
      }
      
      // Para rotas protegidas
      startAuthValidation();
      
      // Verificação imediata do estado
      if (!loggedIn.value) {
        finishAuthValidation();
        return navigateTo('/auth/login', { replace: true });
      }

      // Validar token periodicamente (não a cada navegação)
      const lastValidation = sessionStorage.getItem('tokenValidatedAt');
      const now = Date.now();
      const VALIDATION_INTERVAL = 5 * 60 * 1000; // 5 minutos
      
      if (!lastValidation || (now - parseInt(lastValidation || '0')) > VALIDATION_INTERVAL) {
        const isValid = await validateToken();
        
        if (!isValid) {
          // Token inválido: fazer logout completo
          await $fetch('/api/auth/logout', { method: 'POST' });
          finishAuthValidation();
          return navigateTo('/auth/login', { replace: true });
        }
        
        // Atualizar timestamp da última validação
        sessionStorage.setItem('tokenValidatedAt', now.toString());
      }
      
      finishAuthValidation();
    } catch {
      finishAuthValidation();
      return navigateTo('/auth/login', { replace: true });
    }
  }
});
