import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { AuthToken } from '@/types/authTypes';

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Auth/SignUp.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/Auth/SignIn.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: () => import('@/views/Main/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('@/views/Main/Home.vue'),
      },
      {
        path: '/spaces/:spaceId',
        component: () => import('@/views/Spaces/SpaceLayout.vue'),
        props: true,
        meta: { requiresAuth: true },
        children: [
          {
            path: 'projects',
            name: 'space-projects',
            component: () => import('@/modules/Space/SpaceProjects.vue'),
            props: true,
          },
          {
            path: ':projectId/tasks',
            name: 'project-tasks',
            component: () => import('@/modules/Space/SpaceProjectTasks.vue'),
            props: true,
          },
        ],
      },
    ],
  },

  {
    path: '/account',
    component: () => import('@/views/ClientProfile.vue'),
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

router.beforeEach((to, _from, next) => {
  const tokens = JSON.parse(localStorage.getItem('userTokens') || '{}') as AuthToken;
  const isAutheticated: boolean = !!tokens.token;

  if (to.meta.requiresAuth && !isAutheticated) {
    next({ name: 'signin' });
  } else if ((to.name === 'signin' || to.name === 'signup') && isAutheticated) {
    next({ name: 'main' });
  } else {
    next();
  }
});

export default router;
