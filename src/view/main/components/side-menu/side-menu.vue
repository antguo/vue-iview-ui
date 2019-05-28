<template>
  <div class="side-menu-wrapper">
    <!-- 作用于父组件中写的div内容 -->
    <slot></slot>
    <!-- active-name:激活菜单的name值 open-names:展开指定的子菜单 on-select:选择菜单（MenuItem）时触发-->
    <Menu theme="dark" width="auto" :class="menuitemClasses" accordion v-show="!isCollapsed" @on-select="handleSelect">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-stats"/><span>开发模块</span>
        </template>
          <div v-for="(item,index) in sysList">
          <MenuItem :name="`${item.name}`"><Icon type="ios-stats"/><span>{{ item.title }}</span></MenuItem>
          </div>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people" /><span>PS模块</span>
        </template>
        <div v-for="(item,index) in zuList">
        <MenuItem :name="`${item.name}`"><Icon type="ios-people" /><span>{{ item.title }}</span></MenuItem>
        </div>
      </Submenu>
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
export default {
  name: 'SideMenu',
  data () {
    return {
      dropdowmenu: false,
      sysList: [
        {title: '开发-1',name: 'area_index'},{title: '开发-2',name: 'menu_index'},{title: '开发-3',name: 'dictionary_index'}
      ],
      zuList: [
        {title: 'PS-1',name: 'org_index'},{title: 'PS-2',name: 'area_index',name: 'role_index'},{title: 'PS-3',name: 'user_index'}
      ]
    }
  },
  props: {
    isCollapsed: Boolean
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
    }
  }
}
</script>