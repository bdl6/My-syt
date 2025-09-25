import type { UserInfo } from '@/api/hospital/type'

export const SET_TOKEN = (userInfo: UserInfo) => {
  localStorage.setItem('USERINFO', JSON.stringify(userInfo))
}
export const GET_TOKEN = () => {
  return JSON.parse(localStorage.getItem('USERINFO') as string) || {}
}
//清除本地存储用户相关的数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('USERINFO')
}
