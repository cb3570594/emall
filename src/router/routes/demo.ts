import type { RouteRecordRaw } from 'vue-router'

export const demo: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index/data.vue'),
  },
]
