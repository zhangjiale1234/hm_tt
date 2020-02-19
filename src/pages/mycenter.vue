<template>
  <div class="personal">
    <router-link to="/editUserInfo">
      <div class="profile">
        <img src="http://b-ssl.duitang.com/uploads/item/201608/21/20160821194924_UCvFZ.jpeg" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{nickname}}
          </div>
          <div class="time">{{filters()}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <div class="list">
      <router-link to='/myfocus'>
        <mycell title='我的关注' desc='关注的用户'></mycell>
      </router-link>
      <router-link to='/mykeeps'>
        <mycell title='我的跟帖' desc='跟帖/回复'></mycell>
      </router-link>
      <router-link to='/mycollections'>
        <mycell title='我的收藏' desc='文章/视频'></mycell>
      </router-link>
      <router-link to='/mysettings'>
        <mycell title='设置'></mycell>
      </router-link>
    </div>
    <div class="exitbtn">
      <van-button type="info" class="btn">退出</van-button>
    </div>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import { getUserInfo } from '@/api/myapi.js'
export default {
  data () {
    return {
      nickname: '',
      time: new Date(),
      gender: '',
      head_img: ''

    }
  },
  methods: {
    filters () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return year + '-' + month + '-' + day
    }
  },
  components: {
    mycell
  },
  mounted () {
    // 接收用户id
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('loginToken')
    // 调用api
    getUserInfo(id, token)
      .then(res => {
        console.log(res)
        this.nickname = res.data.data.nickname
        this.gender = res.data.data.gender
      })
  }
}
</script>

<style lang='less' scoped>
.exitbtn{
  width: 100%;
  text-align: center;
  padding: 40px 10px;
  box-sizing: border-box;
  .btn{
    width: 100%;
  }
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
