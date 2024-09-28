import Cookies from 'js-cookie'

const TokenKey = 'ADMIN_DESIGN_KEY'
//获取cookie
export function getToken() {

  return Cookies.get(TokenKey)
}
//设置cookie
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
