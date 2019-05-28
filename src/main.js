// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import {router} from './router/index'
import VueRouter from 'vue-router'
import App from './App'
import 'iview/dist/styles/iview.css'
import $ from '../src/js/jquery.min'
import store from './store'
// import router from './router'
// Vue.use(VueRouter)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
