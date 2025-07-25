import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import router from '@/router';

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

axios.interceptors.request.use((config) => {
  const url = config.url;

  if (url && !url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore();
    const token = authStore.userInfo?.token;

    if (token && (!config.params || config.params.auth === undefined)) {
      config.params = {
        ...config.params,
        auth: token,
      };
    }
  }
  return config;
});

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error) {
    const authStore = useAuthStore();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
          {
            grand_type: 'refreshToken',
            refresh_token: JSON.parse(localStorage.getItem('userTokens') || '{}').refreshToken,
          }
        );

        authStore.userInfo.token = newTokens.data.access_token;
        authStore.userInfo.refreshToken = newTokens.data.refresh_token;
        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token,
          })
        );
        return axios(originalRequest);
      } catch (err) {
        localStorage.removeItem('userTokens');
        router.push('/signin');
        authStore.userInfo.token = '';
        authStore.userInfo.refreshToken = '';
      }
    }
  }
);

export default axiosApiInstance;
