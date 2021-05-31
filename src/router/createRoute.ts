import type { RouteRecordRaw } from 'vue-router'

import { groupBy } from 'lodash'
import { baseRoutes, errorRoutes } from './routes/base'
import { loginRoute } from './routes/login'

const modules = import.meta.globEager('../views/demo/**/*.vue')
const keys = Object.keys(modules)
keys.forEach((key) => {
  const tempKey = key.slice(13).match(/(.*)\/(.*)\.vue$/)
  const df = modules[key].default
  df.moduleName = tempKey![2] || ''
  df.moduleFile = tempKey![1] || tempKey![2]
  df.moduleRoute = `${tempKey![1]}/${tempKey![2]}`
})
const list = Object.values(modules)
const temp = groupBy(list, (v) => v.default.moduleFile)

const tempRoutes: RouteRecordRaw[] = []
Object.keys(temp).forEach((key) => {
  if (key.includes('components')) {
    return
  }
  if (key[0] !== '/') {
    const component = temp[key][0].default
    tempRoutes.push({
      path: component.moduleRoute,
      name: component.name || component.moduleName,
      component,
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
})

baseRoutes.children?.push(...tempRoutes, ...errorRoutes)

const routes: Array<RouteRecordRaw> = [loginRoute, baseRoutes]

export default routes
