import type { RouteRecordRaw } from 'vue-router'

export const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  meta: {
    disabledLayout: true
  },
  component: () => import('@/views/login/Login.vue')
}
