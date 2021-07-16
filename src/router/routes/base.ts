import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import Home from '@/views/index.vue'

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '总览',
        },
        component: Home,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hideMenu: true,
      title: '登录',
    },
    component: () => import('@/views/login/Login.vue'),
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    meta: {
      hideMenu: true,
      title: '403',
    },
    component: () => import('@/views/error/403.vue'),
  },
  {
    path: '/:p*',
    name: '404',
    meta: {
      hideMenu: true,
      title: '404',
    },
    component: () => import('@/views/error/404.vue'),
  },
]
