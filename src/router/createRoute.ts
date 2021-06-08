import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layouts/default/index.vue'
import { groupBy } from 'lodash'
import { baseRoutes, errorRoutes } from './routes/base'

const modules = import.meta.globEager('../views/demo/**/*.vue')
const keys = Object.keys(modules)
const paths = keys.map((item) => item.split('/').slice(3))

const testRoutes = paths.reduce((res, cur, curIndex) => {
  function addChildren(children: any[], index: number) {
    if (cur[index] === 'components') {
      return
    }
    const route = children.find((item) => item.name === cur[index])
    if (!route) {
      if (cur[index + 1] === 'index.vue') {
        const child = {
          path: `${index === 0 ? '/' : ''}${cur[index]}`,
          name: cur[index],
          children: [],
          component: modules[keys[curIndex]].default,
        }
        children.push(child)
      } else if (cur[index].includes('.vue')) {
        const child = {
          path: `${cur[index]}`.slice(0, -4).replace('_', ':'),
          name: cur[index].slice(0, -4),
          component: modules[keys[curIndex]].default,
          children: [],
        }
        if (cur[index].indexOf('_') === 0) {
          child.name = cur[index - 1] + child.name
        }
        children.push(child)
      } else {
        const child = {
          path: `${index === 0 ? '/' : ''}${cur[index]}`,
          name: cur[index],
          children: [],
          component: index === 0 ? Layout : undefined,
        }
        children.push(child)
        addChildren(child.children, index + 1)
      }
    } else if (route) {
      addChildren(route.children, index + 1)
    }
  }
  addChildren(res, 0)
  return res
}, [] as any[])
console.log(testRoutes)

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
console.log(tempRoutes)
// baseRoutes[0].children?.push(...testRoutes, ...errorRoutes)

const routes: Array<RouteRecordRaw> = [...baseRoutes, ...testRoutes, ...errorRoutes]
export default routes
