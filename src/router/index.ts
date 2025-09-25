import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue'),
      redirect: '/hospital/register',
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue'),
          meta: {
            title: '预约挂号',
          },
        },
        {
          path: 'register_step1',
          component: () => import('@/pages/hospital/register/register_step1.vue'),
          meta: {
            title: '预约第一步',
          },
        },
        {
          path: 'register_step2',
          component: () => import('@/pages/hospital/register/register_step2.vue'),
          meta: {
            title: '预约第二步',
          },
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail/index.vue'),
          meta: {
            title: '医院详情',
          },
        },
        {
          path: 'notice',
          component: () => import('@/pages/hospital/notice/index.vue'),
          meta: {
            title: '预约通知',
          },
        },
        {
          path: 'close',
          component: () => import('@/pages/hospital/close/index.vue'),
          meta: {
            title: '停诊信息',
          },
        },
        {
          path: 'search',
          component: () => import('@/pages/hospital/search/index.vue'),
          meta: {
            title: '查询',
          },
        },
      ],
    },
    {
      path: '/wxlogin',
      component: () => import('@/pages/WxLogin/index.vue'),
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/user/certification/index.vue'),
          meta: {
            title: '实名认证',
          },
        },
        {
          path: 'order',
          component: () => import('@/pages/user/order/index.vue'),
          meta: {
            title: '挂号订单',
          },
        },
        {
          path: 'patient',
          component: () => import('@/pages/user/patient/index.vue'),
          meta: {
            title: '就诊人管理',
          },
        },
        {
          path: 'profile',
          component: () => import('@/pages/user/profile/index.vue'),
          meta: {
            title: '账号信息',
          },
        },
        {
          path: 'feedback',
          component: () => import('@/pages/user/feedback/index.vue'),
          meta: {
            title: '信息反馈',
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（如浏览器前进/后退），则使用保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  },
})

//* 路由守卫 */
router.beforeEach((to, from, next) => {
  document.title = `医院-${to.meta.title}`

  // 白名单直接放行
  const whiteList = [
    '/home',
    '/hospital/register',
    '/hospital/detail',
    '/hospital/notice',
    '/hospital/close',
    '/hospital/search',
  ]

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 动态导入 store（避免在模块初始化时就访问 Pinia）
  import('@/stores/modules/user')
    .then(({ useUserStore }) => {
      const userStore = useUserStore()
      if (userStore.userInfo.token) {
        next()
      } else {
        userStore.visiable = true
        next({ path: '/home', query: { redirect: to.fullPath } })
      }
    })
    .catch(() => {
      // 如果导入失败，也跳转到登录页
      next({ path: '/home', query: { redirect: to.fullPath } })
    })
})

export default router
