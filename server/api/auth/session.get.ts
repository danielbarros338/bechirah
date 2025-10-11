import { getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token') || '';
  const email = getCookie(event, 'auth_email') || '';

  if (!token) {
    return {
      user: null,
      loggedIn: false,
    };
  }

  return {
    user: {
      email,
      token,
    },
    loggedIn: true,
  };
});
