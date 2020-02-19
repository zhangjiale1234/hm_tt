<template>
  <div class="editUserInfo">
      <div class="header">
          <headers :title="title">
               <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
               <span slot="right">11</span>
          </headers>
      </div>
      <div class="editHeaderImg">
          <van-uploader :after-read="afterRead" />
      </div>
      <div class="head_img">
          <img :src="head_img" alt="">
      </div>
  </div>
</template>

<script>
import headers from '@/components/myheader.vue'
import { upLoadFile } from '@/api/upload.js'
import { getUserInfo, updataUserInfo } from '@/api/myapi.js'
export default {
  data () {
    return {
      title: '个人信息修改',
      head_img: ''
    }
  },
  mounted () {
    const id = localStorage.getItem('userId')
    getUserInfo(id)
      .then(res => {
        console.log(res)
        // 获取用户信息
        this.head_img = localStorage.getItem('baseUrl') + res.data.data.head_img
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
    }
  },
  components: {
    headers
  }
}
</script>

<style lang='less' scoped>
.head_img{
    height: 230/360*100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 120/360*100vw;
        height: 120/360*100vw;
        border-radius: 50%;
    }
}
.editHeaderImg{
    position: absolute;
    top:118px;
    left: 125px;
    opacity: 0;
}

</style>
