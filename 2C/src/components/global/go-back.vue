<template>
  <div class="newMsg">
    <p class="newMsgText">返回</p>
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
  .newMsg {
    position:fixed;
    bottom:70px;
    right:0;
    background:#FFBC2E;
    width:70px;
    height:35px;
    line-height:35px;
    text-align:center;
    border-radius:35px 0 0 35px;
    z-index: 100;
  }
  .newMsgText{
    position: absolute;
    right: 7px;
    top: 7px;
    font-size:16px;
    color:#fff;
    letter-spacing:0;
    line-height:21px;
  }
  .newMsgText:before {
  content: '';
  position: absolute;
  left: -10px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-left: solid 1px #fff;
  border-top: solid 1px #fff;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  }
  .newMsgText:after {
  content: '';
  position: absolute;
  left: -18px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-bottom: solid 1px #fff;
  border-right: solid 1px #fff;
  -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
  }
</style>
