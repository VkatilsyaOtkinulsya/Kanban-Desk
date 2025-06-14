import { useAuthStore } from '@/stores/auth.store';
import type { AuthToken } from '@/types/authTypes';

export function useCheckAuth() {
  const authStore = useAuthStore();

  function checkUser() {
    const tokens = JSON.parse(localStorage.getItem('userTokens') || '{}') as AuthToken;
    if (!tokens) return;

    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
    authStore.userInfo.expiresIn = tokens.expiresIn;
  }
  return { checkUser };
}
