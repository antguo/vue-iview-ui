<!-- 处理图标的类型、颜色、大小 -->
<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"></component>
</template>
<script>
import Icons from '../icons'
export default {
  name: 'CommonIcon',
  components: {Icons},
  //接收父组件传输的标签类型、颜色、大小
  props: {
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  computed: {
    iconType () {
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconColor () {
      return this.color || ''
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 12 : undefined)
    }
  },
  methods: {
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
  }
}
</script>