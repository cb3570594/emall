import type { Router } from 'vue-router'
import { useTagsStore } from '@/store/modules/tags'
import setting from '@/config/setting'

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
    tagsStore.addTag(to)
  })
}
