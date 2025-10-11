import type { LoginRequest } from '../types/login';
import useGetValidateToken from './useGetValidateToken';

export const useAuth = () => {
  const user = useState<{ email: string; token: string } | null>('user', () => null);
  const loggedIn = computed(() => !!user.value);

  // Inicializar sessão do localStorage
  const initSession = () => {
    if (import.meta.client) {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (token && email) {
        user.value = { email, token };
      } else {
        // Se não há token ou email, garantir que o estado está limpo
        user.value = null;
      }
    }
  };

  // Validar token atual
  const validateToken = async () => {
    if (!user.value?.token) return false;
    
    try {
      const result = await useGetValidateToken({ token: user.value.token });
      return result.isValid;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    const body: LoginRequest = { email, password };
    
    try {
      // Fazer login através da API do servidor (que cria a sessão)
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body
      });

      // Buscar os dados da sessão criada
      await syncWithServerSession();

      return response;
    } catch (error) {
      user.value = null;
      if (import.meta.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Limpar sessão do servidor
      await $fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignorar erros de logout do servidor
    }
    
    // Limpar estado local
    user.value = null;
    
    if (import.meta.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
    
    await navigateTo('/auth/login');
  };

  // Sincronizar com sessão do servidor
  const syncWithServerSession = async () => {
    if (import.meta.client) {
      try {
        const session = await $fetch('/api/auth/session') as {
          user: { email: string; token: string } | null;
          loggedIn: boolean;
        };
        
        if (session?.loggedIn && session?.user) {
          user.value = session.user;
          // Sincronizar com localStorage se necessário
          if (session.user.token && session.user.email) {
            localStorage.setItem('token', session.user.token);
            localStorage.setItem('email', session.user.email);
          }
        } else {
          user.value = null;
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }
      } catch {
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    }
  };

  // Inicializar ao criar o composable
  if (import.meta.client && !user.value) {
    initSession();
  }

  return {
    user: readonly(user),
    loggedIn,
    login,
    logout,
    validateToken,
    initSession,
    syncWithServerSession,
  };
};
