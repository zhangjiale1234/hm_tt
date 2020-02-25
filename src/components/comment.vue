<template>
  <div class="comment">
    <div class="item">
      <div class="head">
        <img
          src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582521845&di=ecb92524ce3aa7b880a9c36a0007b24a&src=http://a2.att.hudong.com/08/72/01300000165476121273722687045.jpg"
          alt
        />
        <div>
          <p>123333</p>
          <span>4小时前</span>
        </div>
        <span>回复</span>
      </div>
      <div class="text">123321321</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
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
</style>
