import { deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'auth_token');
  deleteCookie(event, 'auth_email');
  
  return {
    success: true,
    message: 'Logout realizado com sucesso',
  };
});
