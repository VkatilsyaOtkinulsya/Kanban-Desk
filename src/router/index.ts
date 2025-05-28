import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Main from '../pages/Main/Main.vue'
import ClientProfile from '../pages/ClientProfile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/account',
    component: ClientProfile,
  },
  {
    path: '/spaces/:id/',
    component: Main,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
