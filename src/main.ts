import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 清除默认样式
import '@/style/reset.scss'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import ElementPlus from 'element-plus'
import HospitalTop from './components/HospitalTop.vue'
import HospitalBottom from './components/HospitalBottom.vue'
import Login from './components/login/index.vue'
import Visitor from './components/visitor/index.vue'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.component('Visitor', Visitor)

app.use(router)
app.use(createPinia())

app.mount('#app')
