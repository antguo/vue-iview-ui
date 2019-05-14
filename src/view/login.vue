<template>
  <Form ref="formCustom" :label-width="80" style="width:300px" :model="formCustom" :rules="ruleCustom">
    <FormItem label="用户名" prop="user" style="width：200px">
      <Input type="text" v-model="formCustom.user" placeholder="请输入用户名...">
        <Icon type="ios-person" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="密码" prop="passwd">
      <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码...">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="验证码" prop="code">
      <Input type="password" v-model="formCustom.code" placeholder="请输入验证码..." style="width:60%">
        <Icon type="md-lock" slot="prepend"></Icon>
      </Input>
      <div class="code">
        <img src="../assets/logo.png" alt="">
      </div>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
      <Button style="margin-left:8px" @click="handleReset('formCustom')">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    // 有先后顺序,validate要写在return的前面，不加callback()会一直打圈
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名！'))
      } else {
        callback();
      }
    }
    const validatePasswd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码！'))
      } else {
        callback();
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码！'))
      } else {
        callback();
      }
    }
    return {
      formCustom: {
        user: '',
        passwd: '',
        code: ''
      },
      ruleCustom: {
        user: [
          { validator: validateUser, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePasswd, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          // Cookies.set('user', 'admin');
          sessionStorage.setItem('user', 'admin');//sessionStorage,页面关闭则清除，或者另外再打开一个页面也是重新录入
          this.$router.push({ name: 'home_index' })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="less">
.code{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40%
}
.code img{
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  cursor: pointer;
}
</style>
