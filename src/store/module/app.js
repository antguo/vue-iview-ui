import {
  getBreadCrumbList
} from '../../libs/util'
export default {
  state: {
    breadCrumbList: []
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    }
  }
}