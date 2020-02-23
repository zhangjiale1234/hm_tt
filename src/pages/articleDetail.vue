<template>
  <div class="articledetail">
       <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span>关注</span>
    </div>
    <div class="detail" v-html="articleContent">

    </div>
  </div>
</template>

<script>
import { getPostData } from '@/api/myapi.js'
export default {
  data () {
    return {
      articleContent: ''
    }
  },
  mounted () {
    console.log(this.$route)
    const id = this.$route.params.id
    getPostData(id)
      .then(res => {
        console.log(res)
        this.articleContent = res.data.data.content
      })
  }
}
</script>

<style scoped lang="less">

.articledetail{
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
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
</style>
