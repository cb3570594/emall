import type { Menu as MenuType } from '@/router/types'
export const menus: MenuType[] = ([
  {
    name: '总览',
    path: '/index',
    // children: [
    //   {
    //     name: '数据',
    //     path: '/index/data',
    //     icon: 'icon-shuju',
    //   },
    // ],
  },
  {
    name: '管理',
    path: '/management',
    children: [
      {
        name: '分类',
        path: '/management/category',
        icon: 'icon-yingpingmoban',
      },
      {
        name: '商品',
        path: '/management/product',
        icon: 'icon-lihe',
      },
      {
        name: '订单',
        path: '/management/order',
        icon: 'icon-dingdan',
      },
      {
        name: '用户',
        path: '/management/user',
        icon: 'icon-huiyuan',
      },
    ],
  },
  {
    name: '系统',
    path: '/system',
    children: [
      {
        name: '设置',
        path: '/system/config',
        icon: 'icon-shezhi',
      },
      {
        name: '密码',
        path: '/system/password',
        icon: 'icon-anquan',
      },
    ],
  },
])
