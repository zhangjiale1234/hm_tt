<template>
  <div class="myheader">
      <span>
          <slot name="left"></slot>
      </span>
      <span class="title">{{title}}</span>
       <span>
            <slot name="right"></slot>
        </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.myheader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0efef;
    height: 58/360 * 100vh;
    padding: 8/360 * 100vh;
    box-sizing: border-box;
    .title{
        color: #000;
        font-size: 18px;
        font-weight: 600;
    }
}

</style>
