import {
  getBreadCrumbList,
  getHomeRoute,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  routeEqual,
  getNextRoute,
  getRouteTitleHandled,
  routeHasExist,
  getMenuByRouter
} from '@/libs/util'
import config from '@/config'
import routers from '@/router/router'
import { stat } from 'fs';
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  route.push(nextRoute)//把下一路由添加到当前路由的尾部？
}
export default {
  state: {
    breadCrumbList: [],
    homeRoute: {},
    tagNavList: [],
    errorList: []
  },
  //获取左侧菜单栏
  getters: {//getters中必须写function
    /**参数： 1. state，模块中的 state 仅为模块自身中的 state；2. getters，等同于 store.getters；3. rootState，全局 state。通过 rootState，模块中的 getters 就可以引用别的模块中的 state  
     * 由于 getters 不区分模块，所以不同模块中的 getters 如果重名，Vuex 会报出 'duplicate getter key: [重复的getter名]' 错误。
    */
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      // 获取home的路由信息
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目，语法：arrayObject.splice(index,howmany,item1,...,itemX)
        /**
         * index: 删除的位置；howmany:删除的数量，item:添加的项目（可选）
         */
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1,0,router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    }
  }
}
// import {
//   getTagNavListFromLocalstorage,
//   setTagNavListInLocalstorage
// } from '@/libs/util'
// import config from '@/config'
// const { homeName } = config
// export default {
//   state: {
//     tagNavList: []
//   },
//   // 通过提交 mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。
//   mutations: {
//     setTagNavList (state, list) {
//       let tagList = []
//       if (list) {
//         // 三个点：es6的扩展运算符
//         /**参考网址：http://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/array
//          * 总结：用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
//          * 1、对象中的扩展运算符(...)：
//          * 例如：{{},...obj},后面的对象覆盖前面的对象
//          * 2、数组的扩展运算符：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
//          * 3、可以将字符串拆分成数组：
//          * [...'hello']->["h","e","l","l","o"]
//          */
//         tagList = [...list]//把list赋值给tagList
//       } else tagList = getTagNavListFromLocalstorage() || []//要么为本地保存的数值要么为空
//       if (tagList[0] && tagList[0].name !== homeName)
//       // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
//       // 要删除并返回数组的最后一个元素，请使用 pop() 方法。
//       tagList.shift()
//       //返回数组中名为homeName的索引位置
//       let homeTagIndex = tagList.findIndex(item => item.name === homeName)
//       if (homeTagIndex > 0) {
//         // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目，语法：arrayObject.splice(index,howmany,item1,.....,itemX)
//         /**
//          * index：删除的位置；howmany：删除的数量，item：添加的项目（可选）
//          */
//         let homeTag = tagList.splice(homeTagIndex,1)[0]
//         // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
//         // 要把一个或多个元素添加到数组的尾部，请使用 push() 方法。
//         tagList.unshift(homeTag)
//       }
//       // 将取到的数组存到state中
//       state.tagNavList = tagList
//       // 将tagList转化成字符串保存在本地
//       setTagNavListInLocalstorage([...tagList])

//     }
//   }
// }