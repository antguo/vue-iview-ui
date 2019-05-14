<template>
  <div class="user">
    <Dropdown>
      <Badge dot :offset="[1,1]">
        <Avatar icon="ios-person"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">修改密码</DropdownItem>
        <DropdownItem name="message">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import './user.less'
export default {
  
}
</script>
