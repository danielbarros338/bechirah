import { setCookie } from 'h3';
import useGetLogin from '../../../app/composable/useGetLogin';
import useGetValidateToken from '../../../app/composable/useGetValidateToken';
import type { LoginRequest } from '../../../app/types/login';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginRequest>(event);

  try {
    // Fazer login na API externa
    const response = await useGetLogin(body);

    // Validar o token recebido
    const validation = await useGetValidateToken({ token: response.token });

    if (!validation.isValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token inválido',
      });
    }

    const isProduction = process.env.NODE_ENV === 'production';

    // Persistir autenticação via cookies para ser acessível no SSR
    setCookie(event, 'auth_token', response.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    // Email não precisa ser httpOnly pois é apenas informativo
    setCookie(event, 'auth_email', body.email, {
      httpOnly: false,
      sameSite: 'lax',
      secure: isProduction,
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      message: 'Login realizado com sucesso',
    };
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas',
    });
  }
});
