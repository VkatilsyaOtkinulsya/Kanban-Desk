import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Main from '../pages/Main/Main.vue';
import ClientProfile from '../pages/ClientProfile.vue';
import SignUp from '../pages/Auth/SignUp.vue';
import SignIn from '../pages/Auth/SignIn.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
  },
  {
    path: '/account',
    component: ClientProfile,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/signup',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
