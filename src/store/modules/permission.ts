/* eslint-disable import/prefer-default-export */
import type { RouteRecordRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { baseRoutes, errorRoutes } from '@/router/routes/base'
import asyncRoutes from '@/router/routes/asyncRoutes'

interface PermissionState {
  routes: RouteRecordRaw[]
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      const metaRoles = route.meta!.roles as string[]
      return metaRoles.includes(role)
    })
  }
  return true
}
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  console.log(roles)
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    generateRoutes(roles: string[]) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.routes = [...baseRoutes, ...accessedRoutes, ...errorRoutes]
      return accessedRoutes
    },
  },
})
