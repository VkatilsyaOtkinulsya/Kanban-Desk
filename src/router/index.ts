import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Main from '../pages/Main/Main.vue';
import ClientProfile from '../pages/ClientProfile.vue';
import SignUp from '../pages/SignUp/SignUp.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/account',
    component: ClientProfile,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
