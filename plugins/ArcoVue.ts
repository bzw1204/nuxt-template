import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.less'

// 将 ArcoVue 挂载
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ArcoVue)
})
