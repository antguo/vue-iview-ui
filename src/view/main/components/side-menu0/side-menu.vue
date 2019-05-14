<template>
  <div class="side-menu-wrapper" v-show="!collapsed">
    <slot></slot>
    <Menu ref="menu">
    </Menu>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item'
export default {
  
}
</script>
