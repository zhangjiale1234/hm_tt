<template>
  <div class="index">
    <div class="header">
      <div class="logo iconfont iconnew logo"></div>
      <div class="search" @click="$router.push('/search')">
        <van-icon name="search" />&nbsp;
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/mycenter')">
        <van-icon name="user-o" />
      </div>
    </div>

    <van-tabs v-model="active" @click="headleChangeCart(active)">
      <van-tab
        v-for="(item, index) in categoryList"
        :title="item.name"
        :key="index"
      >
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          loading-text="疯狂加载中"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="article" v-for="(item2, i) in postList" :key="i" @click="headleJump(item2.id)">
              <div class="article_left">
                <div class="article_title">{{ item2.title }}</div>
                <div class="article_text">
                  <span>{{ item2.user.nickname }}</span>
                  <span>{{ item2.comment_length }}跟帖</span>
                </div>
              </div>
              <div class="artile_img">
                <img :src="item2.cover[0].url" alt="" />
              </div>
            </div>
            <!-- <div class="article1"  v-for="(item2,i) in postList" :key="i">
            <div class="article_top">
                123123123123123
            </div>
            <div class="article_center">
                <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
            </div>
            <div class="article_bottom">
                 <span>广州新闻</span>
              <span>11跟帖</span>
            </div>
        </div> -->
            <div class="nomain" v-if="postList.length === 0">
              没有更多内容啦...
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCategoryList, getPostsList } from '@/api/myapi.js'
export default {
  data () {
    return {
      // 栏目列表数组
      categoryList: [],
      // 文章列表
      postList: [],
      // 当前激活的索引
      active: 1,
      activeId: '',
      pageIndex: 1,
      pageSize: 5,
      isLoading: false,
      loading: false,
      finished: false
    }
  },
  mounted () {
    getCategoryList().then(res => {
      // 获取tab栏
      this.categoryList = res.data.data
      // 加载完需要拿到选项卡的id
      const cid = res.data.data[this.active].id
      //   console.log(this.activeId)
      // 加载完成获取第一次文章列表
      getPostsList({
        cid,
        pageIndex: 1,
        pageSize: 5
      }).then(res => {
        console.log(res)
        this.postList = res.data.data
      })
    })
  },
  methods: {
    headleJump (id) {
      this.$router.push({ name: 'ArticleDetail', params: { id } })
    },
    headleChangeCart (index) {
      // 获取到对应的索引拿对应的id
      // 点击切换选项卡时候必须清空数组，要不然会累加上一个数组的数据
      this.postList = []
      this.activeId = this.categoryList[this.active].id
      this.changePostList({
        category: this.activeId,
        pageIndex: 1,
        pageSize: 5
      })
      this.active = index
    },
    // 点击后发送请求拿对应tab栏里的数据
    changePostList (category) {
      getPostsList(category).then(result => {
        console.log(result)
        // 重新赋值加载
        this.postList.push(...result.data.data)
        this.loading = false
        if (result.data.data.length <= 0) {
          this.finished = true
        }
        console.log(this.postList)
      })
    },
    // 下拉刷新
    onRefresh () {
      // 清空数组
      this.postList = []
      setTimeout(() => {
        this.isLoading = false
        this.activeId = this.categoryList[this.active].id
        this.changePostList({
          category: this.activeId,
          pageIndex: 1,
          pageSize: 5
        })
      }, 1000)
    },
    // 上拉加载更多
    onLoad () {
      this.pageIndex++
      setTimeout(() => {
        this.activeId = this.categoryList[this.active].id
        this.changePostList({
          category: this.activeId,
          pageIndex: this.pageIndex,
          pageSize: 5
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    width: 100%;
    height: 54/360 * 100vw;
    background-color: #e92322;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    .logo {
      width: 54/360 * 100vw;
      height: 54/360 * 100vw;
      font-size: 50px;
    }
    .search {
      flex: 1;
      height: 34/360 * 100vw;
      border-radius: 17px;
      background-color: rgba(255, 255, 255, 0.3);
      line-height: 34/360 * 100vw;
      text-align: center;
      color: #fff;
    }
    .user {
      width: 54/360 * 100vw;
      font-size: 26px;
      text-align: center;
    }
  }
  .article {
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    .article_left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 10/360 * 100vw;
      .article_title,
      .article_top {
        font-size: 14px;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .article_text {
        font-size: 10px;
        color: #99a6c4;
        padding: 6px;
        span {
          &:nth-child(2) {
            margin-left: 15px;
          }
        }
      }
    }
  }
  .artile_img {
    width: 144/360 * 100vw;
    height: 80/360 * 100vw;
    padding: 6px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nomain {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .article_center {
    width: 95%;
    height: 95%;
    padding: 10/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article_bottom {
    padding: 2px 10px;
    font-size: 10px;
    color: #999999;
    span {
      &:nth-child(2) {
        margin-left: 8px;
      }
    }
  }

  .article_top {
    padding: 2px 10px;
  }
}
</style>
