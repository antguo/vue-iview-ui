// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
// import {router} from './router/index'
import router from './router/index'
import VueRouter from 'vue-router'
import App from './App'
import 'iview/dist/styles/iview.css'
import $ from '../src/js/jquery.min'
import store from './store'
import i18n from '@/locale'
import config from '@/config'
// import router from './router'
// Vue.use(VueRouter)
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
