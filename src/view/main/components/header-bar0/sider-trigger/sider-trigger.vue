<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon :type="icon" :size="size"></Icon>
  </a>
</template>
<script>
export default {
  name: 'siderTrigger',
  //props用于接收父组件传来的数据
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      alert("view/main/components/header-bar/sider-trigger/sider-trigger.vue")
      //emit:子组件向父组件传值
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>