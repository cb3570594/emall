import { createRouter, createWebHistory } from 'vue-router'
import { createProgressGuard } from './guard/nprogress'
import { createPermissionGuard } from './guard/permission'
import routes from './createRoute'

console.log(routes)
const router = createRouter({
  routes,
  history: createWebHistory(),
})

createProgressGuard(router)
createPermissionGuard(router)

export default router
