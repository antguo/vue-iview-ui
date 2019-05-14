<!-- 接收父组件传输来的类型、颜色和大小，放入到i标签内，返回图标 -->
<template>
  <i :class="`iconfont icon-${type}`" :style="styles"></i>
</template>
<script>
export default {
  name: 'Icons',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#5c6b77'
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    styles () {
      return {
        fontSize: `${this.size}px`,
        color: this.color
      }
    }
  }
}
</script>