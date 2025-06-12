import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import type { SignUpRequest, AuthResponse, UserInfo, AuthToken, UserData } from '@/types/auth.ts';
import { ref } from 'vue';
import { handleApiError } from '@/utils/error-handler';

const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

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

  const error = ref<string>('');
  const loader = ref<boolean>(false);

  async function getUserData(userId: string) {
    try {
      const token = userInfo.value.token;
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.get(`${DATABASE_URL}/users/${userId}.json`, {
        params: {
          auth: token,
        },
      });
      return response.data;
    } catch (err) {
      handleApiError(err, {
        context: 'Error getting user data:',
      });
    }
  }

  async function saveUserData(userId: string, userData: UserData) {
    try {
      await axios.put(`${DATABASE_URL}/users/${userId}.json`, userData, {
        params: {
          auth: userInfo.value.token,
        },
      });
    } catch (err) {
      handleApiError(err, {
        context: 'Error saving user data:',
      });
    }
  }

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
        }
      );

      const userId = response.data.localId;

      if (type === 'signup' && response) {
        await saveUserData(userId, {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        });
      }

      const userData = await getUserData(userId);

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        userId: userId,
        firstName: userData?.firstName || payload.firstName || '',
        lastName: userData?.lastName || payload.lastName || '',
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
