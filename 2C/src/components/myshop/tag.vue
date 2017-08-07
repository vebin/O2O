<template>
  <div>
    <span class="tag">{{typetext}}</span>
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
    // if (this.index === 0 || this.index === 3) {
    //   this.tagstatus = 'tag'
    // }
    // if (this.index === 1 || this.index === 4) {
    //   this.tagstatus = 'tag two'
    // }
    // if (this.index === 2 || this.index === 5) {
    //   this.tagstatus = 'tag three'
    // }
  }
}
</script>
<style scoped>
  .tag{
    border-radius: 2px;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 24px;
    padding: 0 8px;
    display: inline-block;
    color: #666;
    position: relative;
  }
  .tag:after{
    content: " ";
    position: absolute;
    left: 0;
    top: -1px;
    width: 200%;
    height: 200%;
    border: 1px solid #ccc;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-radius: 4px; 
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
