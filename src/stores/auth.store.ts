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
      const userData = await AuthService.getUserData(localId, authData.idToken);

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: authData.idToken,
          refreshToken: authData.refreshToken,
          expiresIn: authData.expiresIn,
          userId: localId,
        })
      );

      localStorage.setItem(
        'userData',
        JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        })
      );

      userInfo.value = {
        token: authData.idToken,
        email: userData.email,
        refreshToken: authData.refreshToken,
        expiresIn: authData.expiresIn,
        userId: localId,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
    } catch (err) {
      throw err;
    }
  };

  const initAuth = () => {
    const tokens = localStorage.getItem('userTokens');
    const userData = localStorage.getItem('userData');

    if (tokens && userData) {
      const parsedTokens = JSON.parse(tokens);
      const parsedUserData = JSON.parse(userData);

      userInfo.value = {
        ...parsedTokens,
        ...parsedUserData,
      };
    }
  };

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      refreshToken: '',
      expiresIn: '',
      userId: '',
      firstName: '',
      lastName: '',
    };
  };

  return {
    userInfo,

    error,
    isLoading,
    register,
    login,
    logout,
    initAuth,
    clearError: () => (error.value = ''),
  };
});
