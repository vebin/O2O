<template>
  <div>
    <span :class="tagstatus">{{typetext}}</span>
  </div>
</template>
<script>
export default {
  props: ['typetext', 'index'],
  data () {
    return {
      tagstatus: ''
    }
  },
  created () {
    if (this.index === 0 || this.index === 3) {
      this.tagstatus = 'tag'
    }
    if (this.index === 1 || this.index === 4) {
      this.tagstatus = 'tag two'
    }
    if (this.index === 2 || this.index === 5) {
      this.tagstatus = 'tag three'
    }
  }
}
</script>
<style scoped>
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
