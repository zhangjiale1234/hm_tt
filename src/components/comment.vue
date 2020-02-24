<template>
  <div class="comment">
    <div class="comment_box" v-show="!isFocus">
      <div class="comment_left">
        <input type="text" placeholder="写跟帖" @focus="haedleblur" />
      </div>
      <div class="comment_right">
        <span><van-icon name="chat-o"/></span>
        <span><van-icon name="star"/></span>
        <span><van-icon name="share"/></span>
      </div>
    </div>
    <div class="inputcomment" v-show=" isFocus">
      <textarea
        ref="commtext"
        rows="5"
        autofocus
      ></textarea>
      <div>
        <span @click="sendcomment">发送</span>
        <span @click="cancelreplay">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    haedleblur () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 0)
      console.log(456)
    },
    cancelreplay () {
      this.isFocus = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment_box {
  display: flex;
  align-items: center;
  margin: 5px 0;
  .comment_left {
    width: 200/360 * 100vw;
    height: 20/360 * 100vh;
    margin: 5px;
    padding: 5px;
    box-sizing: border-box;
    input {
      box-sizing: border-box;
      border-radius: 20px;
      border: none;
      background-color: #eeeeee;
      padding: 4px 10px;
      font-size: 14px;
    }
  }
  .comment_right {
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    align-items: center;
    flex: 1;
  }
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index:999;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
    &.active{
      color:red;
    }
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
