<template>
  <div class="editUserInfo">
    <div class="header">
      <headers :title="title">
        <span
          slot="left"
          class="iconfont iconjiantou2"
          @click="$router.back()"
        ></span>
        <span slot="right">11</span>
      </headers>
    </div>
    <div class="editHeaderImg">
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="head_img">
      <img :src="head_img" alt="" />
    </div>
    <mycell title="昵称" :desc="text" @click="nickshow=!nickshow"></mycell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updataNickname">
        <van-field v-model="text" label="昵称" :placeholder="text" />
    </van-dialog>
     <mycell title="密码" :desc="password" @click="passwordshow=!passwordshow"></mycell>
    <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm="updataPassword">
        <van-field v-model="password1" label="新密码" />
        <van-field v-model="password2" label="确认密码" />
    </van-dialog>
  </div>
</template>

<script>
import headers from '@/components/myheader.vue'
import { upLoadFile } from '@/api/upload.js'
import { getUserInfo, updataUserInfo } from '@/api/myapi.js'
import mycell from '@/components/mycell.vue'
import { Toast } from 'vant'
export default {
  components: {
    headers, mycell

  },
  data () {
    return {
      title: '个人信息修改',
      head_img: '',
      nickshow: false,
      passwordshow: false,
      text: '',
      password: '',
      password1: '',
      password2: ''

    }
  },
  mounted () {
    const id = localStorage.getItem('userId')
    getUserInfo(id).then(res => {
      console.log(res)
      // 获取用户信息
      this.head_img = localStorage.getItem('baseUrl') + res.data.data.head_img
      this.text = res.data.data.nickname
      this.password = res.data.data.password
    })
  },
  methods: {
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      const fromData = new FormData()
      fromData.append('file', file.file)
      const res = await upLoadFile(fromData)
      console.log(res)
      if (res.data.message === '文件上传成功') {
        this.head_img = localStorage.getItem('baseUrl') + res.data.data.url
      }
      // 更新用户在数据库的信息
      const id = localStorage.getItem('userId')
      const res2 = updataUserInfo(id, { head_img: res.data.data.url })
      console.log(res2)
    },
    // 更新昵称
    updataNickname () {
      const id = localStorage.getItem('userId')
      const nick = this.text
      updataUserInfo(id, { nickname: nick }).then(res => {
        console.log(res)
      })
    },
    // 更新密码
    updataPassword () {
      if (this.password1 === '' || this.password2 === '') {
        Toast('密码不能输入为空')
        // 重置
        this.password1 = ''
        this.password2 = ''
      } else if (this.password1 !== this.password2) {
        // 重置
        this.password1 = ''
        this.password2 = ''
        Toast('两次输入密码不一致')
      } else {
        // 修改密码
        const id = localStorage.getItem('userId')
        const password = this.password1
        updataUserInfo(id, { password }).then(res => {
          Toast(res.data.message)
          // 更新视图
          this.password = password
        })
      }
    }

  }

}
</script>

<style lang="less" scoped>
.head_img {
  height: 230/360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
    border-radius: 50%;
  }
}
.editHeaderImg {
  position: absolute;
  top: 118px;
  left: 125px;
  opacity: 0;
}
</style>
