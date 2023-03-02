import { $fetch, FetchOptions } from 'ohmyfetch'
import qs from 'qs'
import fileDownload from 'js-file-download'

const CONTENT_TYPE = 'Content-Type'
enum ContentTypeEnum {
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  APPLICATION_JSON = 'application/json;charset=UTF-8',
  EXT_PLAIN = 'text/plain;charset=UTF-8'
}

interface RS<T = any> {
  code: number
  data: T
  msg: string
}

const fetchInstance = $fetch.create({
  baseURL: '/dz',
  async onRequest({ options }) {
    // 请求拦截器
    options.headers = new Headers(options.headers)

    options.headers.set('Authorization', `Bearer 000`)
    options.headers.set(CONTENT_TYPE, ContentTypeEnum.APPLICATION_JSON)
    if (options.headers[CONTENT_TYPE] === ContentTypeEnum.FORM_URLENCODED) {
      options.params = qs.stringify(options.params)
    }
  },
  async onResponse({ response }) {
    // 响应拦截器
    const { status, _data: data, headers } = response
    const { code } = data
    if (status === 200) {
      if (headers['content-type'] && !ContentTypeEnum.APPLICATION_JSON.includes(headers['content-type'])) {
        const fileName = decodeURIComponent(headers['content-disposition']?.split('filename=')[1])
        fileDownload(data as unknown as ArrayBuffer, fileName)
      }
      if ([4001, 4002, 4003, 4004, 4005].includes(code)) {
        // token无效，执行退出操作
        if (process.client) {
          // window.location.href = '/login'
        }
      }
      Promise.resolve(data)
    }
  },
  async onResponseError({ response }) {
    throw new Error(`${response.status}`)
  }
})

export const get = async <T = any>(url: string, data?: any, config?: FetchOptions): Promise<RS<T>> => {
  const response = await fetchInstance(url, {
    params: data,
    ...config
  })

  if (response && response.code === 1) {
    return response
  }
  throw new Error(response.msg)
}

export const post = async <T = any>(url: string, data?: any, config?: FetchOptions): Promise<RS<T>> => {
  const response = await fetchInstance(url, {
    method: 'POST',
    body: { ...data },
    ...config
  })

  if (response && response.code === 1) {
    return response
  }
  throw new Error(response.msg)
}

export const remove = async <T = any>(url: string, config?: FetchOptions): Promise<RS<T>> => {
  const response = await fetchInstance(url, {
    method: 'DELETE',
    ...config
  })

  if (response && response.code === 1) {
    return response
  }
  throw new Error(response.msg)
}
