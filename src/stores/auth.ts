import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import type { SignUpRequest, AuthResponse, UserInfo, FirebaseErrorResponse } from '@/types/auth.ts';
import { ref } from 'vue';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo>({
    token: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    userId: '',
  });

  const error = ref<string>('');

  const signup = async (payload: Omit<SignUpRequest, 'returnSecureToken'>) => {
    error.value = '';
    try {
      const { data } = await axios.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
        token: data.idToken,
        email: data.email,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        userId: data.localId,
      };
    } catch (err) {
      const axiosError = err as AxiosError<FirebaseErrorResponse>;

      if (!axiosError.response) {
        error.value = 'Network error occurred';
        return;
      }

      const firebaseError = axiosError.response.data.error;

      switch (firebaseError.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Пользователь с таким email уже существует';
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Этот метод входа отключен в настройках Firebase';
          break;
        default:
          error.value = 'Слишком много запросов. Попробуйте позже';
          break;
      }
    }
  };
  return { signup, userInfo, error };
});
