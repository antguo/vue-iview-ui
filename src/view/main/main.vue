<template>
  <!-- <div class="layout"> -->
    <Layout style="height: 100%" class="main">
      <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="isCollapsed" class="left-sider" :style="{overflow: 'hidden'}" ref="side1">
        <side-menu :active-name="$route.name" ref="sideMenu" accordion :isCollapsed="isCollapsed" @on-select="turnToPage" :menu-list="menuList">
          <!-- 子组件中要加上slot才可以显示 -->
          <div class="logo-con">
            <img v-show="!isCollapsed" src="@/assets/gwj2.png" alt="">
            <img v-show="isCollapsed" src="@/assets/gwj.png" alt="">
          </div>
        </side-menu>
      </Sider>
      <Layout>
        <Header class="header-con">
          <!-- <Icon type="md-menu" size="24" :style="{margin: '0 10px'}" :class="rotateIcon" @click.native="collapsedSider"></Icon>
          <template>
            <div style="display: inline-block;">1</div>
          </template> -->
          <header-bar :isCollapsed="isCollapsed" @on-change="collapsedSider">
            <user></user>
          </header-bar>
        </Header>
        <!-- <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">Content</Content> -->
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <!-- 滚动标签导航 -->
            <div class="tag-nav-wrapper">
              <tags-nav :value="$route" :list="tagNavList" @input="handleClick" @on-close="handleCloseTag"></tags-nav>
            </div>
            <!-- 内容 -->
            <Content class="content-wrapper">
              <!-- keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能 -->
              <keep-alive>
                <router-view />
              </keep-alive>
              <!-- <div style="background:#eee;padding:1px">
                <Card :bordered="false">
                  <p slot="title">No border title</p>
                  <p>1233</p>
                </Card>
              </div> -->
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  <!-- </div> -->
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import TagsNav from './components/tags-nav'
import './main.less'
import { getNewTagList, routeEqual } from '@/libs/util' 
// import { stat } from 'fs';
import { mapMutations, mapActions, mapGetters } from 'vuex'
import routers from '@/router/router'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    User,
    TagsNav
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    cacheList () {
      /**
       * filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        注意： filter() 不会对空数组进行检测。
        注意： filter() 不会改变原始数组
        map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
       */
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    // 组件中可以使用this.$store.commit('xxx')提交mutation或者...mapMutations将组件中的methods映射为store.commit调用(需要在根节点注入store)
    ...mapMutations([
      'setBreadCrumb',
      'setHomeRoute',
      'setTagNavList',
      'closeTag',
      'addTag'
    ]),
    collapsedSider (state) {
      this.$refs.side1.toggleCollapse();
    },
    // 标签点击事件
    handleClick (item) {
      this.turnToPage(item)
    },
    // 标签跳转页面
    turnToPage (route) {
      let { name, params, query } = {}
      // typeof运算符用于判断对象的类型:undefined/boolean/string/number/object/function
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
      // alert("route:" + JSON.stringify(route) + "\ntypeof:" + typeof route +"\nname:" + route.name)
      // this.$router.push({name: route.name})
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    }
  },
  // 用watch来监控路由对象
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setHomeRoute(routers)
    this.setBreadCrumb(this.$route)
  }
}
</script>
