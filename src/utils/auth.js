import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
//expires 单位s 设置Xs 后失效
export function setTokenExpiresTime(token,expires) {
  let expiresTime = new Date(new Date() * 1 + expires * 1000); 
  return Cookies.set(TokenKey, token,{ expires: expiresTime })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

