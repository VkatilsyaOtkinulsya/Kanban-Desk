import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';

import './style.css';
import App from './App.vue';
import router from './router';

const firebaseConfig = {
  apiKey: 'AIzaSyDiJpQGgFwyh1MdP1zoc5QFW2Yg5DxNhNA',
  authDomain: 'jwt-tokens-firebase-add21.firebaseapp.com',
  projectId: 'jwt-tokens-firebase-add21',
  storageBucket: 'jwt-tokens-firebase-add21.firebasestorage.app',
  messagingSenderId: '785569551312',
  appId: '1:785569551312:web:c69e8a53b30be43cda1fd5',
};

const pinia = createPinia();
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
