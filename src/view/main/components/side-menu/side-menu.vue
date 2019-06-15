<template>
  <div class="side-menu-wrapper">
    <!-- 作用于父组件中写的div内容 -->
    <slot></slot>
    <!-- active-name:激活菜单的name值 on-select:选择菜单（MenuItem）时触发
    open-names:展开指定的子菜单 展开的 Submenu 的 name 集合
    accordion:是否开启手风琴模式，开启后每次至多展开一个子菜单-->
    <Menu ref="menu" :active-name="activeName" :open-names="openedNames" theme="dark" width="auto" :class="menuitemClasses" :accordion="accordion" v-show="!isCollapsed" @on-select="handleSelect">
      <template v-for="item in menuList">
        <Submenu :name="`${item.name}`">
         <template slot="title">
            <Icon type="ios-stats"/><span>{{ item.meta.title }}</span>
         </template>
          <div v-for="itemSub in item.children">
            <MenuItem :name="`${itemSub.name}`"><Icon type="ios-stats"/><span>{{ itemSub.meta.title }}</span></MenuItem>
          </div>
        </Submenu>
      </template>
      <!-- <Submenu name="name1">
        <template slot="title">
          <Icon type="ios-stats"/><span>开发模块</span>
        </template>
          <div v-for="(item,index) in sysList">
          <MenuItem :name="`${item.name}`"><Icon type="ios-stats"/><span>{{ item.title }}</span></MenuItem>
          </div>
      </Submenu>
      <Submenu name="name2">
        <template slot="title">
          <Icon type="ios-people" /><span>PS模块</span>
        </template>
        <div v-for="(item,index) in zuList">
        <MenuItem :name="`${item.name}`"><Icon type="ios-people" /><span>{{ item.title }}</span></MenuItem>
        </div>
      </Submenu> -->
    </Menu>
    <div class="menu-collapsed" v-show="isCollapsed">
      <template>
        <Dropdown placement="bottom">
        <a class="drop-menu-a" href="javascript:void(0)">
          <Icon :size="16" style="color:white;" type="ios-stats"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>开发-1</DropdownItem>
          <DropdownItem>开发-2</DropdownItem>
          <DropdownItem>开发-3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="bottom">
        <a class="drop-menu-a" href="javascript:void(0)">
          <Icon :size="16" style="color:white;" type="ios-stats"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>PS-1</DropdownItem>
          <DropdownItem>PS-2</DropdownItem>
          <DropdownItem>PS-3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </template>
    </div>
  </div>
</template>
<script>
import './side-menu.less'
import { getUnion } from '@/libs/tools'
export default {
  name: 'SideMenu',
  data () {
    return {
      openedNames: [],
      dropdowmenu: false,
      sysList: [
        {title: '开发-1',name: 'dev_index'},{title: '开发-2',name: 'dev2_index'}
      ],
      zuList: [
        {title: 'PS-1',name: 'ps1_index'}
      ]
    }
  },
  props: {
    accordion: Boolean,
    isCollapsed: {
      type: Boolean
    },
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    activeName: {
      type: String,
      default: ''
    }
  },
  computed: {
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      // 获取当前选中的菜单项
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    // openedNames (newNames) {
    //   this.openedNames = newNames
    // },
    openedNames () {
      // 点击tag自动展开对应的menu
      this.$nextTick(() => {
        //iview方法：updateOpened 手动更新展开的子目录，注意要在 $nextTick 里调用
        this.$refs.menu.updateOpened()
      })
    }
  }
}
</script>