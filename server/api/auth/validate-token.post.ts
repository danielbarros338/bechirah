import type { TokenValidateRequest, TokenValidateResponse } from '../../../app/types/token';

export default defineEventHandler(async (event): Promise<TokenValidateResponse> => {
  const body = await readBody(event) as TokenValidateRequest;
  
  if (!body.token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token é obrigatório'
    });
  }

  try {
    // Fazer a validação do token com a API externa
    const response = await $fetch(`${useRuntimeConfig().public.webhookBaseUrl}/verify-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${body.token}`,
      }
    });

    return response as TokenValidateResponse;
  } catch {
    // Se a validação falhar, retornar token inválido
    return { isValid: false };
  }
});