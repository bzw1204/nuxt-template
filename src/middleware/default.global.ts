import { isLogin } from '@/utils/auth'
// import { useUserStore } from '@/store'
// import { Message } from '@arco-design/web-vue'
// import NProgress from 'nprogress' // progress bar
// import type { LocationQueryRaw, Router } from 'vue-router'

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    // 仅在客户端中判断
    if (!isLogin()) {
      console.log('coming')
      if (to.name !== 'login') {
        abortNavigation()
        return navigateTo({ path: '/login', query: { redirect: to.fullPath, ...to.query } })
      }
    }
  }
})
