<template>
  <div class="loginInput">
 <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
    <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" @click="headleLogin">
       <div> 登录</div>
    </van-button>
  </div>

</van-form>
   <div class="register">
       <p>还没有账号？去<router-link to="/register">注册</router-link></p>
   </div>

  </div>
</template>

<script>
import { login } from '@/api/myapi.js'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    async headleLogin () {
      // 定义参数
      const data = {
        username: this.username,
        password: this.password
      }
      // 传参
      const res = await login(data)
      console.log(res)
      // 判断登录成功给出提示
      if (res.data.message !== '登录成功') {
        Toast(res.data.message)
      } else {
        Toast('登录成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.button{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
    .loginbutton{
        background-color: purple;
    }
}
.register{
    display: flex;
    flex-direction: row-reverse;
}

</style>
