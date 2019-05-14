import $ from '../js/jquery.min'
import Main from '../view/main'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/view/login.vue')
}
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {path: 'home', title: '主页', name: 'home_index', component: () => import('@/view/home')}
  ]
}
// export const homeRouter = {
//   path: '/home',
//   name: 'home',
//   meta: {
//     title: 'Home - 主页'
//   },
//   component: () => import('../view/home')
// }
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter
]