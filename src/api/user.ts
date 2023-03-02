import { get } from '../utils/http/fetch'

// 获取单点登录前面
export function getSign() {
  return get('/auth/fetch/sso_sign')
}

// ak登录
export function ssoLogin(ssoAk: string) {
  return get(`/auth/login/${ssoAk}`)
}

export function jsonp(url: string, callbackName: string) {
  console.log(url)
  return new Promise(resolve => {
    const JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = url
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    window[callbackName] = (result: any) => {
      resolve(result)
    }
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 1000)
  }).catch(error => {
    console.log('获取AK失败', error)
  })
}

export function userLogout() {
  return get('/auth/logout')
}
