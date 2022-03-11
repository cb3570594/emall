import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import setting from '@/config/setting'

export default function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    const token = userStore.getToken
    if (!token && to.path !== '/login') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
      return
    }
    if (setting.whiteList.includes(to.path)) {
      next()
      return
    }
    let role = userStore.getRole
    if (role) {
      next()
    } else {
      role = (await userStore.getUserInfo()?.role) || ''
      if (!role) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
          },
        })
        return
      }
      const accessRoutes = await permissionStore.generateRoutes([role])
      accessRoutes.forEach((item) => router.addRoute(item))
      next({ path: to.path, replace: true })
    }
  })
}
