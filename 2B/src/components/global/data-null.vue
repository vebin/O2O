<template>
<div class="data-null">
  <figure class="photo">
    <img src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_no@2x.png" alt="">
  </figure>
  <h3 class="title">{{title}}</h3>
  <span class="text">{{text}}</span>
</div>
</template>

<script>
export default {
  props: ['title', 'text'],
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .data-null .photo{
    width: 155px;
    height: 106px;
    margin:30px auto 30px;
  }
  .title{
    font-size: 20px;
    color: #666666;
    letter-spacing: 0;
    line-height: 28px;
    display: block;
    text-align: center;
  }
  .text{
    font-size: 14px;
    color: #999999;
    line-height: 22px;
    text-align: center;
    display: block;width: 100%;
  }
</style>
