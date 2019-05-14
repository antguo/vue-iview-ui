import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import $ from '../js/jquery.min'
import {routers} from './router'
import VueRouter from 'vue-router';
import Cookies from 'js-cookie'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  routes: routers,
  mode: 'history'
}
export const router = new VueRouter(RouterConfig)
router.beforeEach((to, from, next) => {
  /*
    分为过期和未过期两种情况，过期时会报302，此时需要跳转到login重新登录，未过期时存在未登录和已登录两种情况，未登录时跳转到login，已登录时跳转到主页
  */
  // iView.LoadingBar.start();
  // var userInfo = Cookies.get('user');//获取浏览器缓存的用户信息
  var userInfo = sessionStorage.getItem('user')
  if (userInfo) {//如果有就直接到首页
    next();
  } else {
    if (to.path == '/login') {//如果是登录页面路径，就直接next()
      next();
    } else {//不然就跳转到登录
      next('/login');
    }
  }
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
