import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Main from '../pages/Main.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Main
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
