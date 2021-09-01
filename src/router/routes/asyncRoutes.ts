import type { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/management',
    name: 'management',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/management/order',
    meta: {
      title: '管理',
    },
    children: [
      {
        path: 'order',
        name: 'order',
        meta: {
          title: '订单',
          icon: 'icon-dingdan',
        },
        component: () => import('@/views/management/order.vue'),
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          title: '分类',
          icon: 'icon-yingpingmoban',
        },
        component: () => import('@/views/management/category.vue'),
      },
      {
        path: 'product',
        name: 'product',
        meta: {
          title: '商品',
          icon: 'icon-lihe',
        },
        component: () => import('@/views/management/product.vue'),
      },
      {
        path: 'product-detail/:id',
        name: 'product-detail',
        meta: {
          title: '商品详情',
          hideMenu: true,
        },
        component: () => import('@/views/management/product-detail.vue'),
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户',
          icon: 'icon-huiyuan',
        },
        component: () => import('@/views/management/user.vue'),
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/management/order',
    meta: {
      title: '系统',
    },
    children: [
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '设置',
          icon: 'icon-shezhi',
        },
        component: () => import('@/views/system/config.vue'),
      },
      {
        path: 'password',
        name: 'password',
        meta: {
          title: '密码',
          icon: 'icon-anquan',
        },
        component: () => import('@/views/system/password.vue'),
      },
    ],
  },
  // {
  //   path: '/multi-level',
  //   meta: {
  //     title: '多级菜单',
  //   },
  //   component: () => import('@/layouts/default/index.vue'),
  //   children: [
  //     {
  //       path: 'multi-level1',
  //       name: 'multi-level1',
  //       meta: {
  //         title: '多级菜单1',
  //       },
  //       component: () => import('@/views/multi-level1/index.vue'),
  //       children: [
  //         {
  //           path: 'multi-level2',
  //           name: 'multi-level2',
  //           meta: {
  //             title: '多级菜单2',
  //           },
  //           component: () => import('@/views/multi-level1/multi-level2/index.vue'),
  //           children: [
  //             {
  //               path: 'multi-level3',
  //               name: 'multi-level3',
  //               meta: {
  //                 title: '多级菜单3',
  //               },
  //               component: () => import('@/views/multi-level1/multi-level2/multi-level3/index.vue'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
]

export default asyncRoutes
