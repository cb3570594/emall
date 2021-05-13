import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
export const baseRoutes: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/index',
  children: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index.vue'),
    },
  ],
}

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
  },
  {
    path: '/:p*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
]
