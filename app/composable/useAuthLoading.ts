export const useAuthLoading = () => {
  const isAuthenticating = useState('isAuthenticating', () => false);
  
  const startAuthValidation = () => {
    isAuthenticating.value = true;
  };
  
  const finishAuthValidation = () => {
    isAuthenticating.value = false;
  };
  
  return {
    isAuthenticating: readonly(isAuthenticating),
    startAuthValidation,
    finishAuthValidation
  };
};