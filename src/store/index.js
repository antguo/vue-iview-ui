import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import user from './module/user'
// 如果在模块化构建系统中，请确保在开头调用了Vue.use(Vuex)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    
  },
  modules: {
    app,
    user
  }
})