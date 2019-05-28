<template>
<div>
  <Icon type="md-menu" size="24" :style="{margin: '0 10px'}" :class="rotateIcon" @click.native="collapsedSider"></Icon>
  <div style="display: inline-block;">
    <Breadcrumb :list="breadCrumbList">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>Home
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="logo-buffer"></Icon>Components
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
  <div class="content-con">
    <slot></slot>
  </div>
</div>
</template>
<script>
import './header-bar.less'
export default {
  name: "HeaderBar",
  props: {
    isCollapsed: Boolean
  },
  // data () {
  //   return {
  //     isCollapsed: false
  //   }
  // },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    breadCrumbList () {
      /**
       * [{"path":"/home","name":"home","meta":{"hideInMenu":true,"title":"首页","notCache":true,"icon":"md-home"},"icon":"md-home"}]
       */
      alert(JSON.stringify(this.$store.state.app.breadCrumbList))
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    collapsedSider () {
      //调用父组件的方法
      this.$emit('on-change',this.isCollapsed);
    }
  }
}
</script>

