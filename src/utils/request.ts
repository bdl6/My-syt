//axios二次封装：利用axios的拦截器，对请求和响应数据进行预处理，请求拦截器在请求头携带公共参数，响应拦截器对返回的数据进行预处理，处理网络错误
import axios from 'axios'
import { useUserStore } from '@/stores/modules/user'

//创建axios实例
const request = axios.create({
  baseURL: '/api', //基础路径，发请求的时候，路径当中会出现api
  timeout: 5000, //请求超时时间
})
//请求拦截器
request.interceptors.request.use(
  (config) => {
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    //可以给请求头添加公共参数
    const userStore = useUserStore()
    //token:公共参数,如果用户登录了需要携带
    if (userStore.userInfo.token) {
      config.headers.token = userStore.userInfo.token
    }
    return config
  },
  (error) => {
    //请求失败的回调函数
    return Promise.reject(error)
  },
)
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //响应成功的回调函数
    return response.data //返回响应数据中的data数据
  },
  (error) => {
    //响应失败的回调函数
    //处理网络错误
    return Promise.reject(new Error(error.message || '未知错误'))
  },
)
export default request
