import type { Router } from 'vue-router'
import { useTagsStore } from '@/store/modules/tags'
import setting from '@/config/setting'
import { baseRoutes, errorRoutes } from '@/router/routes/base'

const title = setting.title || 'Vue Admin Template'
export function getPageTitle(pageTitle: string | unknown) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

export default function createTagsGuard(router: Router) {
  router.afterEach((to) => {
    // set page title
    document.title = getPageTitle(to.meta.title)

    const tagsStore = useTagsStore()
    // 不放入标签的页面
    if (![...baseRoutes, ...errorRoutes].find((item) => item.name === to.name)) {
      tagsStore.addTag(to)
    }
  })
}
