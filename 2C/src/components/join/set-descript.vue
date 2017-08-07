<template>
  <div class="cells-textarea">
    <label class="cell-title text-label">店铺业务</label>
    <textarea rows="2" cols="40" placeholder="详细介绍您的店铺和业务，使更多的卡友找到您" class="cell-textarea" :value='descript' @input="setdesc" maxlength="200"></textarea>
  </div>
</template>
<script>
import storage from '../../store/storage.js'
export default {
  data: () => ({
    descript:''
  }),
  created() {
    let joinInfo = storage.get('data')
    if (joinInfo) {
      this.descript = JSON.parse(joinInfo).description
    }
  },
  methods: {
    setdesc (e) {
      this.setdata({'description':e.target.value})
    }
  }
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
    margin: 10px 5px 10px 15px;
    height: 68px;
    resize: none;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 24px;
    word-break: break-all;
  }
</style>
