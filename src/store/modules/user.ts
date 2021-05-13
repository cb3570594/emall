import { defineStore } from 'pinia'
import { getUserInfoById } from '@/api/sys/user'
import { errorRoutes } from '@/router/routes/base'
import type { RouteRecordName } from 'vue-router'

type UserInfo = {
  userId: string
  name: string
  mobile: string
  permissions: (RouteRecordName | undefined)[]
  role: string
} | null

interface UserState {
  userInfo: UserInfo
  token?: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: '',
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo
    },
    getToken(): string | null | undefined {
      return this.token || sessionStorage.getItem('token')
    },
    getRole(): string | undefined {
      return this.userInfo?.role
    },
  },
  actions: {
    setUserInfo(params: UserState) {
      this.userInfo = params.userInfo
      this.token = params.token
      sessionStorage.setItem('token', params.token || '')
    },
    resetUserInfo() {
      this.userInfo = null
      this.token = ''
    },
    async checkPermission(route: RouteRecordName | null | undefined) {
      if (!this.userInfo) {
        const userInfo = await getUserInfoById()
        this.userInfo = userInfo as UserInfo
      }
      if (errorRoutes.some((item) => item.name === route) || 'index' === route) {
        return true
      } else {
        return this.userInfo?.permissions?.some((item) => item === route)
      }
    },
  },
})
