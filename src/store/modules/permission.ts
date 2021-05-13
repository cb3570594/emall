import { defineStore } from 'pinia'

import { getPermmisionByUserId } from '@/api/sys/user'
import { useUserStore } from './user'

interface PermissionState {
  permissionList: string[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permissionList: [],
  }),
  actions: {
    setPermissionList(list: string[]) {
      this.permissionList = list
    },
    async getPermissionList(userId: string) {
      const list = await getPermmisionByUserId(userId)
      this.setPermissionList(list)
    },
  },
})
