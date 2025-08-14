import { AuthService } from '@/services/auth.service';
import { type SignInRequest, type SignUpRequest } from '@/types/auth.types';
import { ref } from 'vue';

export const useAuth = () => {
  const error = ref<string>('');
  const isLoading = ref<boolean>(false);

  const signUp = async (payload: SignUpRequest) => {
    error.value = '';
    isLoading.value = true;

    try {
      const authResponse = await AuthService.signUp(payload);
      await AuthService.saveUserData(
        authResponse.localId,
        {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        },
        authResponse.idToken
      );
      return authResponse;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = async (payload: SignInRequest) => {
    error.value = '';
    isLoading.value = true;

    try {
      return await AuthService.signIn(payload);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    error,
    isLoading,
    signUp,
    signIn,
  };
};
