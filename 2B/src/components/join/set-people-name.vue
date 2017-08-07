<template>
   <div class="cells">
    <label class="cell-title">店主姓名</label>
    <input class="cell-input" type="text" placeholder="请输入店主姓名" :value="linkman" @input="setPeople" />
  </div>
</template>

<script>
import storage from '../../store/storage.js'
export default {
  data () {
    return {
      linkman: ''
    }
  },
  created () {
    let joinInfo = JSON.parse(storage.get('recommend'))
    if (joinInfo) {
      this.linkman = joinInfo.linkman
    }
  },
  computed: {
  },
  methods: {
    setPeople (e) {
      this.setdata({'linkman':e.target.value})
      this.submitStatus()
    }
  }
}
</script>

<style scoped>
.cell-height{
    height: 61px;
    justify-content: flex-start;
  }
  .input-content{
    flex:1;
  }
  .text-tip{
    background: #fff;
    padding-left: 13px;
    font-size: 12px;
    color: #F7411C;
    line-height: 20px;
  }
</style>
