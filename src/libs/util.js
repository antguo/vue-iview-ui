import config from '@/config'
import config from '../../config'
const { title, cookieExpires, useI18n } = config
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
/**
 * 获取面包屑列表
 * ...args---ES6的扩展运算符，将一个数组转为用逗号分隔的参数序列，
 * 扩展语法，对数组和对象而言，就是将运算符后面的变量里的东西每一项拆下来，这个东西可以在函数定义的地方使用，比如使用func(...args)将函数传入的参数都放到args数组里
 * filter()---用于对数组数据进行操作 es6方法总结：https://blog.csdn.net/bossxu_/article/details/80756563
 * map()：map和forEach等遍历方法不同，在forEach中return语句是没有任何效果的，而map则可以‘改变当前循环的值，返回一个新的被改变过值之后的数组(map需return)’，一般用来处理需要修改某一个数组的值
 * filter()：函数可以看成是一个过滤函数，‘返回符合条件的元素的数组’，filter需要在循环的时候判断一下是true还是false,是true才会返回这个元素
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name))
  return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
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
// import axios from 'axios'
// /*
//   这里配置了POST，GET，PUT，DELETE方法，并且自动将JSON格式数据转为URL拼接的方式，同时配置了默认头部地址为：http://localhost:8080/,这样调用的时候只需要写访问方法即可
// */
// let http = axios.create({
//   baseURL: 'http://localhost:8080/',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//   },
//   transformRequest: [function (data) {
//     let newData = '';
//     for (let k in data) {
//       if (data.hasOwnProperty(k) === true) {
//         newData += encodeURIComponent(k) + '=' +encodeURIComponent(data[k]) + '&';
//       }
//     }
//     return newData;
//   }]
// });
// function apiAxios(method, url, params, response) {
//   http({
//     method: method,
//     url: url,
//     data:method === 'POST' || method === 'PUT' ? params: null,
//     params: method === 'GET' || method === 'DELETE' ? params : null
//   }).then(function (res) {
//     response(res);
//   }).catch(function (err) {
//     response(err);
//   })
// }
// export default {
//   get: function (url, params, response) {
//     return apiAxios('GET', url, params, response)
//   },
//   post: function (url, params, response) {
//     return apiAxios('POST', url, params, response)
//   },
//   put: function (url, params, response) {
//     return apiAxios('PUT', url, params, response)
//   },
//   delete: function (url, params, response) {
//     return apiAxios('DELETE', url, params, response)
//   }
// }