import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/Main/Main.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/Auth/SignUp.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/pages/Auth/SignIn.vue'),
  },
  {
    path: '/account',
    component: () => import('@/pages/ClientProfile.vue'),
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
