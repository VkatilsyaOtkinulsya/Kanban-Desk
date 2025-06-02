import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    login(email: string, password: string) {
      const user = {
        id: '345398',
        email,
      };
      const token = btoa(JSON.stringify(user));

      this.user = user;
      this.token = token;

      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 30}`;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    },
    init() {
      const token =
        localStorage.getItem('token') || document.cookie.split('token=')[1]?.split(';')[0];
      if (token) {
        try {
          const user = JSON.parse(atob(token));
          this.user = user;
          this.token = token;
        } catch {
          this.logout();
        }
      }
    },
  },
});

interface User {
  id: string;
  email: string;
}
