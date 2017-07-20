<template>
   <div class="cells">
    <label class="cell-title">联系人</label>
    <input class="cell-input" type="text" placeholder="请输入店主姓名" :value="linkman" :readonly="page.edit" @input="setPeople" />
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
    let joinInfo = JSON.parse(storage.get('data'))
    if (joinInfo) {
      this.linkman = joinInfo.linkman
    }
  },
  computed: {
    page () { return this.$store.state.page }
  },
  methods: {
    setPeople (e) {
      this.setdata({'linkman':e.target.value})
      if (this.page.source === '添加') {
        this.submitStatus()
      } else if(this.page.source === '编辑') {
        this.checkEdit()
      }
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
