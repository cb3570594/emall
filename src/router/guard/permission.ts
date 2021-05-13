import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    // Jump to the 404 page after processing the login
    if (from.path === '/login' && to.name === '404') {
      next('/index')
      return
    }
    // if user has no token, jump to the login page
    const token = userStore.getToken
    if (!token && to.path !== '/login') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
      return
    }
    // if user has no permission, jump to the 403 page
    const isAuth = await userStore.checkPermission(to.name)
    if (token && !isAuth) {
      next()
      // next('/403')
      return
    }
    // jump to the page
    next()
  })
}
