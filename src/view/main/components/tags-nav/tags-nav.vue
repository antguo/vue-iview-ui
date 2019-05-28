<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer style="margin-top:7px">
        <Button size="small" type="text">
          <Icon :size=18 type="ios-close-circle-outline"/>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!-- 向左导航箭头 -->
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <!-- 向右导航箭头 -->
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="scroll-body" ref="scrollBody" :style="{left:tagBodyLeft + 'px'}">
        <span v-for="item in tagLists">
          <Tag
          ref="tagsPageOpened"
          type="dot"
          closable color="primary"
          @click.native="handleClick(item)">{{ item.title }}</Tag>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import './tags-nav.less'
import { setTimeout } from 'timers';
export default {
  name: "TagsNav",
  data () {
    return {
      tagBodyLeft: 0,
      outerPadding: 4,
      tagLists: [
        {title: '主页',name: 'home_index'},{title: '行政区域',name: 'area_index'},
      ]
    }
  },
  methods: {
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      // alert("outerWidth:"+outerWidth+",bodyWidth:"+bodyWidth)
      if (offset > 0) {
        // min()方法可返回指定的数字中带有最低值的数字
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
        // alert("tagBodyLeft:"+this.tagBodyLeft)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleClick (item) {
      this.$emit('input', item)
    }
  }
}
</script>