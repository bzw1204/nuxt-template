const isLogin = () => {
  return process.client ? window.localStorage.getItem('token') : false
}

const getToken = () => {
  return process.client ? localStorage.getItem('token') ?? '' : ''
}

const setToken = (token: string) => {
  if (process.client) {
    window.localStorage.setItem('token', token)
  }
}

const clearToken = () => {
  if (process.client) {
    localStorage.removeItem('token')
  }
}

export { isLogin, getToken, setToken, clearToken }
