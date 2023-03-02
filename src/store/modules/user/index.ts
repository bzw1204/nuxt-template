import { Message } from '@arco-design/web-vue'
import { ssoLogin, userLogout } from '@/api/user'
import { defineStore } from 'pinia'
import { clearToken, setToken } from '@/utils/auth'
import { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    account: '',
    realName: '',
    avatar: '',
    phone: '',
    roleName: '',
    roleId: '',
    token: '',
    userId: '',
    permissionList: []
  }),
  persist: {
    paths: ['account', 'realName', 'avatar', 'phone', 'roleName', 'roleId', 'userId', 'permissionList']
  },
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Login
    async login(akUrl: string) {
      return new Promise((resolve, reject) => {
        ssoLogin(akUrl)
          .then(res => {
            setToken(res.data.token ?? '')
            this.setInfo(res.data)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // Logout
    async logout() {
      return new Promise((resolve, reject) => {
        userLogout().then(res => {
          if (res && res.code === 1) {
            clearToken()
            resolve(res)
          } else {
            Message.error('登出失败')
            reject(res)
          }
        })
      })
    }
  }
})

export default useUserStore
