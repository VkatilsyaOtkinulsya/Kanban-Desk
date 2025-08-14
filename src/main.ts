import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

import './style.css';
import App from './App.vue';
import router from './router';
import './api/api';

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;

const pinia = createPinia();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 минут
    },
  },
});

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount('#app');
