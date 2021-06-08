/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'
import type { _RouteLocationBase } from 'vue-router'

export const useTagsStore = defineStore({
  id: 'tags',
  state: (): {
    list: any[]
    active: string
  } => ({
    list: [],
    active: '',
  }),
  getters: {
    getTagsTitle(): any {
      return this.list.map((item) => item.title)
    },
  },
  actions: {
    addTag(route: _RouteLocationBase) {
      const res = this.list.find((item) => item.fullPah === route.fullPath)
      if (!res) {
        this.list.push({
          ...route,
        })
      }
      this.active = route.fullPath
    },
    delTag(index: number) {
      this.list.splice(index, 1)
    },
  },
})
