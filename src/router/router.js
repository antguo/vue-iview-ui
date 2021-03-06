import Main from '../view/main'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',// 默认跳转到home
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home_index',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'ios-cog'
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/develop',
    name: 'develop_index',
    meta: {
      icon: 'ios-cog',
      title: '开发模块'
    },
    component: Main,
    children: [
      {
        path: '/dev',
        name: 'dev_index',
        meta: {
          icon: 'ios-cog',
          title: '开发-1'
        },
        component: () => import('@/view/area')
      },
      {
        path: '/dev2',
        name: 'dev2_index',
        meta: {
          icon: 'ios-cog',
          title: '开发-2'
        },
        component: () => import('@/view/area')
      }
    ]
  },
  {
    path: '/photoshop',
    name: 'photoshop_index',
    meta: {
      icon: 'ios-cog',
      title: 'PS模块'
    },
    component: Main,
    children: [
      {
        path: '/ps1',
        name: 'ps1_index',
        meta: {
          icon: 'ios-cog',
          title: 'PS-1'
        },
        component: () => import('@/view/ps')
      }
    ]
  }
]
// import $ from '../js/jquery.min'
// import Main from '../view/main'

// // 不作为Main组件的子页面展示的页面单独写，如下
// export const loginRouter = {
//   path: '/login',
//   name: 'login',
//   meta: {
//     title: 'Login - 登录'
//   },
//   component: () => import('@/view/login.vue')
// }
// export const otherRouter = {
//   path: '/',
//   name: 'otherRouter',
//   redirect: '/home',
//   component: Main,
//   children: [
//     {path: 'home', title: '主页', name: 'home_index', component: () => import('@/view/home')},
//     {path: 'area', title: '开发-1', name: 'area_index', component: () => import('@/view/area')},
//     {path: 'sys_menu', title: '开发-2', name: 'menu_index', component: () => import('@/view/area')},
//     {path: 'api_manage', title: '开发-3', name: 'api_index', component: () => import('@/view/area')},
//     {path: 'org_manage', title: 'PS-1', name: 'org_index', component: () => import('@/view/area')},
//     {path: 'role_manage', title: 'PS-2', name: 'role_index', component: () => import('@/view/area')},
//     {path: 'user_manage', title: 'PS-3', name: 'user_index', component: () => import('@/view/area')}
//   ]
// }
// // export const homeRouter = {
// //   path: '/home',
// //   name: 'home',
// //   meta: {
// //     title: 'Home - 主页'
// //   },
// //   component: () => import('../view/home')
// // }
// // 所有上面定义的路由都要写在下面的routers里
// export const routers = [
//   loginRouter,
//   otherRouter
// ]