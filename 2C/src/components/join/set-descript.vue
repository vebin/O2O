<template>
  <div class="cells-textarea">
    <label class="cell-title text-label">店铺业务</label>
    <textarea rows="2" cols="40" placeholder="详细介绍您的店铺和业务，使更多的卡友找到您" class="cell-textarea"></textarea>
  </div>
</template>
<script>
export default {
  data: () => ({

  })
}
</script>
<style scoped>
  .cells-textarea{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    background: #fff;
  }
  .text-label{
    margin-top: 10px;
  }
  .cell-textarea{
    flex: 1;
    padding: 10px 15px;
    height: 68px;
    resize: none;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 24px;
  }
</style>
