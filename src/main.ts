import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';

import './style.scss';
import App from './App.vue';
import router from './router';
import './api/api';

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;

const pinia = createPinia();
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
