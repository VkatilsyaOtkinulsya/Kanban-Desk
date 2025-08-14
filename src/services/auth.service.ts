import type {
  AuthResponse,
  AuthRequest,
  UserData,
  SignUpRequest,
  SignInRequest,
} from '@/types/authTypes';
import { handleApiError } from '@/lib/utils/error-handler';
import axiosApiInstance from '@/api/api';
import type { User } from '@/types/user.types';

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export const AuthService = {
  async saveUserData(userId: string, userData: UserData, token: string) {
    try {
      await axiosApiInstance.put(`${DATABASE_URL}/users/${userId}.json`, userData, {
        params: {
          auth: token,
        },
      });
    } catch (err) {
      handleApiError(err, { context: 'Save User Data Error' });
      throw err;
    }
  },

  async getUserData(userId: string, token: string): Promise<User | null> {
    try {
      const response = await axiosApiInstance.get<User[]>(`${DATABASE_URL}/users.json`, {
        params: {
          auth: token,
        },
      });
      console.log(response.data);

      const users = response.data;
      const userData = Object.values(users).find((user: User) => user.id === userId) || null;
      console.log(`${userId} равен id usera:`, userData);
      return userData;
    } catch (err) {
      handleApiError(err, { context: 'Get User Data Error' });
      throw err;
    }
  },

  async signUp(payload: SignUpRequest): Promise<AuthResponse> {
    return this._authRequest(
      {
        ...payload,
      },
      'signUp'
    );
  },

  async signIn(payload: SignInRequest): Promise<AuthResponse> {
    return this._authRequest(
      {
        ...payload,
      },
      'signInWithPassword'
    );
  },

  async _authRequest(
    payload: AuthRequest,
    endpoint: 'signUp' | 'signInWithPassword'
  ): Promise<AuthResponse> {
    try {
      const response = await axiosApiInstance.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${FIREBASE_API_KEY}`,
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
      return response.data;
    } catch (err) {
      handleApiError(err, {
        context: 'Auth Error:',
        silent: true,
      });
      throw err;
    }
  },
};
