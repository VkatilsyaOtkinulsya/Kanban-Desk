import { useAuth } from '@/composables/useAuth';
import { AuthService } from '@/services/auth.service';
import type { SignInRequest, SignUpRequest, UserInfo } from '@/types/authTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo>({
    token: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    userId: '',
    firstName: '',
    lastName: '',
  });
  const { error, isLoading, signUp, signIn } = useAuth();

  const register = async (payload: SignUpRequest) => {
    try {
      const { localId, idToken, refreshToken, expiresIn, email } = await signUp(payload);
      const userData = await AuthService.getUserData(localId, idToken);

      userInfo.value = {
        token: idToken,
        email,
        refreshToken,
        expiresIn,
        userId: localId,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: idToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn,
        })
      );
    } catch (err) {
      throw err;
    }
  };

  const login = async (payload: SignInRequest) => {
    try {
      const { localId, ...authData } = await signIn(payload);

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: authData.idToken,
          refreshToken: authData.refreshToken,
          expiresIn: authData.expiresIn,
        })
      );

      const userData = await AuthService.getUserData(localId, authData.idToken);

      userInfo.value = {
        ...authData,
        userId: localId,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
    } catch (err) {
      throw err;
    }
  };

  return {
    userInfo,
    error,
    isLoading,
    register,
    login,
    clearError: () => (error.value = ''),
  };
});
