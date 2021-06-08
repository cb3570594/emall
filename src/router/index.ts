import { createRouter, createWebHistory } from 'vue-router'
import createProgressGuard from './guard/nprogress'
import createPermissionGuard from './guard/permission'
import createTagsGuard from './guard/tags'
// import routes from './createRoute'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

createProgressGuard(router)
createPermissionGuard(router)
createTagsGuard(router)

export default router
