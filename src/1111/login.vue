<template>
  <NuxtLayout name="empty">
    <iframe src="https://auth.fdz.srv/AppSso?app=dz" frameborder="0" width="100%" height="100%" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { getSign, jsonp, ssoLogin } from '@/api/user'
  import { Message } from '@arco-design/web-vue'
  import { useUserStore } from '@/store'

  definePageMeta({
    layout: 'empty'
  })

  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()

  const fetchSign = async () => {
    await getSign().then(response => {
      const { data: akUrl } = response
      jsonp(akUrl, '__auth__').then((result: any) => {
        const { err_no: errNo, data: ak, msg } = result
        console.log('jsonp', result)
        if (errNo === 0) {
          ssoLogin(ak)
            .then(res => {
              console.log('res', res)
              router.push({ path: '/' })
            })
            .catch(error => {
              console.log('error', error)
            })
          userStore
            .login(ak)
            .then(() => {
              console.log('login success')
              const { redirect } = route.query
              router.push({ path: (redirect as string) || '/' })
              Message.success(`欢迎使用`)
            })
            .catch(() => {
              Message.error('登录失败')
            })
        } else {
          Message.error(msg)
        }
      })
    })
  }

  const handlerIframeMessage = (value?: any) => {
    // this.$message.closeAll()
    const { data } = value
    console.log(value)
    if (data.err_no === undefined) {
      return
    }
    switch (data.err_no) {
      case 0:
        fetchSign()
        break
      case 4031:
      case 403:
      case 41808:
        Message.error(data.msg)
        break
      case 418:
        router.push({ name: 'home' })
        break
      case 401:
        router.push({ name: 'login' })
        break
      case 100:
        break
      default:
        Message.error('登录失败，未知原因，请尝试刷新或重启浏览器，若未解决请联系管理员或销售')
        break
    }
  }

  onMounted(() => {
    window.addEventListener('message', handlerIframeMessage)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('message', handlerIframeMessage)
  })
</script>
