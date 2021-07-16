/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'
import type { _RouteLocationBase, Router } from 'vue-router'
// import { useRouter } from 'vue-router'

export const useTagsStore = defineStore({
  id: 'tags',
  state: (): {
    list: _RouteLocationBase[]
    active: string
  } => ({
    list: [],
    active: '',
  }),
  actions: {
    addTag(route: _RouteLocationBase) {
      const res = this.list.find((item) => item.fullPath === route.fullPath)
      if (!res) {
        this.list.push({
          ...route,
        })
      }
      this.active = route.fullPath
    },
    delTag(index: number, router: Router) {
      const tag = this.list.splice(index, 1)[0]
      if (tag.fullPath === this.active) {
        if (this.list.length > 0) {
          const target = this.list[this.list.length - 1]
          router.replace(target)
        } else {
          router.replace('/')
        }
      }
    },
  },
})
