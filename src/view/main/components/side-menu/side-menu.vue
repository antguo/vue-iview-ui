<template>
  <div class="side-menu-wrapper">
    <!-- 作用于父组件中写的div内容 -->
    <slot></slot>
    <!-- active-name:激活菜单的name值 open-names:展开指定的子菜单-->
    <Menu theme="dark" width="auto" :class="menuitemClasses" accordion v-show="!isCollapsed">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-stats"/><span>系统管理</span>
        </template>
        <!-- <div v-show="!isCollapsed"> -->
          <MenuItem name="1-1"><Icon type="ios-stats"/><span>行政区域</span></MenuItem>
          <MenuItem name="1-2"><Icon type="ios-stats"/><span>系统菜单</span></MenuItem>
          <MenuItem name="1-3"><Icon type="ios-stats"/><span>通用字典</span></MenuItem>
          <MenuItem name="1-4"><Icon type="ios-stats"/><span>系统日志</span></MenuItem>
          <MenuItem name="1-5"><Icon type="ios-stats"/><span>定时任务</span></MenuItem>
          <MenuItem name="1-6"><Icon type="ios-stats"/><span>敏捷开发</span></MenuItem>
          <MenuItem name="1-7"><Icon type="ios-stats"/><span>系统监控</span></MenuItem>
          <MenuItem name="1-7"><Icon type="ios-stats"/><span>接口管理</span></MenuItem>
        <!-- </div> -->
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people" /><span>组织机构</span>
        </template>
        <MenuItem name="2-1"><Icon type="ios-people" /><span>机构管理</span></MenuItem>
        <MenuItem name="2-2"><Icon type="ios-people" /><span>角色管理</span></MenuItem>
        <MenuItem name="2-3"><Icon type="ios-people" /><span>用户管理</span></MenuItem>
      </Submenu>
    </Menu>
    <div class="menu-collapsed" v-show="isCollapsed">
      <template>
        <Dropdown placement="bottom">
        <a class="drop-menu-a" href="javascript:void(0)">
          <Icon :size="16" style="color:white;" type="ios-stats"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>行政区域</DropdownItem>
          <DropdownItem>行政区域</DropdownItem>
          <DropdownItem>行政区域</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="bottom">
        <a class="drop-menu-a" href="javascript:void(0)">
          <Icon :size="16" style="color:white;" type="ios-stats"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>行政区域</DropdownItem>
          <DropdownItem>行政区域</DropdownItem>
          <DropdownItem>行政区域</DropdownItem>
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
      dropdowmenu: false
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
  }
}
</script>