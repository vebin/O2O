<template lang="html">
  <div class="mask" @touchmove.stop.prevent>
    <div class="confirm-wraper">
      <h5>删除</h5>
      <p v-html="msg">{{msg}}</p>
      <div class="operation-area">
        <span class="cancle" @click="click('cancle')">取消</span>
        <span class="confirm" @click="click('delete')">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg'],
  data () {
    return {}
  },
  methods: {
    click (type) {
      this.$emit('confirm', type)
    }
  }
}
</script>

<style lang="css" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.60);
    z-index: 2000;
  }
  .confirm-wraper {
    position: absolute;
    z-index: 5000;
    min-width: 260px;
    width: 74.7%;
    max-width: 300px;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.17);
    border-radius: 4px;
  }
  .confirm-wraper h5 {
    margin-top: 20px;
    font-size: 20px;
    color: #333333;
    line-height: 30px;
    font-weight: bold;
  }
  .confirm-wraper p {
    margin-top: 15px;
    padding: 0 20px;
    font-size: 18px;
    color: #333333;
    line-height: 28px;
  }
  .confirm-wraper .operation-area {
    margin-top: 20px;
    height: 49px;
    display: flex;
    position: relative;
  }
  .confirm-wraper .operation-area::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #D2D3D5;
    transform: scaleY(.5);
  }
  .confirm-wraper .operation-area::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: #D2D3D5;
    transform: scaleX(.5);
  }
  .confirm-wraper .operation-area span {
    flex: 1;
    display: block;
    text-align: center;
    line-height: 49px;
  }
  .confirm-wraper .operation-area .confirm {
    color: #ff6600;
  }
</style>
