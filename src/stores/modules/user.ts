import { defineStore } from 'pinia'
import { reqCode, reqUserLogin } from '@/api/hospital'
import type { LoginData, UserLoginResponseData, UserInfo } from '@/api/hospital/type'
import type { UserState } from '@/stores/modules/interface'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/user'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    visiable: false,
    code: '',
    userInfo: GET_TOKEN() as UserInfo,
  }),

  actions: {
    async getCode(phone: string) {
      const res = (await reqCode(phone)) as { code: number; data: string; message?: string }
      if (res.code === 200) {
        this.code = res.data
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogin(data: LoginData) {
      const res: UserLoginResponseData = await reqUserLogin(data)
      if (res.code === 200) {
        this.userInfo = res.data
        SET_TOKEN(res.data)
        this.visiable = false
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //退出登录
    logout() {
      //清除用户信息
      this.userInfo = {} as UserInfo
      //清除本地存储
      REMOVE_TOKEN()
    },
    //查询扫码本地是否有数据
    queryState() {
      const timer = setInterval(() => {
        const token = GET_TOKEN()
        console.log('检查token:', token) // 调试信息

        if (token) {
          this.visiable = false
          console.log('登录成功，关闭对话框')
          this.userInfo = token as UserInfo
          clearInterval(timer)
        }
      }, 1000)
    },
  },
})
