import type { RouteRecordRaw } from 'vue-router'

import { groupBy } from 'lodash'
import { baseRoutes, errorRoutes } from './routes/base'
import { loginRoute } from './routes/login'

const modules = import.meta.globEager('../views/demo/**/*.vue')
for (const key in modules) {
  const tempKey = key.slice(13).match(/(.*)\/(.*)\.vue$/)
  modules[key].default.moduleName = tempKey![2]
  modules[key].default.moduleFile = tempKey![1] || tempKey![2]
  modules[key].default.moduleRoute = tempKey![1] + '/' + tempKey![2]
}
const list = Object.values(modules)
const temp = groupBy(list, (v) => {
  return v.default.moduleFile
})

let tempRoutes: RouteRecordRaw[] = []
for (const key in temp) {
  if (key.includes('components')) {
    continue
  }
  if (key[0] !== '/') {
    const component = temp[key][0].default
    tempRoutes.push({
      path: component.moduleRoute,
      name: component.name || component.moduleName,
      component: component,
    })
  } else {
    temp[key].forEach((item) => {
      tempRoutes.push({
        path: item.default.moduleRoute,
        name: item.default.name || item.default.moduleName,
        component: item.default,
      })
    })
  }
}

baseRoutes.children?.push(...tempRoutes, ...errorRoutes)

export const routes: Array<RouteRecordRaw> = [loginRoute, baseRoutes]
