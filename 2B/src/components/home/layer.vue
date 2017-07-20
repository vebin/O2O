<template>
  <div class="background">
    <div class="back-layer">
      <p class="layer-tips">登录上传店铺信息才会有卡路里奖励哦</p>
      <div class="click-btn">
        <p class="left-btn" @click="jump('/Join')">直接上传</p>
        <p class="go-login" @click='tologin'>去登录</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    tologin () {
      if (this.setApp()!=='other') {
        this.callNativeMethod("onLogin",{})
      } else {
        window.truckhomeAccountBinding.show()
      }
    }
  }
}
</script>
<style scoped>
  .background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
  }
  .back-layer{
    display: flex;
    text-align: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -140px;
    margin-top: -80px;
    width: 280px;
    height: 160px;
    background: #fff;
    border-radius: 5px;
  }
  .layer-tips{
    padding:0 20px;
    flex: 1;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #333;
  }
  .click-btn{
    display: flex;
    flex-direction: row;
    height: 40px;
    line-height: 40px;
  }
  .left-btn{
    flex: 1;
    font-size: 18px;
    color: #666;
  }
  .go-login{
    flex: 1;
    border-left: 1px solid #eee;
    font-size: 18px;
    color: #09bb07;
  }
</style>
