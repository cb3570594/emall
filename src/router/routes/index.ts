import { baseRoutes, errorRoutes } from './base'
// import asyncRoutes from './asyncRoutes'

const routes = [...baseRoutes, ...errorRoutes]

export default routes
