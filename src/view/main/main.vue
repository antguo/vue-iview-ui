<template>
  <!-- <div class="layout"> -->
    <Layout style="height: 100%" class="main">
      <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="isCollapsed" class="left-sider" :style="{overflow: 'hidden'}" ref="side1">
        <side-menu accordion :isCollapsed="isCollapsed">
          <!-- 子组件中要加上slot才可以显示 -->
          <div class="logo-con">
            <img v-show="!isCollapsed" src="@/assets/logo.jpg" alt="">
            <img v-show="isCollapsed" src="@/assets/logo-min.jpg" alt="">
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
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">Content</Content>
      </Layout>
    </Layout>
  <!-- </div> -->
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import './main.less'
import { stat } from 'fs';
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    User
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
    }
  },
  methods: {
    collapsedSider (state) {
      this.$refs.side1.toggleCollapse();
    }
  }
}
</script>
