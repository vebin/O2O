<template>
  <figure class="nav-item">
    <img :src="`//s.kcimg.cn/wap/images/detail/o2oImg/menu_${data.Id}.png`" :alt="data.Typedescription">
    <figcaption>{{data.Typedescription}}</figcaption>
  </figure>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style scoped>
  .nav-item{
    margin:0 auto;
    width: 50px;
    text-align: center;
  }
  .nav-item img{
    width: 40px;
    height: 40px;
    vertical-align: top;
    border-radius: 50%;
  }
  .nav-item figcaption{
    margin-top:3px;
    font-size: 12px;
    line-height: 18px;
  }
</style>
