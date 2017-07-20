<template>
  <div class="search-null">
    <img src="http://s.kcimg.cn/wap/images/detail/o2oImg/search.png" class="null-img">
    <p class="null-title">未找到相关数据</p>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
  .search-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .search-null{
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .null-img{
    width: 200px;
    height: 120px;
  }
  .null-title{
    font-size: 18px;
    color: #666666;
    letter-spacing: 0;
    line-height: 28px;
  }
</style>
