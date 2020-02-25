<template>
  <div class="articledetail">
       <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="artical.has_follow?'active':''" @click="headleFollow">{{artical.has_follow?'已关注':'关注'}}</span>
    </div>
     <div class="detail">
      <div class="title">{{artical.title}}</div>
      <div class="desc">
        <span>{{artical.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div id="content" class="articalcontent" v-html="artical.content"></div>
      <div class="video" v-if='artical.type === 2'>
        <video src="https://video.pearvideo.com/mp4/adshort/20191018/cont-1613484-14496802_adpkg-ad_hd.mp4" controls :poster='artical.cover[0].url'></video>
      </div>
      <div class="opt">
        <span :class="{like:true,active:artical.has_like}" @click="headleHasLike">
          <van-icon name="good-job-o" />
          {{artical.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps" v-if="artical.comment_length > 0">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(item,index) in commentList" :key="index" >
      <commentItem :comment='item' @sendcomment="sendcomment(comment)" v-if="item.parent"></commentItem>
        <div class="head">
          <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582521845&di=ecb92524ce3aa7b880a9c36a0007b24a&src=http://a2.att.hudong.com/08/72/01300000165476121273722687045.jpg" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <div style="height:50px;width:100%"></div>
    <div class="bottom">
      <commentfoot :posts="artical"></commentfoot>
    </div>
  </div>
</template>

<script>
import { getPostData, clickLike, followUser, getCommentList } from '@/api/myapi.js'
import commentfoot from '@/components/commentfoot.vue'
import commentItem from '@/components/commentItem.vue'
import { Toast } from 'vant'
export default {
  components: {
    commentfoot, commentItem
  },
  data () {
    return {
      // 文章详情信息
      artical: '',
      currentId: '',
      // 关注用户的id
      userId: '',
      // 评论列表
      commentList: ''
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.currentId = id
    // 获取文章的列表信息
    getPostData(id)
      .then(res => {
        this.artical = res.data.data
        console.log(this.artical)
        // 用户id存起来
        this.userId = res.data.data.user.id
      })
    getCommentList(id)
      .then(res1 => {
        this.commentList = res1.data.data
        console.log(this.commentList)
      })
  },
  methods: {
    async headleHasLike () {
      const id = this.$route.params.id
      // 文章点赞
      const res = await clickLike(id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        Toast(res.data.message)
        // 重新刷新页面数据
        getPostData(id)
          .then(res => {
            this.artical = res.data.data
          })
      }
    },
    // 关注
    async headleFollow () {
      const res = await followUser(this.userId)
      console.log(res)
    },
    sendcomment (comment) {
      console.log(comment)
    }
  }
}
</script>

<style lang='less' scoped>
.articledetail {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  // 如果想要修改服务器返回页面结构中的元素的样式，则不要添加scoped标识，否则无法修改元素的样式
  .header {
    padding: 0px 10px;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > .left {
      height: 100%;
      vertical-align: middle;
      position: relative;
      .van-icon {
        position: absolute;
        top: 15px;
        left: 0;
      }
      > span {
        margin-left: 22px;
        font-size: 50px;
      }
    }
    // css:cascading style sheet
    > span {
      padding: 5px 15px;
      text-align: center;
      border-radius: 15px;
      font-size: 13px;
      border: 1px solid #ccc;
      &.active {
        background-color: #f00;
        color: #fff;
        border: 1px solid #f00;
      }
    }
  }
  .detail {
    padding: 15px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }
    .desc {
      line-height: 30px;
      color: #999;
      font-size: 13px;
    }
    .articalcontent {
      text-indent: 2em;
      line-height: 24px;
      font-size: 15px;
      padding-bottom: 30px;
      width: 100%;
      /deep/img {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
  .opt {
    display: flex;
    justify-content: space-around;
    .like,
    .chat {
      height: 25px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .like {
      &.active {
        color: red;
      }
    }
    .w {
      color: rgb(84, 163, 5);
    }
  }
  .keeps {
    border-top: 5px solid #ddd;
    padding: 0 15px;
    box-sizing: border-box;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
}
.bottom{
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}
</style>
