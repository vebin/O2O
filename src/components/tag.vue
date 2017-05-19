<template>
  <div>
     <div class="tags">
      <span class="tag">长安跨越</span>
     </div>
     <div class="tags">
      <span class="tag two">长安跨越</span>
     </div>
     <div class="tags">
      <span class="tag three">长安跨越</span>
     </div>
  </div>
</template>
<script>
export default {
  props: ['tagTitle', 'tagType']
}
</script>
<style scoped>
  .tags{
    box-sizing: border-box;
  }
  .tag{
    border-radius: 2px;
    font-size: 14px;
    height: 24px;
    letter-spacing: 0;
    line-height: 24px;
    padding: 2px 3px;
    border: 1px solid #FEA802;
    color: #FEA802;
  }
  .two{
    border: 1px solid #FE7302;
    color: #FE7302;
  }
  .three{
    border: 1px solid #028DFE;
    color: #028DFE;
  }
</style>
