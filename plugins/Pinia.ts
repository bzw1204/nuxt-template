import store from '@/store'

// 将 pinia 挂载
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store)
})
