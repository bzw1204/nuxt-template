export default () => {
  const user = useState('user', () => null)

  const setUserInfo = (data: any) => {
    user.value = data
  }

  const getUserInfo = () => {
    return user.value
  }

  return {
    user,
    setUserInfo,
    getUserInfo
  }
}
