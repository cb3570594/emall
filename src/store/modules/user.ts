/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'
import { getUserInfoById } from '@/api/sys/user'
import { errorRoutes } from '@/router/routes/base'
import { ss } from '@/utils/storage'
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
    getToken(): string {
      return this.token || ss.getItem('token')
    },
    getRole(): string {
      return this.userInfo?.role || ''
    },
  },
  actions: {
    logout() {
      this.setUserInfo({ userInfo: null })
    },
    setToken(token: string) {
      this.token = token
      ss.setItem('token', token)
    },
    setUserInfo(params: UserState) {
      this.userInfo = params.userInfo
      this.setToken(params.token || '')
    },
    getUserInfo() {
      if (this.getToken) {
        this.userInfo = {
          userId: '',
          name: 'cboy',
          mobile: '',
          permissions: [], // ['demo']
          role: 'admin',
        }
      }
      return this.userInfo
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
      if (errorRoutes.some((item) => item.name === route) || route === 'index') {
        return true
      }
      return this.userInfo?.permissions?.some((item) => item === route)
    },
  },
})
