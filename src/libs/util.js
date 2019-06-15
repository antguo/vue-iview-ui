import { objEqual, hasOneOf, forEach} from '@/libs/tools'
import config from '@/config'
const { useI18n } = config

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}
/**
 * 
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}
/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
// 判断打开的标签列表里是否已存在这个新添加的路由对象
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

export const getRouteTitleHandled = (route) => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}
/**
 * 获取下一路由
 * @param {Array} list 标签列表
 * @param {*} route 路由对象
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
    const index = list.findIndex(item => routeEqual(item,route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name，path，meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []//将一个JSON字符串转化为对象
}
/**
 * @description 本地存储和获取标签导航列表 
 */
export const setTagNavListInLocalstorage = list => {
  // 将 JavaScript 对象转换为字符串
  localStorage.tagNaveList = JSON.stringify(list)
}

/**
 * 
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home_index') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  // while循环遍历路由数组
  while (++i < len) {
    let item = routers[i]
    // alert('item:' + JSON.stringify(item))
    // 当路由对象存在子集时，再遍历子集是否还有子集，返回最后一集的name
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) {
        // alert("res:"+JSON.stringify(res))
        return res
      }
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}
// 显示面包屑标题
export const showTitle = (item, vm) => {
  let { title, __titleIsFunction__ } = item.meta
  if (!title) return
  if (useI18n) {
    if (title.includes('{{') && title.includes('}}') && useI18n)
    title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
    else if (__titleIsFunction__) title = item.meta.title
    else title = vm.$t(item.name)
  } else title = (item.meta && item.meta.title) || item.name
  return title
}

// /**
//  * 获取面包屑列表
//  * ...args---ES6的扩展运算符，将一个数组转为用逗号分隔的参数序列，
//  * 扩展语法，对数组和对象而言，就是将运算符后面的变量里的东西每一项拆下来，这个东西可以在函数定义的地方使用，比如使用func(...args)将函数传入的参数都放到args数组里
//  * filter()---用于对数组数据进行操作 es6方法总结：https://blog.csdn.net/bossxu_/article/details/80756563
//  * map()：map和forEach等遍历方法不同，在forEach中return语句是没有任何效果的，而map则可以‘改变当前循环的值，返回一个新的被改变过值之后的数组(map需return)’，一般用来处理需要修改某一个数组的值
//  * filter()：函数可以看成是一个过滤函数，‘返回符合条件的元素的数组’，filter需要在循环的时候判断一下是true还是false,是true才会返回这个元素
//  */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon}
  let routeMetched = route.matched //返回当前路由匹配到的组件类型，包含从上到下的对象
  if (routeMetched.some(item => item.name === homeRoute.name))//some方法用于检测数组中的元素是否满足指定条件，有元素满足则直接返回true不再执行其他元素
  return [homeItem]
  let res = routeMetched.filter(item => {//filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {//map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。按照原始数组元素顺序依次处理元素
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}
// 读取本地仓库存储的信息
export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}
// // import axios from 'axios'
// // /*
// //   这里配置了POST，GET，PUT，DELETE方法，并且自动将JSON格式数据转为URL拼接的方式，同时配置了默认头部地址为：http://localhost:8080/,这样调用的时候只需要写访问方法即可
// // */
// // let http = axios.create({
// //   baseURL: 'http://localhost:8080/',
// //   withCredentials: true,
// //   headers: {
// //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
// //   },
// //   transformRequest: [function (data) {
// //     let newData = '';
// //     for (let k in data) {
// //       if (data.hasOwnProperty(k) === true) {
// //         newData += encodeURIComponent(k) + '=' +encodeURIComponent(data[k]) + '&';
// //       }
// //     }
// //     return newData;
// //   }]
// // });
// // function apiAxios(method, url, params, response) {
// //   http({
// //     method: method,
// //     url: url,
// //     data:method === 'POST' || method === 'PUT' ? params: null,
// //     params: method === 'GET' || method === 'DELETE' ? params : null
// //   }).then(function (res) {
// //     response(res);
// //   }).catch(function (err) {
// //     response(err);
// //   })
// // }
// // export default {
// //   get: function (url, params, response) {
// //     return apiAxios('GET', url, params, response)
// //   },
// //   post: function (url, params, response) {
// //     return apiAxios('POST', url, params, response)
// //   },
// //   put: function (url, params, response) {
// //     return apiAxios('PUT', url, params, response)
// //   },
// //   delete: function (url, params, response) {
// //     return apiAxios('DELETE', url, params, response)
// //   }
// // }