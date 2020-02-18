<template>
  <div class="registerinput">
      <van-form >
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
    <van-field
    v-model="nickname"
    name="昵称"
    label="昵称"
    placeholder="昵称"
    :rules="[{ required: true, message: '请填写昵称' }]"
  />
  <div style="margin: 16px;" class="registerButton">
    <van-button round block type="info" native-type="submit" @click="headleRegister">
     <div >注册</div>
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { register } from '@/api/myapi.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    headleRegister () {
      const data = {
        password: this.password,
        username: this.username,
        nickname: this.nickname
      }
      register(data)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
