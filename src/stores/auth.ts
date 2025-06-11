import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import type { SignUpRequest, AuthResponse, UserInfo, AuthToken } from '@/types/auth.ts';
import { ref } from 'vue';

const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo>({
    token: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    userId: '',
  });

  const error = ref<string>('');
  const loader = ref<boolean>(false);

  const auth = async (
    payload: Omit<SignUpRequest, 'returnSecureToken'>,
    type: 'signin' | 'signup'
  ) => {
    const url = type === 'signup' ? 'signUp' : 'signInWithPassword';

    error.value = '';
    loader.value = true;

    try {
      const response = await axios.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${url}?key=${VITE_FIREBASE_API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userId: response.data.localId,
      };

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: response.data.expiresIn,
        } as AuthToken)
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.error?.message;

        switch (errorMessage) {
          case 'EMAIL_EXISTS':
            error.value = 'Пользователь с таким email уже существует';
            break;
          case 'OPERATION_NOT_ALLOWED':
            error.value = 'Этот метод входа отключен в настройках Firebase';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            error.value = 'Неверный email или пароль';
            break;
          case 'USER_DISABLED':
            error.value = 'Учетная запись пользователя отключена';
            break;
          default:
            error.value = `Ошибка: ${errorMessage}`;
            break;
        }
      } else {
        error.value = 'Произошла ошибка при выполнении запроса';
      }
      throw error.value;
    } finally {
      loader.value = false;
    }
  };
  return { auth, userInfo, error, loader };
});
